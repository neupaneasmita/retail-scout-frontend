import React, { useState, useMemo, useEffect } from "react";
import { ReactComponent as Search } from "../../../../../assets/images/dashboard/filter search.svg";
import { ReactComponent as ArrowDown } from "../../../../../assets/images/dashboard/arrow down.svg";
import { ReactComponent as Check } from "../../../../../assets/images/dashboard/check.svg";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../redux/actions/action";

import axiosInstance from "../../../../api/axiosInstance";

function TechnologyTypeFilterCheckbox({ name, handleChange, checked = false }) {
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

const TechnologyTypeFilter = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const [technologyType, setTechnologyType] = useState([]);
  const limit = 5;
  const [technologyTypeSearch, setTechnologyTypeSearch] = useState("");
  //Show / Hide Categories
  const [showTechnologyType, setShowTechnologyType] = useState(true);
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(technologyType.length > limit);
  const [checkedItems, setCheckedItems] = useState([]);
  const value = [];
  const cat = useSelector(
    (state) => state.fetchtableList.uncheck_technology_types
  );
  const technologyTypeData = useSelector((state) => state.fetchtableList.technology_types);

  //Fetch platform
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/get-technology-type`);
        setTechnologyType(response.data);
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
    for(let i = 0; i < technologyTypeData.length; i++) {
      data.push([technologyTypeData[i], true]);
    }
    const finalData = Object.fromEntries(data);
    setCheckedItems(finalData);

   // eslint-disable-next-line
  }, [cat,technologyTypeData]);

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
        technologyType: [...selectedCategories.technologyType, filterName],
      });
      dispatch(actions.setTechnologyTypes(filterName));
    } else {
      setSelectedCategories({
        ...selectedCategories,
        technologyType: selectedCategories.technologyType.filter(
          (item) => item !== filterName
        ),
      });
      dispatch(actions.filterTechnologyTypes(filterName));
    }
  };

  //Categories Search
  const filteredData = useMemo(() => {
    let recievedData = technologyType;
    if (technologyTypeSearch) {
      recievedData = recievedData.filter((item) => {
        return item.technology_type.toLowerCase().includes(technologyTypeSearch.toLowerCase());
      });
    }
    return recievedData;
  }, [technologyType, technologyTypeSearch]);

  const constrainedItems = showMore
    ? filteredData
    : filteredData.slice(0, limit);

  return (
    <div className="mb-8">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.933,15.055H3.479A3.232,3.232,0,0,1,.25,11.827V3.478A3.232,3.232,0,0,1,3.479.25h8.454a3.232,3.232,0,0,1,3.228,3.228v8.349A3.232,3.232,0,0,1,11.933,15.055ZM3.479,2.75a.73.73,0,0,0-.729.728v8.349a.73.73,0,0,0,.729.728h8.454a.729.729,0,0,0,.728-.728V3.478a.729.729,0,0,0-.728-.728Z"/><path d="M11.974,34.75H3.52A3.233,3.233,0,0,1,.291,31.521V23.173A3.232,3.232,0,0,1,3.52,19.945h8.454A3.232,3.232,0,0,1,15.2,23.173v8.348A3.232,3.232,0,0,1,11.974,34.75ZM3.52,22.445a.73.73,0,0,0-.729.728v8.348a.73.73,0,0,0,.729.729h8.454a.73.73,0,0,0,.728-.729V23.173a.729.729,0,0,0-.728-.728Z"/><path d="M31.522,34.75H23.068a3.233,3.233,0,0,1-3.229-3.229V23.173a3.232,3.232,0,0,1,3.229-3.228h8.454a3.232,3.232,0,0,1,3.228,3.228v8.348A3.232,3.232,0,0,1,31.522,34.75Zm-8.454-12.3a.73.73,0,0,0-.729.728v8.348a.73.73,0,0,0,.729.729h8.454a.73.73,0,0,0,.728-.729V23.173a.729.729,0,0,0-.728-.728Z"/><path d="M27.3,15.055a7.4,7.4,0,1,1,7.455-7.4A7.437,7.437,0,0,1,27.3,15.055Zm0-12.3a4.9,4.9,0,1,0,4.955,4.9A4.935,4.935,0,0,0,27.3,2.75Z"/>
              </svg>
            </div>
            <div className="link text-secondary">Technology Category</div>
            <div className="caption ml-1 p-1 rounded bg-gray-200 bg-opacity-80">
              {technologyType.length}
            </div>
          </div>
          <div className="flex flex-1 ml-1">
            <div className="relative flex items-center w-full gap-2">
              {/*Search Input*/}
              <input
                placeholder=""
                className="relative bg-transparent focus:outline-none active:border-b-2 active:border-indigo-600 border-transparent border-b-2 focus:border-secondary z-20 w-full"
                onChange={(e) => setTechnologyTypeSearch(e.target.value)}
              />
              <div className="absolute top-0 right-0 -mt-1 mr-6 z-10">
                <Search />
              </div>
              {/*Platform Search Toggler*/}
              <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 w-8 h-7 flex items-center justify-center rounded cursor-pointer" onClick={() => setShowTechnologyType(!showTechnologyType)}>
                <ArrowDown
                  className={`stroke-current text-secondary transition-transform duration-500 transform ${showTechnologyType && "-rotate-180"}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className={`max-h-0 overflow-hidden transition-all duration-500 ${showTechnologyType ? 'max-h-104 ease-in' : 'ease-out'}`}>
        <div
          className={`flex flex-col max-h-94 overflow-y-auto sidebar-filter-scroll`}
        >
          {constrainedItems.map((item) => {
            return (
              <div
                key={item.technology_type}
                className="flex justify-between items-center pb-2"
              >
                <div>
                  <TechnologyTypeFilterCheckbox
                    name={item.technology_type}
                    checked={checkedItems[item.technology_type]}
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

export default TechnologyTypeFilter;
