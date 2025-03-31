import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./PanCaptureForm.css";
import FormInputStyle2 from "../../../../components/Form/FormInputStyle2";
import FormButtonStyle2 from "../../../../components/Form/FormButtonStyle2";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import callApi from "../../../../utility/apiCaller";
import { setpanDetails } from "../../../../store/app/appReducer";
import { setUserClickData } from "../../../../utility/setUserClickData";

const PanCaptureForm = ({
  setCurrentStep,
  setIsFormStarted,
  formData,
  setFormData,
}) => {
  const [pan, setPan] = useState("");
  const [otp, setOtp] = useState("");
  const [isPanValid, setIsPanValid] = useState(true);
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isPanLoading, setIsPanLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const user = useSelector((state) => state.app.user);
  const leadId = useSelector((state) => state.app.lead._id);
  const mobileNumber = useSelector((state) => state.app.user?.contact_phone);
  const { lenderName, lenderId } = useSelector((state) => state.app.lead);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Form Data received in PAN Capture:", formData);
  }, []);

  useEffect(() => {
    const container = document.getElementById("pan-verification-form");
    if (container)
      container.resetOtpState = () => {
        setIsOtpGenerated(false);
        setOtp("");
      };
  }, []);

  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase();
    setPan(value);
    const isValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);

    if (value.length === 10) {
      setIsPanValid(isValid);
    } else {
      setIsPanValid(true);
    }

    // setIsPanValid(isValid);
    setIsButtonDisabled(!isValid);
  };

  const sendOtp = async () => {
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
        setUserClickData({
          event_name: `pan-otp-send-for-pl-pan`,
          user_id: mobileNumber || "unknown",
        });
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
        setUserClickData({
          event_name: `resend-pan-otp-for-pl-pan`,
          user_id: mobileNumber || "unknown",
        });
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
          otp,
        },
        "messaging"
      );
      if (response.status === "Success") {
        setUserClickData({
          event_name: `pan-otp-submit-for-pl-pan`,
          user_id: mobileNumber || "unknown",
        });
        toast.success("OTP verified successfully.");
        await fetchPanData();
        // await updatePanVerification();
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
          pancard: pan,
        },
        "core",
        user.token
      );

      if (res.status === "Success") {
        setUserClickData({
          event_name: `details-fetched-for-pl-pan-${pan || "unknown"}`,
          user_id: mobileNumber || "unknown",
        });
        const { first_name, last_name, gender, dob, fullname } = res.data || {};
        dispatch(
          setpanDetails({
            fullName: fullname,
            firstName: first_name,
            lastName: last_name,
            gender,
            dob,
            pancard: pan,
          })
        );

        setFormData((prev) => ({
          ...prev,
          pancard: pan,
          fullname: fullname,
          firstName: first_name,
          lastName: last_name,
          gender,
          dob,
        }));

        toast.success("PAN verified and data fetched successfully.");
        setCurrentStep(3);
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
        `v1/preapproved_lead/${leadId}/update_with_no_resp`,
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
      event_name: `pan-submit-check-for-pl-pan`,
      user_id: mobileNumber || "unknown",
    });
    if (!isPanValid) {
      toast.error("Please enter a valid PAN.");
      return;
    }
    //   setLocalStep(2);
    setIsPanLoading(true);
    setIsButtonDisabled(true);
    sendOtp();
  };

  return (
    <div className="lead-capture-container">
      {!isOtpGenerated ? (
        <>
          <h2 className="form-title">Verify PAN Number</h2>
          <p className="form-subtitle">
            We need your PAN card to match your identity, initiate soft bureau
            pull, this won't impact your credit score
          </p>
          <FormInputStyle2
            type="text"
            name="pan"
            isValid={isPanValid}
            id="pan"
            minLength="10"
            maxLength="10"
            value={pan}
            onChange={handlePanChange}
            required
            label={"PAN Number"}
            inputMode="text"
            errorMessage={"Please enter a valid PAN Number"}
          />
          <FormButtonStyle2
            text="Verify PAN"
            onClick={handlePanSubmit}
            disabled={!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan) || isLoading}
          />
        </>
      ) : (
        <>
          <h3 className="pan-otp-verify">PAN OTP verification</h3>
          <p className="pan-verify-content">
            A One Time Password (OTP) has been sent to your mobile number{" "}
            <strong>{user.contact_phone}</strong>{" "}
            <span
              onClick={() => {
                setIsOtpGenerated(false);
                setOtp("");
              }}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Edit
            </span>{" "}
            Please enter the OTP below
          </p>

          <div className="otp-input-field">
            <OTPInput
              value={otp}
              onChange={(val) => setOtp(val)}
              numInputs={4}
              isInputNum={true}
              shouldAutoFocus={true}
              inputStyle={{
                width: "71px",
                height: "50px",
                borderRadius: "5px",
                border: "1px solid #B3B3B3",
                fontSize: "24px",
                textAlign: "center",
              }}
              containerStyle={{
                display: "flex",
                gap: "12px",
                margin: "16px 0",
                justifyContent: "center",
              }}
              placeholder={"----"}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <FormButtonStyle2
            text="Verify OTP"
            onClick={handleOtpSubmit}
            disabled={otp.length !== 4 || isLoading}
          />

          <p className="resend-otp">
            Didn’t receive the OTP? Click here to{" "}
            <span onClick={handleResendOtp}>Regenerate OTP</span>
          </p>
        </>
      )}
    </div>
  );
};

export default PanCaptureForm;
