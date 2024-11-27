import React from "react";
import "./GenderBox.css";

const GenderBox = ({ activeGender, setActiveGender }) => {
  return (
    <div className="gender-box-container">
      <div
        className={`gender-box ${activeGender === "male" ? "active" : ""}`}
        onClick={() => setActiveGender("male")}
      >
        <img
          src="/assets/icons/male.png"
          alt="Male"
          className="gender-icon"
        />
        <span className="gender-label">Male</span>
        {activeGender === "male" && (
          <img
            src="/assets/icons/tick.png"
            alt="Tick Icon"
            className="tick-icon"
          />
        )}
      </div>

      <div
        className={`gender-box ${activeGender === "female" ? "active" : ""}`}
        onClick={() => setActiveGender("female")}
      >
        <img
          src="/assets/icons/female.png"
          alt="Female"
          className="gender-icon"
        />
        <span className="gender-label">Female</span>
        {activeGender === "female" && (
          <img
            src="/assets/icons/tick.png"
            alt="Tick Icon"
            className="tick-icon"
          />
        )}
      </div>
    </div>
  );
};

export default GenderBox;
