import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import Select from "react-select";

const FormSearchSelect = ({
  isValid,
  options = [],
  value,
  onChange,
  label,
  errorMessage,
  icon,
  ...props
}) => {
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
          isSearchable
          placeholder={label}
          styles={colorStyles}
          options={options}
          className="z-6"
          onChange={(e) => onChange(e)}
        />
        {/* <Dropdown>
          <Dropdown.Toggle
            className={"form-control custom-dropdown"}
            variant="light"
            style={{ borderColor: !isValid ? "red" : "" }}
          >
            {value ? value : label}
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{
              maxHeight: "180px",
              overflowY: "scroll",
              position: "absolute",
            }}
          >
            <div className="form-floating">
              <input
                style={{ height: "32px" }}
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Search..."
              />
              <div className="dropdown-divider"></div>
              {filteredOptions.map((option) => (
                <Dropdown.Item
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                >
                  {option.label}
                </Dropdown.Item>
              ))}
              {filteredOptions.length === 0 && (
                <Dropdown.Item disabled>No matching options</Dropdown.Item>
              )}
            </div>
          </Dropdown.Menu>
        </Dropdown> */}
        {!isValid && (
          <div
            style={{ display: "block" }}
            className="invalid-feedback"
            id="invalid-select"
          >
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSearchSelect;
