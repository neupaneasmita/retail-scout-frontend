import React from "react";

const Toaster = ({isSuccessMessageType, message,showToast, setShowToast}) => {

    if (showToast) {
        setTimeout(() => {
            setShowToast(false);
        }, 10000);
    }

    return (
        <>

            <div
                className={`fixed top-24 right-4  rounded text-secondary w-72 sm:w-96 lg:w-104 z-50 + ${
                    isSuccessMessageType ? "bg-green-200" : "bg-red-200"
                }`}
                role="alert"
            >
                {/* <div
            ref={toastSliderRef}
            className={`h-1 rounded-t + ${
              isSuccessMessageType ? "bg-green-700" : "bg-red-700"
            } + ${showToast && "w-full"}`}
            style={{
              transitionProperty: "width",
              transitionDuration: "10s",
              transitionTimingFunction: "linear",
            }}
          /> */}
                <div className="flex">
                    <div
                        className={`p-3 rounded-l + ${
                            isSuccessMessageType ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        {isSuccessMessageType ? (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 opacity-80"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="white"
                                className="opacity-80"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M6.002 14a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm.195-12.01a1.81 1.81 0 1 1 3.602 0l-.701 7.015a1.105 1.105 0 0 1-2.2 0l-.7-7.015z"/>
                            </svg>
                        )}
                    </div>
                    <div className="w-full flex justify-between px-4 py-3">
                        <div className="">
                            <div className="paragraph font-bold">
                                {isSuccessMessageType ? "Success" : "Error"}
                            </div>
                            <div className="caption">{message}</div>
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => setShowToast(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`"h-4 w-4 opacity-80 stroke-current " + ${
                                    isSuccessMessageType
                                        ? "text-green-500 hover:text-green-700"
                                        : "text-red-500 hover:text-red-700"
                                }`}
                                fill="none"
                                viewBox="0 0 20 20"
                                stroke=""
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export default Toaster;