import React, {useEffect, useState} from 'react'
import {ReactComponent as ArrowDown} from "../../../../assets/images/dashboard/arrow down.svg";
import Checkbox from "./Checkbox.jsx";

const statusData = [
    {
        id: 1,
        name: "Active",
        label: "Active",
        count: "41,212,168"
    },
    {
        id: 2,
        name: "Password_Protected",
        label: "Password Protected",
        count: "1,212,168"
    },
    {
        id: 3,
        name: "Inactive",
        label: "Inactive",
        count: "212,168"
    }
];

const StatusFilters = ({data, checkedItems, setCheckedItems, handleChange}) => {
    const [showStatus, setShowStatus] = useState(true);

    //For Mobile View
    /*useEffect(() => {
        const innerWidth = window.innerWidth;
        if (innerWidth <= 1023) {
            setShowStatus(false);
        }
    }, [innerWidth])*/

    return(
        <>
            <div className="mb-4">
                    <div className="mb-6">
                        <div className="flex justify-between items-center">
                            <div className="paragraph text-secondary">
                                Status
                            </div>
                            <ArrowDown className={`ml-2 cursor-pointer ${!showStatus && 'transform rotate-180'}`}
                                       onClick={() => setShowStatus(!showStatus)}/>
                        </div>
                    </div>

                    {/*Status Data's*/}
                    {showStatus && (
                        <div className="">
                            {statusData.map((item, index) => (
                                <div key={index}
                                     className="flex justify-between items-center pb-3">
                                    <div>
                                        <Checkbox
                                            label={item.label}
                                            name={item.name}
                                            checked={checkedItems[item.name]}
                                            onChange={(event) => handleChange(event, item.id, item.label)}
                                        />
                                    </div>
                                    <div className="caption text-secondary">
                                        {item.count}
                                    </div>
                                </div>
                            ))}
                        </div>

                    )}
                </div>
        </>
    )
}
export default StatusFilters;