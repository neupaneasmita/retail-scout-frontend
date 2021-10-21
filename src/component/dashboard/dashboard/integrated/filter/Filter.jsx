import React, { useState, useRef, useEffect } from "react";
import search from "../../../../../assets/images/dashboard/search.svg";
import * as actions from "../../../../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
const Filter = () => {
  const searchData = useSelector((state) => state.fetchtableList.search);
  //Filter state
  const [filter, setFilter] = useState(searchData);
  const searchInputRef = useRef();

  const dispatch = useDispatch();
  

  useEffect(() => {
    searchInputRef.current.focus();
    //---
    setFilter(searchData)
  }, [searchData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.setSearch(filter));
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="dashboard-input-box border-b border-divider rounded-b-none mb-4"
      >
        <span className="prefix">
          <img src={search} alt="" className="" />
        </span>
        <input
          className="dashboard-search-input-box"
          ref={searchInputRef}
          type="text"
          placeholder="Search by store name"
          onChange={(e) => setFilter(e.target.value)}
          value={filter || ""}
        />
      </form>
    </>
  );
};

export default React.memo(Filter);
