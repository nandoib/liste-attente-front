import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

const Modal = (props) => {
  //Props [show , close, titre]

  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
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
                <Dialog.Panel className="w-11/12 md:w-9/12  transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium leading-6 bg-blue-500 p-2 text-white">
                    <div className=" flex justify-end items-center">
                      <button
                        className="text-white hover:text-gray-300 focus:outline-none"
                        onClick={props.closeModal}
                      >
                        <MdClose className="h-6 w-6" />
                      </button>
                    </div>
                  </Dialog.Title>
                  {props.children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
