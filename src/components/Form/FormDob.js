import React from "react";

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
    // Apply regex replacements to format the input value
    let formattedValue = event.target.value.replace(/^(\d\d)(\d)$/g, "$1/$2");
    formattedValue = formattedValue.replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2");
    formattedValue = formattedValue.replace(/[^\d\/]/g, "");
    // Update the value in parent component
    onChange(formattedValue);
  };

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" style={{ height: "58px" }}>
        {icon}
      </span>
      <div className="form-floating flex-grow-1">
        <input
          maxLength={10}
          {...props}
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
