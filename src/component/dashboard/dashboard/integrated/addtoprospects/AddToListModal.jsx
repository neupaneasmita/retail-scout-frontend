import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import xsvg from "../../../../../assets/images/dashboard/prospects/x.svg";

import CreateAndAddToListModal from "./CreateAndAddToListModal";
import axiosInstance from "../../../../api/axiosInstance";
import Toaster from "../../../../common/Toaster";

const AddToListModal = ({ isOpen, closeModal, selected }) => {
  //Toaster
  const [showToast, setShowToast] = useState(false);
  const [isSuccessMessageType, setIsSuccessMessageType] = useState(true);
  const [message, setMessage] = useState("");

  const cancelButtonRef = useRef();
  const [isOpenCreateAndAddToListModal, setIsOpenCreateAndAddToListModal] =
    useState(false);

  const [lists, setLists] = useState([]);

  const openCreateAndAddToListModal = () => {
    setIsOpenCreateAndAddToListModal(true);
  };

  //Get Prospects Lists
  useEffect(() => {
    axiosInstance
      .get("/prospectlist")
      .then((response) => {
        // console.log(response.data);
        setLists(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.data.msg !== "Token has expired") {
          //Showing Toaster Message
          setMessage(error.response.data.msg);
          setIsSuccessMessageType(false);
          setShowToast((showToast) => !showToast);
        } else if (error.response.data.msg === "Token has expired") {
          localStorage.clear();
          window.location = "/";
        }
      });
  }, [isOpen]);

  //Create and add new list
  const createAndAddList = (list) => {
    axiosInstance
      .post("/prospectlist", list)
      .then((response) => {
        setIsOpenCreateAndAddToListModal(false);
        //Showing Toaster Message
        setMessage(response.data.message);
        setShowToast((showToast) => !showToast);
        closeModal();
      })
      .catch((error) => {
        if (error.response && error.response.data.msg !== "Token has expired") {
          //Showing Toaster Message
          setMessage(error.response.data.msg);
          setIsSuccessMessageType(false);
          setShowToast((showToast) => !showToast);
        } else if (error.response.data.msg === "Token has expired") {
          localStorage.clear();
          window.location = "/";
        }
      });
  };

  //Set options
  const options = lists.map((item) => {
    return {
      name: item.name,
      _id: item._id.$oid,
      items: item.items,
    };
  });
  const [selectedItem, setSelectedItem] = useState(null);
  //Set empty Current list to update
  const initialCurrentList = {
    _id: "",
    items: [],
  };
  const [currentList, setCurrentList] = useState(initialCurrentList);
  //On change get current list
  const onchangeSelect = (item) => {
    setSelectedItem(item);
    setCurrentList({
      ...currentList,
      _id: item._id,
      items: [...selected],
    });
  };
  // console.log(currentList);
  //Handle update
  const handleUpdate = (event) => {
    event.preventDefault();
    axiosInstance
      .post("/prospectlist", currentList)
      .then((response) => {
        //Showing Toaster Message
        setIsSuccessMessageType(true);
        setMessage(response.data.message);
        setShowToast((showToast) => !showToast);
        //Set Select option values
        setSelectedItem(null);
        setCurrentList(initialCurrentList);
        closeModal();
      })
      .catch((error) => {
        //Set Select option values
        setSelectedItem(null);
        setCurrentList(initialCurrentList);
        if (error.response && error.response.data.msg !== "Token has expired") {
          //Showing Toaster Message
          setSelectedItem(options[0]);
          setIsSuccessMessageType(false);
          setMessage(error.response.data.msg);
          setShowToast((showToast) => !showToast);
        } else if (error.response.data.msg === "Token has expired") {
          localStorage.clear();
          window.location = "/";
        }
      });
  };

  return (
    <>
      {showToast && (
        <Toaster
          isSuccessMessageType={isSuccessMessageType}
          message={message}
          setShowToast={setShowToast}
          showToast={showToast}
        />
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          initialFocus={cancelButtonRef}
          className="fixed inset-0 z-30 overflow-y-auto"
          open={isOpen}
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
                    Add To List
                  </Dialog.Title>
                  <div className="">
                    <button
                      type="button"
                      ref={cancelButtonRef}
                      className="border border-transparent rounded-md opacity-90 hover:opacity-100 focus:outline-none"
                      onClick={() => {
                        setIsOpenCreateAndAddToListModal(false);
                        closeModal();
                      }}
                    >
                      <img
                        src={xsvg}
                        alt=""
                        onClick={closeModal}
                        className="cursor-pointer"
                      />
                    </button>
                  </div>
                </div>
                {isOpenCreateAndAddToListModal ? (
                  <CreateAndAddToListModal
                    createAndAddList={createAndAddList}
                    selected={selected}
                  />
                ) : (
                  <div>
                    <form
                      onSubmit={handleUpdate}
                      className="w-full flex justify-center bg-white"
                    >
                      <div className="w-full text-gray-800 flex flex-col justify-center">
                        <div className="w-full mt-6 mb-4">
                          <div className="flex flex-col">
                            <label
                              htmlFor="currentPassword"
                              className="caption text-secondary mb-2"
                            >
                              Choose A List
                            </label>

                            <Select
                              value={selectedItem}
                              onChange={onchangeSelect}
                              options={options}
                              getOptionValue={(option) => option.name}
                              getOptionLabel={(option) => option.name}
                              className="single-select"
                              classNamePrefix="react-select"
                              menuPlacement="auto"
                              maxMenuHeight={120}
                            />
                          </div>
                        </div>

                        <div
                          className="text-primary link mb-6 cursor-pointer"
                          onClick={openCreateAndAddToListModal}
                        >
                          Create New List
                        </div>

                        <div className="">
                          <button type="submit" className="primary-button">
                            Add to List
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default React.memo(AddToListModal);
