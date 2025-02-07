import React, { useState, useRef, useEffect } from "react";
import { setUserClickData } from "../../../utility/setUserClickData";

const FormSelectSearchable = ({
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
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (selectedValue) => {
    setUserClickData({ event_name: "single-select-input" });
    onChange(selectedValue);
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div
        className="input-group mb-3"
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="input-group-text"
          style={{
            height: "58px",
            background: "#fff",
            borderRight: "none",
            cursor: "pointer",
          }}
        >
          {icon}
        </span>
        <div className="form-floating flex-grow-1">
          <input
            type="text"
            className={`form-control ${isValid ? "" : "is-invalid"} text-xs`}
            value={options.find((opt) => opt.value === value)?.label || ""}
            placeholder={placeholder}
            readOnly
            style={{
                backgroundColor: "#fff",
                cursor: "pointer",
                borderLeft: "0px"
              }}
          />
          <label>{label}</label>
        </div>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute bg-white shadow-md rounded-md border w-full z-50"
          style={{ maxHeight: "250px", overflowY: "auto" }}
        >
          <div className="p-2 flex items-center justify-between border-b">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full border border-gray-300 p-2 text-xs rounded-md"
            />
            <button
              className="ml-2 text-gray-500 hover:text-gray-700 text-sm"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>

          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleChange(option.value)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}

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
  );
};

export default FormSelectSearchable;
