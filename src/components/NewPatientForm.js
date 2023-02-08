import { useState } from "react";

const NewPatientForm = () => {
  const [email, setEmail] = useState();
  const [motifPriseEnCharge, setMotifPriseEnCharge] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [adresse, setAdresse] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [tel, setTel] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const newPatientFetch = async () => {
      try {
        const response = await fetch("http://localhost:8080/newPatient", {
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
        });

        if (response.ok) {
        }
        const result = await response.json();

        if (result.message === "patient enregistré") {
        }

        console.log("patient enregistré");
      } catch (err) {
        console.log("erreur enregistrement");
      }
    };
    newPatientFetch();
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center  md:h-screen lg:py-0 ">
        <div className="w-5/12 rounded-xl border shadow-md xl:p-0">
          <div className="p-6 space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-center">
              Inscription liste d'attente
            </h1>

            <form className="space-y-6" onSubmit={formSubmitHandler}>
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
                  className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
                  placeholder="Exemple@exemple.fr"
                  required=""
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
                    type="text"
                    value={nom}
                    onChange={(e) => {
                      setNom(e.target.value);
                    }}
                    className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
                    placeholder="Dupond"
                    required=""
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
                    value={prenom}
                    onChange={(e) => {
                      setPrenom(e.target.value);
                    }}
                    className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
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
                    value={tel}
                    onChange={(e) => {
                      setTel(e.target.value);
                    }}
                    className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
                    placeholder="06.00.00.00.00"
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
                    className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
                    placeholder="Jean"
                    required=""
                  />
                </div>
              </div>
              <p className="mb-4 text-sm font-bold text-gray-900 dark:text-white">
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
                  type="text"
                  value={adresse}
                  onChange={(e) => {
                    setAdresse(e.target.value);
                  }}
                  className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
                  placeholder="1 rue des moulins"
                  required=""
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
                    type="text"
                    value={codePostal}
                    onChange={(e) => {
                      setCodePostal(e.target.value);
                    }}
                    className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
                    placeholder="57000"
                    required=""
                  />
                </div>
                <div className="">
                  <label
                    for="Rue"
                    className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Ville
                  </label>
                  <input
                    type="text"
                    value={ville}
                    onChange={(e) => {
                      setVille(e.target.value);
                    }}
                    className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
                    placeholder="1 rue des moulins"
                    required=""
                  />
                </div>
              </div>
              <div className="">
                <label
                  for="Rue"
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
                  className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
                  placeholder="Orthophonie"
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-green-700 hover:bg-white hover:border-2 hover:border-green-600  focus:ring focus:ring-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:text-green-600"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPatientForm;
