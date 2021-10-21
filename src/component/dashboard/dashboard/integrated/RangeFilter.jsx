import React from "react";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
// import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
// import "./range.filter.scss";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <>
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
      />
    </>
  );
}

const RangeFilter = ({ title, onSubmit, onChange, minValue, maxValue }) => {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <div className="paragraph text-secondary">{title}</div>
      </div>
      <div className="flex items-center space-x-4">
        <TextField
          className=""
          label=""
          variant="outlined"
          value={minValue}
          onChange={onChange}
          name="minValue"
          id="minValue"
          size="small"
          inputprops={{
            inputComponent: NumberFormatCustom,
          }}
        />
        <div className="">
          <div className="caption text-secondary">to</div>
        </div>
        <TextField
          className=""
          label=""
          variant="outlined"
          value={maxValue}
          onChange={onChange}
          name="maxValue"
          id="maxValue"
          size="small"
          inputprops={{
            inputComponent: NumberFormatCustom,
          }}
        />
        <Button variant="contained" color="primary" onClick={onSubmit}>
          OK
        </Button>
      </div>
    </div>
  );
};

export default RangeFilter;
