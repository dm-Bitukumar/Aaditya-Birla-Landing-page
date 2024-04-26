import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

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
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleOptionSelect = (selectedValue) => {
    setSearchValue("");
    onChange(selectedValue);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className="input-group mb-3" style={{ flexWrap: "nowrap" }}>
      <span className="input-group-text" style={{ height: "58px" }}>
        {icon}
      </span>
      <div className="form-floating flex-grow-1">
        <Dropdown>
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
        </Dropdown>
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
