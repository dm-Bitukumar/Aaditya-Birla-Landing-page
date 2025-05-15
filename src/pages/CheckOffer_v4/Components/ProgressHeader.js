import React from "react";
import "./ProgressHeader.css";

const ProgressHeader = ({ step = 1, onBack }) => {
  return (
    <div className="progress-header-container1">
      <video
        className="background-video"
        src="/assets/img/BG video.mp4"
        autoPlay
        loop
        muted
      />
      {
        <div className="back-container">
          <button onClick={onBack} className="back-btn">
            <img
              style={{ height: "41px", width: "41px" }}
              src="/assets/img/back-white.png"
              alt="Back"
            />
          </button>
          <p className="back-text">Back</p>
        </div>
      }

      <h2 className="progress-title1">
        Get Your Loan Approved <br /> In Simple Steps
      </h2>

      {/* <div className="progress-indicator-wrapper">
        <div className="progress-indicator">
          <div className="step-item">
            <div className={`step-circle ${step >= 1 ? "active" : ""}`} />
            <span className="step-label">Step 1</span>
          </div>
          <div className={`step-line ${step >= 2 ? "active" : ""}`} />
          <div className="step-item">
            <div className={`step-circle ${step >= 2 ? "active" : ""}`} />
            <span className="step-label">Step 2</span>
          </div>
          <div className={`step-line ${step === 4 ? "active" : ""}`} />
          <div className="step-item">
            <div className={`step-circle ${step === 4 ? "active" : ""}`} />
            <span className="step-label">Step 3</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProgressHeader;
