import React, { Fragment } from "react";
// import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import OfferPop from "./OfferPop";

const Model = ({ show, setShow, offer }) => {
  return (
    <>
      <Transition.Root show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              onClick={() => console.log(false)}
              className="fixed inset-0 transition-opacity bg-black bg-opacity-40"
            />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto top-12">
            <div className="flex items-end justify-center p-4 mins-h-full sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="w-full transition-all transform rounded-lg shadow-xl md:my-8 md:max-w-xl">
                  <div>
                    <OfferPop show={show} setShow={setShow} offer={offer} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Model;
