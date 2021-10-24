import React from "react";
import AboutCardItem from "./integrant/AboutCardItem";

const AboutCardItemsWrapper = () => {

    return(
        <div className="container-wrapper pt-6 pb-10 md:py-20">
            <div className="flex flex-wrap w-full justify-center lg:justify-between px-10">
                {/*About Items*/}
                <AboutCardItem />
            </div>
        </div>
    )
}

export default AboutCardItemsWrapper;