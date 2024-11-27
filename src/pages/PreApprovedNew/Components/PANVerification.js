import React, { useState } from "react";
import FormInput from "../../../components/Form/FormInput";
import FormButton from "../../../components/Buttons/FormButton";
import callApi from "../../../utility/apiCaller";
import { toast } from "react-toastify";
import "./PreApproved.css";

const PANVerification = ({ setStep, setUserData = () => {} }) => {
  const [step, setLocalStep] = useState(1); 
  const [pan, setPan] = useState("");
  const [otp, setOtp] = useState("");
  const [isPanValid, setIsPanValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const DUMMY_PAN_DATA = {
    QQQQQ1234Q: {
      name: "John Doe",
      pan: "QQQQQ1234Q",
      status: "verified",
    },
  };

  const handlePanChange = (e) => {
    const value = e.target.value; 
    const isValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
    setPan(value);
    setIsPanValid(isValid);

  };

  const handlePanSubmit = async () => {
    if (!isPanValid) {
      toast.error("Please enter a valid PAN.");
      return;
    }

    if (DUMMY_PAN_DATA[pan]) {
      toast.info("Dummy PAN detected. Sending OTP...");
      
      setUserData((prev) => ({ ...prev, pan }));
      setStep(4); 
      return; 
    }
    

    toast.info("PAN not found locally. Attempting API verification...");
    try {
      setIsLoading(true);
      const response = await callApi(
        "v1/pan/send-otp", 
        "post", 
        { 
          pan 
        }, 
        "messaging"
      );

      if (response.status === "Success") {
        toast.success("OTP sent to the mobile number linked with PAN.");
        setUserData((prev) => ({ ...prev, pan })); 
        setLocalStep(2);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("PAN OTP API Error:", error.response || error);
      toast.error("An error occurred while sending OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }

    if (DUMMY_PAN_DATA[pan]) {
      if (otp === "1111") {
        toast.success("OTP verified successfully. Moving to next step...");
        setStep(4); 
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
      return;
    }

    try {
      setIsLoading(true);
      const response = await callApi(
        "v1/pan/validate-otp",
        "post",
        { 
          pan, 
          otp 
        },
        "verification"
      );
      if (response.status === "Success") {
        toast.success("PAN verified successfully.");
        setStep(4); 
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("PAN OTP Validation API Error:", error.response || error);
      toast.error("An error occurred while verifying OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="personal-loan-container">
      <div className="logo-container">
        <img 
          className="logo-img" 
          src="/assets/img/logo.png" 
          alt="DigitMoney Logo" 
        />
      </div>
      <div className="content-container">
        <div className="personal-loan-form">
          {step === 1 ? (
            <>
              <h1 className="h4 text-start">Verify PAN Number</h1>
              <p className="mb-3 text-start text-xs">
                We need your PAN card to match your identity.<br />
                Initiate soft bureau pull; this won't impact your credit score.
              </p>

              <FormInput
                icon={
                  <img
                    src="/assets/icons/pancard.png"
                    height="25"
                    style={{ maxHeight: "25px" }}
                    alt="PAN Card Icon"
                  />
                }
                value={pan}
                isValid={isPanValid}
                placeholder="Enter PAN"
                onChange={handlePanChange}
                type="text"
                name="pancard"
                id="pancard"
                aria-describedby="name"
                minLength="10"
                maxLength="10"
                pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
                title="Please enter a valid PAN number. E.g. AAAAA9999A"
                required
                style={{ textTransform: "uppercase" }}
                label={"Pancard"}
                errorMessage={"Please enter a valid PAN number"}
              />

              <FormButton
                onClick={handlePanSubmit}
                className="btn-get-otp"
                style={{
                  marginTop: "20px",
                  cursor: isPanValid && !isLoading ? "pointer" : "not-allowed",
                }}
                disabled={!isPanValid || isLoading}
              >
                {isLoading ? "Verifying..." : "Verify PAN"}
              </FormButton>
            </>
          ) : (
            <>
              <h1 className="h4 text-center fw-bold">Verify OTP</h1>
              <p className="mb-3 text-center text-sm">
                Enter the OTP sent to your registered mobile number.
              </p>

              <FormInput
                type="number"
                name="otp"
                value={otp}
                isValid={otp.length === 4}
                placeholder="Enter OTP"
                onChange={handleOtpChange}
                label={"OTP"}
                errorMessage={"Please enter a valid 4-digit OTP."}
              />

              <FormButton
                onClick={handleOtpSubmit}
                className="btn-get-otp"
                style={{
                  marginTop: "20px",
                  cursor: otp.length === 4 && !isLoading ? "pointer" : "not-allowed",
                }}
                disabled={otp.length !== 4 || isLoading}
              >
                {isLoading ? "Submitting..." : "Submit OTP"}
              </FormButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PANVerification;
