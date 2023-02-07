import { useEffect, useState } from "react";
import ModalEditPatient from "./ModalEditPatient";

const AdminPage = () => {
  const token = localStorage.getItem("token");
  const [patients, setPatients] = useState([]);
  const [modal, setModal] = useState({ patient: {}, show: false });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/admin/allPatients",
          {
            headers: {
              Authorization: "Bearer" + token,
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

  const supprimerPatient = async (patient) => {
    try {
      const response = await fetch(
        "http://localhost:8080/deletePatient/" + patient._id,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
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
          {patients.map((patient, count) => (
            <tr class="text-gray-700">
              <td class="border-b-2 p-4 dark:border-dark-5">{count + 1}</td>
              <td class="border-b-2 p-4 dark:border-dark-5">{patient.nom}</td>
              <td class="border-b-2 p-4 dark:border-dark-5">
                {patient.prenom}
              </td>
              <td class="border-b-2 p-4 dark:border-dark-5">{patient.ville}</td>
              <td class="border-b-2 p-4 dark:border-dark-5">
                {returnAge(patient.dateNaissance)}
              </td>
              <td class="border-b-2 p-4 dark:border-dark-5">
                {patient.motifPriseEnCharge}
              </td>
              <td className="border-b-2 dark:border-dark-5">
                <button className=" bg-green-500 p-2 px-4 rounded-full font-bold">
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
      {modal.show && (
        <ModalEditPatient
          modal={modal}
          closeModal={closeModal}
          updatePatient={updatePatient}
        />
      )}
    </>
  );
};

export default AdminPage;
