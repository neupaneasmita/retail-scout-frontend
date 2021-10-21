import React from "react";
import { ReactComponent as Cross } from "../../../../assets/images/dashboard/cross.svg";

const ShortList = ({
  data,
  shortListNames,
  setShortListNames,
  checkedItems,
  setCheckedItems,
}) => {
  /*const shortListedNames = data.filter((item) => {
        shortListNames.includes(item.id)
    });*/

  const checkedObjects = Object.entries(checkedItems);

  const removeShortListNames = (item) => {
    setShortListNames(shortListNames.filter((i) => i !== item));
    setCheckedItems({
      ...checkedItems,
    });
  };

  return (
    <>
      <div className="flex flex-row flex-wrap items-center space-x-3">
        {shortListNames.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center short-list-button rounded my-1"
            >
              <div className="caption text-secondary">{item}</div>
              <div
                className="pl-1 cursor-pointer"
                onClick={() => removeShortListNames(item)}
              >
                <Cross />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ShortList;
