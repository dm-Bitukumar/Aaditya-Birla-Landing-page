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
    <div className="mb-3 common-checkbox-element">
      <div className="mx-0 row all-border">
        <div
          className={`gender-radio-btn w-50 male-radio ${
            activeGender === "male" ? "active-gender-box" : ""
          }`}
          onClick={() => handleGenderChange("male")}
        >
          <div className="text-center male-female">
            <img
              src="/assets/icons/male.png"
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
            <span className="" style={{ paddingRight: "60px" }}>
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
          className={`gender-radio-btn w-50 female-radio ${
            activeGender === "female" ? "active-gender-box" : ""
          }`}
          onClick={() => handleGenderChange("female")}
        >
          <div className="text-center male-female">
            <img
              src="/assets/icons/female.png"
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
            <span className="" style={{ paddingRight: "50px" }}>
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
