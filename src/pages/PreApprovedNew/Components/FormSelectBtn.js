import React from "react";
import { setUserClickData } from "../../../utility/setUserClickData";

const FormSelect = ({
  isValid,
  options = [],
  value = "",
  onChange,
  label,
  errorMessage,
  icon,
  placeholder, 
  ...props
}) => {
  const handleChange = (event) => {
    setUserClickData({
      event_name: "single-select-input",
    });
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <div className={`input-group mb-3 ${props.className}`} style={{ flexWrap: "nowrap" }}>
      <span
        className="input-group-text"
        style={{
          height: "58px",
          background: "#fff",
          borderRight: "none",
        }}
      >
        {icon}
      </span>
      <div className="form-floating flex-grow-1">
        <select
          style={{
            maxWidth: "400px",
            borderLeft: "none",
            paddingRight: "0",
            paddingLeft: "10px", 
          }}
          {...props}
          className={`form-control ${isValid ? "" : "is-invalid"} text-xs`}
          value={value}
          onChange={handleChange}
        >

          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label>
          {label}
        </label>
        {!isValid && (
          <div
            className="invalid-feedback"
            id="invalid-select"
            style={{ position: "absolute", bottom: "-20px" }}
          >
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSelect;
