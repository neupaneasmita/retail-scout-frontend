import React from "react";
import frontImg from "../../../assets/images/about/frontImg.svg";

const Frontpage = () => {
  return (
    <div className={"h-full"}>
      <div className={"bg-secondary pt-8 pb-6 md:pt-16 md:pb-16 lg:pb-36"}>
        <div className="container-wrapper flex flex-col justify-center text-white z-20 text-white">
          <div className="heading-1 text-left md:text-center">
            Real-time Retail Encyclopedia at <br className="hidden lg:block" />{" "}
            Your Fingertips
          </div>
          <div className="paragraph text-white text-left md:text-center mt-4">
            You need accurate, affordable, and actionable market insights.
            <br className="hidden sm:block" />
            Retail Scout is your real-time brand encyclopedia powered by AI.
          </div>
        </div>
        <div className="container-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-6 md:pt-12 lg:pt-24">
            <div className="">
              <img src={frontImg} alt="" className="w-full h-full" />
            </div>
            <div className="">
              <div className="paragraph text-white mb-2">
                Businesses use Retail Scout to supercharge revenue growth with
                data-informed decisions. We collect the most comprehensive data
                on direct-to-consumer brands and products, and provide this data
                through an intuitive platform. Using both AI and a
                quality-assurance team, we continually update our data to
                provide the most up-to-date information. Our mission is to
                empower businesses with the data and technology they need to
                drive what matters: growth.
              </div>
              <div className="paragraph text-white">
                Retail Scout was founded by a team of engineers, data
                scientists, and product designers. We are a global team with
                locations from Palo Alto, California to Kathmandu, Nepal. We are
                committed to delivering products that feel like superpowers to
                eCommerce professionals.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frontpage;
