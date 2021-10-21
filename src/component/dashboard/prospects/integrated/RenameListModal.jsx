import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import xsvg from "../../../../assets/images/dashboard/prospects/x.svg";

const RenameListModal = ({ open, closeModal, updateList, currentList }) => {

  const [list, setList] = useState(currentList);

  useEffect(() => {
    setList(currentList);
  }, [updateList, currentList]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setList({ ...list, [name]: value });
  };

  const cancelButtonRef = useRef();

  const handleUpdate = (event) => {
    event.preventDefault();
    if (!list.name) {
      alert("ALl the fields are mandatory!");
      return;
    }
    updateList(list._id.$oid, list);
  };

  return (
    <>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto"
          initialFocus={cancelButtonRef}
          static
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                <div className="flex justify-between items-center">
                  <Dialog.Title className="heading-5 text-black">
                    Rename List
                  </Dialog.Title>
                  <div className="">
                    <img
                      alt=""
                      src={xsvg}
                      onClick={closeModal}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <form
                    onSubmit={handleUpdate}
                    className="w-full flex justify-center bg-white"
                  >
                    <div className="w-full text-gray-800 flex flex-col justify-center">
                      <div className="w-full my-6">
                        <div className="flex flex-col">
                          <label
                            htmlFor="currentPassword"
                            className="caption text-secondary mb-2"
                          >
                            List Name
                          </label>
                          <input
                            required
                            id="name"
                            name="name"
                            value={list.name}
                            className="rounded-sm border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                            onChange={handleInputChange}
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="">
                        <button type="submit" className="primary-button">
                          Rename List
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RenameListModal;
