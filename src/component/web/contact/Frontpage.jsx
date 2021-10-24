import React from "react";
import ContactForm from "./integrated/ContactForm";
import Twitter from "../../../assets/images/home/Twitter.svg";
import Linkedin from "../../../assets/images/home/Linkedin.svg";
import Google from "../../../assets/images/home/Google.svg";
import Facebook from "../../../assets/images/home/Facebook.svg";

const Frontpage = () => {
    const socialLinks = [
        {
            logo: Twitter,
        },
        {
            logo: Linkedin,
        },
        {
            logo: Google,
        },
        {
            logo: Facebook,
        },
    ];

    return (
        <div className="bg-secondary pt-8 pb-6 sm:pt-16 sm:pb-10">
            <div className="md:flex w-full container-wrapper overflow-x-hidden relative">
                <div className="w-full sm:pr-20 md:pr-24 lg:pr-28">
                    <div className="heading-2 text-white text-left mb-6 md:mb-10">
                        Get In Touch
                    </div>
                    <ContactForm/>
                </div>
                <div className="pr-10 pb-4 md:pb-0">
                    <div className="col-span-1 mt-10 md:mt-24">
                        <div className="text-white paragraph-body">Connect with Us</div>
                        <ul className="text-white space-y-3 mt-5">
                            <li className="flex space-x-1">
                                {socialLinks.map((link, index) => {
                                    return (
                                        <div key={index}
                                             className="cursor-pointer">
                                            <img src={link.logo}
                                                 alt=""/>
                                        </div>
                                    );
                                })}
                            </li>
                        </ul>
                        <ul className="text-white paragraph-body mt-7">
                            <li className="mb-4">Technical Support</li>
                            <li className="mb-2">Please contact us at</li>
                            <li>support@retailscout.com</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Frontpage;