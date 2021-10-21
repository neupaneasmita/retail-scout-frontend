import React, {useEffect, useState} from 'react'
import {ReactComponent as Search} from "../../../../assets/images/dashboard/filter search.svg";
import {ReactComponent as ArrowDown} from "../../../../assets/images/dashboard/arrow down.svg";
import Checkbox from "./Checkbox.jsx";

const searchMonthData = [
    {
        id: 1,
        name: "2021-03",
        label: "2021-03",
        count: "41,212,168"
    },
    {
        id: 2,
        name: "2021-02",
        label: "2021-02",
        count: "5,212,433"
    },
    {
        id: 3,
        name: "2021-01",
        label: "2021-01",
        count: "10,212,433"
    },
    {
        id: 4,
        name: "2020-12",
        label: "2020-12",
        count: "212,433"
    },
    {
        id: 5,
        name: "2020-11",
        label: "2020-11",
        count: "12,433"
    },
    {
        id: 6,
        name: "2020-10",
        label: "2020-10",
        count: "98,212,433"
    }
];
const DateFilter = ({data, checkedItems, setCheckedItems, handleChange}) => {
    const [monthSearch, setMonthSearch] = useState('');
    const [filteredSearchMonthData, setFilteredSearchMonthData] = useState([]);
    const [showSearchMonth, setShowSearchMonth] = useState(true);

    //Month Data Search
    useEffect(() => {
        setFilteredSearchMonthData(
            searchMonthData.filter((item) =>
                item.label.toLowerCase().includes(monthSearch.toLowerCase())
            )
        );
    }, [monthSearch, searchMonthData]);

    //For Mobile View
    /*useEffect(() => {
        const innerWidth = window.innerWidth;
        if (innerWidth <= 1023) {
            setShowSearchMonth(false);
        }
    }, [innerWidth]);*/

    return(
        <>
            <div className="mb-8">
                <div className="mb-6">
                    <div className="flex justify-between items-center">
                        <div className="paragraph text-secondary">
                            Search Month
                        </div>
                        <div className="flex">
                            <div className="relative flex items-center">
                                {/*Search Input*/}
                                <input placeholder=""
                                       onChange={(e) => setMonthSearch(e.target.value)}
                                       className="relative bg-transparent focus:outline-none active:border-b-2 active:border-indigo-600 border-transparent border-b-2 focus:border-secondary z-20"/>
                                <div className="absolute top-0 right-0 -mt-1 mr-4 z-10">
                                    <Search/>
                                </div>
                                {/*Search Month Search Toogler*/}
                                <ArrowDown className={`ml-2 cursor-pointer ${!showSearchMonth && 'transform rotate-180'}`}
                                           onClick={() => setShowSearchMonth(!showSearchMonth)}/>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Search Month Data's*/}
                {showSearchMonth && (
                    <>

                        <div className="">
                            {filteredSearchMonthData.map((item, index) => (
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
                        <div className="link text-secondary">
                            Show more
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default DateFilter;