import React, { useState, useEffect } from "react";
import { ReactComponent as Filter } from "../../../assets/images/dashboard/filter.svg";
import { ReactComponent as ArrowDown } from "../../../assets/images/dashboard/arrow down.svg";
import { ReactComponent as Search } from "../../../assets/images/dashboard/filter search.svg";

import Checkbox from "./integrated/Checkbox.jsx";
import PlatformFilter from "./integrated/PlatformFilter";
import StatusFilters from "./integrated/StatusFilters";
import DateFilter from "./integrated/DateFilter";

const AsideFilter = ({
  shortListNames,
  setShortListNames,
  data,
  checkedItems,
  setCheckedItems,
}) => {
  //Checked Items
  //const [checkedItems, setCheckedItems] = useState({});
  //Platform Search
  //const [platformSearch, setPlatformSearch] = useState('');
  //Month Search

  const handleChange = (event, id) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
    setShortListNames([...shortListNames, event.target.name]);
    if (!event.target.checked) {
      setShortListNames(shortListNames.filter((i) => i !== event.target.name));
    }
  };

  //Platform
  let platformResult = data.map((a) => a.platform);
  const platformObj = [
    ...new Map(
      platformResult.map((item) => [JSON.stringify(item), item])
    ).values(),
  ];
  // console.log(platformObj);
  //Status
  let statusResult = data.map((a) => a.status);
  const statusObj = [
    ...new Map(
      statusResult.map((item) => [JSON.stringify(item), item])
    ).values(),
  ];
  // console.log(statusObj);
  //Created at
  let createdAtResult = data.map((a) => a.createdAt);
  const createdAtObj = [
    ...new Map(
      createdAtResult.map((item) => [JSON.stringify(item), item])
    ).values(),
  ];
  // console.log(createdAtObj);

  return (
    <>
      <div className="p-6 bg-primarygray aside-filter-section">
        {/*Filters Heading*/}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Filter />
            <div className="paragraph text-secondary pl-1">Filters</div>
          </div>
          <div className="link">Clear All</div>
        </div>
        {/*Platform Filter*/}
        <PlatformFilter
          data={data}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          handleChange={handleChange}
        />
        {/*Platform Filter Ends*/}
        {/*Status Filter*/}
        <StatusFilters
          data={data}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          handleChange={handleChange}
        />

        {/*Status Filter Ends*/}
        {/*Search Month Filter*/}
        <DateFilter
          data={data}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          handleChange={handleChange}
        />
        {/*Search Month Ends*/}
      </div>
    </>
  );
};

export default AsideFilter;
