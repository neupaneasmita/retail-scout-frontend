import React, { useState } from "react";
import JoinRetail from "../common/JoinRetail";
import logo from "../../../assets/images/home/logo.svg";
import Facebook from "../../../assets/images/home/Facebook.svg";
import Twitter from "../../../assets/images/home/Twitter.svg";
import Linkedin from "../../../assets/images/home/Linkedin.svg";
import Google from "../../../assets/images/home/Google.svg";
import { Link } from "react-router-dom";

function Footer() {
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
  //Items for Sloutions ....
  // const items = ["Market Insights", "Lead Generation", "Enterprise Solution"];

  //Subscribe Form
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (subscribeEmail) {
      // console.log(subscribeEmail);
      setSubscribeEmail("");
      setSubmitted(false);
    }

  }
  return (
    <div className="bg-secondary">
      <JoinRetail />
      <div className="container-wrapper py-6 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="col-span-1">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="col-span-1">
            <div className="link text-white opacity-80">Contact</div>
            <ul className="text-white paragraph-body space-y-4 mt-4">
              <li>
                <a href={`tel:554-333-2147`}>554 333 2147</a>
              </li>
              <li>
                <a href={`mailto:hello@retailscout.com`}>
                  hello@retailscout.com
                </a>
              </li>
              <li className="flex space-x-1">
                {socialLinks.map((link, index) => {
                  return (
                    <div key={index} className="cursor-pointer">
                      <img src={link.logo} alt="" />
                    </div>
                  );
                })}
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <div className="link text-white opacity-80">Company</div>
            <ul className="text-white paragraph-body space-y-4 mt-4">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            {/* <div className="link text-white opacity-80">Solutions</div>
            <ul className="text-white paragraph-body space-y-4 mt-4">
              {items.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={`/solutions/${item}`}>{item}</Link>
                  </li>
                );
              })}
            </ul> */}
            <div className="link text-white opacity-80">Updates</div>
            <div className="text-white paragraph-body mt-4">
              Sign up and receive our latest update notifications
            </div>
            <div className="mt-4">
              <div className="text-white paragraph-body mb-2">
                Write your email
              </div>
              <form onSubmit={handleSubmit}>
                <input type="email"
                  value={subscribeEmail}
                  onChange={e => setSubscribeEmail(e.target.value)}
                  placeholder="Your Email"
                  className="px-10 py-2.5 text-white text-sm rounded-lg outline-none focus:outline-none bg-gray-700 bg-opacity-30 md:w-full" />
                {submitted && !subscribeEmail && <div className="text-red-600 mt-2">Please fill email address.</div>}
                <button type="submit" className="primary-button mt-5 block md:w-full" >Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        <div
          className="
                                      md:flex
                                      space-y-2
                                      md:space-y-0
                                      justify-between
                                      text-white
                                      pt-10
                                      md:pt-20"
        >
          <div
            className="
                                      paragraph-body"
          >
            &copy; 2021 Retail Scout
          </div>
          <div
            className="
                                      flex
                                      space-x-4
                                      link"
          >
            <div>Privacy Policy</div>
            <div>Terms & Conditions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
