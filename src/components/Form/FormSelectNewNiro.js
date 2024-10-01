import React from "react";
import { setUserClickData } from "../../utility/setUserClickData";

const FormSelect = ({
  isValid,
  options = [],
  value,
  onChange,
  label,
  errorMessage,
  icon,
  ...props
}) => {
  const handleChange = (event) => {
    setUserClickData({
      event_name: "single-select-input",
    });
    // Get the selected value
    const selectedValue = event.target.value;
    // Pass the selected value to the parent component
    onChange(selectedValue);
  };

  return (
    <div
      className={`input-group ${!isValid ? "mb-2" : "mb-3"} ${props.className}`}
      style={{
        flexWrap: "nowrap",

        borderRadius: "0.6em",
      }}
    >
      <span
        className="input-group-text"
        style={{
          height: "58px",
          borderRadius: "0.8em  0 0 0.8em ",
          boxShadow: "-2px 0px 4px -0.2pt #d3d3d3",
          background: "#fff",
          borderLeft: "1px solid #ced4da",
          borderRight: "0px",
          borderTop: "1px solid #ced4da",
          borderBottom: "1px solid #ced4da",
        }}
      >
        {icon}
      </span>
      <div className=" form-floating flex-grow-1">
        <select
          style={{
            appearance: "none !important",
            maxWidth: "99.5%",
            borderRadius: "0 0.8em  0.8em 0",
            boxShadow: "2px 0px 4px -0.2pt #d3d3d3",
            borderRight: "1px solid #ced4da",
            borderLeft: "0px",
            borderTop: "1px solid #ced4da",
            borderBottom: "1px solid #ced4da",
            paddingRight: "20px !important",
          }}
          {...props}
          className={`form-control ${
            isValid ? "" : "is-invalid"
          } text-xs pt-3 custom-selected`}
          value={value}
          onChange={handleChange}
        >
          {value === "" && (
            <option disabled value="">
              {label}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {!isValid && (
          <div className="invalid-feedback" id="invalid-select">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSelect;
