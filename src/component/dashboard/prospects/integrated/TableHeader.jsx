import React, { useState } from "react";
import sortasc from "../../../../assets/images/dashboard/prospects/sortasc.svg";
import sortdesc from "../../../../assets/images/dashboard/prospects/sortdesc.svg";

const TableHeader = ({ headers, onSorting, sortable }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <thead
      className="border-b border-divider"
    >
      <tr>
        {headers.map(({ name, field, sortable }, index) => (
          <th
            className={`sticky top-0 px-6 py-4 bg-white text-left whitespace-no-wrap text-sm text-gray-800 tracking-normal leading-4 z-20 ${index === 1 && index === 2 ? "min-w-40" : "min-w-50"}`}
            key={name}
            onClick={() => (sortable ? onSortingChange(field) : null)}
          >
            <div className="flex items-center">
              <div className="paragraph-body text-secondary pr-1.5">{name}</div>
              <div>
                <div className="flex flex-col cursor-pointer">
                  {sortingField && sortingField === field && sortable ? (
                    <>
                      <img
                        src={sortdesc}
                        className={`h-1.5 + ${
                          sortingOrder === "asc" ? "opacity-60" : "opacity-100"
                        }`}
                        alt=""
                      />
                      <img
                        src={sortasc}
                        className={`h-1.5 + ${
                          sortingOrder === "asc" ? "opacity-100" : "opacity-60"
                        }`}
                        alt=""
                      />
                    </>
                  ) : sortable ? (
                    <>
                      <img
                        src={sortdesc}
                        className={`h-1.5 opacity-60`}
                        alt=""
                      />
                      <img
                        src={sortasc}
                        className={`h-1.5 opacity-60`}
                        alt=""
                      />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
