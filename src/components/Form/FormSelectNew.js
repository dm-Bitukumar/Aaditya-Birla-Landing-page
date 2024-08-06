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

        borderRadius: "1.2em",
      }}
    >
      <span
        className="input-group-text"
        style={{
          height: "58px",
          borderRadius: "1.2em  0 0 1.2em ",
          boxShadow: "0 0 5px 0pt #d3d3d3",
          background: "#fff",
          border: "none",
        }}
      >
        {icon}
      </span>
      <div className="form-floating flex-grow-1">
        <select
          style={{
            maxWidth: "99.5%",
            borderRadius: "0 1.2em  1.2em 0",
            boxShadow: "2px 0 5px 0pt #d3d3d3",
            border: "none",
            paddingRight: "30px",
          }}
          {...props}
          className={`form-control ${
            isValid ? "" : "is-invalid"
          } text-xs pt-3 `}
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
