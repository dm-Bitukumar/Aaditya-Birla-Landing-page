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
    <div className="d-flex justify-content-between">
      <div
        className={`radio-shadow d-flex align-items-center px-4 ${
          selectedOption === "yes" ? "active" : ""
        }`}
        style={{ width: "48%", cursor: "pointer", boxShadow: "none" }}
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
        />
        <p
          // className="text-center"
          style={{
            textAlign: "left",
            width: "90%",
            fontSize: "14px",
            marginLeft: "5px !important",
          }}
        >
          Yes
        </p>
        {/* {selectedOption === "yes" && (
          <img
            src="/assets/icons/tick.png"
            id="yes_img"
            alt="Tick"
            style={{ height: "16px", position: "relative", right: "0px" }}
          />
        )} */}
      </div>
      <div
        className={`radio-shadow d-flex align-items-center px-4 ${
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
        />
        <p
          // className="text-center"
          style={{
            textAlign: "left",
            width: "90%",
            fontSize: "14px",
            marginLeft: "5px !important",
          }}
        >
          No
        </p>
        {/* {selectedOption === "no" && (
          <img
            src="/assets/icons/tick.png"
            id="no_img"
            alt="Tick"
            style={{ height: "16px", position: "relative", right: "0px" }}
          />
        )} */}
      </div>
    </div>
  );
};

export default CustomSquareRadioWithIconV1;
