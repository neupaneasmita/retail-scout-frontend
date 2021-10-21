import React, { useState, useMemo } from "react";
import TableHeader from "./TableHeader";
import { NavLink } from "react-router-dom";
import trash from "../../../../assets/images/dashboard/prospects/trash.svg";
import { ReactComponent as Check } from "../../../../assets/images/dashboard/check.svg";
const Table = ({ lists, removeStore, selected, setSelected }) => {
  //Alert to remove Store
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [toDeleteStore, setToDeleteStore] = useState("");

  //Sorting of Table
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const headers = [
    { name: "Brand", field: "name", sortable: true },
    { name: "Platform", field: "platform", sortable: true },
    { name: "Language", field: "language", sortable: true },
    { name: "Company Size", field: "company_size", sortable: true },
    { name: "Location", sortable: false },
    { name: "Action", sortable: false },
  ];
  const sortedLists = useMemo(() => {
    let sortedItems = lists;
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      sortedItems = sortedItems.sort(
        (a, b) =>
          reversed *
          a[sorting.field]
            .toString()
            .localeCompare(b[sorting.field], undefined, { numeric: true })
      );
    }
    return sortedItems;
  }, [lists, sorting.field, sorting.order]);

  //Select All Stores
  const onSelectAllClick = (event) => {
    if (event.target.checked) {
      const newItem = lists.map((item) => item);
      setSelected(newItem);
      return;
    }
    setSelected([]);
  };

  //Select Single Store
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  //Set isSelected
  const isSelected = (name) => selected.indexOf(name) !== -1;

  //Confirm Remove
  const confirmRemove = (storeId) => {
    setOpenRemoveModal(true);
    setToDeleteStore(storeId);
  };
  //Remove Item
  const removeSelectedStore = () => {
    removeStore(toDeleteStore);
    setOpenRemoveModal(false);
    setToDeleteStore("");
  };

  const errorImg = (e, currentName) => {
    e.target.style.display='none';
    var newAvatar = document.createElement("div");
    newAvatar.classList.add("w-10", "h-10",  "flex", "justify-center", "items-center", "rounded-full", "capitalize", "bg-secondary", "text-white");
	  var textNode = document.createTextNode(currentName.charAt(0)); 
	  newAvatar.appendChild(textNode);
    e.target.parentNode.prepend(newAvatar);
  };

  return (
    <>
          <table className="relative min-w-full">
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
              numSelected={selected.length}
              rowCount={lists.length}
              onSelectAllClick={onSelectAllClick}
            />
            {sortedLists.length > 0 ? (
              <tbody
                className="divide-y"
              >
                {sortedLists.map((item, index) => {
                  const isItemSelected = isSelected(item);
                  const currentName = item.name;
                  return (
                    <tr
                      key={item._id.$oid}
                      className={` ${
                        index % 2 === 0 ? "" : "bg-primarygray"
                      }`}
                    >
                      <td className="px-6 py-4 text-left whitespace-no-wrap tracking-normal leading-4">
                      <div className="flex items-center">
                      <div className="relative z-10">
                        <input
                          type="checkbox"
                          onChange={(event) => handleClick(event, item)}
                          checked={isItemSelected}
                          className={`absolute cursor-pointer -top-2 left-0 rounded w-4 h-4 z-20 ${
                            isItemSelected ? "opacity-0" : "opacity-100"
                          }`}
                          style={{ border: "1px solid #C9CBCC" }}
                        />
                        <div
                          className={`absolute -top-2 left-0 rounded z-10 w-5 h-5 -m-px bg-primary transform ${
                            isItemSelected ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {isItemSelected && <Check className="mx-auto mt-1" />}
                        </div>
                      </div>
                    </div>
                      </td>
                      <td className="px-6 py-4 text-left whitespace-no-wrap tracking-normal leading-4">
                      <NavLink to={`/dashboard/prospectlist/analytics/${item._id.$oid}`}>
                        <div className="flex flex-row flex-nowrap items-center ">
                        <img
                            src={item.logo}
                            alt=""
                            onError={(e) => errorImg(e, currentName)}
                            className="w-10 h-10 object-contain rounded-full flex-none"
                          />
                          <div className="flex flex-col pl-2.5">
                            <div className="paragraph text-link truncate" style={{maxWidth: "200px"}}>
                              {item.name}
                            </div>
                          </div>
                        </div>
                        </NavLink>
                      </td>
                      <td className="px-6 py-4 text-left whitespace-no-wrap tracking-normal leading-4">
                        <div className="caption text-secondary">
                          {item.platform}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-left whitespace-no-wrap tracking-normal leading-4">
                      <div className="caption text-secondary">
                      {item.language ? <>{item.language}</> : "Unknown"}
                    </div>
                      </td>
                      <td className="px-6 py-4 text-left whitespace-no-wrap tracking-normal leading-4">
                      <div className="caption text-secondary">
                      {item.company_size}
                    </div>
                      </td>
                      <td className="px-6 py-4 text-left whitespace-no-wrap tracking-normal leading-4">
                    {item.locations && item.locations[0] ? (
                      <>{item.locations[0]}</>
                    ) : <>{item.country}</> }
                  </td>
                      <td className="px-6 py-4 text-left whitespace-no-wrap tracking-normal leading-4">
                        <div
                          onClick={() => confirmRemove(item._id.$oid)}
                          className="flex items-center caption text-secondary cursor-pointer"
                        >
                          <img src={trash} alt="" className="pr-1.5" />
                          Remove Store
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody>
                <tr className="">
                  <td
                    colSpan={6}
                    className="pr-6 pl-4 py-4 text-center caption text-secondary whitespace-no-wrap"
                  >
                    Sorry no store found...
                  </td>
                </tr>
              </tbody>
            )}
          </table>

        {/* Confirm Remove Store Modal */}
        {openRemoveModal && (
          <div
            className="fixed z-40 inset-0 bg-black bg-opacity-30"
            onClick={() => setOpenRemoveModal(false)}
          >
            <div
              className="fixed z-50"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="shadow-lg rounded-md p-8 bg-gray-50 w-72 m-auto">
                <div className="w-full h-full text-center">
                  <div className="flex h-full flex-col justify-between">
                    <svg
                      width={40}
                      height={40}
                      className="w-12 h-12 m-auto text-red-500"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z" />
                    </svg>
                    <div className="heading-5 text-secondary mt-4">
                      Remove Store
                    </div>
                    <div className="caption text-secondarypy-2 px-6 mt-4">
                      Are you sure you want to delete this store ?
                    </div>
                    <div className="flex items-center justify-between gap-4 w-full mt-12">
                      <button
                        type="button"
                        onClick={removeSelectedStore}
                        className="py-2 px-4  bg-red-600 hover:bg-red-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-sm focus:outline-none rounded-lg "
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpenRemoveModal(false)}
                        className="py-2 px-4  bg-white hover:bg-primary hover:bg-opacity-10 w-full transition ease-in duration-200 text-center text-primary text-base font-semibold shadow-md focus:outline-none  rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default Table;
