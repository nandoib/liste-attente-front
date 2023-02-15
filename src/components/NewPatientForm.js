import { useState } from "react";
import bgImage from "../images/bg.png";

const NewPatientForm = (props) => {
  const [email, setEmail] = useState();
  const [motifPriseEnCharge, setMotifPriseEnCharge] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [adresse, setAdresse] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [tel, setTel] = useState("");
  const [error, setError] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const newPatientFetch = async () => {
      try {
        const response = await fetch(
          "https://liste-attente-back.vercel.app/newPatient",
          {
            method: "POST",
            body: JSON.stringify({
              nom: nom,
              prenom: prenom,
              adresse: adresse,
              codePostal: codePostal,
              ville: ville,
              tel: tel,
              dateNaissance: dateNaissance,
              motifPriseEnCharge: motifPriseEnCharge,
              email: email,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setError(
            "Demande enregistrée, un mail a été envoyé a l'adresse mail communiquée"
          );
          if (props.admin) {
            props.addPatientHandler(result.patient);
          }
        }
        if (!response.ok) {
          const err = await response.json();
          throw Error(err.message);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    newPatientFetch();
  };

  return (
    <>
      <div className="p-6 md:space-y-6 sm:p-8">
        <h1 className="text-sm font-bold text-gray-900 md:text-2xl text-center">
          Inscription liste d'attente
        </h1>

        <form className="space-y-2 md:space-y-6 " onSubmit={formSubmitHandler}>
          <div>
            <label
              for="email"
              className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
            >
              Votre adresse mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm "
              placeholder="Exemple@exemple.fr"
              required
            />
          </div>
          <div className="grid grid-cols-2 space-x-4">
            <div className="">
              <label
                for="nom"
                className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
              >
                Nom de famille
              </label>
              <input
                minlength="3"
                type="text"
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value);
                }}
                className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5  text-sm"
                placeholder="Dupond"
                required
              />
            </div>
            <div className="">
              <label
                for="prenom"
                className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
              >
                Prenom
              </label>
              <input
                type="text"
                minlength="3"
                value={prenom}
                onChange={(e) => {
                  setPrenom(e.target.value);
                }}
                className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm  "
                placeholder="Jean"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 space-x-4">
            <div className="">
              <label
                for="tel"
                className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
              >
                N° de téléphone
              </label>
              <input
                type="tel"
                minlength="9"
                value={tel}
                onChange={(e) => {
                  setTel(e.target.value);
                }}
                className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm"
                placeholder="0610203040"
                required
              />
            </div>

            <div className="">
              <label
                for="dateNaissance"
                className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
              >
                Date de naissance
              </label>
              <input
                type="date"
                value={dateNaissance}
                onChange={(e) => {
                  setDateNaissance(e.target.value);
                }}
                className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm"
                placeholder="Jean"
                required=""
              />
            </div>
          </div>
          <p className=" text-sm font-bold text-gray-900 dark:text-white">
            Adresse :
          </p>

          <div className="">
            <label
              for="Rue"
              className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
            >
              N° et rue
            </label>
            <input
              minlength="6"
              type="text"
              value={adresse}
              onChange={(e) => {
                setAdresse(e.target.value);
              }}
              className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm "
              placeholder="1 rue des moulins"
              required
            />
          </div>

          <div className="grid grid-cols-2 space-x-4">
            <div className="">
              <label
                for="codePostal"
                className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
              >
                Code Postal
              </label>
              <input
                minlength="5"
                maxLength="5"
                type="text"
                value={codePostal}
                onChange={(e) => {
                  setCodePostal(e.target.value);
                }}
                className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm"
                placeholder="57000"
                required
              />
            </div>
            <div className="">
              <label
                for="ville"
                className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
              >
                Ville
              </label>
              <input
                type="text"
                minlength="3"
                value={ville}
                onChange={(e) => {
                  setVille(e.target.value);
                }}
                className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm "
                placeholder="1 rue des moulins"
                required
              />
            </div>
          </div>
          <div className="">
            <label
              for="Motif"
              className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
            >
              Motif de la prise en charge
            </label>
            <input
              type="text"
              value={motifPriseEnCharge}
              onChange={(e) => {
                setMotifPriseEnCharge(e.target.value);
              }}
              className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 text-sm"
              placeholder="Orthophonie"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-white hover:border-2 hover:border-blue-700  focus:ring focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:text-blue-700"
          >
            Valider
          </button>
          <p className="font-bold text-center text-sm">
            Je suis déja inscrit à la liste d'attente :
          </p>
          <div className="grid justify-items-center">
            <button
              onClick={(e) => {
                props.changeLogShow();
              }}
              className="bg-blue-600 rounded-xl p-2 text-sm text-white font-bold"
            >
              Connexion
            </button>
          </div>
          {error && (
            <div
              class="bg-red-100 rounded-lg py-5 px-6 mb-4 m-2 text-center text-base text-red-700 "
              role="alert"
            >
              {error}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default NewPatientForm;
