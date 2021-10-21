import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axiosInstance from "../../api/axiosInstance";
import Toaster from "../../common/Toaster";
const EditProfile = ({ open, closeModal, getEmail }) => {
  const cancelButtonRef = useRef();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccessMessageType, setIsSuccessMessageType] = useState(true);
  const [values, setValues] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    dob: "",
  });
  const [email, setEmail] = useState("");
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance
      .put("/user-profile", values)
      .then((res) => {
        //Showing Toaster Message
        setIsSuccessMessageType(true);
        setMessage(res.data.message);
        setShowToast((showToast) => !showToast);
        closeModal();
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    axiosInstance
      .get("/user-profile", {
        signal,
      })
      .then((res) => {
        const data = {
          username: res.data.username === null ? "" : res.data.username,
          first_name: res.data.first_name === null ? "" : res.data.first_name,
          last_name: res.data.last_name === null ? "" : res.data.last_name,
          phone: res.data.phone === null ? "" : res.data.phone,
          dob: res.data.dob === null ? "" : res.data.dob,
        };
        setEmail(res.data.email);
        getEmail(res.data.email);
        setValues(data);
      })
      .catch((err) => {
        if (err.response.data.msg) {
          localStorage.clear();
          window.location = "/";
        }
      });
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);
  const { username, first_name, last_name, phone, dob } = values;
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
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 top-0 z-50 overflow-y-auto"
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit Profile Information
                </Dialog.Title>

                <div>
                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex justify-center bg-white dark:bg-gray-900"
                  >
                    <div className="w-full text-gray-800 dark:text-gray-100 mb-12 sm:mb-0 flex flex-col justify-center px-2 sm:px-0">
                      <div className="w-full px-2 sm:px-6">
                        {/* user name  */}
                        <div className="flex flex-col mt-6">
                          <label
                            htmlFor="currentPassword"
                            className="caption text-secondary mb-2"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            className="input-style"
                            value={username}
                            onChange={onChangeHandler}
                          />
                        </div>
                        {/* first name  */}
                        <div className="flex flex-col mt-3">
                          <label
                            htmlFor="password"
                            className="caption text-secondary mb-2"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            className="input-style"
                            value={first_name}
                            onChange={onChangeHandler}
                          />
                        </div>
                        {/* Last name  */}
                        <div className="flex flex-col mt-3">
                          <label
                            htmlFor="password"
                            className="caption text-secondary mb-2"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            className="input-style"
                            value={last_name}
                            onChange={onChangeHandler}
                          />
                        </div>
                        {/* Phone Number  */}
                        <div className="flex flex-col mt-3">
                          <label
                            htmlFor="password"
                            className="caption text-secondary mb-2"
                          >
                            DOB
                          </label>
                          <input
                            type="date"
                            id="dob"
                            name="dob"
                            className="input-style"
                            value={dob}
                            onChange={onChangeHandler}
                          />
                        </div>
                        {/* Email  */}
                        <div className="flex flex-col mt-3">
                          <label
                            htmlFor="password"
                            className="caption text-secondary mb-2"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            className="input-style"
                            value={email}
                            readOnly
                          />
                        </div>
                        {/* Phone Number  */}
                        <div className="flex flex-col mt-3">
                          <label
                            htmlFor="password"
                            className="caption text-secondary mb-2"
                          >
                            Phone no
                          </label>
                          <input
                            type="number"
                            id="phone"
                            name="phone"
                            className="input-style"
                            value={phone}
                            onChange={onChangeHandler}
                          />
                        </div>
                      </div>

                      <div className="px-2 sm:mb-6 sm:px-6">
                        <button
                          type="submit"
                          className="primary-button w-full mt-6"
                        >
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="mt-4 float-right">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-secondary bg-blue-100 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditProfile;
