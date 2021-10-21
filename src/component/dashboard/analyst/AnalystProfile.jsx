import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import arrowLeft from "../../../assets/images/dashboard/analyst/arrow-left.svg";
import twitter from "../../../assets/images/dashboard/social/twitter.svg";
import linkedin from "../../../assets/images/dashboard/social/linkedin.svg";
import facebook from "../../../assets/images/dashboard/social/facebook.svg";
import instagram from "../../../assets/images/dashboard/social/instagram.svg";
import pinterest from "../../../assets/images/dashboard/social/pinterest.svg";
import tiktok from "../../../assets/images/dashboard/social/tiktok.svg";
import youtube from "../../../assets/images/dashboard/social/youtube.svg";
import mapPin from "../../../assets/images/dashboard/analyst/map-pin.svg";
import language from "../../../assets/images/dashboard/analyst/language.svg";
import monitor from "../../../assets/images/dashboard/analyst/monitor.svg";
import box from "../../../assets/images/dashboard/analyst/box.svg";
import trendingUp from "../../../assets/images/dashboard/analyst/trending-up.svg";
import circle from "../../../assets/images/dashboard/analyst/circle.svg";

const AnalystProfile = ({ filteredData }) => {
  const currentName = filteredData.name;
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const errorImg = (e) => {
    if (e.type === "error") {
      setIsImageLoaded(false);
    }
  };

  return (
    <>
      <div className="p-6 bg-primarygray md:mt-18">
        <div className="flex flex-col overflow-x-hidden">
          {/*Back*/}
          <div className="pl-2">
            <img
              src={arrowLeft}
              onClick={goBack}
              className="w-7 h-7 cursor-pointer"
              alt=""
            />
          </div>
          {/*Profile*/}
          <div className="flex flex-row flex-nowrap items-center py-6">
            {/* Showing Avatar for Error Image */}
            {isImageLoaded ? (
              <img
                src={filteredData.logo}
                alt=""
                onError={errorImg}
                className="w-10 h-10 object-contain rounded-full"
              />
            ) : (
              <div
                className={`w-10 h-10  flex-none rounded-full capitalize bg-secondary text-white text-center`}
              >
                <div className="link mt-2.5">{currentName.charAt(0)}</div>
              </div>
            )}

            <div className="flex flex-col pl-2">
              <div className="paragraph text-secondary">
                {filteredData.name}
              </div>

              <div className="caption text-text">
                <Link
                  to={{ pathname: `${filteredData.base_url}` }}
                  className="cursor-pointer"
                  target="_blank"
                >
                  {filteredData.store_id}
                </Link>
              </div>
            </div>
          </div>
          {/*Description*/}
          <div className="paragraph pb-6">{filteredData.title}</div>
          {/*Social Links*/}
          <div className="inline-flex items-center space-x-4">
            {filteredData.social_links.twitter && (
              <Link
                to={{ pathname: `${filteredData.social_links.twitter}` }}
                className="cursor-pointer"
                target="_blank"
              >
                <img src={twitter} alt="" />
              </Link>
            )}
            {filteredData.social_links.linkedin && (
              <Link
                to={{ pathname: `${filteredData.social_links.linkedin}` }}
                className="cursor-pointer"
                target="_blank"
              >
                <img src={linkedin} alt="" />
              </Link>
            )}
            {filteredData.social_links.facebook && (
              <Link
                to={{ pathname: `${filteredData.social_links.facebook}` }}
                className="cursor-pointer"
                target="_blank"
              >
                <img src={facebook} alt="" />
              </Link>
            )}
            {filteredData.social_links.instagram && (
              <Link
                to={{ pathname: `${filteredData.social_links.instagram}` }}
                className="cursor-pointer"
                target="_blank"
              >
                <img src={instagram} alt="" />
              </Link>
            )}
            {filteredData.social_links.youtube && (
              <Link
                to={{ pathname: `${filteredData.social_links.youtube}` }}
                className="cursor-pointer"
                target="_blank"
              >
                <img src={youtube} alt="" />
              </Link>
            )}
            {filteredData.social_links.pinterest && (
              <Link
                to={{ pathname: `${filteredData.social_links.pinterest}` }}
                className="cursor-pointer"
                target="_blank"
              >
                <img src={pinterest} alt="" />
              </Link>
            )}
            {filteredData.social_links.tiktok && (
              <Link
                to={{ pathname: `${filteredData.social_links.tiktok}` }}
                className="cursor-pointer"
                target="_blank"
              >
                <img src={tiktok} alt="" />
              </Link>
            )}
          </div>

          {/*Divider*/}
          <div className="h-px bg-divider w-full my-8"></div>

          {/*Additional Information*/}
          {/*Location*/}
          <div className="flex flex-row flex-wrap pb-2 items-center">
            <img src={mapPin} alt="" className="pr-2" />
            <div className="text-sm sm:text-base text-secondary font-semibold">
              Location:&nbsp;
            </div>
            <div className="paragraph text-text mr-2">
            {filteredData.locations && filteredData.locations[0] ? (
              <>{filteredData.locations[0]}</>
            ) : <>{filteredData.country}</>}
            </div>
          </div>
          {/*Language*/}
          <div className="flex flex-row flex-wrap pb-2 items-center">
            <img src={language} alt="" className="pr-2" />
            <div className="text-sm sm:text-base text-secondary font-semibold">
              Language:&nbsp;
            </div>
            <div className="paragraph text-text">{filteredData.language}</div>
          </div>
          {/*Platform*/}
          <div className="flex flex-row flex-wrap py-2 items-center">
            <img src={monitor} alt="" className="pr-2" />
            <div className="text-sm sm:text-base text-secondary font-semibold">
              Platform:&nbsp;
            </div>
            <div className="paragraph text-text">{filteredData.platform}</div>
          </div>

          {/*Store Rank*/}
          <div className="flex flex-row flex-wrap py-2 items-center">
            <img src={trendingUp} alt="" className="pr-2" />
            <div className="text-sm sm:text-base text-secondary font-semibold">
              Store Rank:&nbsp;
            </div>
            <div className="paragraph text-text">
              {/*{filteredData.store_rank}*/}
            </div>
          </div>
          {/*Status*/}
          <div className="flex flex-row flex-wrap py-2 items-center">
            <img src={circle} alt="" className="pr-2" />
            <div className="text-sm sm:text-base text-secondary font-semibold">
              Company Size:&nbsp;
            </div>
            <div className="paragraph text-text">
              {filteredData.company_size}
            </div>
          </div>
          {/*Product Categories*/}
          <div className="flex flex-row flex-wrap py-2 items-center">
            <img src={box} alt="" className="pr-2" />
            <div className="text-sm sm:text-base text-secondary font-semibold">
              Product Categories:&nbsp;
            </div>
            {filteredData.product_categories.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border border-text rounded py-px px-1 m-1 cursor-pointer"
                >
                  <div className="paragraph text-text">{item}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalystProfile;
