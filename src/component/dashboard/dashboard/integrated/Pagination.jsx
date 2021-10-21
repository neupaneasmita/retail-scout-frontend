import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions/action";
function Pagination() {
  const [dropdownItems] = useState([
    { label: "25", value: "25" },
    { label: "50", value: "50" },
    { label: "100", value: "100" },
  ]);
  const dispatch = useDispatch();
  

  const total_number_of_items = useSelector(
    (state) => state.fetchtableList.total_number_of_items
  );
  const total_pages_for_query = useSelector(
    (state) => state.fetchtableList.total_pages_for_query
  );
  // Current active button number
  const [currentButton, setCurrentButton] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(25);

  const hadleItemsPerPage = (e) => {
    setItemsPerPage(e.currentTarget.value);
    // console.log(e.currentTarget.value);
    dispatch(actions.setPageSize(parseInt(e.currentTarget.value)));
  };

  //Set number of pages
  const numberOfPages = [];
  for (let i = 1; i <= total_pages_for_query; i++) {
    numberOfPages.push(i);
  }

  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  // const handlePagination = (currentButton) => {};
  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      // from 5 to 8 -> (10 - 2)
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton); // sliced1 (5-2, 5) -> [4,5]
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1); // sliced1 (5, 5+1) -> [6]
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ]; // [1, '...', 4, 5, 6, '...', 10]
    } else if (currentButton > numberOfPages.length - 3) {
      // > 7
      const sliced = numberOfPages.slice(numberOfPages.length - 4); // slice(10-4)
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2);
    } else if (numberOfPages.length < currentButton) {
      setCurrentButton(1);
    }

    setArrOfCurrButtons(tempNumberOfPages);
    setCurrentButton(currentButton);
    dispatch(actions.setPageNumber(parseInt(currentButton)));
    // eslint-disable-next-line
  }, [currentButton, numberOfPages.length]);

  return (
    <>
      <div className="flex flex-col px-6 py-3 border-t border-divider sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <div className="flex items-center">
            <div className="paragraph-body text-secondary pr-2">View</div>
            <select
              className="py-2 px-3 text-secondary border border-divider rounded cursor-pointer focus:outline-none active:outline-none"
              value={itemsPerPage}
              onChange={hadleItemsPerPage}
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
        </div>
        <div>
          <div className="text-secondary caption-2">
            {Intl.NumberFormat("en-US").format(total_number_of_items)} stores
          </div>
        </div>
        <div className="flex items-center">
          <div
            className={`link text-secondary pr-2 cursor-pointer + ${currentButton === 1 ? "opacity-40" : ""
              }`}
            onClick={() =>
              setCurrentButton((prev) => (prev <= 1 ? prev : prev - 1))
            }
          >
            Previous
          </div>

          {arrOfCurrButtons.map((item, index) => {
            return (
              <div
                key={index}
                className={`paragraph-body text-secondary py-0.5 px-2 cursor-pointer + ${currentButton === item ? "bg-divider rounded-sm" : ""
                  }`}
                onClick={() => setCurrentButton(item)}
              >
                {item}
              </div>
            );
          })}

          <div
            className={`link text-secondary pl-2 cursor-pointer + ${currentButton === numberOfPages.length
              ? "opacity-40"
              : numberOfPages.length === 0
                ? "opacity-40"
                : ""
              }`}
            onClick={() =>
              setCurrentButton((prev) =>
                prev >= numberOfPages.length ? prev : prev + 1
              )
            }
          >
            Next
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Pagination);
