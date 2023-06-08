import { useEffect, useState } from "react";
import ModalEditPatient from "./ModalEditPatient";
import ModalNewRdv from "./ModalNewRdv";
import ModalRendezVous from "./ModalRendezVous";
import NewPatientForm from "./NewPatientForm";
import Modal from "./Modal";
import { BiCheckCircle, BiEditAlt } from "react-icons/bi";
import { MdPersonRemoveAlt1 } from "react-icons/md";

const AdminPage = () => {
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const [patients, setPatients] = useState([]);
  const [modal, setModal] = useState({ patient: {}, show: false });
  const [modalRdv, setModalRdv] = useState({ patient: {}, show: false });
  const [modalPatientRdv, setModalPatientRdv] = useState({
    patient: {},
    show: false,
  });
  const [modalDeletePatient, setModalDeletePatient] = useState({
    show: false,
    patient: {},
  });
  const [newPatientForm, setNewPatientForm] = useState(false);
  const [waitingListSearch, setWaitingListSearch] = useState("");
  const [patientsListSearch, setPatientsListSearch] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          "https://liste-attente-back.vercel.app/admin/allPatients",
          {
            headers: {
              Authorization: "Bearer " + tokenAdmin,
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setPatients(result.patients);
        }
      } catch (err) {}
    };

    const fetchData = async () => {
      await fetchPatients();
      // Suite du code qui dépend de la liste des patients mise à jour
      console.log(patients);
      // Autres actions à effectuer avec les patients
    };

    fetchData();
  }, []);

  console.log(patients);

  //Page actuelle pour la liste d'attente
  const [currentPageWaitingList, setCurrentPageWaitingList] = useState(1);
  const [currentPagePatientList, setCurrentPagePatientList] = useState(1);

  //Nombre de résultats par page
  const itemsPerPage = 10;

  // Filtrer la liste des patients en attente
  const waitingListPatient = patients.filter(
    (patient) => patient.statut != "PEC"
  );
  const filteredWaitingList = waitingListPatient.filter(
    (patient) =>
      patient.nom.toLowerCase().includes(waitingListSearch.toLowerCase()) ||
      patient.prenom.toLowerCase().includes(waitingListSearch.toLowerCase()) ||
      patient.tel.includes(waitingListSearch)
  );

  const patientList = patients.filter((patient) => patient.statut === "PEC");
  const filteredPatientsList = patientList.filter(
    (patient) =>
      patient.nom.toLowerCase().includes(patientsListSearch.toLowerCase()) ||
      patient.prenom.toLowerCase().includes(patientsListSearch.toLowerCase()) ||
      patient.tel.includes(patientsListSearch)
  );

  // Calculez l'index de début et de fin des éléments actuels pour la liste d'attente
  const indexOfLastItemWaitingList = currentPageWaitingList * itemsPerPage;
  const indexOfFirstItemWaitingList = indexOfLastItemWaitingList - itemsPerPage;
  const currentItemsWaitingList = filteredWaitingList.slice(
    indexOfFirstItemWaitingList,
    indexOfLastItemWaitingList
  );

  const totalPageswaiting = Math.ceil(
    filteredWaitingList.length / itemsPerPage
  );

  // Calculez l'index de début et de fin des éléments actuels pour la liste des patients
  const indexOfLastItemPatientList = currentPagePatientList * itemsPerPage;
  const indexOfFirstItemPatientList = indexOfLastItemPatientList - itemsPerPage;
  const currentItemsPatientList = filteredPatientsList.slice(
    indexOfFirstItemPatientList,
    indexOfLastItemPatientList
  );

  const totalPagesPatients = Math.ceil(
    filteredPatientsList.length / itemsPerPage
  );

  // Changement de page
  const paginate = (pageNumber, waitingListOrPatientList) => {
    if (waitingListOrPatientList === "waitingList") {
      setCurrentPageWaitingList(pageNumber);
    }
    if (waitingListOrPatientList === "patientList") {
      setCurrentPagePatientList(pageNumber);
    }
  };

  // Gérer les changements de terme de recherche ()
  const handleSearch = (string, waitingListOrPatientList) => {
    if (waitingListOrPatientList === "waitingList") {
      setCurrentPageWaitingList(1);
      setWaitingListSearch(string);
    }
    if (waitingListOrPatientList == "patientList") {
      setCurrentPagePatientList(1);
      setPatientsListSearch(string);
    }
  };

  const addPatientHandler = (patient) => {
    setPatients((prevState) => [...prevState, patient]);
    setNewPatientForm(false);
  };

  const closeModal = () => {
    setModal({ patient: {}, show: false });
  };

  const closeModalRdv = () => {
    setModalRdv({ patient: {}, show: false });
  };

  const closeModalPatientRdv = () => {
    setModalPatientRdv({ patient: {}, show: false });
  };

  const supprimerPatient = async (patient) => {
    try {
      const response = await fetch(
        "https://liste-attente-back.vercel.app/admin/deletePatient/" +
          patient._id,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenAdmin,
          },
        }
      );
      if (response.ok) {
        setPatients(patients.filter((e) => e._id != patient._id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validerPatient = async (patient) => {
    try {
      const response = await fetch(
        "https://liste-attente-back.vercel.app/admin/validatePatient/" +
          patient._id,
        {
          body: JSON.stringify({ statut: "PEC" }),
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenAdmin,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();

        const newState = patients.map((patient) => {
          if (patient._id === result.patient._id) {
            console.log(result.patient._id);
            return { ...result.patient };
          }
          return patient;
        });
        setPatients(newState);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updatePatient = (updatedPatient) => {
    const newState = patients.map((patient) => {
      if (patient._id === updatedPatient._id) {
        return { ...updatedPatient };
      }
      return patient;
    });
    setPatients(newState);
  };

  const returnAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const closeNewPatientModal = () => {
    setNewPatientForm(false);
  };

  return (
    <>
      <div className="p-8 my-4">
        <h1 className="text-center text-3xl font-bold mt-10">
          Espace administrateur
        </h1>
        <button
          onClick={(e) => {
            setNewPatientForm(!newPatientForm);
          }}
          className="bg-blue-700 text-white w-4/12  lg:w-2/12 rounded-md p-2 border mt-6 "
        >
          Ajouter un patient
        </button>

        {newPatientForm && (
          <Modal isOpen={newPatientForm} closeModal={closeNewPatientModal}>
            <NewPatientForm
              admin={true}
              addPatientHandler={addPatientHandler}
            />
          </Modal>
        )}

        <p className=" text-center text-2xl font-bold m-2">Liste d'attente</p>

        <form>
          <label className="block font-bold m-2">Rechercher un patient</label>
          <input
            className=" rounded-lg "
            onChange={(e) => {
              handleSearch(e.target.value, "waitingList");
            }}
            type="text"
          ></input>
        </form>

        <div class="flex flex-col">
          <div class="overflow-x-auto ">
            <div class="inline-block min-w-full">
              <div class="overflow-hidden lg:p-10">
                <table class="min-w-full text-left text-sm font-light table-auto">
                  <thead class="border-b  p-4 text-white bg-blue-700 rounded-md">
                    <tr className="p-4  ">
                      <th className="text-md font-bold p-2">#</th>
                      <th className="text-md font-bold p-2">Nom</th>
                      <th className="text-md font-bold p-2">Prenom</th>
                      <th className="text-md font-bold p-2">Ville</th>
                      <th className="text-md font-bold p-2">Age</th>
                      <th className="text-md font-bold p-2">Motif PeC</th>
                      <th className="text-md font-bold p-2">Statut</th>
                      <th className="text-md font-bold p-2">
                        Prendre en charge
                      </th>
                      <th className="text-md font-bold p-2">Modifier</th>
                      <th className="text-md font-bold p-2">Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItemsWaitingList.map((patient, count) => (
                      <tr className="text-md p-2 border-b transition duration-300 ease-in-out hover:bg-neutral-100">
                        <td className="text-md font-bold p-3">{count + 1}</td>
                        <td className="text-md font-bold p-3">{patient.nom}</td>
                        <td className="text-md font-bold p-3">
                          {patient.prenom}
                        </td>
                        <td className="text-md font-bold p-3">
                          {patient.ville}
                        </td>
                        <td className="text-md font-bold p-3">
                          {returnAge(patient.dateNaissance)}
                        </td>
                        <td className="text-md font-bold p-3">
                          {patient.motifPriseEnCharge}
                        </td>
                        <td className="text-md font-bold p-3">
                          {patient.statut}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={(e) => {
                              validerPatient(patient);
                            }}
                          >
                            <BiCheckCircle size={25} />
                          </button>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={(e) => {
                              setModal({ patient: patient, show: true });
                            }}
                          >
                            <BiEditAlt size={25} />
                          </button>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={(e) => {
                              setModalDeletePatient({
                                show: true,
                                patient: patient,
                              });
                            }}
                          >
                            <MdPersonRemoveAlt1 size={25} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex mx-2">
                  <p>
                    Page {currentPageWaitingList} / {totalPageswaiting}
                  </p>
                  {currentPageWaitingList > 1 && (
                    <button
                      className="text-white bg-blue-800 p-2 rounded-md mx-2"
                      onClick={(e) => {
                        setCurrentPageWaitingList(currentPageWaitingList - 1);
                      }}
                    >
                      Précédent
                    </button>
                  )}
                  {totalPageswaiting != 1 &&
                    currentPageWaitingList < totalPageswaiting && (
                      <button
                        className="text-white bg-blue-800 p-2 rounded-md mx-2"
                        onClick={(e) => {
                          setCurrentPageWaitingList(currentPageWaitingList + 1);
                        }}
                      >
                        Suivant
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-2xl font-bold text-center m-2">Mes Patients</p>

        <form>
          <label className="block font-bold m-2">Rechercher un patient</label>
          <input
            className=" rounded-lg "
            onChange={(e) => {
              handleSearch(e.target.value, "patientList");
            }}
            type="text"
          ></input>
        </form>

        <table class=" bg-white rounded-lg shadow border m-5">
          <thead>
            <tr>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                #
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                Nom
              </th>
              <th
                class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold
             text-gray-900"
              >
                Prenom
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                Ville
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                Age
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                Motif PeC
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                Statut
              </th>

              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                Prendre en charge
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                Modifier
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                Supprimer
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItemsPatientList.map(
              (patient, count) =>
                patient.statut == "PEC" && (
                  <tr class="text-gray-700">
                    <td class="border-b-2 p-4 dark:border-dark-5">
                      {count + 1}
                    </td>
                    <td class="border-b-2 p-4 dark:border-dark-5">
                      {patient.nom}
                    </td>
                    <td class="border-b-2 p-4 dark:border-dark-5">
                      {patient.prenom}
                    </td>
                    <td class="border-b-2 p-4 dark:border-dark-5">
                      {patient.ville}
                    </td>
                    <td class="border-b-2 p-4 dark:border-dark-5">
                      {returnAge(patient.dateNaissance)}
                    </td>
                    <td class="border-b-2 p-4 dark:border-dark-5">
                      {patient.motifPriseEnCharge}
                    </td>
                    <td class="border-b-2 p-4 dark:border-dark-5">
                      {patient.statut}
                    </td>
                    <td className="border-b-2 dark:border-dark-5">
                      <button
                        className=" bg-green-500 p-2 px-4 rounded-full font-bold"
                        onClick={(e) => {
                          setModalPatientRdv({ patient: patient, show: true });
                        }}
                      >
                        Voir les RDV
                      </button>
                    </td>
                    <td className="border-b-2 dark:border-dark-5">
                      <button
                        className=" bg-green-500 p-2 px-4 rounded-full font-bold"
                        onClick={(e) => {
                          setModalRdv({ patient: patient, show: true });
                        }}
                      >
                        Nouveau RDV
                      </button>
                    </td>
                    <td className="border-b-2 dark:border-dark-5">
                      <button
                        onClick={(e) => {
                          setModal({ patient: patient, show: true });
                        }}
                        className=" bg-yellow-300 p-2 px-4 rounded-full font-bold"
                      >
                        Modifier
                      </button>
                    </td>
                    <td className="border-b-2 dark:border-dark-5">
                      <button
                        className=" bg-red-500 p-2 px-4 rounded-full font-bold"
                        onClick={(e) => {
                          setModalDeletePatient({
                            show: true,
                            patient: patient,
                          });
                        }}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>

        <div className="flex mx-2">
          <p>
            Page {currentPagePatientList} / {totalPagesPatients}
          </p>
          {currentPagePatientList > 1 && (
            <button
              className="text-white bg-blue-800 p-2 rounded-md mx-2"
              onClick={(e) => {
                setCurrentPagePatientList(currentPagePatientList - 1);
              }}
            >
              Précédent
            </button>
          )}
          {totalPagesPatients != 1 &&
            currentPagePatientList < totalPagesPatients && (
              <button
                className="text-white bg-blue-800 p-2 rounded-md mx-2"
                onClick={(e) => {
                  setCurrentPagePatientList(currentPagePatientList + 1);
                }}
              >
                Suivant
              </button>
            )}
        </div>
      </div>

      {modal.show && (
        <ModalEditPatient
          modal={modal}
          closeModal={closeModal}
          updatePatient={updatePatient}
        />
      )}
      {modalRdv.show && (
        <ModalNewRdv
          modalRdv={modalRdv}
          closeModalRdv={closeModalRdv}
          updatePatient={updatePatient}
        />
      )}

      {modalPatientRdv.show && (
        <ModalRendezVous
          modalRdv={modalPatientRdv}
          closeModalPatientRdv={closeModalPatientRdv}
        />
      )}

      {modalDeletePatient.show && (
        <Modal
          isOpen={modalDeletePatient.show}
          closeModal={(e) => {
            setModalDeletePatient({ show: false, patient: {} });
          }}
        >
          <div className=" p-4">
            <p className="text-center text-2xl font-bold mb-4 ">
              Etes-vous sûr de vouloir supprimer ce patient ?
            </p>
            <button
              className="p-2 bg-red-500 text-white rounded-md mx-2"
              onClick={(e) => {
                supprimerPatient(modalDeletePatient.patient);
                setModalDeletePatient({ show: false, patient: {} });
              }}
            >
              Valider
            </button>
            <button
              className="p-2 bg-blue-800 text-white rounded-md mx-2"
              onClick={(e) => {
                setModalDeletePatient({ show: false, patient: {} });
              }}
            >
              Annuler
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AdminPage;
