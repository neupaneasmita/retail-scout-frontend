import React, { useRef, useEffect } from "react";
import search from "../../../../assets/images/dashboard/search.svg";

const Search = ({ searchValue, setSearchValue }) => {
  const searchInputRef = useRef();

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  const onChangeHandler = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="dashboard-input-box border-b border-divider rounded-b-none mb-4">
      <span className="prefix">
        <img src={search} alt="" className="" />
      </span>
      <input
        className="dashboard-search-input-box"
        ref={searchInputRef}
        type="text"
        placeholder="Search for stores"
        onChange={onChangeHandler}
        value={searchValue}
      />
    </div>
  );
};

export default Search;
