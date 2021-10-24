import React from "react";
import CommonCard from "../common/CommonCard";
import Frontpage from "./Frontpage";
import RatingPage from "../home/RatingPage";

function Home() {
    return (
        <div>
            <Frontpage />
            <CommonCard
                title={"Get up-to-date contact information"}
                subTitle={
                    "Optimize your outbound leads with public emails, phone numbers, LinkedIn pages, and relevant contact information for key decision makers."
                }
                direction={"flex-row"}
            />
            <CommonCard
                title={"Search by product description"}
                subTitle={
                    "Search across half a billion products to discover relevant products and brands."
                }
                direction={"flex-row-reverse"}
            />
            <CommonCard
                title={"Rank brands by growth & popularity"}
                subTitle={
                    "Sort by fastest growing brands or most visited brands using our proprietary rank metrics."
                }
                direction={"flex-row"}
            />
            <CommonCard
                title={"Discover technologies used by brands"}
                subTitle={
                    "Browse through the lists of apps, widgets, and other technology integrations used by brands online."
                }
                direction={"flex-row-reverse"}
            />
            <CommonCard
                title={"Create and export prospect lists"}
                subTitle={
                    "Add relevant stores to your custom lists, and export the lists from our platform."
                }
                direction={"flex-row"}
            />
            <RatingPage />
        </div>
    );
}

export default Home;
