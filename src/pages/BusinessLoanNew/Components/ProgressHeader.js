import React from "react";
import "./ProgressHeader.css";

const ProgressHeader = ({ step = 1, onBack }) => {
  return (
    <div className="progress-header-container">
      {
        <div className="back-container">
          <button onClick={onBack} className="back-btn">
            <img src="/assets/img/Back arrow.svg" alt="Back" />
          </button>
          <p className="back-text">Back</p>
        </div>
      }

      <h2 className="progress-title">
        Get Your Loan Approved <br /> In Quick & Simple Steps!
      </h2>

      <div className="progress-indicator-wrapper">
        <div className="progress-indicator-1">
          <div className="step-item">
            <div className={`step-circle ${step >= 1 ? "active" : ""}`} />
            <span className="step-label">Step 1</span>
          </div>
          <div className={`step-line-1 ${step >= 2 ? "active" : ""}`} />
          <div className="step-item">
            <div className={`step-circle ${step >= 2 ? "active" : ""}`} />
            <span className="step-label">Step 2</span>
          </div>
          <div className={`step-line-1 ${step === 3 ? "active" : ""}`} />
          <div className="step-item">
            <div className={`step-circle ${step === 3 ? "active" : ""}`} />
            <span className="step-label">Step 3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;
