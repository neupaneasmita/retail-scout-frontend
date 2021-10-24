import React, { useState } from "react";
import Switch from "./integrant/Switch";
import PricingCardsWrapper from "./PricingCardsWrapper";

const Frontpage = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className={"h-full mb-2 sm:mb-10 md:mb-20"}>
      <div className={"bg-secondary pt-8 pb-6 sm:pt-16 sm:pb-10"}>
        <div className="container-wrapper flex flex-col justify-center text-white z-20 text-white">
          <div className="heading-1 text-white text-left md:text-center">
            Turbocharge Your Business <br className="hidden sm:block" /> With
            Retail Scout
          </div>
          <div className="paragraph-body text-divider text-left md:text-center mt-4">
            Choose the plan that suits you best!
          </div>
          <div className="paragraph-body text-white text-center mt-6 md:mt-8 flex md:mx-auto items-center">
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
      </div>

      <div className="relative">
        <div className="absolute w-full bg-secondary -top-px md:-top-0.5 lg:-top-px right-0 z-10 pricing-absolute-bg"></div>
        <div className="w-full">
          {/*Pricing Cards Wrapper*/}
          <PricingCardsWrapper priceToggle={isToggled} />
        </div>
      </div>
    </div>
  );
};

export default Frontpage;
