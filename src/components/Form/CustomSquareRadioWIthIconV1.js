import React, { useState } from "react";
import { setUserClickData } from "../../utility/setUserClickData";

const CustomSquareRadioWithIconV1 = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option) => {
    setUserClickData({
      event_name: "radio-button",
    });
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className="d-flex justify-content-between pl-4">
      <div
        className={`radio-shadow d-flex align-items-center ${
          selectedOption === "yes" ? "active" : ""
        }`}
        style={{ width: "0%", cursor: "pointer", boxShadow: "none" }}
        onClick={() => handleOptionChange("yes")}
      >
        <input
          type="radio"
          id="yes_val"
          value="yes"
          name="is_gst"
          required=""
          checked={selectedOption === "yes"}
          onChange={() => {}}
          style={{
            accentColor: selectedOption === "yes" ? "blue" : "gray",
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
          Yes
        </p>
      </div>
      <div
        className={`radio-shadow d-flex align-items-center ${
          selectedOption === "no" ? "active" : ""
        }`}
        style={{ width: "48%", cursor: "pointer", boxShadow: "none" }}
        onClick={() => handleOptionChange("no")}
      >
        <input
          type="radio"
          id="no_val"
          value="no"
          name="is_gst"
          required=""
          checked={selectedOption === "no"}
          onChange={() => {}}
          style={{
            accentColor: selectedOption === "no" ? "red" : "gray",
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
          No
        </p>
      </div>
    </div>
  );
};

export default CustomSquareRadioWithIconV1;
