import React, { useState } from "react";
import sortasc from "../../../../assets/images/dashboard/prospects/sortasc.svg";
import sortdesc from "../../../../assets/images/dashboard/prospects/sortdesc.svg";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions/action";
import { ReactComponent as Check } from "../../../../assets/images/dashboard/check.svg";
//Sorting of Table
const headers = [
  { name: "Brand", field: "name", sortable: true },
  { name: "Platform", field: "platform", sortable: true },
  { name: "Language", field: "language", sortable: true },
  { name: "Company Size", field: "company_size", sortable: false },
  { name: "Location", sortable: false },
];
const EnhancedTableHead = ({
  numSelected,
  rowCount,
  onSelectAllClick,
}) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("ascending");

  const dispatch = useDispatch();
  const onSortingChange = (field) => {
    let value = "";
    const order =
      field === sortingField && sortingOrder === "ascending"
        ? "descending"
        : "ascending";
    setSortingField(field);
    setSortingOrder(order);
    if (field === "name") {
      value = { brand: order };
    } else if (field === "platform") {
      value = { platform: order };
    } else if (field === "language") {
      value = { language: order };
    }
    dispatch(actions.setSort(value));
  };

  return (
    <thead className="border-b border-divider">
      <tr>
        <th className="sticky top-0 px-6 py-4 bg-white text-left whitespace-no-wrap text-sm text-gray-800 tracking-normal leading-4 z-20">
          <div className="flex items-center">
            <div className="relative z-30">
              <input
                type="checkbox"
                value={numSelected > 0 && numSelected < rowCount}
                onChange={onSelectAllClick}
                checked={rowCount > 0 && numSelected === rowCount}
                className={`absolute cursor-pointer -top-2 left-0 rounded w-4 h-4 z-20 ${
                  rowCount > 0 && numSelected === rowCount
                    ? "opacity-0"
                    : "opacity-100"
                }`}
                style={{ border: "1px solid #C9CBCC" }}
              />
              <div
                className={`absolute -top-2 left-0 rounded z-10 w-5 h-5 -m-px bg-primary transform ${
                  rowCount > 0 && numSelected === rowCount
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                {rowCount > 0 && numSelected === rowCount ? (
                  <Check className="mx-auto mt-1" />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </th>

        {headers.map(({ name, field, sortable }, index) => (
          <th
            className={`sticky top-0 px-6 py-4 bg-white text-left whitespace-no-wrap text-sm text-gray-800 tracking-normal leading-4 z-20`}
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
                          sortingOrder === "ascending"
                            ? "opacity-60"
                            : "opacity-100"
                        }`}
                        alt=""
                      />
                      <img
                        src={sortasc}
                        className={`h-1.5 + ${
                          sortingOrder === "ascending"
                            ? "opacity-100"
                            : "opacity-60"
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

export default React.memo(EnhancedTableHead);
