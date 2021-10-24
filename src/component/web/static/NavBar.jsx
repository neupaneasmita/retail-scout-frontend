import { React, useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/home/logo.svg";
import MenuIcon from "@material-ui/icons/Menu";
import "../../../assets/css/index.css";

function NavBar({ loggedIn }) {
  const [width, setWidth] = useState(window.innerWidth);
  const items = ["Market Insights", "Lead Generation", "Enterprise Solution"];
  const [rotate, setRotate] = useState("rotate-0");
  const [isShown, setIsShown] = useState(false);
  const mobileSidebar = useRef();
  const coverAll = useRef();
  const dropdown = useRef();

  const height = items.length * 23;
  const dropDown = () => {
    const drop = dropdown.current;
    if (drop.clientHeight > 0) {
      drop.style.height = "0";
      setRotate("-rotate-0");
    } else {
      drop.style.height = height + "px";
      setRotate("-rotate-180");
    }
  };
  const itemsContainerStyles2 = {
    height: "0",
  };
  // toggle in mobile
  const toggleMobileSidebar = () => {
    const sidebar = mobileSidebar.current;
    const coverall = coverAll.current;
    if (sidebar.clientWidth > 0) {
      sidebar.style.width = "0";
      coverall.style.display = "none";
    } else {
      sidebar.style.width = "250px";
      coverall.style.display = "block";
    }
  };
  // if user is using screen width of laptop and changes to lower than 1023px width, call the function
  // if user is using screen width of ipad or mobile and changes to higher than 1024px width, call the function
  const handleWidth = () => {
    const innerWidth = window.innerWidth;
    if (innerWidth > 1023 && width < 1024) {
      setWidth(innerWidth);
    } else if (innerWidth < 1024 && width > 1023) {
      setWidth(innerWidth);
    }
  };
  useEffect(() => {
    // handleScroll();
    window.addEventListener("resize", handleWidth);
    // window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleWidth);
      // window.removeEventListener("scroll", handleScroll);
    };
  });
  const handleShown = () => {
    if (isShown) {
      setIsShown(false);
    } else {
      setIsShown(true);
    }
  };
  return (
    <>
      <div
        className="bg-secondary w-full text-white link py-4 sticky top-0 z-30"
        onMouseLeave={() => setIsShown(false)}
      >
        <div className="container-wrapper flex justify-between items-center">
          <div className="flex items-center space-x-10">
            <div className="mt-1">
              <NavLink to="/" className="cursor-pointer">
                <img src={logo} alt="" />
              </NavLink>
            </div>
            {width > 1023 && (
              <div className="flex space-x-6 relative">
                <div
                  className="flex items-center space-x-1 group cursor-pointer "
                  onMouseEnter={handleShown}
                >
                  <span>Solutions</span>

                  <span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
                {isShown && (
                  <div
                    className={`absolute solution-list top-7 -left-5 bg-white text-secondary  rounded-md shadow-md cursor-pointer p-3`}
                    onMouseEnter={() => {
                      setIsShown(true);
                    }}
                    onMouseLeave={() => setIsShown(false)}
                  >
                    {items.map((item, index) => {
                      return (
                        <div
                          className="px-3 hover:bg-secondary hover:text-white py-2 rounded-md transition-all duration-300 ease-in-out"
                          key={index}
                        >
                          <NavLink
                            to={`/solutions/${item}`}
                            activeClassName="text-primary"
                            className="cursor-pointer"
                          >
                            {item}
                          </NavLink>
                        </div>
                      );
                    })}
                  </div>
                )}
                <NavLink
                  to="/pricing"
                  className="cursor-pointer"
                  activeClassName="text-primary"
                >
                  <div className="cursor-pointer">Pricing</div>
                </NavLink>
                <NavLink
                  to="/about"
                  className="cursor-pointer"
                  activeClassName="text-primary"
                >
                  <div className="cursor-pointer">About</div>
                </NavLink>
                <NavLink
                  to="/contact"
                  className="cursor-pointer"
                  activeClassName="text-primary"
                >
                  <div className="cursor-pointer">Contact</div>
                </NavLink>
              </div>
            )}
          </div>
          {width > 1023 && (
            <div className="flex space-x-6 items-center">
              <NavLink
                to={loggedIn ? "/dashboard" : "/login"}
                className="cursor-pointer"
                activeClassName="text-primary"
              >
                <div>{loggedIn ? "Dashboard" : "Login"}</div>
              </NavLink>
              {!loggedIn && (
                <NavLink to="/signup">
                  <div className="primary-button">Free Trial</div>
                </NavLink>
              )}
            </div>
          )}
          {width < 1024 && <MenuIcon onClick={toggleMobileSidebar} />}
        </div>
      </div>
      {/* for ipads and mobiles */}
      {width < 1024 && (
        <>
          <div
            className="h-screen w-screen fixed left-0 top-0  hidden z-40 bg-white opacity-5 transition-all duration-300 ease-out"
            ref={coverAll}
            onClick={toggleMobileSidebar}
          ></div>
          <div
            className="fixed top-0 -left-0.5 h-screen w-0 z-40 bg-secondary link text-white  border-r border-divider transition-all duration-300 overflow-auto overflow-x-hidden"
            ref={mobileSidebar}
          >
            <div className="w-72 flex flex-col px-10 ">
              <div className=" pt-7">
                <NavLink to="/" className="cursor-pointer">
                  <img src={logo} alt="" />
                </NavLink>
              </div>

              <div className="flex flex-col  mt-5">
                <div className="flex items-center space-x-1" onClick={dropDown}>
                  <span>Solutions</span>

                  <span>
                    <svg
                      className={`w-4 h-4 transform transition-all duration-300  ${rotate}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
                <div
                  className="transition-all ease-in-out overflow-hidden border-l"
                  style={itemsContainerStyles2}
                  ref={dropdown}
                >
                  {items.map((item, index) => {
                    return (
                      <div className="text-gray-200 pl-3 " key={index}>
                        <NavLink
                          to={`/solutions/${item}`}
                          activeClassName="text-primary"
                          className="cursor-pointer"
                        >
                          {item}
                        </NavLink>
                      </div>
                    );
                  })}
                </div>
                <NavLink
                  to="/pricing"
                  className="cursor-pointer"
                  activeClassName="text-primary"
                >
                  <div className="mt-1">Pricing</div>
                </NavLink>
                <NavLink
                  to="/about"
                  className="cursor-pointer"
                  activeClassName="text-primary"
                >
                  <div className="mt-1">About</div>
                </NavLink>
                <NavLink
                  to="/contact"
                  className="cursor-pointer"
                  activeClassName="text-primary"
                >
                  <div className="mt-1">Contact</div>
                </NavLink>
              </div>
              <div className="flex flex-col mt-5 space-y-4">
                <NavLink
                  to={loggedIn ? "/dashboard" : "/login"}
                  className="cursor-pointer"
                  activeClassName="text-primary"
                >
                  <div>{loggedIn ? "Dashboard" : "Login"}</div>
                </NavLink>
                {!loggedIn && (
                  <NavLink to="/signup">
                    <button className="primary-button">Free Trial</button>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NavBar;
