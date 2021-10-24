import React from 'react';
import image from '../../assets/images/home/dashboard.png';
import {Link} from "react-router-dom";


const PageNotFound = () => {

    return (
        <>
            <div className="relative w-full overflow-hidden">
                {/*Background Div*/}
                <div className="hidden md:block">
                    <div className="absolute bg-cover bg-center w-full h-full top-0 bottom-0 left-1/2 right-0 bg-secondary">
                    </div>
                </div>
                {/*Main Div*/}
                <div className="relative w-full min-h-screen h-full grid sm:grid-cols-1 md:grid-cols-2 content-center items-center px-6 xl:px-0">
                    <div className="col-span-1 p-4">
                        <div className=" w-full text-5xl md:text-6xl xl:text-8xl font-black text-center">404</div>
                        <div className="w-full text-4xl md:text-5xl xl:text-6xl font-black  text-center">Page Not Found</div>
                        <div className="paragraph pt-6 text-center">Sorry, the page you requested could not be
                            found.
                        </div>
                        <div className="text-center">
                            <Link to="/"
                                  className="">
                                <button className="bg-primary rounded-md shadow-lg text-secondary font-semibold p-3 text-base xl:text-xl mt-4 xl:mt-8 focus:outline-none">
                                    Go To Homepage
                                </button>
                            </Link>
                        </div>

                    </div>
                    <div className="col-span-1 mt-6 md:mt-0">
                        <img className="w-full max-h-106 md:-ml-4 lg:-ml-10 xl:-ml-24 shadow-md"
                             src={image}
                             alt=""/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PageNotFound;