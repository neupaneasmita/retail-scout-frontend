import React, { useState, useEffect } from "react";
import "../../../../assets/css/formStyle.css";
import email from "../../../../assets/images/login/email.svg";
import lock from "../../../../assets/images/login/lock.svg";
/*import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";*/

import loginValidation from "./loginValidation";
import { Link } from "react-router-dom";

import axiosInstance from "../../../api/axiosInstance";

import Toaster from "../../../common/Toaster";

const LoginForm = () => {
  //Toaster
  const [showToast, setShowToast] = useState(false);
  const [isSuccessMessageType, setIsSuccessMessageType] = useState(true);
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  // const history = useHistory();
  const [errors, setErrors] = useState({});
  const [checkCorrectData, setCheckCorrectData] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [processing, setProcessing] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setErrors(loginValidation(values));
    setCheckCorrectData(true);
  };

  useEffect(() => {
    const loginUser = () => {
      if (Object.keys(errors).length === 0 && checkCorrectData) {
        setProcessing(true);
        axiosInstance
          .post("/login", values)
          .then((data) => {
            const { access_token, refresh_token } = data.data;
            localStorage.setItem("token", access_token);
            localStorage.setItem("refreshtoken", refresh_token);
            // const reftoken  = localStorage.getItem("refreshtoken");
            // const decoded =  jwt_decode(reftoken);
            // console.log(decoded);
            // setLoggedIn(true);
            window.location = "/dashboard";
            setProcessing(false);
          })
          .catch((error) => {
            if (error.response) {
              //Setting Toaster Information
              setMessage(error.response.data.msg);
              setIsSuccessMessageType(false);
              setShowToast((showToast) => !showToast);
            }
            setProcessing(false);
          });
      } else {
        return null;
      }
    };
    loginUser();
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
    } else setPasswordType("password");
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
            <Link to="/confirm-email">
              <div className="block mt-1 tracking-wide text-sm sm:text-base font-light md:font-normal text-primary mb-1">
                Forgot Password?
              </div>
            </Link>
          </div>
          <div className="mb-20 lg:mb-2">
            <button type="submit" className="w-full block primary-button" disabled={processing}>
              {processing ? <div className="processing">Login</div> : "Login"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default LoginForm;
