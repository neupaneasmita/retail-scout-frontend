import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../redux/actions/action";
const CompanySizeFilter = ({ selectedCategories, setSelectedCategories }) => {
  const companySizeData = useSelector((state) => state.fetchtableList.company_size);
  // console.log(companySizeData);
  //Company Size Filter
  const [companySize, setCompanySize] = useState({
    min: "",
    max: "",
  });
  const [error, setError] = useState({
    minError: false,
    maxError: false
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if(!companySizeData){
      setCompanySize({
        min: "",
        max: "",
      })
    } else {
      setCompanySize({
        min: companySizeData.min,
        max: companySizeData.max,
      })
    }
  }, [companySizeData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("event.target", event.target);
    setCompanySize({
      ...companySize,
      [name]: value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if(!companySize.min){
      setError({
        ...error, minError: true
      });
    } else if(!companySize.max){
      setError({
        ...error, maxError: true
      });
    } else {
      setError(false);
      const newArray = new Array(companySize);
      // console.log(newArray);
      setSelectedCategories({
        ...selectedCategories,
        companySize: newArray,
      });
      dispatch(actions.setCompanyList(companySize));
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4 px-2 pb-1">
        <input
          type="number"
          className={`filter-input-number ${error.minError ? "error" : "success"}`}
          value={companySize.min}
          onChange={handleChange}
          name="min"
          id="min"
          min="0"
          placeholder="min"
        />
        <div className="">
          <div className="caption text-secondary">to</div>
        </div>
        <input
          type="number"
          className={`filter-input-number ${error.minError ? "error" : "success"}`}
          value={companySize.max}
          onChange={handleChange}
          name="max"
          id="max"
          min="0"
          placeholder="max"
        />
        <button
          type="submit"
          className="bg-primary px-5 py-2 text-secondary font-semibold rounded focus:outline-none"
          onClick={onSubmit}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CompanySizeFilter;
