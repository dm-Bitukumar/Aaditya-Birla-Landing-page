import React, { useState } from "react";
import { setUserClickData } from "../../../utility/setUserClickData";

const CustomCheckboxGroup = ({
  activeGender,
  setActiveGender,
  isValid,
  errorMessage,
}) => {
  const [selectedGender, setSelectedGender] = useState("");

  const handleGenderChange = (gender) => {
    setUserClickData({
      event_name: "gender-custom-button",
    });
    setSelectedGender(gender);
    setActiveGender(gender);
  };

  return (
    <div className={`${!isValid ? "mb-2" : "mb-3"} `}>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            marginRight: "5px",
            boxShadow: "-1px 0 5px 0.5pt #d3d3d3",
            borderRadius: "1.2em",
          }}
          className={`gender-radio-btn   ${
            activeGender === "male" ? "active-gender-box" : ""
          }`}
          onClick={() => handleGenderChange("male")}
        >
          <div className="text-center male-female">
            <img
              style={{
                marginLeft: "1.5em",
              }}
              src="/assets/img/Icon 2.png"
              alt="Male"
              className="gender-image"
            />
            &nbsp;
            <input
              hidden
              type="radio"
              id="male_val"
              value="male"
              name="gender"
              required=""
            />
            <span
              className=""
              style={{ paddingLeft: "5px", paddingRight: "50px" }}
            >
              Male
            </span>
            <span className="ml-4">
              <img
                src="/assets/icons/tick.png"
                id="male_img"
                style={{ display: activeGender === "male" ? "block" : "none" }}
              />
            </span>
          </div>
        </div>
        <div
          style={{
            marginLeft: "5px",
            boxShadow: "1px 0 5px 0.5pt #d3d3d3",
            borderRadius: "1.2em",
          }}
          className={`gender-radio-btn  female-radio ${
            activeGender === "female" ? "active-gender-box" : ""
          }`}
          onClick={() => handleGenderChange("female")}
        >
          <div className="text-center male-female">
            <img
              style={{
                marginLeft: "1.5em",
              }}
              src="/assets/img/Icon 3.png"
              alt="Female"
              className="gender-image"
            />
            &nbsp;
            <input
              hidden
              type="radio"
              id="female_val"
              value="female"
              name="gender"
              required=""
            />
            <span
              className=""
              style={{ paddingLeft: "5px", paddingRight: "35px" }}
            >
              Female
            </span>
            <span className="ml-4">
              <img
                src="/assets/icons/tick.png"
                id="male_img"
                style={{
                  display: activeGender === "female" ? "block" : "none",
                }}
              />
            </span>
          </div>
        </div>
      </div>
      {!isValid && (
        <div
          className="text-center invalid-feedback d-block"
          id="invalid-select"
          style={{ display: "block" }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default CustomCheckboxGroup;
