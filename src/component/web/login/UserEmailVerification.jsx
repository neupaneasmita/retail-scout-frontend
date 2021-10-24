import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../component/api/axiosInstance";
import "../../../assets/css/index.css";
function UserEmailVerification() {
  const { token } = useParams();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setInterval(() => {
      const verifyEmail = async () => {
        axiosInstance
          .get(`/verify-email/${token}`, {
            signal,
          })
          .then(() => {
            setVerified(true);
            setTimeout(() => {
              window.location = "/login";
            }, 2000);
          })
          .catch((err) => {
            console.log(err.response);
          });
      };
      verifyEmail();
    }, 2000);

    return () => {
      controller.abort();
    };
    //   eslint-disable-next-line
  }, [stop]);
  return (
    <div className="w-full h-96 bg-secondary flex justify-center items-center flex-col">
      <div
        className={`${
          verified ? "bg-primary" : "bg-red-600"
        } text-white py-3 flex justify-center items-center w-full max-w-lg  rounded-lg transition-all duration-300 ease-linear`}
      >
        <div className="flex space-x-4 items-center">
          <div> {verified ? "verified" : "Verifying"}</div>
          {verified ? (
            <div>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          ) : (
            <div className="lds-dual-ring mb-1"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserEmailVerification;
