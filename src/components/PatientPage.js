import { useEffect, useState } from "react";
import ModalEditPatient from "./ModalEditPatient";

const PatientPage = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [patient, setPatient] = useState({});
  const [modal, setModal] = useState({ patient: patient, show: false });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/getPatient/" + userId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setPatient(result.patient);
      }
    };
    fetchData();
  }, []);

  const updatePatient = (updatedPatient) => {
    setPatient(updatedPatient);
  };

  const closeModal = () => {
    setModal({ patient: patient, show: false });
  };

  const deletePatient = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/deletePatient/" + userId,
        {
          method: "delete",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Patient supprimé");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Bienvenu sur votre espace personne</h1>
      Mes informations :
      <ul>
        <li>Prenom : {patient.prenom} </li>
        <li>nom : {patient.nom}</li>
        <li>Date de naissance : {patient.dateNaissance}</li>
        <li>
          Adresse : {patient.adresse}, {patient.codePostal} {patient.ville}
        </li>
        <li>Mon n° de téléphone : {patient.tel}</li>
        <li>Mon adresse mail : {patient.email}</li>
        <li>Motif de prise en charge : {patient.motifPriseEnCharge}</li>
      </ul>
      <button
        onClick={(e) => {
          setModal({ patient: patient, show: true });
        }}
        className="rounded-xl bg-yellow-500 p-2 font-bold mx-3"
      >
        Modifier mes informations
      </button>
      <button
        className="rounded-xl bg-red-500 p-2 text-white font-bold"
        onClick={deletePatient}
      >
        Je souhaite me désincrire
      </button>
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

export default PatientPage;
