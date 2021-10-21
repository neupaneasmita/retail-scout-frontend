import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import TiresCard from "./TiresCard.jsx";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51HmQ6yDvx1549lk5zlQu2UTcarzAgDT2SIP0BLJLWGWuxCvJ4LjtzGePwEVlR4tFRerJQ0wvxlgVsSqRP0ntSbjz00eVVcHLkw"
);

const Tires = ({ priceToggle }) => {

  const [pricingDetails, setPricingDetails] = useState([]);
  const [hasCurrentPlan, setHasCurrentPlan] = useState(false);
  //Fetch pricing details
  useEffect(() => {

    const setupElements = () => {
      axiosInstance.get("/public-key")
        .then((res) => {
          // console.log(res.data);
          // setStripe(res.data.publicKey);
          //stripe = loadStripe(res.data.publicKey);
          //console.log(stripe)
        });
        // .then((res) => {
        //   console.log(res.publicKey);
        //   // stripe = loadStripe(res.data.publicKey);
        // });
    };
    setupElements();

    fetchData();
       // eslint-disable-next-line
  }, []);

  // const stripe = stripePromise;
  // console.log(stripe);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/get-products`);
      // console.log(response.data);
      setPricingDetails(response.data);
      checkHasCurrentPlan(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Check if current plan exists
  const checkHasCurrentPlan = (data) => {
    if(data[0].user_current_plan === true || data[1].user_current_plan === true || data[2].user_current_plan === true){
      setHasCurrentPlan(true)
    }else{
      setHasCurrentPlan(false)
    }
    // {data[0].user_current_plan === true || data[1].user_current_plan === true || data[2].user_current_plan === true ? 
    //   setHasCurrentPlan(true) : setHasCurrentPlan(false)
    // }
  }
  

  // const pricingCardDetails = [
  //   {
  //     title: "Market Insights",
  //     subTitle: "For a small company that wants to show what it's worth.",
  //     monthlyPrice: 40,
  //     annualPrice: 30,
  //     features: [
  //       { feature: "Filmographic Data" },
  //       {
  //         feature: "Location",
  //         tip: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam animi aperiam corporis earum esse eveniet excepturi ipsum magni molestias, neque non optio perspiciatis quisquam ratione recusandae repellat reprehenderit, sit.",
  //       },
  //       { feature: "Social Media Insights" },
  //       { feature: "Product Categories" },
  //       {
  //         feature: "Website Traffic Rank",
  //         tip: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam animi aperiam corporis earum esse eveniet excepturi ipsum magni molestias, neque non optio perspiciatis quisquam ratione recusandae repellat reprehenderit, sit.",
  //       },
  //       { feature: "List of Tech Integration" },
  //     ],
  //     btnStyle: "light-primary-button",
  //     btnText: "Current Plan",
  //   },
  //   {
  //     title: "Sales Lead Generation",
  //     subTitle: "For a small company that wants to show what it's worth.",
  //     monthlyPrice: 190,
  //     annualPrice: 150,
  //     features: [
  //       {
  //         feature: "All Market Insights Features",
  //         tip: "All Market Insights Features is a tip",
  //       },
  //       { feature: "Contact Information" },
  //       {
  //         feature: "Create Prospect Lists",
  //         tip: "Create Prospect Lists is a tip",
  //       },
  //       { feature: "Export Data" },
  //       { feature: "Proprietery Brand Rank" },
  //     ],
  //     btnStyle: "primary-button",
  //     btnText: "Upgrade",
  //   },
  //   {
  //     title: "Enterprise Solution",
  //     subTitle: "For a small company that wants to show what it's worth.",
  //     monthlyPrice: 900,
  //     annualPrice: 750,
  //     features: [
  //       { feature: "All Features" },
  //       {
  //         feature: "Multi-user Collaboration",
  //         tip: "Multi-user Collaboration has a tip",
  //       },
  //       { feature: "API Access" },
  //       { feature: "CRM Integration" },
  //       { feature: "Quality Assurance Support" },
  //       { feature: "Dedicated Account Manager" },
  //     ],
  //     btnStyle: "secondary-button",
  //     btnText: "Contact Us",
  //   },
  // ];

  return (
    <>
      <div className="">
        <div className="prices-wrapper">
          <div className="flex flex-wrap justify-center sm:justify-between px-4">
            {pricingDetails.slice(0, 3).reverse().map((pricingCardDetail, index) => {
              const currentPrices = priceToggle ? pricingCardDetail.prices[0] : pricingCardDetail.prices[1];
              return (
                <TiresCard
                  stripe={stripePromise}
                  reFetchData={fetchData}
                  hasCurrentPlan={hasCurrentPlan}
                  key={pricingCardDetail.product_id}
                  index={index}
                  priceToggle={priceToggle}
                  title={pricingCardDetail.name}
                  subTitle={pricingCardDetail.description}
                  prices={currentPrices}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tires;
