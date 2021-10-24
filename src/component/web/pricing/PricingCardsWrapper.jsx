import React, {useState, useEffect} from "react";
import PricingCard from "./integrant/PricingCard";
import axiosInstance from "../../api/axiosInstance";
import jwt_decode from "jwt-decode";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51HmQ6yDvx1549lk5zlQu2UTcarzAgDT2SIP0BLJLWGWuxCvJ4LjtzGePwEVlR4tFRerJQ0wvxlgVsSqRP0ntSbjz00eVVcHLkw"
);
const PricingCardsWrapper = ({ priceToggle }) => {

  const [pricingDetails, setPricingDetails] = useState([]);
  const [hasCurrentPlan, setHasCurrentPlan] = useState(false);

  //Check if logged in
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkIsLoggedIn = () => {
      const access_token = localStorage.getItem("token");
      if(access_token === null) {
        setLoggedIn(false);
      } else {
        const access_token_object = jwt_decode(access_token);
        const email = access_token_object.sub;
        if(email === null){
          setLoggedIn(false);
        } else{
          setLoggedIn(true);
        }
      }
    }
    checkIsLoggedIn();
    if(loggedIn) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  //Fetch products if logged in
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
  }

  const staticPricingCardDetails = [
    {
      title: "Market Insights",
      subTitle: "For a small company that wants to show what it's worth.",
      prices: [
        {
          unit_amount: 360
        },
        {
          unit_amount: 40,
        }
      ],
      features: [
        { feature: "Filmographic Data" },
        {
          feature: "Location",
          tip: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam animi aperiam corporis earum esse eveniet excepturi ipsum magni molestias, neque non optio perspiciatis quisquam ratione recusandae repellat reprehenderit, sit.",
        },
        { feature: "Social Media Insights" },
        { feature: "Product Categories" },
        {
          feature: "Website Traffic Rank",
          tip: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam animi aperiam corporis earum esse eveniet excepturi ipsum magni molestias, neque non optio perspiciatis quisquam ratione recusandae repellat reprehenderit, sit.",
        },
        { feature: "List of Tech Integration" },
      ],
      btnStyle: "secondary-button",
      btnText: "Get Started",
    },
    {
      title: "Sales Lead Generation",
      subTitle: "For a small company that wants to show what it's worth.",
      prices: [
        {
          unit_amount: 1800
        },
        {
          unit_amount: 190,
        }
      ],
      features: [
        {
          feature: "All Market Insights Features",
          tip: "All Market Insights Features is a tip",
        },
        { feature: "Contact Information" },
        {
          feature: "Create Prospect Lists",
          tip: "Create Prospect Lists is a tip",
        },
        { feature: "Export Data" },
        { feature: "Proprietery Brand Rank" },
      ],
      btnStyle: "primary-button",
      btnText: "Get Started",
    },
    {
      title: "Enterprise Solution",
      subTitle: "For a small company that wants to show what it's worth.",
      prices: [
        {
          unit_amount: 9000
        },
        {
          unit_amount: 750,
        }
      ],
      features: [
        { feature: "All Features" },
        {
          feature: "Multi-user Collaboration",
          tip: "Multi-user Collaboration has a tip",
        },
        { feature: "API Access" },
        { feature: "CRM Integration" },
        { feature: "Quality Assurance Support" },
        { feature: "Dedicated Account Manager" },
      ],
      btnStyle: "secondary-button",
      btnText: "Contact Us",
    },
  ];

  //Setting features for loggedin
  const features = staticPricingCardDetails.map((pricingCardDetail) => {
    return pricingCardDetail.features
  });
  const features1 = features[0];
  const features2 = features[1];
  const features3 = features[2];

  return (
    <div className="container-wrapper">
      {/*/!*Pricing Card Section*!/*/}
      <div className="prices-wrapper">
        {loggedIn ? (
          <div className="flex flex-wrap justify-center sm:justify-between px-4">
            
              {pricingDetails.slice(0, 3).reverse().map((pricingCardDetail, index) => {
                const currentPrices = priceToggle ? pricingCardDetail.prices[0] : pricingCardDetail.prices[1];
                return (
                  <PricingCard
                    stripe={stripePromise}
                    hasCurrentPlan={hasCurrentPlan}
                    key={pricingCardDetail.product_id}
                    index={index}
                    priceToggle={priceToggle}
                    title={pricingCardDetail.name}
                    subTitle={pricingCardDetail.description}
                    prices={currentPrices}
                    loggedIn={loggedIn}
                    features1={features1}
                    features2={features2}
                    features3={features3}
                  />
                );
              })}
          
        </div>
        ) : (
          <div className="flex flex-wrap justify-center sm:justify-between px-4">
            {staticPricingCardDetails.map((pricingCardDetail, index) => {
            const currentPrices = priceToggle ? pricingCardDetail.prices[0] : pricingCardDetail.prices[1];
              return (
                  <PricingCard
                      key={index}
                      index={index}
                      priceToggle={priceToggle}
                      title={pricingCardDetail.title}
                      subTitle={pricingCardDetail.subTitle}
                      prices={currentPrices}
                      loggedIn={loggedIn}
                      features={pricingCardDetail.features}
                  />
              );
            })}
        </div>
        )}
        
      </div>
    </div>
  );
};

export default PricingCardsWrapper;
