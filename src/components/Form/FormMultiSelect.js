import React from "react";
import Select from "react-select";

const FormMultiSelect = ({
  isValid,
  options = [],
  isClearable = false,
  value,
  onChange,
  label,
  errorMessage,
  icon,
  ...props
}) => {
  const handleChange = (event) => {
    onChange(event);
  };

  const colorStyles = {
    control: (styles) => ({
      ...styles,
      padding: "0.43rem 0",
      maxWidth: "289px",
      height: "58px",
      overflow: "auto",
    }),
    options: (styles) => ({ ...styles, overflow: "scroll" }),
  };

  return (
    <div className="input-group mb-3" style={{ flexWrap: "nowrap" }}>
      <span className="input-group-text" style={{ height: "58px" }}>
        {icon}
      </span>
      <div className="form-floating flex-grow-1">
        <Select
          value={value}
          isMulti
          isClearable={isClearable}
          placeholder={label}
          styles={colorStyles}
          className="z-10"
          options={options}
          onChange={handleChange}
        />
        {!isValid && (
          <div className="invalid-feedback" id="invalid-select">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormMultiSelect;
