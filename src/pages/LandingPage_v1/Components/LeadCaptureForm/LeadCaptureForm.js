import React from "react";
import "./LeadCaptureForm.css";

const LeadCaptureForm = () => {
  return (
    <div className="lead-capture-container">
      <h2 className="form-title">
        Get Your Loan Approved in
        <br />
        Quick & Simple Steps!
      </h2>
      <p className="form-subtitle">
        We will use your contact details to proceed further.
      </p>

      <input type="text" placeholder="Mobile Number" className="mobile-input" />

      <div className="checkbox-wrapper">
        <input type="checkbox" id="consent" />
        <label htmlFor="consent">
          I have read and agreed to the Terms of Use and hereby appoint
          DigitMoney and its Lending Partners to receive my credit information
          from credit bureaus. By submitting my details I override my NDNC
          registration & authorize DigitMoney and its Lending Partners /
          representatives to contact me through Call, SMS, Email, Whatsapp or
          any other mode. You also authorize us to send you promotional offers
          of financial & non-financial products or services from time to time.
        </label>
      </div>

      <button className="otp-button">
        Get OTP{" "}
        <img
          src="/assets/img/CTA Arrow.svg"
          alt="arrow"
          className="cta-arrow"
        />
      </button>
    </div>
  );
};

export default LeadCaptureForm;
