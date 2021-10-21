import React, { useState } from "react";

const TablePagination = ({ itemsPerPage, setItemsPerPage }) => {
  const [dropdownItems] = useState([
    { label: "10", value: "10" },
    { label: "25", value: "25" },
    { label: "50", value: "50" },
    {label: "All", value: "10000"}
  ]);
  /*const [itemsPerPage, setItemsPerPage] = useState(2);
    console.log(itemsPerPage);*/

  return (
    <>
        <div className="flex items-center mx-auto md:mx-0">
          <div className="paragraph-body text-secondary pr-2">View</div>
          <select
            className="py-2 px-3 text-secondary border border-divider rounded cursor-pointer focus:outline-none active:outline-none"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.currentTarget.value)}
          >
            {dropdownItems.map((item) => (
              <option className="" key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <div className="paragraph-body text-secondary pl-2">
            stores per page
          </div>
        </div>
    </>
  );
};

export default React.memo(TablePagination);
