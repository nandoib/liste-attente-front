import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

const ModalRendezVous = (props) => {
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const [rendezVous, setRendezVous] = useState([]);
  const dateNow = new Date();

  const returnDateLocal = (date) => {
    const dateFr = new Date(date);
    return (
      dateFr.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " à " +
      dateFr.toLocaleTimeString("fr-FR")
    );
  };

  useEffect(() => {
    const fetchRendezVous = async () => {
      const response = await fetch(
        "http://localhost:8080/admin/allRendezVous/" +
          props.modalRdv.patient._id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenAdmin,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        result.rendezVous.map((rdv) => {
          const dateRdv = new Date(rdv);
          if (dateRdv > dateNow) {
            setRendezVous((prevState) => [...prevState, rdv]);
          }
        });
      }
    };
    fetchRendezVous();
  }, []);

  console.log(rendezVous);

  return (
    <>
      <>
        <Transition appear show={props.modalRdv.show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={props.closeModalPatientRdv}
          >
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
                      {props.modalRdv.patient.nom}
                      {props.modalRdv.patient.prenom}
                    </Dialog.Title>
                    <div className="mt-2">
                      <table class="table p-4 bg-white rounded-lg shadow border m-5">
                        <thead>
                          <tr>
                            <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                              date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {rendezVous.map((rdv) => (
                            <tr>
                              <td class="border-b-2 p-4 dark:border-dark-5">
                                {returnDateLocal(rdv)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={props.closeModalPatientRdv}
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

export default ModalRendezVous;
