import React, {
  useState,
  useEffect
} from "react";
import { ReactComponent as ArrowDown } from "../../../../../assets/images/dashboard/arrow down.svg";
import { ReactComponent as Check } from "../../../../../assets/images/dashboard/check.svg";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../redux/actions/action";

//Render Number to put comma and get as 1M, 10M ...
const RenderNumber = ({ number }) => {
  const numFormatter = (num) => {
    // if (num >= 1000 && num < 1000000) {
    //   return (num / 1000).toFixed(0) + "K";
    // } else
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + "M";
    } else if (num < 1000000) {
      return Intl.NumberFormat("en-US").format(num);
    }
  };
  const getNumber = (number) => {
    const str = number.split("-");
    if (str[1] === undefined) {
      return numFormatter(str[0]) + " + ";
    } else {
      return numFormatter(str[0]) + " - " + numFormatter(str[1]);
    }
  };
  return <>{getNumber(number)}</>;
};

//Checkbox
function PinterestFollowersFilterCheckbox({
  name,
  handleChange,
  checked = false,
}) {
  return (
    <>
      <div className="flex items-center">
        <div className="relative">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={handleChange}
            className={`absolute cursor-pointer -top-2 left-0 rounded w-4 h-4 z-20 ${checked ? "opacity-0" : "opacity-100"
              }`}
            style={{ border: "1px solid #C9CBCC" }}
          />
          <div
            className={`absolute -top-2 left-0 rounded z-10 w-5 h-5 -m-px bg-primary transform ${checked ? "opacity-100" : "opacity-0"
              }`}
          >
            {checked && <Check className="mx-auto mt-1" />}
          </div>
        </div>
        <div className="paragraph text-secondary ml-7">
          <RenderNumber number={name} />
        </div>
      </div>
    </>
  );
}

const PinterestFollowersCheckboxFilter = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const pinterestFollowers = [
    "0-10",
    "10-100",
    "100-1000",
    "1000-10000",
    "10000-100000",
    "100000-1000000",
    "1000000-10000000",
    "10000000",
  ];
  const [checkedItems, setCheckedItems] = useState([]);
  //Show / Hide Facebook Followers
  const [showPinterestFollowers, setShowPinterestFollowers] = useState(true);

  const dispatch = useDispatch();
  const cat = useSelector((state) => state.fetchtableList.pinterest_filter_uncheck);
  const pintrestData = useSelector((state) => state.fetchtableList.pinterest_filter);

  const [handleCheckItems, setHandleCheckItems] = useState([]);
  let test = [];
  let value = [];

  useEffect(() => {
    const handleUncheck = () => {
      for (let i = 0; i < handleCheckItems.length; i++) {
        const result = handleCheckItems[i].min;
        if (result !== cat.min) {
          test.push([`${handleCheckItems[i].value}`, true]);
          value.push(handleCheckItems[i]);
        }
      }
      setHandleCheckItems(value);
      const finalValue = Object.fromEntries(test);
      setCheckedItems(finalValue);
    }
    const handleStoreCheck = () => {
      let data = [];
      for(let i = 0; i < pintrestData.length; i++) {
        let value = `${pintrestData[i].min}${pintrestData[i].max ? "-" : ""}${pintrestData[i].max ? pintrestData[i].max : ""}`
        data.push([value, true]);
      }
      const finalPinterest = Object.fromEntries(data);
      setCheckedItems(finalPinterest);
    }
    handleUncheck();
    handleStoreCheck();
       // eslint-disable-next-line
  }, [cat,pintrestData]);

  const handleChange = (e) => {
    const checked = e.target.checked;
    setCheckedItems({
      ...checkedItems,
      [e.target.name]: e.target.checked,
    });
    const filterName = e.target.name;
    //Split of selected number befor and after '-' sign
    const str = filterName.split("-");
    const newFollowerRange = {
      value: filterName,
      min: str[0],
      max: str[1] ? str[1] : "",
    };
    const socialFilter = {
      min: newFollowerRange.min,
      max: newFollowerRange.max
    }
    if (checked) {
      setSelectedCategories({
        ...selectedCategories,
        checkboxPinterestFollowers: [
          ...selectedCategories.checkboxPinterestFollowers,
          newFollowerRange,
        ],
      });
      setHandleCheckItems([
        ...handleCheckItems, newFollowerRange
      ]);
      dispatch(actions.setPinterestFilter(socialFilter));
    } else {
      setSelectedCategories({
        ...selectedCategories,
        checkboxPinterestFollowers:
          selectedCategories.checkboxPinterestFollowers.filter(
            (item) => item.value !== newFollowerRange.value
          ),
      });
      dispatch(actions.filterPinterestFilter(socialFilter));
    }
  };

  return (
    <div className="">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 0C10.7438 0 0 10.7438 0 24C0 34.1719 6.32812 42.8531 15.2531 46.35C15.0469 44.4469 14.85 41.5406 15.3375 39.4688C15.7781 37.5938 18.15 27.5437 18.15 27.5437C18.15 27.5437 17.4281 26.1094 17.4281 23.9813C17.4281 20.6438 19.3594 18.15 21.7687 18.15C23.8125 18.15 24.8063 19.6875 24.8063 21.5344C24.8063 23.5969 23.4937 26.6719 22.8187 29.5219C22.2562 31.9125 24.0187 33.8625 26.3719 33.8625C30.6375 33.8625 33.9187 29.3625 33.9187 22.875C33.9187 17.1281 29.7937 13.1063 23.8969 13.1063C17.0719 13.1063 13.0594 18.225 13.0594 23.5219C13.0594 25.5844 13.8562 27.7969 14.85 28.9969C15.0469 29.2312 15.075 29.4469 15.0187 29.6813C14.8406 30.4406 14.4281 32.0719 14.3531 32.4C14.25 32.8406 14.0063 32.9344 13.5469 32.7188C10.5469 31.3219 8.67188 26.9438 8.67188 23.4188C8.67188 15.8438 14.175 8.89688 24.525 8.89688C32.85 8.89688 39.3187 14.8313 39.3187 22.7625C39.3187 31.0312 34.1063 37.6875 26.8688 37.6875C24.4406 37.6875 22.1531 36.4219 21.3656 34.9313C21.3656 34.9313 20.1656 39.5156 19.875 40.6406C19.3312 42.7219 17.8687 45.3375 16.8937 46.9313C19.1437 47.625 21.525 48 24 48C37.2562 48 48 37.2562 48 24C48 10.7438 37.2562 0 24 0Z" fill="currentColor" />
              </svg>
            </div>
            <div className="link text-secondary">Pinterest Followers</div>
          </div>
          <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 w-8 h-7 flex items-center justify-center rounded cursor-pointer" 
              onClick={() => setShowPinterestFollowers(!showPinterestFollowers)}>
            <ArrowDown
              className={` stroke-current text-secondary transition-transform duration-500 transform ${showPinterestFollowers ? "-rotate-180" : ""
                }`}
            />
          </div>
        </div>
      </div>


      <div className={`max-h-0 overflow-hidden transition-all duration-500 ${showPinterestFollowers ? 'max-h-100 ease-in' : 'ease-out'}`}>

        <div
          className={`flex flex-col max-h-96 overflow-y-auto sidebar-filter-scroll`}
        >
          {pinterestFollowers.map((item) => {
            return (
              <div
                key={item}
                className="flex justify-between items-center pb-2"
              >
                <div>
                  <PinterestFollowersFilterCheckbox
                    name={item}
                    checked={checkedItems[item]}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default PinterestFollowersCheckboxFilter;
