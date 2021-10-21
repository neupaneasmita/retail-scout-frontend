import React, { useState, useMemo, useEffect } from "react";
import { ReactComponent as Search } from "../../../../../assets/images/dashboard/filter search.svg";
import { ReactComponent as ArrowDown } from "../../../../../assets/images/dashboard/arrow down.svg";
import { ReactComponent as Check } from "../../../../../assets/images/dashboard/check.svg";
import monitor from "../../../../../assets/images/dashboard/analyst/monitor.svg"
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../redux/actions/action";

import axiosInstance from "../../../../api/axiosInstance";

function TechnologyNameFilterCheckbox({ name, handleChange, checked = false }) {
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

const TechnologyNameFilter = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const [technologyName, setTechnologyName] = useState([]);
  const limit = 5;
  const [technologyNameSearch, setTechnologyNameSearch] = useState("");
  //Show / Hide Categories
  const [showTechnologyName, setShowTechnologyName] = useState(true);
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(technologyName.length > limit);
  const [checkedItems, setCheckedItems] = useState([]);
  const value = [];
  const cat = useSelector(
    (state) => state.fetchtableList.uncheck_technology_names
  );
  const technologyNameData = useSelector((state) => state.fetchtableList.technology_names);

  //Fetch platform
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/get-technology-name`);
        setTechnologyName(response.data);
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
    for(let i = 0; i < technologyNameData.length; i++) {
      data.push([technologyNameData[i], true]);
    }
    const finalData = Object.fromEntries(data);
    setCheckedItems(finalData);
       // eslint-disable-next-line
  }, [cat,technologyNameData]);
  
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
        technologyName: [...selectedCategories.technologyName, filterName],
      });
      dispatch(actions.setTechnologyNames(filterName));
    } else {
      setSelectedCategories({
        ...selectedCategories,
        technologyName: selectedCategories.technologyName.filter(
          (item) => item !== filterName
        ),
      });
      dispatch(actions.filterTechnologyNames(filterName));
    }
  };

  //Categories Search
  const filteredData = useMemo(() => {
    let recievedData = technologyName.slice(1);
    if (technologyNameSearch) {
      recievedData = recievedData.filter((item) => {
        return item.technology_name.toLowerCase().includes(technologyNameSearch.toLowerCase());
      });
    }
    return recievedData;
  }, [technologyName, technologyNameSearch]);

  const constrainedItems = showMore
    ? filteredData
    : filteredData.slice(0, limit);

  return (
    <div className="mb-8">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={monitor} className="mr-2" alt="" />
            <div className="link text-secondary">Technology Name</div>
            <div className="caption ml-1 p-1 rounded bg-gray-200 bg-opacity-80">
              {technologyName.length}
            </div>
          </div>
          <div className="flex flex-1 ml-1">
            <div className="relative flex items-center w-full gap-2">
              {/*Search Input*/}
              <input
                placeholder=""
                className="relative bg-transparent focus:outline-none active:border-b-2 active:border-indigo-600 border-transparent border-b-2 w-full focus:border-secondary z-20"
                onChange={(e) => setTechnologyNameSearch(e.target.value)}
              />
              <div className="absolute top-0 right-0 -mt-1 mr-6 z-10">
                <Search />
              </div>
              {/*Platform Search Toggler*/}
              <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 w-8 h-7 flex items-center justify-center rounded cursor-pointer" onClick={() => setShowTechnologyName(!showTechnologyName)}>
                <ArrowDown
                  className={`stroke-current text-secondary transition-transform duration-500 transform ${showTechnologyName && "-rotate-180"}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className={`max-h-0 overflow-hidden transition-all duration-500 ${showTechnologyName ? 'max-h-104 ease-in' : 'ease-out'}`}>

        <div
          className={`flex flex-col max-h-94 overflow-y-auto sidebar-filter-scroll`}
        >
          {constrainedItems.map((item) => {
            return (
              <div
                key={item.technology_name}
                className="flex justify-between items-center pb-2"
              >
                <div>
                  <TechnologyNameFilterCheckbox
                    name={item.technology_name}
                    checked={checkedItems[item.technology_name]}
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

export default TechnologyNameFilter;
