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
function CompanySizeFilterCheckbox({ name, handleChange, checked = false }) {
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

const CompanySizeCheckboxFilter = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const companySizes = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000-5000",
    "5000-10000",
    "10000",
  ];
  const [checkedItems, setCheckedItems] = useState([]);
  //Show / Hide Facebook Followers
  const [showCompanySize, setShowCompanySize] = useState(true);

  const dispatch = useDispatch();
  const cat = useSelector((state) => state.fetchtableList.company_size_filter_uncheck);
  const companySizeData = useSelector((state) => state.fetchtableList.company_size_filter);
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
      for(let i = 0; i < companySizeData.length; i++) {
        let value = `${companySizeData[i].min}${companySizeData[i].max ? "-" : ""}${companySizeData[i].max ? companySizeData[i].max : ""}`
        data.push([value, true]);
      }
      const finalCompanySize = Object.fromEntries(data);
      setCheckedItems(finalCompanySize);
    }
    handleUncheck();
    handleStoreCheck();
       // eslint-disable-next-line
  }, [cat,companySizeData]);

  const handleChange = (e) => {
    const checked = e.target.checked;
    setCheckedItems({
      ...checkedItems,
      [e.target.name]: e.target.checked,
    });
    const filterName = e.target.name;
    //Split of selected number befor and after '-' sign
    const str = filterName.split("-");
    const newCompanySizeRange = {
      value: filterName,
      min: str[0],
      max: str[1] ? str[1] : "",
    };
    const socialFilter = {
      min: newCompanySizeRange.min,
      max: newCompanySizeRange.max
    }
    if (checked) {
      setSelectedCategories({
        ...selectedCategories,
        checkboxCompanySize: [
          ...selectedCategories.checkboxCompanySize,
          newCompanySizeRange,
        ],
      });
      setHandleCheckItems([
        ...handleCheckItems, newCompanySizeRange
      ]);
      dispatch(actions.setCompanySizeFilter(socialFilter));
    } else {
      setSelectedCategories({
        ...selectedCategories,
        checkboxCompanySize: selectedCategories.checkboxCompanySize.filter(
          (item) => item.value !== newCompanySizeRange.value
        ),
      });
      dispatch(actions.filterCompanySizeFilter(socialFilter));
    }
  };

  return (
    <div className="">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                <g data-name="Layer 5" id="Layer_5"><rect className="cls-1" height="84.24" width="46.85" x="40.58" y="24.88" /><rect className="cls-1" height="55.34" transform="translate(60.72 162.89) rotate(180)" width="20.43" x="20.14" y="53.78" /><rect className="cls-1" height="55.34" transform="translate(195.28 162.89) rotate(180)" width="20.43" x="87.42" y="53.78" /><rect className="cls-2" height="27.67" transform="translate(128 190.56) rotate(180)" width="19.21" x="54.39" y="81.45" /></g>
              </svg>
            </div>
            <div className="link text-secondary">Company Size</div>
          </div>
          <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 w-8 h-7 flex items-center justify-center rounded cursor-pointer" 
              onClick={() => setShowCompanySize(!showCompanySize)}>
            <ArrowDown
              className={` stroke-current text-secondary transition-transform duration-500 transform ${showCompanySize ? "-rotate-180" : ""
                }`}
            />
          </div>
        </div>
      </div>


      <div className={`max-h-0 overflow-hidden transition-all duration-500 ${showCompanySize ? 'max-h-100 ease-in' : 'ease-out'}`}>

        <div
          className={`flex flex-col max-h-96 overflow-y-auto sidebar-filter-scroll`}
        >
          {companySizes.map((item) => {
            return (
              <div
                key={item}
                className="flex justify-between items-center pb-2"
              >
                <div>
                  <CompanySizeFilterCheckbox
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

export default CompanySizeCheckboxFilter;
