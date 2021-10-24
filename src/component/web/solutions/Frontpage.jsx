import React from "react";
import mainImg from '../../../assets/images/solutions/pexelsFauxels.jpg';
import btnPlay from '../../../assets/images/solutions/ButtonPlay.svg';
import background from "../../../assets/images/solutions/Rectangle.jpg";

function Frontpage() {
    // const wrapperStyle = {
    //     height: "550px"
    // };
    const imgStyle = {
        maxHeight: "38rem"
    }


    return (
        <div className={""}>
            <div className={"bg-secondary pt-8 pb-6 sm:pt-16 sm:pb-10"}>
                <div className="container-wrapper flex flex-col justify-center text-white z-20 text-white">
                     <div className="heading-1 text-white text-left md:text-center">
                         Discover The Fastest <br className="hidden sm:block" /> Growing Brands
                     </div>
                     <div className="paragraph text-white mt-4 md:text-center">
                         You need accurate, affordable, and actionable market insights.
                         <br className="hidden sm:block" />
                         Retail Scout is your real-time brand encyclopedia powered by AI.
                     </div>
                 </div>
            </div>
            {/*Image Section*/}
            <div className="relative mb-10 md:mb-20">
                <div className="absolute w-full" style={{ backgroundImage: `url(${background})`, top: `-1px`, bottom: `53%` }}>
                </div>
                <div className="relative w-full z-20 container-wrapper">
                    <img src={mainImg} alt="" className="w-full rounded-md shadow-2xl" style={imgStyle} />
                    <div className="absolute cursor-pointer" style={{bottom: `46%`, left: `46%`}}>
                        <img src={btnPlay} alt="" className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 z-40" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Frontpage;
