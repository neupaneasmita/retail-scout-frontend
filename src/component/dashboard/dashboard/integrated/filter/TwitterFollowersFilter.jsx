import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../redux/actions/action";

const TwitterFollowersFilter = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const twitterData = useSelector((state) => state.fetchtableList.twitter);
  //Twitter Followers
  const [twitterFollowers, setTwitterFollowers] = useState({
    min: "",
    max: "",
  });
  const [error, setError] = useState({
    minError: false,
    maxError: false
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if(!twitterData){
      setTwitterFollowers({
        min: "",
        max: "",
      })
    } else {
      setTwitterFollowers({
        min: twitterData.twitter.min,
        max: twitterData.twitter.max,
      })
    }
  }, [twitterData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("event.target", event.target);
    setTwitterFollowers({
      ...twitterFollowers,
      [name]: value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if(!twitterFollowers.min){
      setError({
        ...error, minError: true
      });
    } else if(!twitterFollowers.max){
      setError({
        ...error, maxError: true
      });
    } else {
      setError(false);
      const newArray = new Array(twitterFollowers);
      // console.log(newArray);
      setSelectedCategories({
        ...selectedCategories,
        twitterFollowers: newArray,
      });
      const social = { twitter: twitterFollowers };
      dispatch(actions.setTwitter(social));
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4 px-2 pb-1">
        <input
          type="number"
          className={`filter-input-number ${error.minError ? "error" : "success"}`}
          value={twitterFollowers.min}
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
          value={twitterFollowers.max}
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

export default TwitterFollowersFilter;
