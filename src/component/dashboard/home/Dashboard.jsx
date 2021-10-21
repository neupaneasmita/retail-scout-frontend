import React, { useEffect, useMemo, useState } from "react";
import AsideFilter from "./AsideFilter.jsx";
import ShortList from "./integrated/ShortList.jsx";
import Table from "./integrated/Table.jsx";
import Search from "./integrated/Search.jsx";
import { mockData } from "./mockData.js";
import { ReactComponent as Download } from "../../../assets/images/dashboard/download.svg";

import { storeCollection } from "./storeCollection";

const Dashboard = () => {
  //Data's
  const [data, setData] = useState(storeCollection);
  //Search
  const [searchValue, setSearchValue] = useState("");
  //Shortlist
  const [shortListNames, setShortListNames] = useState([]);

  //Aside Filter States
  //Checked Items
  const [checkedItems, setCheckedItems] = useState([]);

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:min-w-84 lg:w-84 flex-none bg-primarygray">
          {/*Aside Filter*/}
          <AsideFilter
            data={data}
            shortListNames={shortListNames}
            setShortListNames={setShortListNames}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
        </div>
        <div className="flex-1 overflow-hidden p-6">
          <div className="flex flex-col relative">
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2">
              <ShortList
                data={data}
                shortListNames={shortListNames}
                setShortListNames={setShortListNames}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
              <div className="">
                <div className="flex items-center primary-button my-3">
                  <Download /> <span className="pl-2">Export</span>
                </div>
              </div>
            </div>
            {/*<Table data={data}
                               setData={setData}
                               searchValue={searchValue}
                               shortListNames={shortListNames}
                               setShortListNames={setShortListNames}/>*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
