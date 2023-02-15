import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const ModalNewRdv = (props) => {
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const [date, setDate] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log("form submitted");

    const fetchEdit = async () => {
      try {
        const response = await fetch(
          "https://liste-attente-back.vercel.app/admin/addRendezVous/" +
            props.modalRdv.patient._id,
          {
            method: "post",
            body: JSON.stringify({
              date: date,
            }),
            headers: {
              Authorization: "Bearer " + tokenAdmin,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          props.updatePatient(result.patient);
          props.closeModalRdv();
        }
      } catch (err) {
        console.log(err);
      }
    };
    console.log("ok");
    fetchEdit();
  };

  return (
    <>
      <>
        <Transition appear show={props.modalRdv.show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={props.closeModalRdv}
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
                      <form className="space-y-6" onSubmit={formSubmitHandler}>
                        <div>
                          <label
                            for="email"
                            className="mb-4 text-sm font-bold text-gray-900 dark:text-white"
                          >
                            Date du RDV
                          </label>
                          <input
                            type="datetime-local"
                            value={date}
                            onChange={(e) => {
                              setDate(e.target.value);
                            }}
                            className="mt-2  bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:border-green-600  w-full p-2.5 "
                            required
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
                        onClick={props.closeModalRdv}
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

export default ModalNewRdv;
