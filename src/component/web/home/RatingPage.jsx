import React from "react";
import quote1 from "../../../assets/images/home/Quote_1.svg";
import quote2 from "../../../assets/images/home/Quote_2.svg";
import cytiva from "../../../assets/images/home/cytiva.png";
import user from "../../../assets/images/home/user.png";

function RatingPage() {
  return (
    <>
      <div className="bg-primarygray pt-7 pb-10 md:py-30  justify-center mt-0 md:mt-20">
        <div className="container-wrapper flex items-start">
          <img src={quote1} alt="" className="mr-4 md:mr-10" />
          <div className="">
            <div className="testimonial-text text-secondary">
              “Never get involved in the office pity party, or complaint
              sessions that come your way. Seek out people that support you and
              that you feel good being around and use people to replace the
              negative people in our life. Most damaging source of negativity is
              ourselves.”
            </div>
            <div className="flex mx-auto space-x-3 mt-6 items-center">
              <div>
                <img src={user} alt="" />
              </div>
              <div className="flex flex-col">
                <div className="link text-secondary mb-1">Cordelia Freeman</div>
                <div className="caption text-text">Head Of Sales, Intel</div>
              </div>
            </div>
            <div className="mt-6">
              <img src={cytiva} alt="" className="" />
            </div>
          </div>
          <img src={quote2} alt="" className="hidden md:block md:ml-10" />
        </div>
      </div>
    </>
  );
}

export default RatingPage;
