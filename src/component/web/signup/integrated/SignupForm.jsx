import React, { useState, useEffect } from "react";
import "../../../../assets/css/formStyle.css";
import email from "../../../../assets/images/login/email.svg";
import lock from "../../../../assets/images/login/lock.svg";
import signupValidation from "./signupValidation";
// import { useHistory } from "react-router-dom";

import axiosInstance from "../../../api/axiosInstance";

const SignupForm = () => {
  //Toaster
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccessMessageType, setIsSuccessMessageType] = useState(true);
  const [processing, setProcessing] = useState(false);

  if (showToast) {
    setTimeout(() => {
      setShowToast(false);
    }, 10000);
  }

  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  // const history = useHistory();
  const [errors, setErrors] = useState({});
  const [checkCorrectData, setCheckCorrectData] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  // console.log(errors);
  // console.log(Object.keys(errors).length);
  // console.log(checkCorrectData);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setErrors(signupValidation(values));
    setCheckCorrectData(true);
  };

  //Use Effect to run registerUser function and  check for errors
  useEffect(() => {
    const registerUser = () => {
      if (Object.keys(errors).length === 0 && checkCorrectData) {
        setProcessing(true);
        axiosInstance
          .post("/register", {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            //Showing Toaster Message
            setIsSuccessMessageType(true);
            setMessage(res.data.message);
            setShowToast((showToast) => !showToast);
            //Setting Values
            setValues({
              email: "",
              password: "",
              passwordConfirm: "",
            });
            setProcessing(false);
          })
          .catch((error) => {
            if (error.response) {
              //Showing Toaster Message
              setIsSuccessMessageType(false);
              setMessage(error.response.data.msg);
              setShowToast((showToast) => !showToast);
            }
            setProcessing(false);
          });
      } else {
        return null;
      }
    };
    registerUser();
      // eslint-disable-next-line
  }, [checkCorrectData, errors]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  };

  const showPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  const showConfirmPassword = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordType("password");
    }
  };

  return (
    <>

      {/*Toaster Message*/}
      {showToast && (
        <div
          className={`rounded text-secondary mb-6 z-50 + ${isSuccessMessageType ? "bg-green-200" : "bg-red-200"
            }`}
          role="alert"
        >

          <div className="flex">
            <div
              className={`p-3 rounded-l + ${isSuccessMessageType ? "bg-green-500" : "bg-red-500"
                }`}
            >
              {isSuccessMessageType ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 opacity-80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="opacity-80"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6.002 14a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm.195-12.01a1.81 1.81 0 1 1 3.602 0l-.701 7.015a1.105 1.105 0 0 1-2.2 0l-.7-7.015z" />
                </svg>
              )}
            </div>
            <div className="w-full flex justify-between px-4 py-3">
              <div className="">
                <div className="paragraph font-bold">
                  {isSuccessMessageType ? "Success" : "Error"}
                </div>
                <div className="caption">{message}</div>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => setShowToast(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`"h-4 w-4 opacity-80 stroke-current " + ${isSuccessMessageType
                    ? "text-green-500 hover:text-green-700"
                    : "text-red-500 hover:text-red-700"
                    }`}
                  fill="none"
                  viewBox="0 0 20 20"
                  stroke=""
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

      )}

      <form onSubmit={onSubmitHandler} className="form-wrapper">
        <div className="grid grid-cols-1 gap-6">
          {/*Email*/}
          <div className="col-span-1">
            <label htmlFor="email" className="label">
              Email Address
            </label>
            <div
              className={`input-box ${errors.email && "border-2 border-red-600"
                }`}
            >
              <span className="prefix">
                <img src={email} alt="" className="" />
              </span>
              <input
                type="email"
                placeholder="email@gmail.com"
                id="email"
                name="email"
                onChange={onChangeHandler}
                autoComplete="on"
                value={values.email}
              />
            </div>
            {errors.email && (
              <div className="caption text-red-500 mt-1">{errors.email}</div>
            )}
          </div>
          {/*Password*/}
          <div className="col-span-1">
            <div className="flex justify-between">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="label cursor-pointer" onClick={showPassword}>
                {passwordType === "password"
                  ? "Show Password"
                  : "Hide Password"}
              </div>
            </div>
            <div
              className={`input-box ${errors.password && "border-2 border-red-600"
                }`}
            >
              <span className="prefix">
                <img src={lock} alt="" className="" />
              </span>
              <input
                type={passwordType}
                placeholder="Password"
                id="password"
                name="password"
                onChange={onChangeHandler}
                value={values.password}
              />
            </div>
            {errors.password && (
              <div className="caption text-red-500 mt-1">{errors.password}</div>
            )}
          </div>
          {/*Confirm Password*/}
          <div className="col-span-1">
            <div className="flex justify-between">
              <label htmlFor="passwordConfirm" className="label">
                Confirm Password
              </label>
              <div
                className="label cursor-pointer"
                onClick={showConfirmPassword}
              >
                {confirmPasswordType === "password"
                  ? "Show Password"
                  : "Hide Password"}
              </div>
            </div>
            <div
              className={`input-box ${errors.passwordConfirm && "border-2 border-red-600"
                }`}
            >
              <span className="prefix">
                <img src={lock} alt="" className="" />
              </span>
              <input
                type={confirmPasswordType}
                placeholder="Confirm Password"
                id="passwordConfirm"
                name="passwordConfirm"
                onChange={onChangeHandler}
                value={values.passwordConfirm}
              />
            </div>
            {errors.passwordConfirm && (
              <div className="caption text-red-500 mt-1">
                {errors.passwordConfirm}
              </div>
            )}
            <div className="block mt-5 tracking-wide text-sm sm:text-base font-light md:font-normal text-white opacity-80 mb-1">
              By Signing up, You accept our Terms & Conditions
            </div>
          </div>
          <div className="mb-20 lg:mb-2">
            <button type="submit" className="w-full block primary-button" disabled={processing}>
              {processing ? <div className="processing">Processing</div> : "Create An Account"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
