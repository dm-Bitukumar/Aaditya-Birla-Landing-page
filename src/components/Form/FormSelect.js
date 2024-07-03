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
      className={`input-group mb-3 ${props.className}`}
      style={{ flexWrap: "nowrap" }}
    >
      <span className="input-group-text" style={{ height: "58px" }}>
        {icon}
      </span>
      <div className="form-floating flex-grow-1">
        <select
          style={{ maxWidth: "300px" }}
          {...props}
          className={`form-control ${isValid ? "" : "is-invalid"} text-xs pt-3`}
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
