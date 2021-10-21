import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import PaymentMethod from "./PaymentMethod.jsx";
// import { profileData } from "./profileData.js";
import Tires from "./Tires.jsx";
import ChangePassword from "./ChangePassword.jsx";
import axiosInstance from "../../../component/api/axiosInstance";
import EditProfile from "./EditProfile.jsx";
import Switch from "./integrated/Switch.jsx";

const Profile = ({ match }) => {

  const [openSuccess, setOpenSuccess] = useState(false);
  // const [trialLimitExceed, setTrialLimitExceed] = useState(false);
  const cancelSuccessButtonRef = useRef();
  const openSuccessModal = () => {
    setOpenSuccess(true);
  };
  const closeSuccessModal = () => {
    setOpenSuccess(false);
  };
  const handleSuccessClose = () => {
    closeSuccessModal();
    window.location = "/dashboard/profile"
  };


  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [email, setEmail] = useState("");
  //Pricing Toggle
  const [isToggled, setIsToggled] = useState(false);

  // const [successMessage, setSuccessMessage] = useState(null);
  //Logged profile data
  // let loggedProfileData;
  // loggedProfileData = profileData[0];

  useEffect(() => {
    const id = match.params.id;
    if(id){
      const fetchStoreData = async () => {
         axiosInstance.get(`dashboard/profile/${id}`).then((res)=>{
           console.log(res.data);
          //  setSuccessMessage(res.data.message);
           openSuccessModal();
         }).catch((err)=>{
           console.log(err)
         });
        
      };
      fetchStoreData();
    }    
  }, [match.params.id])
  // useEffect(()=>{
  //   if(successMessage !== null ) {
  //     openSuccessModal();
  //   }
  // },[successMessage ])
  // alert(=successMessage);

  //Close Modal
  const closeModal = () => {
    setOpen(false);
  };
  // opem modal
  const openModal = () => {
    setOpen(true);
  };
  // close modal
  const closeEditModal = () => {
    setOpenEdit(false);
  };
  // opem modal
  const openEditModal = () => {
    setOpenEdit(true);
  };
  const currentListNameRef = useRef(null);
  const logout = () => {
    // const token = localStorage.getItem("token");
    axiosInstance
      .post(`/logout`)
      .then((res) => {
        localStorage.clear();
        window.location = "/";
      })
      .catch((err) => {
        localStorage.clear();
        window.location = "/";
      });
  };
  const getEmail = (data) => {
    let value = data ? data : "your@email.com";
    setEmail(value);
  };
  return (
    <>
      <div className="w-full container-wrapper md:mt-16 mt-12 overflow-x-hidden">
        {/*Profile Row*/}

        <div className="flex flex-col md:flex-row justify-between items-center md:mb-12 mb-8">
          <div className="flex flex-row items-center">
            <div className="w-20 h-20 bg-secondary flex items-center justify-center text-white heading-3 capitalize rounded-full">
                {email.charAt(0)}
            </div>
            <div className="flex flex-col pl-4">
              <div className="paragraph text-black">
                {/* {loggedProfileData.email} */}
                {email}
              </div>
              {/* <button
                className=" text-xs text-secondary w-20 bg-primary rounded-md py-1.5 my-1 cursor-pointer"
                onClick={openEditModal}
              >
                Edit Profile
              </button> */}
              <div
                className="link text-primary cursor-pointer"
                onClick={openModal}
              >
                Change Password
              </div>
              {/*Change Password Modal*/}
              <ChangePassword
                open={open}
                closeModal={closeModal}
                currentListNameRef={currentListNameRef}
              />

            </div>
          </div>
          <div className="py-4">
            <div
              className="primary-button mb-4"
              onClick={openEditModal}
            >
              Edit Profile
            </div>
            <div className="secondary-button" onClick={logout}>
              Log me out!
            </div>
            {/*-------------*/}
            {/*Edit profile modal Modal*/}
            <EditProfile
              open={openEdit}
              closeModal={closeEditModal}
              getEmail={getEmail}
            // currentListNameRef={currentListNameRef}
            />
            {/*-------------*/}
          </div>
        </div>

        {/*Profile Row Ends || Payment Method Starts*/}
        {/* <div className="md:mb-16 mb-12">
          <PaymentMethod />
        </div> */}

        {/*Tires*/}
        <div className="md:mb-16 mb-12" id="tiers">
          <div className="flex w-full">
            <div className="heading-4 text-black mb-6">Change Tiers</div>
          </div>
          <div className="flex w-full">
            <div className="paragraph-body text-secondary text-center my-6 md:mt-8 flex md:mx-auto items-center">
              Bill Monthly
              <span>
                <Switch
                  isToggled={isToggled}
                  onToggled={() => setIsToggled(!isToggled)}
                />
              </span>
              Bill Annually{" "}
              <span className="text-primary">&nbsp;(save up to 25%)</span>
            </div>
          </div>
          <div className="">
            <Tires priceToggle={isToggled} />
          </div>
        </div>
        {/*Cancel  Membership*/}
        <div className="md:mb-16 mb-12">
          <div className="flex w-full">
            <div className="heading-4 text-black mb-2">Cancel Membership</div>
          </div>
          <div className="w-full">
            <div className="paragraph text-black mb-2">
              You will loose access to adjasdlasdljad sadjiksadjdidsjio
              adjsiosajdoidja oijisaj dsjadsijaodsijosdaiasdijiasdj
              sdaijasjddiodsaoijasd
            </div>
          </div>
          <div className="link text-primary cursor-pointer">
            Cancel Membership
          </div>
        </div>
      </div>
    

    {/* On Open Modal */}
      
    <Transition show={openSuccess} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 overflow-y-auto"
          initialFocus={cancelSuccessButtonRef}
          static
          open={openSuccess}
          onClose={closeSuccessModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
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
              <div className="inline-block w-full  max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="pb-6">
                  <div className="flex justify-center">
                      <div className="">
                        <svg focusable="false" width="131" height="145" margin="auto" viewBox="0 0 131 145" fill="none"><g filter="url(#filter0_ddd)"><rect x="35" y="25" width="60.5902" height="74.8467" rx="4" fill="white"></rect></g><rect opacity="0.12" x="42.13" y="33.9097" width="10.6924" height="10.6924" rx="5.34619" fill="#191919"></rect><rect opacity="0.1" x="58.1651" y="37.4744" width="14.2565" height="3.56413" rx="1.78206" fill="#191919"></rect><rect opacity="0.1" x="42.13" y="53.5132" width="10.6924" height="3.56413" rx="1.78206" fill="#191919"></rect><rect opacity="0.1" x="42.13" y="62.4229" width="10.6924" height="3.56413" rx="1.78206" fill="#191919"></rect><rect opacity="0.1" x="77.7701" y="85.5901" width="10.6924" height="3.56413" rx="1.78206" fill="#191919"></rect><rect opacity="0.1" x="58.1651" y="53.5132" width="19.6027" height="3.56413" rx="1.78206" fill="#191919"></rect><rect opacity="0.1" x="58.1651" y="62.4229" width="19.6027" height="3.56413" rx="1.78206" fill="#191919"></rect><rect opacity="0.1" x="42.13" y="85.5901" width="28.513" height="3.56413" rx="1.78206" fill="#191919"></rect><rect opacity="0.05" x="42.13" y="76.6804" width="46.3337" height="3.56413" rx="1.78206" fill="#191919"></rect><defs><filter id="filter0_ddd" x="0" y="0" width="130.59" height="144.847" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="10"></feOffset><feGaussianBlur stdDeviation="17.5"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0.207843 0 0 0 0 0.207843 0 0 0 0 0.207843 0 0 0 0.08 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="5"></feOffset><feGaussianBlur stdDeviation="7.5"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0.208333 0 0 0 0 0.208333 0 0 0 0 0.208333 0 0 0 0.04 0"></feColorMatrix><feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"></feBlend><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="1.5"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"></feColorMatrix><feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow" result="shape"></feBlend></filter></defs></svg>
                      </div>
                  </div>
                  <div className="heading-5 text-primary ">
                    Successfully Paid
                  </div>
                  <div className="heading-3 text-secondary py-3">
                    $990
                  </div>
                  <div className="caption-2 text-text leading-5">
                    An email with your subscription order detail has been sent to your mail address.
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  
                  <button
                    type="button"
                    ref={cancelSuccessButtonRef}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-secondary bg-blue-100 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleSuccessClose}
                  >
                    Close
                  </button> 
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

    
    </>
  );
};

export default Profile;
