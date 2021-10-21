import React from "react";
import Slider from "@material-ui/core/Slider";

const CompanySizeSliderFilter = () => {
  const [values, setValues] = React.useState({
    minValue: 0,
    maxValue: 5000,
  });

  const handleChangeSlider = (event, newValues) => {
    // console.log("slider ev target", event.target);
    // console.log("newValues", newValues);

    const newArr = newValues.sort(function compareNumbers(a, b) {
      return a - b;
    });
    console.log("newArr", newValues);
    setValues({
      minValue: newArr[0],
      maxValue: newArr[1],
    });
    //----------------------
    // setSelectedCategories({
    //   ...selectedCategories,
    //   companySize: newArr,
    // });
  };

  return (
    <div className="mb-8">
      <div className="mb-4">
        <div className="link text-secondary">Slider Range Filter</div>
      </div>
      <div className="flex justify-between items-center">
        <div
          className="caption text-secondary"
          // value={values.minValue}
          // name="minValue"
          id="minValue"
          // inputprops={{
          //   inputComponent: NumberFormatCustom,
          // }}
        >
          {values.minValue}
        </div>
        <div
          className=""
          // value={values.maxValue}
          // name="maxValue"
          id="maxValue"
          // inputprops={{
          //   inputComponent: NumberFormatCustom,
          // }}
        >
          {values.maxValue}
        </div>
      </div>
      <div className="">
        <div>
          <Slider
            value={[values.minValue, values.maxValue]}
            onChange={handleChangeSlider}
            aria-labelledby="range-slider"
            min={0}
            max={5000}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanySizeSliderFilter;
