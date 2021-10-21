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
function YoutubeFollowersFilterCheckbox({
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

const YoutubeFollowersCheckboxFilter = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const youtubeFollowers = [
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
  const [showYoutubeFollowers, setShowYoutubeFollowers] = useState(true);

  const dispatch = useDispatch();
  const cat = useSelector((state) => state.fetchtableList.youtube_filter_uncheck);
  const youtubeData = useSelector((state) => state.fetchtableList.youtube_filter);

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
      for(let i = 0; i < youtubeData.length; i++) {
        let value = `${youtubeData[i].min}${youtubeData[i].max ? "-" : ""}${youtubeData[i].max ? youtubeData[i].max : ""}`
        data.push([value, true]);
      }
      const finalYoutube = Object.fromEntries(data);
      setCheckedItems(finalYoutube);
    }
    handleUncheck();
    handleStoreCheck();
   // eslint-disable-next-line
  }, [cat,youtubeData]);

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
        checkboxYoutubeFollowers: [
          ...selectedCategories.checkboxYoutubeFollowers,
          newFollowerRange,
        ],
      });
      setHandleCheckItems([
        ...handleCheckItems, newFollowerRange
      ]);
      dispatch(actions.setYoutubeFilter(socialFilter));
    } else {
      setSelectedCategories({
        ...selectedCategories,
        checkboxYoutubeFollowers:
          selectedCategories.checkboxYoutubeFollowers.filter(
            (item) => item.value !== newFollowerRange.value
          ),
      });
      dispatch(actions.filterYoutubeFilter(socialFilter));
    }
  };

  return (
    <div className="">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M47.5219 14.4001C47.5219 14.4001 47.0531 11.0907 45.6094 9.6376C43.7812 7.7251 41.7375 7.71572 40.8 7.60322C34.0875 7.11572 24.0094 7.11572 24.0094 7.11572H23.9906C23.9906 7.11572 13.9125 7.11572 7.2 7.60322C6.2625 7.71572 4.21875 7.7251 2.39062 9.6376C0.946875 11.0907 0.4875 14.4001 0.4875 14.4001C0.4875 14.4001 0 18.2907 0 22.172V25.8095C0 29.6907 0.478125 33.5813 0.478125 33.5813C0.478125 33.5813 0.946875 36.8907 2.38125 38.3438C4.20937 40.2563 6.60938 40.1907 7.67813 40.397C11.5219 40.7626 24 40.8751 24 40.8751C24 40.8751 34.0875 40.8563 40.8 40.3782C41.7375 40.2657 43.7812 40.2563 45.6094 38.3438C47.0531 36.8907 47.5219 33.5813 47.5219 33.5813C47.5219 33.5813 48 29.7001 48 25.8095V22.172C48 18.2907 47.5219 14.4001 47.5219 14.4001ZM19.0406 30.2251V16.7345L32.0062 23.5032L19.0406 30.2251Z" fill="currentColor" />
              </svg>
            </div>
            <div className="link text-secondary">Youtube Followers</div>
          </div>
          <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 w-8 h-7 flex items-center justify-center rounded cursor-pointer" 
              onClick={() => setShowYoutubeFollowers(!showYoutubeFollowers)}>
            <ArrowDown
              className={` stroke-current text-secondary transition-transform duration-500 transform ${showYoutubeFollowers ? "-rotate-180" : ""
                }`}
            />
          </div>
        </div>
      </div>


      <div className={`max-h-0 overflow-hidden transition-all duration-500 ${showYoutubeFollowers ? 'max-h-100 ease-in' : 'ease-out'}`}>

        <div
          className={`flex flex-col max-h-96 overflow-y-auto sidebar-filter-scroll`}
        >
          {youtubeFollowers.map((item) => {
            return (
              <div
                key={item}
                className="flex justify-between items-center pb-2"
              >
                <div>
                  <YoutubeFollowersFilterCheckbox
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

export default YoutubeFollowersCheckboxFilter;
