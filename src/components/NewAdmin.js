import { useState } from "react";

const NewAdmin = () => {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const newAdminFetch = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/newAdmin", {
          method: "POST",
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            email: email,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
        }
        const result = await response.json();

        if (result.message === "admin enregistré") {
        }
      } catch (err) {
        console.log("erreur enregistrement");
      }
    };
    newAdminFetch();
  };
  return (
    <>
      <div className="flex flex-wrap items-center justify-center  md:h-screen lg:py-0 ">
        <div className="w-5/12 rounded-xl border shadow-md xl:p-0">
          <div className="p-6 space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-center">
              Nouvel admin
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
                <div>
                  <label
                    for="email"
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
                    placeholder="Prenom"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => {
                      setNom(e.target.value);
                    }}
                    className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
                    placeholder="Exemple@exemple.fr"
                    required=""
                  />
                </div>
              </div>

              <div>
                <label
                  for="email"
                  className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
                  placeholder="Prenom"
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-green-700 hover:bg-white hover:border-2 hover:border-green-600  focus:ring focus:ring-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:text-green-600"
              >
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAdmin;
