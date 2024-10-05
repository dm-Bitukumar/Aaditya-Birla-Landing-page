import React from "react";
import { setUserClickData } from "../../utility/setUserClickData";

const FormDob = ({
  isValid,
  value,
  onChange,
  label,
  errorMessage,
  icon,
  ...props
}) => {
  const handleInputChange = (event) => {
    setUserClickData({
      event_name: "dob-form",
    });
    // Apply regex replacements to format the input value
    let formattedValue = event.target.value.replace(/^(\d\d)(\d)$/g, "$1/$2");
    formattedValue = formattedValue.replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2");
    formattedValue = formattedValue.replace(/[^\d\/]/g, "");
    // Update the value in parent component
    onChange(formattedValue);
  };

  return (
    <div className="mb-3 input-group">
      <span
        className="input-group-text"
        style={{
          height: "58px",
          borderRadius: "0.6em 0 0 0.6em ",
          background: "#fff",
          borderRight: "none",
          boxShadow: "-2px 0 4px -0.2pt #d3d3d3",
        }}
      >
        {icon}
      </span>
      <div className="form-floating flex-grow-1">
        <input
          maxLength={10}
          {...props}
          style={{
            borderRadius: "0 0.6em 0.6em 0",
            boxShadow: "2px 0px 4px -0.2pt #d3d3d3",
            borderLeft: "none",

            // padding: "20px",
          }}
          className={`form-control ${isValid ? "" : "is-invalid"}`}
          value={value}
          onChange={handleInputChange}
          required
        />
        <label htmlFor={label}>{label ? label : "Label here"}</label>
        {!isValid && (
          <div className="invalid-feedback" id="invalid-dob">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormDob;
