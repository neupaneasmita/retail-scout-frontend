import React, {useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/home/logo.svg";
import "../../../assets/css/index.css";
import "../../../assets/css/dashboard.css";
import axiosInstance from "../../api/axiosInstance";

function NavBar() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  // console.log(splitLocation);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    axiosInstance
      .get("/user-profile", {
        signal,
      })
      .then((res) => {
        setEmail(res.data.email);
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
  }, [])


  return (
    <>
      <div className="bg-secondary w-full text-white font-inter flex justify-between items-center py-4 px-6 font-medium sticky top-0 z-30 ">
        <div className="flex items-center space-x-6">
          <div className="">
            <Link to="/" className="cursor-pointer">
              <img
                src={logo}
                className="origin-left  transform-gpu scale-75 sm:scale-90 md:transform-none"
                alt=""
              />
            </Link>
          </div>
        </div>

        <div className="flex space-x-5 md:space-x-10 items-center">
          <div className="relative">
            <div
              className={
                splitLocation[1] === "dashboard" && !splitLocation[2]
                  ? "text-primary active-dashboard-link"
                  : ""
              }
            >
              <Link to="/dashboard" className="cursor-pointer">
                <div className="text-sm md:text-base opacity-80">Dashboard</div>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div
              className={
                splitLocation[2] === "prospects"
                  ? "text-primary active-dashboard-link"
                  : ""
              }
            >
              <Link to="/dashboard/prospects" className="cursor-pointer">
                <div className="text-sm md:text-base opacity-80">Prospects</div>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div
              className={
                splitLocation[2] === "products"
                  ? "text-primary active-dashboard-link"
                  : ""
              }
            >
              <Link to="/dashboard/products" className="cursor-pointer">
                <div className="text-sm md:text-base opacity-80">Products</div>
              </Link>
            </div>
          </div>
          <div>
            <Link to="/dashboard/profile">
              <div className="w-10 h-10">
                <div className={`w-10 h-10 rounded-full border border-primary flex items-center justify-center  heading-5 capitalize ${
                    splitLocation[2] === "profile"
                      ? " bg-primary text-secondary"
                      : "text-white"
                  }`}>
                    {email.charAt(0)}
                  </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
