import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../redux/actions/action";

const InstagramFollowersFilter = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const instagramData = useSelector((state) => state.fetchtableList.instagram);
  //Instagram Followers
  const [instagramFollowers, setInstagramFollowers] = useState({
    min: "",
    max: "",
  });
  const [error, setError] = useState({
    minError: false,
    maxError: false
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if(!instagramData){
      setInstagramFollowers({
        min: "",
        max: "",
      })
    } else {
      setInstagramFollowers({
        min: instagramData.instagram.min,
        max: instagramData.instagram.max,
      })
    }
  }, [instagramData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("event.target", event.target);
    setInstagramFollowers({
      ...instagramFollowers,
      [name]: value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if(!instagramFollowers.min){
      setError({
        ...error, minError: true
      });
    } else if(!instagramFollowers.max){
      setError({
        ...error, maxError: true
      });
    } else {
      setError(false);
      const newArray = new Array(instagramFollowers);
      // console.log(newArray);
      setSelectedCategories({
        ...selectedCategories,
        instagramFollowers: newArray,
      });
      const social = { instagram: instagramFollowers };
      dispatch(actions.setInstagram(social));
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4 px-2 pb-1">
        <input
          type="number"
          className={`filter-input-number ${error.minError ? "error" : "success"}`}
          value={instagramFollowers.min}
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
          value={instagramFollowers.max}
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

export default InstagramFollowersFilter;
