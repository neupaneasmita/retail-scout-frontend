import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../redux/actions/action";

const FacebookFollowersFilter = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const facebookData = useSelector((state) => state.fetchtableList.facebook);
  
  //Facebook Followers
  const [facebookFollowers, setFacebookFollowers] = useState({
    min: "",
    max: "",
  });
  const [error, setError] = useState({
    minError: false,
    maxError: false
  });
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!facebookData){
      setFacebookFollowers({
        min: "",
        max: "",
      })
    } else {
      setFacebookFollowers({
        min: facebookData.facebook.min,
        max: facebookData.facebook.max,
      })
    }
  }, [facebookData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("event.target", event.target);
    setFacebookFollowers({
      ...facebookFollowers,
      [name]: value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if(!facebookFollowers.min){
      setError({
        ...error, minError: true
      });
    } else if(!facebookFollowers.max){
      setError({
        ...error, maxError: true
      });
    } else {
      setError(false);
      const newArray = new Array(facebookFollowers);
      // console.log(newArray);
      setSelectedCategories({
        ...selectedCategories,
        facebookFollowers: newArray,
      });
      const social = { facebook: facebookFollowers };
      dispatch(actions.setFacebook(social));
    }
    
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4 px-2 pb-1">
        <input
          type="number"
          className={`filter-input-number ${error.minError ? "error" : "success"}`}
          value={facebookFollowers.min}
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
          value={facebookFollowers.max}
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

export default FacebookFollowersFilter;
