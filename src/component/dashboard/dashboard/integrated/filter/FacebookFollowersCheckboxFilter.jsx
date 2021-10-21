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
function FacebookFollowersFilterCheckbox({
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

const FacebookFollowersCheckboxFilter = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const facebookFollowers = [
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
  const [showFacebookFollowers, setShowFacebookFollowers] = useState(true);

  const dispatch = useDispatch();
  const cat = useSelector((state) => state.fetchtableList.facebook_filter_uncheck);
  const facebookData = useSelector((state) => state.fetchtableList.facebook_filter);

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
      for(let i = 0; i < facebookData.length; i++) {
        let value = `${facebookData[i].min}${facebookData[i].max ? "-" : ""}${facebookData[i].max ? facebookData[i].max : ""}`
        data.push([value, true]);
      }
      const finalFacebook = Object.fromEntries(data);
      setCheckedItems(finalFacebook);
    }
    handleUncheck();
    handleStoreCheck();
       // eslint-disable-next-line
  }, [cat,facebookData]);

  
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
        checkboxFacebookFollowers: [
          ...selectedCategories.checkboxFacebookFollowers,
          newFollowerRange,
        ],
      });
      setHandleCheckItems([
        ...handleCheckItems, newFollowerRange
      ]);
      dispatch(actions.setFacebookFilter(socialFilter));
    } else {
      setSelectedCategories({
        ...selectedCategories,
        checkboxFacebookFollowers:
          selectedCategories.checkboxFacebookFollowers.filter(
            (item) => item.value !== newFollowerRange.value
          ),
      });
      dispatch(actions.filterFacebookFilter(socialFilter));
    }
  };

  return (
    <div className="">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z" fill="currentColor" />
              </svg>
            </div>
            <div className="link text-secondary">Facebook Followers</div>
          </div>
          <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 w-8 h-7 flex items-center justify-center rounded cursor-pointer" 
              onClick={() => setShowFacebookFollowers(!showFacebookFollowers)}>
            <ArrowDown
              className={`stroke-current text-secondary transition-transform duration-500 transform ${showFacebookFollowers && "-rotate-180"
                }`}
            />
          </div>
        </div>
      </div>


      <div className={`max-h-0 overflow-hidden transition-all duration-500 ${showFacebookFollowers ? 'max-h-100 ease-in' : 'ease-out'}`}>
        <div
          className={`flex flex-col max-h-96 overflow-y-auto sidebar-filter-scroll`}
        >
          {facebookFollowers.map((item) => {
            return (
              <div
                key={item}
                className="flex justify-between items-center pb-2"
              >
                <div>
                  <FacebookFollowersFilterCheckbox
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

export default FacebookFollowersCheckboxFilter;
