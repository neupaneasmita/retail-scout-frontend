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
function TwitterFollowersFilterCheckbox({
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

const TwitterFollowersCheckboxFilter = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const twitterFollowers = [
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
  const [showTwitterFollowers, setShowTwitterFollowers] = useState(true);

  const dispatch = useDispatch();
  const cat = useSelector((state) => state.fetchtableList.twitter_filter_uncheck);
  const twitterData = useSelector((state) => state.fetchtableList.twitter_filter);

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
      for(let i = 0; i < twitterData.length; i++) {
        let value = `${twitterData[i].min}${twitterData[i].max ? "-" : ""}${twitterData[i].max ? twitterData[i].max : ""}`
        data.push([value, true]);
      }
      const finalTwitter = Object.fromEntries(data);
      setCheckedItems(finalTwitter);
    }
    handleUncheck();
    handleStoreCheck();
   // eslint-disable-next-line
  }, [cat,twitterData]);

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
        checkboxTwitterFollowers: [
          ...selectedCategories.checkboxTwitterFollowers,
          newFollowerRange,
        ],
      });
      setHandleCheckItems([
        ...handleCheckItems, newFollowerRange
      ]);
      dispatch(actions.setTwitterFilter(socialFilter));
    } else {
      setSelectedCategories({
        ...selectedCategories,
        checkboxTwitterFollowers:
          selectedCategories.checkboxTwitterFollowers.filter(
            (item) => item.value !== newFollowerRange.value
          ),
      });
      dispatch(actions.filterTwitterFilter(socialFilter));
    }
  };

  return (
    <div className="">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path d="M15.1003 43.5C33.2091 43.5 43.1166 28.4935 43.1166 15.4838C43.1166 15.0619 43.1072 14.6307 43.0884 14.2088C45.0158 12.815 46.679 11.0886 48 9.11066C46.205 9.90926 44.2993 10.4308 42.3478 10.6575C44.4026 9.42588 45.9411 7.491 46.6781 5.21159C44.7451 6.35718 42.6312 7.16528 40.4269 7.60128C38.9417 6.02318 36.978 4.97829 34.8394 4.62816C32.7008 4.27803 30.5064 4.64216 28.5955 5.66425C26.6846 6.68635 25.1636 8.30947 24.2677 10.2827C23.3718 12.2559 23.1509 14.4693 23.6391 16.5807C19.725 16.3842 15.8959 15.3675 12.4 13.5963C8.90405 11.825 5.81939 9.33893 3.34594 6.29909C2.0888 8.46655 1.70411 11.0314 2.27006 13.4722C2.83601 15.9131 4.31013 18.047 6.39281 19.44C4.82926 19.3904 3.29995 18.9694 1.93125 18.2119V18.3338C1.92985 20.6084 2.7162 22.8132 4.15662 24.5736C5.59704 26.334 7.60265 27.5412 9.8325 27.99C8.38411 28.3863 6.86396 28.4441 5.38969 28.1588C6.01891 30.1149 7.24315 31.8258 8.89154 33.0527C10.5399 34.2796 12.5302 34.9613 14.5847 35.0025C11.0968 37.7423 6.78835 39.2283 2.35313 39.2213C1.56657 39.2201 0.780798 39.1719 0 39.0769C4.50571 41.9676 9.74706 43.5028 15.1003 43.5Z" fill="currentColor" />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="48" height="48" fill="currentColor" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="link text-secondary">Twitter Followers</div>
          </div>
          <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 w-8 h-7 flex items-center justify-center rounded cursor-pointer" 
              onClick={() => setShowTwitterFollowers(!showTwitterFollowers)}>
            <ArrowDown
              className={`stroke-current text-secondary transition-transform duration-500 transform ${showTwitterFollowers ? "-rotate-180" : ""
                }`}
            />
          </div>
        </div>
      </div>


      <div className={`max-h-0 overflow-hidden transition-all duration-500 ${showTwitterFollowers ? 'max-h-100 ease-in' : 'ease-out'}`}>

        <div
          className={`flex flex-col max-h-96 overflow-y-auto sidebar-filter-scroll`}
        >
          {twitterFollowers.map((item) => {
            return (
              <div
                key={item}
                className="flex justify-between items-center pb-2"
              >
                <div>
                  <TwitterFollowersFilterCheckbox
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

export default TwitterFollowersCheckboxFilter;
