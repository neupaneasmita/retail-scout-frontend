import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axiosInstance from "../../../../api/axiosInstance";
import { useDispatch } from "react-redux";
import * as actions from "../../../../../redux/actions/action";

const TechnologyFilter = ({ selectedCategories, setSelectedCategories }) => {
  const [technology, setTechnology] = useState([]);
  //Technology Autocomplete
  const [technologyValue, setTechnologyValue] = useState(null);
  const dispatch = useDispatch();
  //Fetch technology
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`get-technology-type`);
        setTechnology(response.data);
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

  const onTechnologyChange = (event, newValue) => {
    setTechnologyValue(newValue);
    // const { technology } = categories;
    if (technology.includes(newValue)) {
      setSelectedCategories({
        ...selectedCategories,
        technology: newValue,
      });
      // dispatch(actions.setTechnologyList(newValue));
    } else if (newValue === null) {
      setSelectedCategories({
        ...selectedCategories,
        technology: selectedCategories.technology === "",
      });
      // dispatch(actions.setTechnologyList(""));
    }
  };

  // const [value, setValue] = React.useState(null);

  // console.log(value);
  return (
    <div className="mb-8">
      <div className="mb-2">
        <div className="link text-secondary">Technology</div>
        <div className="caption ml-1 p-1 rounded bg-gray-200 bg-opacity-80">
          {technology.length}
        </div>
      </div>
      <Autocomplete
        value={technologyValue}
        onChange={(event, newValue) => onTechnologyChange(event, newValue)}
        // inputValue={inputValue}
        // onInputChange={(event, newInputValue) => {
        //   setInputValue(newInputValue);
        // }}
        id="controllable-states-demo"
        options={technology}
        style={{ width: "100%" }}
        renderInput={(params) => (
          <TextField {...params} label="Search technology" size="medium" />
        )}
      />
    </div>
  );
};

export default TechnologyFilter;
