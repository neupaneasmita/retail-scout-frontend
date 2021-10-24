import React from "react";
import rectangleImg1 from "../../../../assets/images/about/RectangleImg1.jpg";
import rectangleImg2 from "../../../../assets/images/about/RectangleImg2.jpg";
import arrowRight from "../../../../assets/images/about/arrow-right.svg";
import {NavLink} from "react-router-dom";

const AboutCardItem = () => {

    const aboutItems = [
        {
            id: `1`,
            image: `${rectangleImg1}`,
            title: `The importance of data in Retail 1`,
            metaLine: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt vel sed tristique tincidunt scelerisque volutpat proin amet.`
        },
        {
            id: `2`,
            image: `${rectangleImg2}`,
            title: `The importance of data in Retail 2`,
            metaLine: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt vel sed tristique tincidunt scelerisque volutpat proin amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt vel sed tristique tincidunt scelerisque volutpat proin amet.`
        }
    ]

    return(
        <>
            {aboutItems.map( (aboutItem, index) => {
                return(
                    <div className="lg:w-1/2 px-0 sm:px-5 md:px-12 mb-6 lg:px-0 -mx-10" key={index}>
                        <img src={aboutItem.image} alt="" className="w-full object-cover" />
                        <div className="heading-5 text-black mt-3.5">
                            {aboutItem.title}
                        </div>
                        <div className="paragraph text-text line-clamp-2 mt-3.5">
                            {aboutItem.metaLine}
                        </div>
                        <NavLink to={`about/${aboutItem.title}`} className="cursor-pointer">
                            <div className="paragraph flex flex-nowrap items-center text-primary cursor-pointer mt-3.5">
                                Read More
                                <span className="ml-1">
                                <img src={arrowRight} alt="" className="" />
                            </span>
                            </div>
                        </NavLink>
                    </div>
                )
            })}
        </>
    )
}

export default AboutCardItem;