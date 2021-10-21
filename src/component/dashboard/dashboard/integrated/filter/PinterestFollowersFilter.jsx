import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../redux/actions/action";
const PinterestFollowersFilter = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const pinterestData = useSelector((state) => state.fetchtableList.pintress);
  //Pinterest Followers
  const [pinterestFollowers, setPinterestFollowers] = useState({
    min: "",
    max: "",
  });
  const [error, setError] = useState({
    minError: false,
    maxError: false
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if(!pinterestData){
      setPinterestFollowers({
        min: "",
        max: "",
      })
    } else {
      setPinterestFollowers({
        min: pinterestData.pintress.min,
        max: pinterestData.pintress.max,
      })
    }
  }, [pinterestData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("event.target", event.target);
    setPinterestFollowers({
      ...pinterestFollowers,
      [name]: value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if(!pinterestFollowers.min){
      setError({
        ...error, minError: true
      });
    } else if(!pinterestFollowers.max){
      setError({
        ...error, maxError: true
      });
    } else {
      setError(false);
      const newArray = new Array(pinterestFollowers);
      // console.log(newArray);
      setSelectedCategories({
        ...selectedCategories,
        pinterestFollowers: newArray,
      });
      const social = { pintress: pinterestFollowers };
      dispatch(actions.setPintress(social));
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4 px-2 pb-1">
        <input
          type="number"
          className={`filter-input-number ${error.minError ? "error" : "success"}`}
          value={pinterestFollowers.min}
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
          className={`filter-input-number ${error.maxError ? "error" : "success"}`}
          value={pinterestFollowers.max}
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

export default PinterestFollowersFilter;
