import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import download from "../../../../assets/images/dashboard/prospects/download.svg";
import edit from "../../../../assets/images/dashboard/prospects/edit.svg";
import trash from "../../../../assets/images/dashboard/prospects/trash.svg";
import TableHeader from "./TableHeader";

const Table = ({ lists, editList, deleteList }) => {
  //Alert to remove Store
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [toDeleteList, setToDeleteList] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const headers = [
    { name: "List Name", field: "name", sortable: true },
    { name: "Created", field: "timestamp", sortable: true },
    { name: "Stores", field: "items", sortable: true },
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

  //Confirm Remove
  const confirmRemove = (listId) => {
    setOpenRemoveModal(true);
    setToDeleteList(listId);
  };
  //Remove Item
  const removeSelectedList = () => {
    deleteList(toDeleteList);
    setOpenRemoveModal(false);
    setToDeleteList("");
  };

  return (
    <>
    <table className="relative min-w-full">
      <TableHeader
        headers={headers}
        onSorting={(field, order) => setSorting({ field, order })}
      />

      {sortedLists.length > 0 ? (
        <tbody
          className="divide-y"
        >
          {lists.map((comment, index) => (
            <tr
              key={comment._id.$oid}
              className={`${
                index % 2 === 0 ? "" : "bg-primarygray"
              }`}
            >
              <td className="px-6 py-4 min-w-50 text-left whitespace-no-wrap tracking-normal leading-4">
                <NavLink to={`/dashboard/prospectlist/${comment._id.$oid}`}>
                  <div className="paragraph text-link">{comment.name}</div>
                </NavLink>
              </td>
              <td className="px-6 py-4 min-w-40 text-left whitespace-no-wrap tracking-normal leading-4">
                <div className="caption text-secondary">
                  {new Date(comment.timestamp).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </td>
              <td className="px-6 py-4 min-w-40 text-left whitespace-no-wrap tracking-normal leading-4">
                <div className="flex flex-col">
                  <div className="caption text-secondary mb-1">
                    {comment.items.length}
                  </div>
                  <div
                    className={`overflow-hidden h-1 text-xs flex w-8 rounded + ${
                      comment.items.length > 900
                        ? " bg-red-200"
                        : "bg-green-200"
                    }`}
                  >
                    <div
                      style={{
                        width: (comment.items.length / "1000") * "100" + "%",
                      }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center + ${
                        comment.items.length > 900
                          ? " bg-red-500"
                          : "bg-green-500"
                      }`}
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 min-w-50 text-left whitespace-no-wrap tracking-normal leading-4">
                <div className="flex">
                  <div>
                    <a
                      href={
                        "data:text/json;charset=utf-8," +
                        encodeURIComponent(JSON.stringify(comment))
                      }
                      download={`${comment.name}.json`}
                      className="flex items-center caption text-secondary cursor-pointer"
                    >
                      <img src={download} alt="" className="pr-1.5" />
                      <span className="md:block hidden">Export</span>
                    </a>
                  </div>
                  <div
                    onClick={() => {
                      editList(comment);
                    }}
                    className="flex items-center caption text-secondary px-6 cursor-pointer"
                  >
                    <img src={edit} alt="" className="pr-1.5" />
                    <span className="md:block hidden">Rename List</span>
                  </div>
                  <div
                    onClick={() => confirmRemove(comment._id.$oid)}
                    className="flex items-center caption text-secondary cursor-pointer"
                  >
                    <img src={trash} alt="" className="pr-1.5" />
                    <span className="md:block hidden">Delete List</span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody>
          <tr className="min-w-full">
            <td
              colSpan={4}
              className="px-6 py-4 text-center caption text-secondary whitespace-no-wrap tracking-normal leading-4"
            >
              Sorry no list found...
            </td>
          </tr>
        </tbody>
      )}
      </table>

      {/* Confirm Remove List Modal */}
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
                    Remove List
                  </div>
                  <div className="caption text-secondarypy-2 px-6 mt-4">
                    Are you sure you want to delete this list ?
                  </div>
                  <div className="flex items-center justify-between gap-4 w-full mt-12">
                    <button
                      type="button"
                      onClick={removeSelectedList}
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
