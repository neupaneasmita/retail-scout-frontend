import React from "react";
import shopify from "../../../assets/images/home/Shopify-Logo.svg";
import woocommerce from "../../../assets/images/home/woocommerce.svg";
import Wix from "../../../assets/images/home/Wix.svg";
import magento from "../../../assets/images/home/magento.svg";
import squarespace from "../../../assets/images/home/squarespace.svg";
import BigCommerce from "../../../assets/images/home/BigCommerce.svg";
import prestashop from "../../../assets/images/home/prestashop.svg";
import circleBg from "../../../assets/images/home/circleBg.svg";
import circle from "../../../assets/images/home/circle.svg";
import dashboard from "../../../assets/images/home/dashboard-2.png";
// import {Link} from 'react-router-dom';

function Frontpage({ goToCommonCard }) {
  const Upperlogos = [
    {
      logo: shopify,
    },
    {
      logo: woocommerce,
    },
    {
      logo: Wix,
    },
    {
      logo: magento,
    },
  ];
  const lowerLogos = [
    {
      logo: squarespace,
    },
    {
      logo: BigCommerce,
    },
    {
      logo: prestashop,
    },
  ];
  const mblUpperLogos = [
    {
      logo: shopify,
    },
    {
      logo: woocommerce,
    },
    {
      logo: Wix,
    },
  ];
  const mblMiddleLogos = [
    {
      logo: magento,
    },
    {
      logo: squarespace,
    },
  ];
  const mblLowerLogos = [
    {
      logo: BigCommerce,
    },
    {
      logo: prestashop,
    },
  ];
  return (
    <>
      <div className="bg-secondary overflow-x-hidden">
        <div
          className="landing-frontpage-wrapper h-full relative pt-8 lg:pt-0"
          style={{ paddingBottom: "76px" }}
        >
          <div className="container-wrapper lg:grid grid-cols-2 bg-secondary h-full">
            <div className="landing-frontpage-description my-auto">
              <div className="flex flex-col">
                {/* about tab */}
                <div className="heading-1 text-white text-left">
                  Discover Online <br className="hidden sm:flex" /> Brands
                  Intelligently
                </div>
                {/* for above tab view*/}
                <div className="text-left paragraph mt-2 md:mt-4 text-white tracking-wide">
                  You need accurate, affordable, and actionable market insights.
                  <br className="hidden sm:flex" />
                  Retail Scout is your real-time brand encyclopedia powered by
                  AI.
                </div>
                <div className="mt-7 mx-0">
                  <button
                    className="primary-button text-secondary"
                    onClick={goToCommonCard}
                  >
                    Learn More
                  </button>
                </div>
                {/* Circles for mobile/tab View Only */}
                <div className="relative -mr-84 sm:-mr-12 lg:hidden block">
                  <div
                    className="absolute top-0 left-0 z-10"
                    style={{ left: "-20px" }}
                  >
                    <img src={circleBg} alt="" className="" />
                  </div>
                  <div
                    className="absolute top-0 left-0 z-10"
                    style={{ left: "-75px", top: "-15px" }}
                  >
                    <img src={circle} alt="" className="" />
                  </div>
                  <div className="relative w-full rounded-md z-20 mt-12 lg:hidden block">
                    <img src={dashboard} alt="" className="rounded-lg z-20" />
                  </div>
                </div>
                {/* For Column View Ends */}
                <div className="uppercase mt-12 text-white text-left discover">
                  DISCOVER 2,000,000+ ONLINE BRANDS BUILT WITH
                </div>
                {/* Logos for Web Devices */}
                <div className="space-x-6 mt-6 items-center hidden lg:flex lg:mx-0">
                  {Upperlogos.map((upperlogo, index) => {
                    const { logo } = upperlogo;
                    return (
                      <div className="" key={index}>
                        <img src={logo} alt="" className="opacity-70" />
                      </div>
                    );
                  })}
                </div>
                <div className="space-x-6 mt-6 items-center hidden lg:flex lg:mx-0">
                  {lowerLogos.map((lowerlogo, index) => {
                    const { logo } = lowerlogo;
                    return (
                      <div className="" key={index}>
                        <img src={logo} alt="" className="opacity-70" />
                      </div>
                    );
                  })}
                </div>
                {/* Logos for mobile/tab devices */}
                <div className="flex space-x-6 mt-7 items-center lg:hidden">
                  {mblUpperLogos.map((mblUpperLogo, index) => {
                    const { logo } = mblUpperLogo;
                    return (
                      <div className="" key={index}>
                        <img src={logo} alt="" className="opacity-70" />
                      </div>
                    );
                  })}
                </div>
                <div className="flex space-x-6 mt-6 items-center lg:hidden">
                  {mblMiddleLogos.map((mblMiddleLogo, index) => {
                    const { logo } = mblMiddleLogo;
                    return (
                      <div className="" key={index}>
                        <img src={logo} alt="" className="opacity-70" />
                      </div>
                    );
                  })}
                </div>
                <div className="flex space-x-6 mt-6 items-center lg:hidden">
                  {mblLowerLogos.map((mblLowerLogo, index) => {
                    const { logo } = mblLowerLogo;
                    return (
                      <div className="" key={index}>
                        <img src={logo} alt="" className="opacity-70" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* Circle Image for Web View */}
          <div className="absolute top-0 inset-x-1/2 w-full hidden lg:block">
            <div
              className="absolute top-6 left-0 z-10"
              style={{ left: "-12px" }}
            >
              <img src={circleBg} alt="" className="" />
            </div>
            <div
              className="absolute top-0 left-0 z-10"
              style={{ left: "-45px" }}
            >
              <img src={circle} alt="" className="" />
            </div>
          </div>
          {/* Dashboard Screenshot for Web View */}
          <div
            className="absolute top-2/4 right-0 w-1/2 z-20 hidden lg:block rounded-r-2xl"
            style={{ transform: "translateY(-50%)", maxWidth: "1000px", overflow: "hidden", left: "50%" }}
          >
            <div className="relative pl-30 lg:h-full">
              <img
                className="w-full rounded-2xl lg:w-auto lg:max-w-none lg:h-full"
                style={{
                  maxHeight: "625px",
                }}
                src={dashboard}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-secondary landing-frontpage-wrapper overflow-x-hidden relative">
        <div className="landing-frontpage pt-8 md:pt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="col-span-1 landing-frontpage-description mb-12 lg:mb-0">
            <div className="flex flex-col">
              about tab 
              <div className="heading-1 text-white text-left">
                Discover Online <br className="hidden sm:flex" /> Brands
                Intelligently
              </div>
              for above tab 
              <div className="text-left paragraph mt-2 md:mt-4 text-white tracking-wide">
                You need accurate, affordable, and actionable market insights.
                <br className="hidden sm:flex" />
                Retail Scout is your real-time brand encyclopedia powered by AI.
              </div>
              <div className="mt-7 mx-0">
                <button
                  className="primary-button text-secondary"
                  onClick={goToCommonCard}
                >
                  Learn More
                </button>
              </div>
              For Column View Only
              <div className="relative md:hidden block">
                <div
                  className="absolute top-0 left-0 z-10 md:hidden block"
                  style={{ left: "-20px" }}
                >
                  <img
                    src={circleBg}
                    alt=""
                    className=""
                    style={{
                      maxWidth: "unset",
                      width: "510px",
                      height: "510px",
                    }}
                  />
                </div>
                <div
                  className="absolute top-0 left-0 z-10 md:hidden block"
                  style={{ left: "-75px", top: "-15px" }}
                >
                  <img
                    src={circle}
                    alt=""
                    className=""
                    style={{
                      maxWidth: "unset",
                      width: "520px",
                      height: "530px",
                    }}
                  />
                </div>
                <div className="relative z-20 mt-12 lg:mt-0">
                  <img
                    src={dashboard}
                    alt=""
                    style={{ maxHeight: "450px" }}
                    className="h-full rounded-3xl md:rounded-none"
                  />
                </div>
              </div>
              For Column View Ends
              <div className="uppercase mt-0 md:mt-12 text-white text-left discover">
                DISCOVER 2,000,000+ ONLINE BRANDS BUILT WITH
              </div>
              Logos for large Devices
              <div className="space-x-6 mt-6 items-center hidden md:flex md:mx-0">
                {Upperlogos.map((upperlogo, index) => {
                  const { logo } = upperlogo;
                  return (
                    <div className="" key={index}>
                      <img src={logo} alt="" className="opacity-70" />
                    </div>
                  );
                })}
              </div>
              <div className="space-x-6 mt-6 items-center hidden md:flex md:mx-0">
                {lowerLogos.map((lowerlogo, index) => {
                  const { logo } = lowerlogo;
                  return (
                    <div className="" key={index}>
                      <img src={logo} alt="" className="opacity-70" />
                    </div>
                  );
                })}
              </div>
              Logos for mobile devices
              <div className="flex space-x-6 mt-7 items-center md:hidden">
                {mblUpperLogos.map((mblUpperLogo, index) => {
                  const { logo } = mblUpperLogo;
                  return (
                    <div className="" key={index}>
                      <img src={logo} alt="" className="opacity-70" />
                    </div>
                  );
                })}
              </div>
              <div className="flex space-x-6 mt-6 items-center md:hidden">
                {mblMiddleLogos.map((mblMiddleLogo, index) => {
                  const { logo } = mblMiddleLogo;
                  return (
                    <div className="" key={index}>
                      <img src={logo} alt="" className="opacity-70" />
                    </div>
                  );
                })}
              </div>
              <div className="flex space-x-6 mt-6 items-center md:hidden">
                {mblLowerLogos.map((mblLowerLogo, index) => {
                  const { logo } = mblLowerLogo;
                  return (
                    <div className="" key={index}>
                      <img src={logo} alt="" className="opacity-70" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-1 relative hidden md:block">
            <div
              className="absolute -top-9 left-0 z-10 hidden md:flex"
              style={{ left: "-140px" }}
            >
              <img src={circleBg} alt="" className="" />
            </div>
            <div
              className="absolute -top-11 left-0 z-10 hidden md:flex"
              style={{ left: "-170px" }}
            >
              <img src={circle} alt="" className="" />
            </div>
            <div className="relative z-20 mt-12 md:mt-0">
              <img
                src={dashboard}
                alt=""
                style={{ maxHeight: "625px" }}
                className="w-full h-full rounded-3xl md:rounded-none"
              />
            </div>
          </div>
        </div>
        Absolute Image Section
        <div className="absolute z-20 top-0 right-0 hidden md:block">
          <img
            src={dashboard}
            alt=""
            style={{ maxHeight: "625px" }}
            className="w-full h-full rounded-3xl md:rounded-none"
          />
        </div>
      </div> */}
    </>
  );
}

export default Frontpage;
