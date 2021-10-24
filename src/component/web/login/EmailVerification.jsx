import { useState } from "react";
// import axios from "axios";
// import { baseUrl } from "../authentication/authorization";
// import process from "../../assets/images/loading/progress.svg";
import emailsrc from "../../../assets/images/login/email.svg";
import axiosInstance from "../../api/axiosInstance";

import { Link } from "react-router-dom";
import Toaster from "../../common/Toaster";
function EmailVerification() {
  const [email, setEmail] = useState({
    email: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccessMessageType, setIsSuccessMessageType] = useState(true);
  const loading = false;
  const [error, setError] = useState("");
  const confirmationEmail = "";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.email === "") {
      setError("Empty field cannot be submitted");
    } else if (!email.email.match(/^\w+@\w+\.\w+(\.\w+)?$/gi)) {
      setError("Invalid Email address");
    } else {
      setError("");
    }
    axiosInstance
      .post("/forgot-password", email)
      .then((res) => {
        //Showing Toaster Message
        setMessage(res.data.message);
        setShowToast((showToast) => !showToast);
      })
      .catch((error) => {
        if (error.response) {
          //Showing Toaster Message
          setMessage(error.response.data.msg);
          setIsSuccessMessageType(false);
          setShowToast((showToast) => !showToast);
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
      <div
        className="bg-secondary pt-8 pb-6 sm:pt-16 sm:pb-10"
        style={{ minHeight: "calc(100vh - 76px)" }}
      >
        <div className="container-wrapper grid grid-cols-1 w-full overflow-x-hidden relative">
          <div className="col-span-1 lg:w-1/2 sm:mx-auto">
            <div className="heading-2 text-white sm:text-center">
              Send Email to Verify
            </div>
          </div>
          <div className="col-span-1 lg:w-1/2 max-w-sm sm:max-w-md sm:mx-auto">
            <div className="paragraph text-white sm:text-center my-6">
              Do not have an account?&nbsp;
              <span className="text-primary">
                <Link to="/signup" className="cursor-pointer">
                  Sign Up
                </Link>
              </span>
            </div>

            <div className="flex items-center justify-between my-6">
              <div className="w-5/12">
                <div
                  className="w-full bg-text opacity-60"
                  style={{ height: "2px" }}
                />
              </div>
              <div className="w-2/12 paragraph text-center text-white opacity-60">
                OR
              </div>
              <div className="w-5/12 opacity-60">
                <div
                  className="w-full h-px bg-text"
                  style={{ height: "2px" }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="form-wrapper">
              <div className="grid grid-cols-1 gap-6">
                {/*Email*/}
                <div className="col-span-1">
                  <label htmlFor="email" className="label">
                    Email Address
                  </label>
                  <div
                    className="input-box"
                    // className={`input-box ${
                    //   errors.email && "border-2 border-red-600"
                    // }`}
                  >
                    <span className="prefix">
                      <img src={emailsrc} alt="" className="" />
                    </span>
                    <input
                      type="email"
                      placeholder="email@gmail.com"
                      id="email"
                      name="email"
                      onChange={(e) =>
                        setEmail({ ...email, email: e.target.value })
                      }
                      autoComplete="on"
                      value={email.email}
                    />
                  </div>
                </div>
                {error && <div className="caption text-red-500">{error}</div>}
                {confirmationEmail && (
                  <div className="text-green-600 text-sm">
                    {confirmationEmail}
                  </div>
                )}
                <div className="mb-20 lg:mb-2 mt-4">
                  <button
                    type="submit"
                    className="w-full flex justify-center primary-button"
                  >
                    {loading ? "Sending Email..." : "Send Email"}
                    {loading && (
                      <svg
                        className="animate-spin h-5 w-5 ml-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M29.89 15.81a2.51 2.51 0 1 0-5 .45 9.65 9.65 0 0 1-1.68 6.34 10.24 10.24 0 0 1-5.74 4 10.71 10.71 0 0 1-7.38-.7 11.44 11.44 0 0 1-5.48-5.62A12.07 12.07 0 0 0 9.46 27 12.58 12.58 0 0 0 17.9 29a13.31 13.31 0 0 0 8.18-4 14 14 0 0 0 3.81-8.75v-.08A2.29 2.29 0 0 0 29.89 15.81zM7.11 15.74A9.65 9.65 0 0 1 8.79 9.4a10.24 10.24 0 0 1 5.74-4 10.71 10.71 0 0 1 7.38.7 11.44 11.44 0 0 1 5.48 5.62A12.07 12.07 0 0 0 22.54 5 12.58 12.58 0 0 0 14.1 3 13.31 13.31 0 0 0 5.92 7a14 14 0 0 0-3.81 8.75v.08a2.29 2.29 0 0 0 0 .37 2.51 2.51 0 1 0 5-.45z"
                          data-name="Looding 19"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailVerification;
