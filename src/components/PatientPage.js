import { useEffect, useState } from "react";
import ModalEditPatient from "./ModalEditPatient";
import { useNavigate } from "react-router-dom";
import bgImage from "../images/bg.png";

const PatientPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [patient, setPatient] = useState({});
  const [modal, setModal] = useState({ patient: patient, show: false });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://liste-attente-back.vercel.app/getPatient/" + userId,
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

  const patientValidate = async () => {
    try {
      const response = await fetch(
        "https://liste-attente-back.vercel.app/validerMail/" + patient._id,
        {
          method: "post",
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
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setModal({ patient: patient, show: false });
  };

  const deletePatient = async () => {
    try {
      const response = await fetch(
        "https://liste-attente-back.vercel.app/deletePatient/" + userId,
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
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("expiryDate");
        navigate(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
    navigate(0);
  };

  return (
    <>
      <div
        className="md:flex md:flex-wrap  md:items-center md:justify-center  md:h-screen md:py-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className=" bg-white shadow-lg p-10 lg:w-5/12 border lg:rounded-lg lg:p-14">
          {patient.statut != "PEC" && patient.statut != "valide" && (
            <div className="border-2 border-green-700 p-4 rounded-lg">
              <p className="text-sm mb-2 text-center">
                Pour rester inscrit, veuillez revalider votre inscription
              </p>

              <button
                onClick={patientValidate}
                className="p-2 bg-green-700 text-white font-bold rounded-xl w-full "
              >
                Valider mon inscription
              </button>
            </div>
          )}

          {patient.statut == "PEC" && !patient.formulaire && (
            <div className="border-2 border-green-700 p-4 rounded-lg">
              <p className="text-center font-bold mb-2 ">
                Merci de remplir le formulaire pour valider votre prise en
                charge
              </p>
              <button
                className="w-full bg-green-700 p-4 rounded-full text-white font-bold"
                onClick={(e) => {
                  navigate("/questionnaire");
                }}
              >
                Remplir le formulaire
              </button>
            </div>
          )}
          <h1 className="md:text-2xl text-lg font-bold text-center m-5 md:mb-14">
            Bienvenue sur votre espace personnel
          </h1>
          <p className="md:text-xl text-md font-bold text-center mb-3">
            Mes informations :
          </p>
          <ul className="text-sm md:text-md">
            <li>
              <b>Prenom :</b> {patient.prenom}{" "}
            </li>
            <li>
              <b>nom :</b> {patient.nom}
            </li>
            <li>
              <b>Date de naissance :</b> {patient.dateNaissance}
            </li>
            <li>
              <b> Adresse :</b> {patient.adresse}, {patient.codePostal}{" "}
              {patient.ville}
            </li>
            <li>
              <b>Mon n° de téléphone :</b> {patient.tel}
            </li>
            <li>
              <b>Mon adresse mail :</b> {patient.email}
            </li>
            <li>
              <b>Motif de prise en charge :</b> {patient.motifPriseEnCharge}
            </li>
          </ul>
          <button
            onClick={(e) => {
              setModal({ patient: patient, show: true });
            }}
            className="rounded-xl w-full text-sm mb-4 md:box-border md:w-full 2xl:w-1/4   bg-yellow-500 p-2 font-bold mt-4"
          >
            Modifier mes informations
          </button>
          {patient.statut != "PEC" && (
            <button
              className="rounded-xl w-full text-sm mb-4 bg-red-500 p-2  text-white font-bold md:w-full 2xl:w-1/4 2xl:mx-2 "
              onClick={deletePatient}
            >
              Je souhaite me désincrire
            </button>
          )}

          <button
            onClick={logout}
            className="rounded-xl p-2 w-full text-sm md:w-full 2xl:w-1/4   bg-red-500  text-white font-bold "
          >
            Me deconnecter de l'espace
          </button>
          {modal.show && (
            <ModalEditPatient
              modal={modal}
              closeModal={closeModal}
              updatePatient={updatePatient}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PatientPage;
