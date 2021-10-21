import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../redux/actions/action";
const YoutubeFollowersFilter = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const youtubeData = useSelector((state) => state.fetchtableList.youtube);
  //Youtube Followers
  const [youtubeFollowers, setYoutubeFollowers] = useState({
    min: "",
    max: "",
  });
  const [error, setError] = useState({
    minError: false,
    maxError: false
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("event.target", event.target);
    setYoutubeFollowers({
      ...youtubeFollowers,
      [name]: value,
    });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if(!youtubeData){
      setYoutubeFollowers({
        min: "",
        max: "",
      })
    } else {
      setYoutubeFollowers({
        min: youtubeData.youtube.min,
        max: youtubeData.youtube.max,
      })
    }
  }, [youtubeData]);

  const onSubmit = (event) => {
    if(!youtubeFollowers.min){
      setError({
        ...error, minError: true
      });
    } else if(!youtubeFollowers.max){
      setError({
        ...error, maxError: true
      });
    } else {
      setError(false);
      event.preventDefault();
      const newArray = new Array(youtubeFollowers);
      // console.log(newArray);
      setSelectedCategories({
        ...selectedCategories,
        youtubeFollowers: newArray,
      });
      const social = { youtube: youtubeFollowers };
      dispatch(actions.setYoutube(social));
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4 px-2 pb-1">
        <input
          type="number"
          className={`filter-input-number ${error.minError ? "error" : "success"}`}
          value={youtubeFollowers.min}
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
          value={youtubeFollowers.max}
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

export default YoutubeFollowersFilter;
