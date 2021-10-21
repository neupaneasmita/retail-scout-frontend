import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../redux/actions/action";

const TiktokFollowersFilter = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const tiktokData = useSelector((state) => state.fetchtableList.tiktok);
  //Tiktok Followers
  const [tiktokFollowers, setTiktokFollowers] = useState({
    min: "",
    max: "",
  });
  const [error, setError] = useState({
    minError: false,
    maxError: false
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if(!tiktokData){
      setTiktokFollowers({
        min: "",
        max: "",
      })
    } else {
      setTiktokFollowers({
        min: tiktokData.tiktok.min,
        max: tiktokData.tiktok.max,
      })
    }
  }, [tiktokData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("event.target", event.target);
    setTiktokFollowers({
      ...tiktokFollowers,
      [name]: value,
    });
  };
  
  const onSubmit = (event) => {
    event.preventDefault();
    if(!tiktokFollowers.min){
      setError({
        ...error, minError: true
      });
    } else if(!tiktokFollowers.max){
      setError({
        ...error, maxError: true
      });
    } else {
      const newArray = new Array(tiktokFollowers);
      // console.log(newArray);
      setSelectedCategories({
        ...selectedCategories,
        tiktokFollowers: newArray,
      });
      const social = { tiktok: tiktokFollowers };
      dispatch(actions.setTiktok(social));
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4 px-2 pb-1">
        <input
          type="number"
          className={`filter-input-number ${error.minError ? "error" : "success"}`}
          value={tiktokFollowers.min}
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
          value={tiktokFollowers.max}
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

export default TiktokFollowersFilter;
