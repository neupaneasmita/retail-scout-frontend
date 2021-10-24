import React, { useEffect} from "react";
import checkmark from "../../../../assets/images/pricing/Checkmark.svg";
import { NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
// import axiosInstance from "../../../api/axiosInstance";

const PricingCard = ({
  stripe,
  hasCurrentPlan,
  index,
  title,
  subTitle,
  prices,
  features,
  loggedIn,
  //----
  features1,
  features2,
  features3,
  //---
  priceToggle
}) => {

  // console.log(features);

  useEffect(() => {
    if(loggedIn){
      createCheckoutSession();
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  const createCheckoutSession = async () => {
    return await fetch("http://127.0.0.1:5000/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ price: prices.price_id }),
    }).then(function (response) {
      return response.json();
    });
  };

  const confirmPayment = async () => {
     await stripe.then((res) => {
      createCheckoutSession().then(function (response) {
        console.log(response.redirect_uri);
        window.location.href = response.redirect_uri
        // stripe
        //   .redirectToCheckout({
        //     sessionId: response.checkoutSessionId,
        //   })
        //   .then(function (result) {
        //     console.log(result);
        //   })
        //   .catch(function (err) {
        //     console.log(err);
        //   });
      });
    })
    
  }

  const pricingWrapperStyle = {
    maxWidth: "20rem",
    boxShadow:
      "0px 100px 80px rgba(0, 0, 0, 0.05), 0px 30.1471px 24.1177px rgba(0, 0, 0, 0.0325794), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.025), 0px 4.5288px 3.62304px rgba(0, 0, 0, 0.0174206)",
  };
  const price = prices.unit_amount
  return (
    <div
      className="z-20 sm:w-1/2 xl:w-1/3 mb-8 lg:my-0 bg-white p-6 -mx-4 rounded grid grid-cols-1 place-content-between pricing-wrapper"
      style={pricingWrapperStyle}
    >
      <div className="">
        <div className="heading-3 text-center xl:px-6 mb-2 text-secondary">
          {title}
        </div>
        <div className="paragraph text-center mb-6 text-text">{subTitle}</div>
        <div className="heading-3 text-secondary text-center">
          ${priceToggle ? <>{price/12}</> : <>{price}</>}
            <span>{index === 2 && "+"}</span>
        </div>
        <div className="caption text-secondary text-center">
          Per Month
        </div>
        {loggedIn && (
          <>
            {index === 0 ? <div className="mt-6">
              {features1.map((feature, index) => {
                return (
                  <div className="flex flex-row items-center mb-4" key={index}>
                    <img src={checkmark} alt="" />
                    <div className={"paragraph text-text ml-2"}>
                      {feature.feature}
                    </div>
                    {feature.tip && (
                      <>
                        <Tippy
                          theme="tooltip"
                          arrow={false}
                          maxWidth={200}
                          content={feature.tip}
                        >
                          <button className="ml-2">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="#bac4c9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8m.126 7c-.448 0-.841.298-.962.729l-1.135 4.029c-.132.535.193 1.078.729 1.212.081.02.162.03.243.03.448 0 .855-.303.97-.758l1.117-3.971C9.268 7.633 8.788 7 8.126 7M9 4c-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1s-.447-1-1-1"
                                id="a"
                              ></path>
                            </svg>
                          </button>
                        </Tippy>
                      </>
                    )}
                  </div>
                );
              })}
            </div> :index === 1 ? <div className="mt-6">
              {features2.map((feature, index) => {
                return (
                  <div className="flex flex-row items-center mb-4" key={index}>
                    <img src={checkmark} alt="" />
                    <div className={"paragraph text-text ml-2"}>
                      {feature.feature}
                    </div>
                    {feature.tip && (
                      <>
                        <Tippy
                          theme="tooltip"
                          arrow={false}
                          maxWidth={200}
                          content={feature.tip}
                        >
                          <button className="ml-2">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="#bac4c9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8m.126 7c-.448 0-.841.298-.962.729l-1.135 4.029c-.132.535.193 1.078.729 1.212.081.02.162.03.243.03.448 0 .855-.303.97-.758l1.117-3.971C9.268 7.633 8.788 7 8.126 7M9 4c-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1s-.447-1-1-1"
                                id="a"
                              ></path>
                            </svg>
                          </button>
                        </Tippy>
                      </>
                    )}
                  </div>
                );
              })} 
              </div> : <div className="mt-6">
              {features3.map((feature, index) => {
                return (
                  <div className="flex flex-row items-center mb-4" key={index}>
                    <img src={checkmark} alt="" />
                    <div className={"paragraph text-text ml-2"}>
                      {feature.feature}
                    </div>
                    {feature.tip && (
                      <>
                        <Tippy
                          theme="tooltip"
                          arrow={false}
                          maxWidth={200}
                          content={feature.tip}
                        >
                          <button className="ml-2">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="#bac4c9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8m.126 7c-.448 0-.841.298-.962.729l-1.135 4.029c-.132.535.193 1.078.729 1.212.081.02.162.03.243.03.448 0 .855-.303.97-.758l1.117-3.971C9.268 7.633 8.788 7 8.126 7M9 4c-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1s-.447-1-1-1"
                                id="a"
                              ></path>
                            </svg>
                          </button>
                        </Tippy>
                      </>
                    )}
                  </div>
                );
                })}
              </div>
            }
          </>
        )}

        {!loggedIn && <div className="mt-6">
          {features.map((feature, index) => {
            return (
              <div className="flex flex-row items-center mb-4" key={index}>
                <img src={checkmark} alt="" />
                <div className={"paragraph text-text ml-2"}>
                  {feature.feature}
                </div>
                {feature.tip && (
                  <>
                    <Tippy
                      theme="tooltip"
                      arrow={false}
                      maxWidth={200}
                      content={feature.tip}
                    >
                      <button className="ml-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="#bac4c9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8m.126 7c-.448 0-.841.298-.962.729l-1.135 4.029c-.132.535.193 1.078.729 1.212.081.02.162.03.243.03.448 0 .855-.303.97-.758l1.117-3.971C9.268 7.633 8.788 7 8.126 7M9 4c-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1s-.447-1-1-1"
                            id="a"
                          ></path>
                        </svg>
                      </button>
                    </Tippy>
                  </>
                )}
              </div>
            );
          })}
        </div>
        }
        </div>
        
      {index === 2 ? <NavLink to="/contact">
          <div className={`block mt-12 secondary-button`}> Contact Us </div>
        </NavLink> : <>
        {loggedIn && hasCurrentPlan ? 
        <div className={`block mt-12  ${index === 0 ? "secondary-button" : "primary-button"}`} onClick={() => confirmPayment()}>
            Upgrade
        </div> : <NavLink to="/signup">
          <div className={`block mt-12  ${index === 0 ? "secondary-button" : "primary-button"}`}> Get Started </div>
        </NavLink>
      }
        </>}
    </div>
  );
};
export default PricingCard;
