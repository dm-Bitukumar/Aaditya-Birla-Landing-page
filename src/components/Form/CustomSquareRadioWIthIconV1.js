import React, { useState } from "react";
import { setUserClickData } from "../../utility/setUserClickData";

const CustomSquareRadioWithIconV1 = ({ value, onChange, name }) => {
  const handleOptionChange = (option) => {
    setUserClickData({ event_name: "radio-button" });
    onChange?.(option);
  };

  return (
    <div className="d-flex justify-content-between pl-4">
      {["yes", "no"].map((option) => (
        <div
          key={option}
          className={`radio-shadow d-flex align-items-center ${
            value === option ? "active" : ""
          }`}
          style={{ width: "48%", cursor: "pointer", boxShadow: "none" }}
          onClick={() => handleOptionChange(option)}
        >
          <input
            type="radio"
            id={`${name}_${option}`}
            value={option}
            name={name}
            checked={value === option}
            readOnly
            style={{
              accentColor:
                value === option ? (option === "yes" ? "blue" : "red") : "gray",
              transform: "scale(1.1)",
            }}
          />
          <p
            style={{
              textAlign: "left",
              width: "90%",
              fontSize: "16px",
              paddingLeft: "5px",
            }}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CustomSquareRadioWithIconV1;
