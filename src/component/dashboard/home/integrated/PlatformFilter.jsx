import React, {useEffect, useState} from 'react'
import {ReactComponent as Search} from "../../../../assets/images/dashboard/filter search.svg";
import {ReactComponent as ArrowDown} from "../../../../assets/images/dashboard/arrow down.svg";
import Checkbox from "./Checkbox.jsx";

const platformData = [
    {
        id: 1,
        name: "WooCommerce",
        label: "WooCommerce",
        count: "41,212,168"
    },
    {
        id: 2,
        name: "Shopify",
        label: "Shopify",
        count: "5,212,433"
    },
    {
        id: 3,
        name: "Wix",
        label: "Wix",
        count: "10,212,433"
    },
    {
        id: 4,
        name: "PrestaShop",
        label: "PrestaShop",
        count: "212,433"
    },
    {
        id: 5,
        name: "Magento",
        label: "Magento",
        count: "12,433"
    },
    {
        id: 6,
        name: "BigCartel",
        label: "BigCartel",
        count: "98,212,433"
    }
];

const PlatformFilter = ({data, checkedItems, setCheckedItems, handleChange}) => {

    const [platformSearch, setPlatformSearch] = useState('');
    //Show Platform
    const [showPlatform, setShowPlatform] = useState(true);
    const [filteredPlatformData, setFilteredPlatformData] = useState([]);

    //Get Platform Data only...
/*    let platformData = data.map(item => item.platform);
    platformData = [...new Map(platformData.map(item => [JSON.stringify(item), item])).values()];*/

    //Platform Search
    useEffect(() => {
        setFilteredPlatformData(
            platformData.filter((item) =>
                item.label.toLowerCase().includes(platformSearch.toLowerCase())
            )
        );
    }, [platformSearch, platformData]);
    //For Mobile View
    /*useEffect(() => {
        const innerWidth = window.innerWidth;
        if (innerWidth <= 1023) {
            setShowPlatform(false);
        }
    }, [])*/

    return(
        <>
            <div className="mb-8">
                <div className="mb-6">
                    <div className="flex justify-between items-center">
                        <div className="paragraph text-secondary">
                            Platform
                        </div>
                        <div className="flex">
                            <div className="relative flex items-center">
                                {/*Search Input*/}
                                <input placeholder=""
                                       className="relative bg-transparent focus:outline-none active:border-b-2 active:border-indigo-600 border-transparent border-b-2 focus:border-secondary z-20"
                                       onChange={(e) => setPlatformSearch(e.target.value)}/>
                                <div className="absolute top-0 right-0 -mt-1 mr-4 z-10">
                                    <Search/>
                                </div>
                                {/*Platform Search Toggler*/}
                                <ArrowDown className={`ml-2 cursor-pointer ${!showPlatform && 'transform rotate-180'}`}
                                           onClick={() => setShowPlatform(!showPlatform)}/>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Platform Data's*/}
                {showPlatform && (
                    <>
                        <div className="">
                                {filteredPlatformData.map((item, index) => (
                                    <div key={index}
                                         className="flex justify-between items-center pb-3">
                                        <div>
                                            <Checkbox
                                                label={item.label}
                                                name={item.name}
                                                checked={checkedItems[item.name]}
                                                onChange={(event) => handleChange(event, item.id)}
                                            />
                                        </div>
                                        <div className="caption text-secondary">
                                            {item.count}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        {/*<div className="">
                            {platformObj.map((item, index) => (
                                <div key={index}
                                     className="flex justify-between items-center pb-3">
                                    <div>
                                        <Checkbox
                                            label={item}
                                            name={item}
                                            checked={checkedItems[item]}
                                            onChange={(event) => handleChange(event, item.id, item)}
                                        />
                                    </div>
                                    <div className="caption text-secondary">
                                        1111 - C
                                    </div>
                                </div>
                            ))}
                        </div>*/}
                        <div className="link text-secondary">
                            Show more
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default PlatformFilter;