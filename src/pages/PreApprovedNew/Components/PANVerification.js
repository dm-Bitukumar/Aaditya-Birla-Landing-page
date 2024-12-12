import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../../components/Form/FormInput";
import FormButton from "../../../components/Buttons/FormButton";
import callApi from "../../../utility/apiCaller";
import { toast } from "react-toastify";
import "./PreApproved.css";
import PanOtpInputForm from "../../../components/Form/PanOtpInputForm";
import { setpanDetails } from "../../../store/app/appReducer";
import { setUserClickData } from "../../../utility/setUserClickData";

const PANVerification = ({ leadId, setStep, userData, setUserData }) => {
  const [step, setLocalStep] = useState(1);
  const [pan, setPan] = useState("");
  const [otp, setOtp] = useState("");
  const [isPanValid, setIsPanValid] = useState(true);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isPanLoading, setIsPanLoading] = useState(false);
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.app.user);
  const mobileNumber = useSelector((state) => state.app.user?.contact_phone);
  const { lenderName, lenderId } = useSelector((state) => state.app.lead);

  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase();
    setPan(value);
    const isValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
    setIsPanValid(isValid);
    setIsButtonDisabled(!isValid);
    console.log("PAN:", value, "Valid:", isValid, "Disabled:", !isValid);
  };

  const sendOtp = async () => {
    setUserClickData({
      event_name: `pan-otp-send-for-preapp-lender-${lenderName || "unknown"}-${mobileNumber || "unknown"}`,
    });
    if (!mobileNumber) {
      toast.error("Mobile number is missing. Please try again.");
      return;
    }

    try {
      setIsOtpLoading(true);
      const response = await callApi(
        "v1/sms/send-pan-otp",
        "post",
        { 
          contact_phone: mobileNumber,
          ref_name: "PAN-OTP",
          red_id: leadId,
        },
        "messaging"
      );
      if (response.status === "Success") {
        toast.success("OTP sent to your registered mobile number.");
        setIsOtpGenerated(true);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP.");
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setUserClickData({
      event_name: `resend-pan-otp-for-preapp-lender-${lenderName || "unknown"}-${mobileNumber || "unknown"}`,
    });
    try {
      setIsOtpLoading(true);
      const response = await callApi(
        "v1/sms/send-pan-otp",
        "post",
        { 
          contact_phone: mobileNumber,
          ref_name: "PAN-OTP",
          red_id: leadId,
        },
        "messaging"
      );
      if (response.status === "Success") {
        toast.success("OTP resent successfully.");
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while resending OTP.");
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setUserClickData({
      event_name: `pan-otp-submit-for-preapp-lender-${lenderName || "unknown"}-${mobileNumber || "unknown"}`,
    });

    if (!/^\d{4}$/.test(otp)) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      setIsOtpLoading(true);
      const response = await callApi(
        "v1/sms/validate-otp",
        "post",
        { 
          contact_phone: mobileNumber, 
          otp 
        },
        "messaging"
      );
      if (response.status === "Success") {
        toast.success("OTP verified successfully.");
        await fetchPanData(); 
        await updatePanVerification();
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while verifying OTP.");
    } finally {
      setIsOtpLoading(false);
    }
  };

  const fetchPanData = async () => {
    setUserClickData({
      event_name: `details-fetched-for-preapp-lender-${lenderName || "unknown"}-${mobileNumber || "unknown"}-pan-${pan || "unknown"}`,
    });
    if (!isPanValid) {
      toast.error("Please enter a valid PAN.");
      return;
    }
  
    try {
      setIsPanLoading(true);
  
      const res = await callApi(
        "v1/M2P_data/get-data-from-pan", 
        "post", 
        { 
          pancard: pan 
        },
        "core", 
        user.token 
      );
  
      if (res.status === "Success") {
        const { first_name, last_name, gender, dob } = res.data || {};

        dispatch(
          setpanDetails({
            firstName: first_name,
            lastName: last_name,
            gender,
            dob,
            pancard: pan,
          })
        );


        setUserData("pancard", pan); 
        toast.success("PAN verified and data fetched successfully.");
        setStep(4);
      } else {
        console.error("PAN API returned an error:", res.message);
        toast.error("Failed to fetch data from PAN. Please try again.");
      }
    } catch (err) {
      console.error("Error during PAN API call:", err);
      toast.error("An error occurred while fetching data from PAN.");
    } finally {
      setIsPanLoading(false);
    }
  };
  
  const updatePanVerification = async () => {
    if (!leadId) {
      toast.error("Lead ID is missing. Cannot update PAN verification.");
      return;
    }

    try {
      const res = await callApi(
        `v1/preapproved_lead/${leadId}/update`,
        "post",
        {
          preapproved_lead: {
            is_pan_verified: true,
          },
        },
        "core",
        user.token
      );

      if (res.status === "Success") {

      } else {
        console.error("PAN verification API returned an error:", res.message);
        toast.error("Failed to update PAN verification. Please try again.");
      }
    } catch (err) {
      console.error("Error during PAN verification update:", err);
      toast.error("An error occurred while updating PAN verification.");
    }
  };

  const handlePanSubmit = () => {
    setUserClickData({
      event_name: `pan-submit-check-for-preapp-lender-${lenderName || "unknown"}-${mobileNumber || "unknown"}`,
    });
    if (!isPanValid) {
      toast.error("Please enter a valid PAN.");
      return;
    }
    setLocalStep(2);
    setIsPanLoading(true);
    setIsButtonDisabled(true);
    sendOtp();
  };

  return (
    <div className="personal-loan-container">
      <div className="logo-container">
        <img className="logo-img" src="/assets/img/logo.png" alt="DigitMoney Logo" />
      </div>
      <div className="content-container">
        <div className="personal-loan-form">
          {step === 1 ? (
            <>
              <h1 className="h4 text-start">Verify PAN Number</h1>
              <p className="mb-3 text-start text-xs">
                We need your PAN card to match your identity. This verification will not impact your credit score.
              </p>
              <FormInput
                icon={
                  <img 
                    src="/assets/icons/pancard.png" 
                    height="25" 
                    alt="PAN Card Icon" 
                  />
                }
                value={pan}
                isValid={isPanValid}
                placeholder="Enter PAN"
                onChange={handlePanChange}
                aria-describedby="name"
                type="text"
                name="pancard"
                id="pancard"
                minLength="10"
                maxLength="10"
                pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
                title="Please enter a valid PAN number. E.g. AAAAA9999A"
                required
                style={{ textTransform: "uppercase" }}
                label="Pancard"
                errorMessage="Please enter a valid PAN number"
              />
              <FormButton
                onClick={handlePanSubmit}
                className="btn-get-otp"
                disabled={isButtonDisabled  || isPanLoading}
              >
                {isPanLoading ? "Processing..." : "Verify PAN"}
              </FormButton>
            </>
          ) : (
            <PanOtpInputForm
              otpValue={otp}
              setOtpValue={setOtp}
              setIsOtpGenerated={setIsOtpGenerated}
              handleResendOtp={handleResendOtp}
              phone_number={mobileNumber}
              handleSubmitOtp={handleOtpSubmit}
              pan={pan}
              goToPanVerification={() => setLocalStep(1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PANVerification;
