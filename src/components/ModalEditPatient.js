import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const ModalEditPatient = (props) => {
  const token = localStorage.getItem("token");
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const [email, setEmail] = useState(props.modal.patient.email);
  const [motifPriseEnCharge, setMotifPriseEnCharge] = useState(
    props.modal.patient.motifPriseEnCharge
  );
  const [dateNaissance, setDateNaissance] = useState(
    props.modal.patient.dateNaissance
  );
  const [adresse, setAdresse] = useState(props.modal.patient.adresse);
  const [codePostal, setCodePostal] = useState(props.modal.patient.codePostal);
  const [ville, setVille] = useState(props.modal.patient.ville);
  const [nom, setNom] = useState(props.modal.patient.nom);
  const [prenom, setPrenom] = useState(props.modal.patient.prenom);
  const [tel, setTel] = useState(props.modal.patient.tel);
  let url;
  let tokenAdminOrPatient;

  if (token) {
    url = "http://localhost:8080/editPatient/";
    tokenAdminOrPatient = token;
  }
  if (tokenAdmin) {
    url = "http://localhost:8080/admin/editPatient/";
    tokenAdminOrPatient = tokenAdmin;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log("form submitted");

    const fetchEdit = async () => {
      try {
        const response = await fetch(url + props.modal.patient._id, {
          method: "put",
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            email: email,
            adresse: adresse,
            codePostal: codePostal,
            ville: ville,
            tel: tel,
            motifPriseEnCharge: motifPriseEnCharge,
          }),
          headers: {
            Authorization: "Bearer " + tokenAdminOrPatient,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          props.updatePatient(result.patient);
          props.closeModal();
        }
      } catch (err) {
        console.log(err);
      }
    };
    console.log("ok");
    fetchEdit();
  };
  console.log(token, tokenAdmin);
  return (
    <>
      <>
        <Transition appear show={props.modal.show} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {props.modal.patient.nom}
                      {props.modal.patient.prenom}
                    </Dialog.Title>
                    <div className="mt-2">
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
                            required
                          />
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
                              required
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
                              type="text"
                              value={codePostal}
                              onChange={(e) => {
                                setCodePostal(e.target.value);
                              }}
                              className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
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
                              required
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
                          Valider
                        </button>
                      </form>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={props.closeModal}
                      >
                        Annuler
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </>
  );
};

export default ModalEditPatient;
