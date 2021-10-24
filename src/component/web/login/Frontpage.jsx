import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import google from "../../../assets/images/login/Google.svg";
import LoginForm from "./integrated/LoginForm";
import {useParams} from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";
// import axios from "axios";
import jwt_decode from "jwt-decode";
const Frontpage = () => {
  const signInWithGoogle = () => {
    window.open("http://127.0.0.1:5000/google-login");
  };
  
const {access} = useParams();
const {refresh} = useParams();
function tokenManager() {
  if(access && refresh){
    localStorage.setItem("token", access);
    localStorage.setItem("refreshtoken", refresh);
    const token = refresh;
    let decoded;
    try {
      decoded = jwt_decode(token);
    } catch (e) {
      localStorage.clear();
    }
    const loggedIn = decoded && decoded.jti && true;
  if(loggedIn){
    window.location="/dashboard"
  }else{
    window.location="/login"
  }
  }
  
}
  useEffect(() => {
    tokenManager();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container-wrapper grid grid-cols-1 w-full overflow-x-hidden relative">
        <div className="col-span-1 lg:w-1/2 sm:mx-auto">
          <div className="heading-2 text-white sm:text-center">
            Login to Retail Scout
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
          <div
            className="bg-white text-secondary px-4 py-4 flex justify-center items-center rounded-md lg:text-sm xl:text-base font-medium cursor-pointer"
            onClick={signInWithGoogle}
          >
            <img src={google} alt="" className="" />{" "}
            <span className="pl-4">Sign In with Google</span>
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
              <div className="w-full h-px bg-text" style={{ height: "2px" }} />
            </div>
          </div>

          {/*Login Form*/}
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Frontpage;
