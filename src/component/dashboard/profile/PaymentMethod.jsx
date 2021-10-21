import React, { useState, useEffect } from "react";
import { ReactComponent as DebitCard } from "../../../assets/images/dashboard/debitCard.svg";
import StripeContainer from "./stripe/StripeContainer";
import trash from "../../../assets/images/dashboard/prospects/trash.svg";
import axiosInstance from "../../api/axiosInstance";
const PaymentMethod = () => {
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    brand: "",
    exp_month: "",
    exp_year: "",
    last4: "",
    name: "",
  });
  //Close Modal
  const closeModal = () => {
    setOpen(false);
  };
  // opem modal
  const openModal = () => {
    setOpen(true);
  };
  useEffect(() => {

    fetchCardDetail();

    // axiosInstance
    //   .get("/card-detail")
    //   .then((res) => {
    //     if (res.data.message === "Setup Intent not created") {
    //       setPayment(false);
    //     } else {
    //       setPaymentDetails(res.data);
    //       setPayment(true);
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.response) {
    //       if (err.response.data.msg === "Token has expired") {
    //         localStorage.clear();
    //         window.location = "/";
    //       }
    //     }
    //   });
    // return () => { };
  }, []);

  const fetchCardDetail = async () => {
    try{
      const response = await axiosInstance.get("/card-detail");

      if(response.data.message === "Setup Intent not created"){
        setPayment(false);
      } else {
        setPaymentDetails(response.data);
        setPayment(true);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.msg === "Token has expired") {
          localStorage.clear();
          window.location = "/";
        }
      }
    }
  }

  const { exp_month, exp_year, last4, name } = paymentDetails;

  //Alert to remove Store
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  //Confirm Remove
  const confirmRemove = () => {
    setOpenRemoveModal(true);
  };
  //Remove Payment
  const removePaymentMethod = async () => {
    try {
      await axiosInstance.post(`/detach-card`);
      alert('Deleted Successfullly...')
      setTimeout(() => {
        window.location.reload();
      }, [300]);
    } catch(error) {
      console.log(error.response);
    }
    setOpenRemoveModal(false);
  }

  return (
    <>
      <div className="">
        <div className="heading-4 text-black mb-2">Payment Method</div>

        <div className="">
          {!payment ? (
            <div className="primary-button w-max" onClick={openModal}>
              Add Payment Method
            </div>
          ) : ''}
          {/*add payment Modal*/}
          <StripeContainer open={open} closeModal={closeModal} />
          {/*-------------*/}
        </div>
      </div>
      {payment && (
        <table className="sm:h-full flex-1 flex flex-col min-h-0 min-w-0 mt-6 overflow-auto">
          <thead className="w-full h-full min-h-0 min-w-0">
            <tr className="flex flex-row border-b border-divider w-max lg:w-full items-center paragraph text-secondary">
              <td className="lg:w-1/4 w-52 px-2">
                <div className="pb-4  text-left">Name</div>
              </td>
              <td className="lg:w-1/4 w-52 px-2">
                <div className="pb-4  text-left">Expiration Date</div>
              </td>
              <td className="lg:w-1/4 w-52 px-2">
                <div className="pb-4  text-left">Card Number</div>
              </td>
              <td className="lg:w-1/4 w-52 px-2">
                <div className="pb-4  text-left">Action</div>
              </td>
            </tr>
          </thead>

          <tbody className="w-full h-full min-h-0 min-w-0">
            <tr className="flex flex-row w-max lg:w-full items-center">
              <td className="lg:w-1/4 w-52 px-2">
                <div className="py-4  caption text-secondary">
                  <div className="flex items-center">
                    <DebitCard />
                    <span className="pl-2">
                      {/* {loggedProfileData.paymentType} */}
                      {name}
                    </span>
                  </div>
                </div>
              </td>
              <td className="lg:w-1/4 w-52 px-2">
                <div className="py-4  caption text-secondary">
                  {/* {loggedProfileData.expirationDate} */}
                  {exp_month}/{exp_year}
                </div>
              </td>
              <td className="lg:w-1/4 w-52 px-2">
                <div className="py-4  caption text-secondary flex items-center">
                  {/* {loggedProfileData.cardNumber} */}
                  <div>
                    ************{last4}
                  </div>
                  <div className="ml-2 bg-primary px-1.5 py-0.5 rounded text-xs text-secondary bg-opacity-70"> Default </div>
                </div>
              </td>
              <td className="lg:w-1/4 w-52 px-2">
                <div
                  onClick={confirmRemove}
                  className="py-4  caption text-secondary cursor-pointer flex items-center">
                  <img src={trash} alt="" className="pr-1.5" /> <span>Delete</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Confirm Remove Payment Method Modal */}
      {openRemoveModal && (
        <div
          className="fixed z-40 inset-0 bg-black bg-opacity-30"
          onClick={() => setOpenRemoveModal(false)}
        >
          <div
            className="fixed z-50"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="shadow-lg rounded-md p-8 bg-gray-50 w-72 m-auto">
              <div className="w-full h-full text-center">
                <div className="flex h-full flex-col justify-between">
                  <svg
                    width={40}
                    height={40}
                    className="w-12 h-12 m-auto text-red-500"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z" />
                  </svg>
                  <div className="heading-5 text-secondary mt-4">
                    Remove Payment Method
                  </div>
                  <div className="caption text-secondarypy-2 px-6 mt-4">
                    Are you sure you want to delete your payment method ?

                  </div>
                  <div className="flex items-center justify-between gap-4 w-full mt-12">
                    <button
                      type="button"
                      onClick={removePaymentMethod}
                      className="py-2 px-4  bg-red-600 hover:bg-red-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-sm focus:outline-none rounded-lg "
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenRemoveModal(false)}
                      className="py-2 px-4  bg-white hover:bg-primary hover:bg-opacity-10 w-full transition ease-in duration-200 text-center text-primary text-base font-semibold shadow-md focus:outline-none  rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentMethod;
