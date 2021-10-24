import React from "react";
import mainImg from "../../../assets/images/solutions/pexelsFauxels.jpg";
import background from "../../../assets/images/about/Rectangle.jpg";
import rectangleImg1 from "../../../assets/images/about/RectangleImg1.jpg";

const AboutItemDetails = ({ match }) => {
  let aboutItems = [
    {
      id: `1`,
      image: `${rectangleImg1}`,
      title: `The importance of data in Retail 1`,
      metaLine: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt vel sed tristique tincidunt scelerisque volutpat proin amet.`,
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium nostrum tenetur veritatis. At commodi eos iusto minus nesciunt odio, voluptate. Aspernatur delectus quaerat sint? Consequatur doloribus est inventore nesciunt reprehenderit.
Lorem ip                    sum dolor sit amet, consectetur adipisicing elit. Accusantium nostrum tenetur veritatis. At commodi eos iusto minus nesciunt odio, voluptate. Aspernatur delectus quaerat sint? Consequatur doloribus est inventore nesciunt reprehenderit.
Lorem ip                    sum dolor sit amet, consectetur adipisicing elit. Accusantium nostrum tenetur veritatis. At commodi eos iusto minus nesciunt odio, voluptate. Aspernatur delectus quaerat sint? Consequatur doloribus est inventore nesciunt reprehenderit.`,
    },
    {
      id: `2`,
      image: `${mainImg}`,
      title: `The importance of data in Retail 2`,
      metaLine: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt vel sed tristique tincidunt scelerisque volutpat proin amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt vel sed tristique tincidunt scelerisque volutpat proin amet.`,
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium nostrum tenetur veritatis. At commodi eos iusto minus nesciunt odio, voluptate. Aspernatur delectus quaerat sint? Consequatur doloribus est inventore nesciunt reprehenderit.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium nostrum tenetur veritatis. At commodi eos iusto minus nesciunt odio, voluptate. Aspernatur delectus quaerat sint? Consequatur doloribus est inventore nesciunt reprehenderit.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium nostrum tenetur veritatis. At commodi eos iusto minus nesciunt odio, voluptate. Aspernatur delectus quaerat sint? Consequatur doloribus est inventore nesciunt reprehenderit.`,
    },
  ];
  aboutItems = aboutItems
    .filter(function (item) {
      return item.title === match.params.title;
    })
    .map(function ({ id, image, title, metaLine, description }) {
      return { id, image, title, metaLine, description };
    });

  return (
    <div className="">
      <div className={"bg-secondary pt-8 pb-6 md:pt-16"}>
        <div className="container-wrapper flex flex-col justify-center text-white z-20 text-white px-0 sm:px-10 md:px-20 lg:px-36">
          {/*Title*/}
          <div className="heading-1 text-white text-left md:text-center">
            {aboutItems[0].title}
          </div>
          {/*Main Line*/}
          <div className="paragraph-body text-white mt-4 text-left md:text-center opacity-80">
            {aboutItems[0].metaLine}
          </div>
        </div>
      </div>
      {/*Image Section*/}
      <div className="relative mb-10 md:mb-16">
        <div
          className="absolute w-full"
          style={{
            backgroundImage: `url(${background})`,
            top: `-2px`,
            bottom: `50%`,
          }}
        ></div>
        <div className="relative w-full z-20 container-wrapper">
          <img
            src={aboutItems[0].image}
            alt=""
            className="mx-auto object-contain rounded-md shadow-2xl max-h-106"
          />
        </div>
      </div>
      {/*About Details*/}
      <div className="container-wrapper pb-10 md:pb-20">
        <div className="paragraph text-secondary">
          {aboutItems[0].description}
        </div>
      </div>
    </div>
  );
};

export default AboutItemDetails;
