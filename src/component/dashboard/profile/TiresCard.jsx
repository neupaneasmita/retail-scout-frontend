import React, { useEffect } from "react";
// import { Dialog, Transition } from "@headlessui/react";
import checkmark from "../../../assets/images/pricing/Checkmark.svg";
import {NavLink} from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
// import axiosInstance from "../../api/axiosInstance";
// import visa from "../../../assets/images/dashboard/visa.png";
const TiresCard = ({
  stripe,
  //reFetchData,
  hasCurrentPlan,
  index,
  title,
  subTitle,
  prices,
  features,
  priceToggle
}) => {

  //Features
  
  const features1 = [
    { feature: "Filmographic Data" },
    {
      feature: "Location",
      tip: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam animi aperiam corporis earum esse eveniet excepturi ipsum magni molestias, neque non optio perspiciatis quisquam ratione recusandae repellat reprehenderit, sit.",
    },
    { feature: "Social Media Insights" },
    { feature: "Product Categories" },
    {
      feature: "Website Traffic Rank",
      tip: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam animi aperiam corporis earum esse eveniet excepturi ipsum magni molestias, neque non optio perspiciatis quisquam ratione recusandae repellat reprehenderit, sit.",
    },
    { feature: "List of Tech Integration" },
  ]
  const features2 = [
    {
      feature: "All Market Insights Features",
      tip: "All Market Insights Features is a tip",
    },
    { feature: "Contact Information" },
    {
      feature: "Create Prospect Lists",
      tip: "Create Prospect Lists is a tip",
    },
    { feature: "Export Data" },
    { feature: "Proprietery Brand Rank" },
  ]
  const features3 = [
    { feature: "All Features" },
    {
      feature: "Multi-user Collaboration",
      tip: "Multi-user Collaboration has a tip",
    },
    { feature: "API Access" },
    { feature: "CRM Integration" },
    { feature: "Quality Assurance Support" },
    { feature: "Dedicated Account Manager" },
  ]

  /* const [open, setOpen] = useState(false);
  const [procesing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [payment, setPayment] = useState(false);
  const [errorMessage, setErrorMesssage] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    brand: "",
    last4: "",
    name: "",
  }); */
  // const stripe = useStripe();
  useEffect(() => {

    /* axiosInstance
      .get("/card-detail")
      .then((res) => {
        // console.log(res);
        if (res.data.message === "Setup Intent not created") {
          setPayment(false);
        } else {
          setPaymentDetails(res.data);
          setPayment(true);
        }    
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.msg === "Token has expired") {
            localStorage.clear();
            window.location = "/";
          }
        }
      }); */

      createCheckoutSession();
         // eslint-disable-next-line
  }, []);

  /* const { brand, last4, name } = paymentDetails; */

  /* const cancelButtonRef = useRef();
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleClose = () => {
    closeModal();
    setErrorMesssage("");
  }; */


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
  //let checkoutSessionId;
  const confirmPaymentTest = async () => {
  await stripe.then((res) => {
      createCheckoutSession().then(function (response) {
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

  // const confirmPayment = async (price_id) => {
  //   //setProcessing(true);
  //   const data = {
  //     price: price_id
  //   }
  //   try {
  //  await axiosInstance.post('/create-subscription', data);
  //     //setPaymentSuccess(true);
  //     reFetchData();
  //     // console.log(response);
  //   } catch (error) {
  //     // console.log(error.response);
  //     if(error.response){   
  //       if(error.response.status === 400){
  //         setTimeout(() => { 
  //           //setErrorMesssage(error.response.data.msg);
  //         }, 1000);  
  //       }
  //       if (error.response.data.msg === "Token has expired") {
  //         localStorage.clear();
  //         window.location = "/";
  //       }
  //     }
  //   }
  //   //Set Processing False
  //   //setTimeout(() => { setProcessing(false); }, 1000);
  // }

  const pricingWrapperStyle = {
    maxWidth: "20rem",
  };
  const price = prices.unit_amount
  return (
    <>

      <div
        className="sm:w-1/2 xl:w-1/3 mb-8 lg:my-0 bg-white p-6 -mx-4 rounded grid grid-cols-1 place-content-between pricing-wrapper border border-gray-100 shadow-xl"
        style={pricingWrapperStyle}
      >
        <div className="">
          <div className="heading-3 text-center xl:px-6 mb-2 text-secondary">
            {title}
          </div>
          <div className="paragraph text-center mb-8 text-text">{subTitle}</div>
          <div className="heading-3 text-secondary text-center">
          ${priceToggle ? <>{price/12}</> : <>{price}</>}
            <span>{index === 2 && "+"}</span>
          </div>
          <div className="caption text-secondary text-center">Per Month</div>
          {index === 0 ? (
            <div className="mt-6">
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
          </div>
          ) : index === 1 ? (
            <div className="mt-6">
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
          </div>
        
          ) : (
            <div className="mt-6">
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
        
          )}
          </div>
        
        {index === 2 ? 
        <NavLink to="/contact">
          <div className={`block mt-12 secondary-button`}>
            Contact Us
          </div>
        </NavLink> : <>
          {!hasCurrentPlan && <div className={`block mt-12 ${index === 0 ? "secondary-button" : "primary-button"}`} onClick={() => confirmPaymentTest(prices.price_id)}>
            Get Started
          </div>}
          {prices.is_current_plan && hasCurrentPlan ? <div className={`block mt-12 light-primary-button`}>
            Current Plan
          </div> : !prices.is_current_plan && hasCurrentPlan ? <div className={`block mt-12 primary-button`} onClick={() => confirmPaymentTest(prices.price_id)}>
            Upgrade
          </div> : ''}
        </>}

        


      </div>

      {/* Payment Modal */ }
      {/* <div className="hidden" onClick={openModal}>Hidden Open Modal</div> */}
      {/* <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          static
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="flex items-center">
                    <div className="strome-current stroke-secondary mr-2">
                      <svg data-name="Layer 1" width="24" height="24" id="Layer_1" fill="none" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                        <path className="cls-1" d="M52,26a10.81,10.81,0,0,0-1-1.15L36.15,10a4.19,4.19,0,0,0-5.93,0l-23,23a4.19,4.19,0,0,0,0,5.93L17,48.7" stroke="currentColor" /><rect className="cls-1" height="29" rx="4.17" ry="4.17" width="41" x="16.98" y="26" stroke="currentColor" /><line className="cls-1" x1="16.98" x2="57.98" y1="34" y2="34" stroke="currentColor" /><line className="cls-1" x1="16.98" x2="57.98" y1="38" y2="38" stroke="currentColor" /><line className="cls-1" x1="22.98" x2="30.98" y1="44" y2="44" stroke="currentColor" /><line className="cls-1" x1="22.98" x2="27.98" y1="48" y2="48" stroke="currentColor" /><line className="cls-1" x1="34.98" x2="39.98" y1="44" y2="44" stroke="currentColor" /></svg>
                    </div>
                    <div>
                      Proceed to Payment
                    </div>
                  </div>
                </Dialog.Title>

                <div className="py-6">  
                  <div className="">
                    <div className="heading-4 mb-1 text-secondary">
                      {title}
                    </div>
                    <div className="caption mb-3 text-text text-opacity-70 leading-4" style={{ width: "90%" }}>{subTitle}</div>
                    <div className="heading-3 text-secondary">
                      ${prices.unit_amount}
                      <span>{index === 2 && "+"}</span>
                    </div>

                  </div>
                  {errorMessage !== "" && !paymentSuccess ? 
                    <div className="border-t border-divider mt-2">
                      <div className="bg-red-200 bg-opacity-80 px-4 py-2 rounded mt-4">
                        <div className="text-red-500 link mb-1">
                            Error
                          </div>
                        <div className="text-red-500 caption">
                          {errorMessage}
                        </div>
                      </div>
                    </div> : ''
                  }
                  {paymentSuccess && (
                    <div className="border-t border-divider mt-2">
                      <div className="flex items-center gap-2 justify-between bg-green-200 bg-opacity-70 px-4 py-2 mt-4 rounded">
                        <div className="text-green-700">
                          <div className="link mb-1">
                            Payment Success
                          </div>
                          <div className="caption">
                            An email with your subscription order detail has been sent to your mail address.
                          </div>
                        </div>
                        <div className="">
                          <img src={checkmark} alt="" className="w-10 h-10" />
                        </div>
                    </div>
                    </div>
                  )}

                  {payment && !paymentSuccess ? (
                    <div className="border-t border-divider mt-2">
                      <div className="text-primary paragraph mt-2">
                        Payment
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center space-x-2 caption-2 text-secondary flex-1">
                          <div className=" capitalize">
                            {brand}
                          </div>
                          <div className="">
                            ************{last4},
                          </div>
                          <div className="">
                            {name}
                          </div>
                        </div>
                        <div>
                          <img src={visa} className="h-8 w-12 object-scale-down" alt="" />
                        </div>
                      </div>
                    </div>
                  ) : ''}
                  {!payment && 
                    <div className="border-t border-divider mt-2">
                      <div className="bg-red-200 bg-opacity-80 px-4 py-4 rounded mt-4">
                        <div className="text-red-500 caption">
                          Please add your card information.
                        </div>
                      </div>
                    </div>
                  }
                  
                </div>

                <div className="float-right">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-secondary bg-blue-100 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  {!paymentSuccess &&  payment ? (
                    <button
                      type="button"
                      className="inline-flex justify-center ml-2 px-4 py-2 text-sm font-medium text-secondary bg-primary border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={(e) => confirmPayment(e, prices.price_id)}
                    >
                      {procesing ? <div className="processing">Processing</div> : 'Confirm Payment'}
                    </button>
                  ) : ''}

                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition> */}

    </>
  );
};
export default TiresCard;
