import React, { useState, useMemo, useEffect } from "react";
import { ReactComponent as Search } from "../../../../../assets/images/dashboard/filter search.svg";
import { ReactComponent as ArrowDown } from "../../../../../assets/images/dashboard/arrow down.svg";
import { ReactComponent as Check } from "../../../../../assets/images/dashboard/check.svg";
import axiosInstance from "../../../../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../redux/actions/action";
import monitor from "../../../../../assets/images/dashboard/analyst/monitor.svg"

function PlatformFilterCheckbox({ name, handleChange, checked = false }) {
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
        <div className="paragraph text-secondary ml-7">{name}</div>
      </div>
    </>
  );
}
const PlatformFilter = ({ selectedCategories, setSelectedCategories }) => {
  const [platforms, setPlatforms] = useState([]);
  const limit = 5;
  const [platformSearch, setPlatformSearch] = useState("");
  //Show / Hide Categories
  const [showPlatform, setShowPlatform] = useState(true);
  const [showMore, setShowMore] = useState(platforms.length > limit);
  const [checkedItems, setCheckedItems] = useState([]);
  const dispatch = useDispatch();
  const value = [];
  const cat = useSelector((state) => state.fetchtableList.platform_uncheck);
  const platformData = useSelector((state) => state.fetchtableList.platform);
  //Fetch platform
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/count-platforms`);
        setPlatforms(response.data);
      } catch (error) {
        if(error.response){
          if (error.response.data.msg === "Token has expired") {
            localStorage.clear();
            window.location = "/";
          }
        }
      }
    };
    fetchData();

  }, []);
  useEffect(() => {
    const asArray = Object.entries(checkedItems);
    for (let i = 0; i < asArray.length; i++) {
      const result = asArray[i][0];
      if (result !== cat) {
        value.push(asArray[i]);
      }
    }
    const finalValue = Object.fromEntries(value);
    setCheckedItems(finalValue);

    let data = [];
    for(let i = 0; i < platformData.length; i++) {
      data.push([platformData[i], true]);
    }
    const finalData = Object.fromEntries(data);
    setCheckedItems(finalData);
   // eslint-disable-next-line
  }, [cat, platformData]);

  //Checkbox Filter
  const handleChange = (e) => {
    const checked = e.target.checked;
    setCheckedItems({
      ...checkedItems,
      [e.target.name]: e.target.checked,
    });
    const filterName = e.target.name;
    if (checked) {
      setSelectedCategories({
        ...selectedCategories,
        platform: [...selectedCategories.platform, filterName],
      });
      dispatch(actions.setPlatformList(filterName));
    } else {
      setSelectedCategories({
        ...selectedCategories,
        platform: selectedCategories.platform.filter(
          (item) => item !== filterName
        ),
      });
      dispatch(actions.filterPlatformList(filterName));
    }
  };
  //Categories Search
  const filteredData = useMemo(() => {
    let recievedData = platforms;
    if (platformSearch) {
      recievedData = recievedData.filter((item) => {
        return item.platform
          .toLowerCase()
          .includes(platformSearch.toLowerCase());
      });
    }
    return recievedData;
  }, [platforms, platformSearch]);
  const constrainedItems = showMore
    ? filteredData
    : filteredData.slice(0, limit);
  return (
    <div className="mb-8">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={monitor} className="mr-2" alt="" />
            <div className="link text-secondary">
              Platform
            </div>
          </div>

          <div className="flex flex-1 ml-1">
            <div className="relative flex items-center w-full gap-2">
              {/*Search Input*/}
              <input
                placeholder=""
                className="relative bg-transparent focus:outline-none active:border-b-2 active:border-indigo-600 border-transparent border-b-2 focus:border-secondary z-20 w-full"
                onChange={(e) => setPlatformSearch(e.target.value)}
              />
              <div className="absolute top-0 right-0 -mt-1 mr-6 z-10">
                <Search />
              </div>
              {/*Platform Search Toggler*/}
              <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 w-8 h-7 flex items-center justify-center rounded cursor-pointer" onClick={() => setShowPlatform(!showPlatform)}>
                <ArrowDown
                  className={`stroke-current text-secondary transition-transform duration-500 transform ${showPlatform && "-rotate-180"
                    }`}
                  
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className={`max-h-0 overflow-hidden transition-all duration-500 ${showPlatform ? 'max-h-104 ease-in' : 'ease-out'}`}>

        <div className={`flex flex-col max-h-94 overflow-y-auto sidebar-filter-scroll`}>
          {constrainedItems.map((item) => {
            return (
              <div
                key={item.platform}
                className="flex justify-between items-center pb-2"
              >
                <div>
                  <PlatformFilterCheckbox
                    name={item.platform}
                    checked={checkedItems[item.platform]}
                    handleChange={handleChange}
                  />
                </div>
                <div className="caption text-secondary ml-3">
                  {Intl.NumberFormat("en-US").format(item.count)}
                </div>
              </div>
            );
          })}
        </div>
        {filteredData.length > limit && (
          <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 py-2 text-center rounded cursor-pointer mt-1">
            <div
              className="link text-secondary cursor-pointer"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformFilter;
