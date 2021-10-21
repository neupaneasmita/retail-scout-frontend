import React from "react";
import Followers from "./integrated/Followers";
import SocialGrowth from "./integrated/SocialGrowth";


const Social = () => {
    return(
        <>
            <div className="grid grid-cols-1 lg:grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="col-span-1">
                    <Followers />
                </div>
                <div className="col-span-1">
                    <SocialGrowth />
                </div>
            </div>
        </>
    )
}

export default Social;