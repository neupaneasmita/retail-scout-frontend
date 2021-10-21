import React, { useRef, useEffect } from "react";
import search from "../../../assets/images/dashboard/search.svg";

const Filter = ({ filter, setFilter, placeholder }) => {
  const searchInputRef = useRef();

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <>
      <div className="dashboard-input-box border-b border-divider rounded-b-none mb-4">
        <span className="prefix">
          <img src={search} alt="" className="" />
        </span>
        <input
          className="dashboard-search-input-box"
          ref={searchInputRef}
          type="text"
          placeholder={placeholder}
          onChange={(e) => setFilter(e.target.value)}
          value={filter || ""}
        />
      </div>
    </>
  );
};

export default React.memo(Filter);
