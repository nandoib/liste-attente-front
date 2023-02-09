import { useEffect, useState } from "react";
import ModalEditPatient from "./ModalEditPatient";
import ModalNewRdv from "./ModalNewRdv";
import NewPatientForm from "./NewPatientForm";

const AdminPage = () => {
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const [patients, setPatients] = useState([]);
  const [modal, setModal] = useState({ patient: {}, show: false });
  const [modalRdv, setModalRdv] = useState({ patient: {}, show: false });
  const [newPatientForm, setNewPatientForm] = useState(false);

  const [search, setSearch] = useState({ query: "", found: [] });

  const handleSearch = (e) => {
    let newPatient = patients.filter(
      (patient) =>
        patient.nom.toLowerCase().includes(e.target.value.toLowerCase()) ||
        patient.prenom.toLowerCase().includes(e.target.value.toLowerCase()) ||
        patient.tel.includes(e.target.value)
    );
    setSearch({ query: e.target.value, found: newPatient });
  };

  useEffect(() => {
    console.log(tokenAdmin);
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/admin/allPatients",
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
    fetchPatients();
  }, []);

  const closeModal = () => {
    setModal({ patient: {}, show: false });
  };

  const closeModalRdv = () => {
    setModalRdv({ patient: {}, show: false });
  };

  const supprimerPatient = async (patient) => {
    try {
      const response = await fetch(
        "http://localhost:8080/admin/deletePatient/" + patient._id,
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
        "http://localhost:8080/admin/validatePatient/" + patient._id,
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

  return (
    <>
      <button
        onClick={(e) => {
          setNewPatientForm(!newPatientForm);
        }}
        className="bg-blue-500 rounded-xl p-2 border m-2"
      >
        Ajouter un patient
      </button>
      {newPatientForm && <NewPatientForm />}
      <form>
        <label className="block font-bold m-2">Recherche patient</label>
        <input
          className=" rounded-lg "
          onChange={handleSearch}
          type="text"
        ></input>
      </form>

      <table class="table p-4 bg-white rounded-lg shadow border m-5">
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
          {search.query == "" &&
            patients.map(
              (patient, count) =>
                patient.statut != "PEC" && (
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
                          validerPatient(patient);
                        }}
                      >
                        Prendre en charge
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
                          supprimerPatient(patient);
                        }}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                )
            )}

          {search.query != "" &&
            search.found.map((patient, count) => (
              <tr class="text-gray-700">
                <td class="border-b-2 p-4 dark:border-dark-5">{count + 1}</td>
                <td class="border-b-2 p-4 dark:border-dark-5">{patient.nom}</td>
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
                      validerPatient(patient);
                    }}
                  >
                    Prendre en charge
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
                      supprimerPatient(patient);
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <table class="table p-4 bg-white rounded-lg shadow border m-5">
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
          {patients.map(
            (patient, count) =>
              patient.statut == "PEC" && (
                <tr class="text-gray-700">
                  <td class="border-b-2 p-4 dark:border-dark-5">{count + 1}</td>
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
                        supprimerPatient(patient);
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
    </>
  );
};

export default AdminPage;
