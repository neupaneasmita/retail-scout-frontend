import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axiosInstance from "../../api/axiosInstance";
import Toaster from "../../common/Toaster";

const ChangePassword = ({ open, closeModal, currentPasswordRef }) => {
  //Toaster
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccessMessageType, setIsSuccessMessageType] = useState(true);

  const cancelButtonRef = useRef();
  const [values, setValues] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
    error: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const handleClose = () => {
    setValues({
      current_password: "",
      new_password: "",
      confirm_password: "",
      error: {
        current_password: "",
        new_password: "",
        confirm_password: "",
      },
    });
    closeModal();
  };

  const onChangeHandler = ({ target: { value } }, property) => {
    handleErrors(property, value);
    setValues({ ...values, [property]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { current_password, new_password, confirm_password, error } = values;
    if (current_password === "") {
      error.current_password = "Must enter current password";
    } else if (new_password === "") {
      error.new_password = "please enter new password";
    } else if (confirm_password === "") {
      error.confirm_password = "please re-enter new password";
    } else {
      const formData = {
        current_password: current_password,
        new_password: new_password,
      };
      axiosInstance
        .post("/change-password", formData)
        .then((res) => {
          //Showing Toaster Message
          setIsSuccessMessageType(true);
          setMessage(res.data.message);
          setShowToast((showToast) => !showToast);
          closeModal();
          setValues({
            current_password: "",
            new_password: "",
            confirm_password: "",
            error: {
              current_password: "",
              new_password: "",
              confirm_password: "",
            },
          });
        })
        .catch((err) => {
          if (err.response.data) {
            error.current_password = err.response.data.message;
          }
          if (err.response.data.msg === "Token has expired") {
            localStorage.clear();
            window.location = "/";
          }
          setValues({ ...values, error });
        });
    }
  };
  const handleErrors = (property, value) => {
    const { error } = values;

    if (value.trim() === "") {
      error[property] = `cannot be left empty`;
    } else {
      // validation
      if (property === "current_password") {
        if (value.length < 8) {
          error.current_password = "invalid password length";
        } else {
          error.current_password = "";
        }
      } else if (property === "password") {
        if (value.length < 8) {
          error.password = "password must me 8 character long";
        } else {
          error.password = "";
        }
      } else if (property === "confirm_password") {
        if (value !== values.new_password) {
          error.confirm_password = "password do not match";
        } else {
          error.confirm_password = "";
        }
      }
    }
    setValues({ ...values, error });
  };
  // const logout = () => {
  //   // const token = localStorage.getItem("token");
  //   axiosInstance
  //     .post(`/logout`)
  //     .then((res) => {
  //       localStorage.clear();
  //       window.location = "/";
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       localStorage.clear();
  //       window.location = "/";
  //     });
  // };
  const { current_password, new_password, confirm_password, error } = values;
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
          className="fixed inset-0 z-10 overflow-y-auto"
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
                  Change Password
                </Dialog.Title>

                <div>
                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex justify-center bg-white dark:bg-gray-900"
                  >
                    <div className="w-full text-gray-800 dark:text-gray-100 mb-12 sm:mb-0 flex flex-col justify-center px-2 sm:px-0">
                      <div className="w-full px-2 sm:px-6">
                        {/* current password  */}
                        <div className="flex flex-col mt-6">
                          <label
                            htmlFor="currentPassword"
                            className="caption text-secondary mb-2"
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="current_password"
                            name="current_password"
                            className="input-style"
                            ref={currentPasswordRef}
                            value={current_password}
                            onChange={(e) =>
                              onChangeHandler(e, "current_password")
                            }
                            required
                          />
                          {error.current_password && (
                            <div className="error text-red-600 text-sm">
                              {error.current_password}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col mt-3">
                          <label
                            htmlFor="password"
                            className="caption text-secondary mb-2"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="new_password"
                            name="new_password"
                            className="input-style"
                            value={new_password}
                            onChange={(e) => onChangeHandler(e, "new_password")}
                            required
                          />
                          {error.new_password && (
                            <div className="error text-red-600 text-sm">
                              {error.new_password}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col mt-3">
                          <label
                            htmlFor="confirmPassword"
                            className="caption text-secondary mb-2"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            className="input-style"
                            value={confirm_password}
                            onChange={(e) =>
                              onChangeHandler(e, "confirm_password")
                            }
                            required
                          />
                          {error.confirm_password && (
                            <div className="error text-red-600 text-sm">
                              {error.confirm_password}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="px-2 sm:mb-6 sm:px-6">
                        <button
                          type="submit"
                          className="primary-button w-full mt-6"
                        >
                          Change Password
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="mt-4 float-right">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-secondary bg-blue-100 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleClose}
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

export default ChangePassword;
