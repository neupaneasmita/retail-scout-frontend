import React, { useState } from "react";
import plussquare from "../../../../../assets/images/dashboard/plus-square.svg";
import plussquarewhite from "../../../../../assets/images/dashboard/plus-square-white.svg";

import AddToListModal from "./AddToListModal";

const AddToProspects = (props) => {
  const { numSelected, selected } = props;

  const [isOpenAddToListModal, setIsOpenAddToListModal] = useState(false);

  function openAddToListModal() {
    if (numSelected > 0) {
      setIsOpenAddToListModal(true);
    } else {
      alert("Please select stores to add to the list");
    }
  }
  function closeAddToListModal() {
    setIsOpenAddToListModal(false);
  }

  return (
    <>
      <div className="mt-4 sm:mt-0">
        <div
          className={`flex items-center px-8 py-4 link rounded w-max cursor-pointer + ${
            numSelected > 0
              ? "bg-secondary text-white"
              : "bg-primarygray text-text"
          }`}
          onClick={openAddToListModal}
        >
          {numSelected > 0 ? (
            <img src={plussquarewhite} alt="" className="pr-1.5" />
          ) : (
            <img src={plussquare} alt="" className="pr-1.5" />
          )}{" "}
          <span className="">Add to List</span>
        </div>
      </div>

      {/* Add to Existing List Modal */}
      <AddToListModal
        isOpen={isOpenAddToListModal}
        closeModal={closeAddToListModal}
        selected={selected}
      />
    </>
  );
};

export default React.memo(AddToProspects);
