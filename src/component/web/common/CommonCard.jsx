import React from "react";

function CommonCard({ title, subTitle, direction }) {
  return (
    <div
      className={`container-wrapper md:flex md:justify-between items-center pb-10 md:py-10 ${direction} font-inter`}
    >
      <div
        className={`flex w-full md:w-3/7 flex-col space-y-3 ${
          direction === "flex-row"
            ? "xl:pr-24 lg:pr-16 md:pr-10"
            : "xl:pl-24 lg:pl-16  md:pl-10"
        }`}
      >
        {/*<div className="text-primary text-sm font-bold text-left">
          Social Media Insights
        </div>*/}
        <div className="heading-3 text-secondary text-left">{title}</div>
        <div className="text-text paragraph text-left">{subTitle}</div>
      </div>
      <div className="flex-1 w-full md:w-96 h-96 md:h-100 bg-gray-200  mt-4 md:mt-0 rounded-md common-card-image-wrapper">
        <div className="">{/*=================*/}</div>
      </div>
    </div>
  );
}

export default CommonCard;
