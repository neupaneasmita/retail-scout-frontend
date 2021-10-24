import React from "react";
import google from "../../../assets/images/login/Google.svg";
import SignupForm from "./integrated/SignupForm";
import { Link } from "react-router-dom";

const Frontpage = () => {
  const signInWithGoogle = () => {
    window.open(
      "http://127.0.0.1:5000/google-login",
    );
  };

  return (
    <>
      <div className="container-wrapper grid grid-cols-1 w-full overflow-x-hidden relative">
        <div className="col-span-1 lg:w-3/5 sm:mx-auto">
          <div className="heading-2 text-white sm:text-center">
            Sign Up For Retail Scout
          </div>
        </div>
        <div className="col-span-1 lg:w-1/2 max-w-sm sm:max-w-md sm:mx-auto">
          <div className="paragraph text-white sm:text-center my-6">
            Already have an account?&nbsp;
            <span className="text-primary">
              <Link to="/login" className="cursor-pointer">
                Login
              </Link>
            </span>
          </div>
          <div
            className="bg-white text-secondary px-4 py-4 flex justify-center items-center rounded-md lg:text-sm xl:text-base font-medium cursor-pointer"
            onClick={signInWithGoogle}
          >
            <img src={google} alt="" className="" />{" "}
            <span className="pl-4">Sign Up with Google</span>
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

          {/*Sign Up Form*/}
          <SignupForm />
        </div>
      </div>
    </>
  );
};

export default Frontpage;
