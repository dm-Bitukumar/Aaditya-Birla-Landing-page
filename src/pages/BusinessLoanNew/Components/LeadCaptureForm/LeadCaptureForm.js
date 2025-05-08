import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./LeadCaptureForm.css";
import FormInputStyle2 from "../../../../components/Form/FormInputStyle2";
import FormButtonStyle2 from "../../../../components/Form/FormButtonStyle2";
import { setUserClickData } from "../../../../utility/setUserClickData";

import callApi from "../../../../utility/apiCaller";
import { toast } from "react-toastify";
import { login, setLead } from "../../../../store/app/appReducer";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import OTPInput from "react-otp-input";

const LeadCaptureForm = ({
  isFormStarted,
  setIsFormStarted,
  currentStep,
  setCurrentStep,
  formData,
  setFormData,
}) => {
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isConsentChecked, setIsConsentChecked] = useState(true);
  const [otp, setOtp] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [utmMedium, setUtmMedium] = useState("");
  const [offers, setOffers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lenderName, lenderId } = useSelector((state) => state.app.lead);
  const [source, setSource] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [utmTerm, setUtmTerm] = useState("");
  const [affId, setAffId] = useState("");
  const [errors, setErrors] = useState({});
  const [params] = useSearchParams();
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
    if (params.get("utm_source")) setUtmSource(params.get("utm_source"));
    if (params.get("aff_id")) setAffId(params.get("aff_id"));
    if (params.get("utm_term")) setUtmTerm(params.get("utm_term"));
    if (params.get("utm_medium")) setUtmTerm(params.get("utm_medium"));
  }, [params]);

  useEffect(() => {
    const container = document.getElementById("personal-loan-form");
    if (container)
      container.resetOtpState = () => {
        setIsOtpGenerated(false);
        setOtp("");
      };
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleValidation = () => {
    setShowErrors(true);

    if (!/^\d{10}$/.test(mobile)) {
      setIsMobileValid(false);
      return false;
    }

    setIsMobileValid(true);
    return true;
  };

  const handleMobileChange = (event) => {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      setMobile(value);
      setFormData((prev) => ({
        ...prev,
        mobile: value,
      }));
    }

    setIsMobileValid(value.length === 10);
  };

  const handleConsentChange = () => {
    setIsConsentChecked((prev) => !prev);
  };

  const handleSendOtp = async () => {
    if (!handleValidation()) {
      return;
    }
    if (!isConsentChecked) {
      toast.error("Please agree to the Terms and Conditions.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await callApi(
        "v1/sms/send-otp",
        "post",
        {
          contact_phone: mobile,
          kyc_consent: isConsentChecked,
        },
        "messaging"
      );
      if (response.status === "Success") {
        setUserClickData({
          event_name: `otp-send-business-loan-page-v1`,
          user_id: mobile || "unknown",
          affiliate_id: affId || "No Aff_id found",
        });
        setFormData((prev) => ({
          ...prev,
          mobile,
          kyc_consent: true,
          kyc_consent_datetime: new Date().toISOString(),
        }));
        toast.success("OTP Sent Successfully");
        setIsOtpGenerated(true);
        setIsFormStarted();
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      const response = await callApi(
        "v1/sms/send-otp",
        "post",
        {
          contact_phone: mobile,
          kyc_consent: isConsentChecked,
        },
        "messaging"
      );
      if (response.status === "Success") {
        setUserClickData({
          event_name: `resend-otp-business-loan-page-v1`,
          user_id: mobile || "unknown",
          affiliate_id: affId || "No Aff_id found",
        });
        toast.success("OTP Resent Successfully");
      } else {
        toast.error("Failed to resend OTP.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while resending OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      setIsLoading(true);
      const otpResponse = await callApi(
        "v1/sms/validate-otp",
        "post",
        {
          contact_phone: mobile,
          otp,
          lender_id: lenderId,
        },
        "messaging"
      );

      if (otpResponse.status === "Success") {
        setUserClickData({
          event_name: `otp-submit-for-business-loan-page-v1`,
          user_id: mobile || "unknown",
          affiliate_id: affId || "No Aff_id found",
        });
        toast.success("OTP Verified Successfully");

        dispatch(
          login({
            ...otpResponse.data.customer,
            token: otpResponse.data.token,
          })
        );
        localStorage.setItem("mobile", mobile);

        let leadId = "";
        try {
          const leadRes = await callApi(
            "v1/businessloanlead/new-v1",
            "post",
            {
              businessloanlead: {
                contact_name: name,
                contact_phone: mobile,
                is_mobile_verify_completed: "true",
                kyc_consent: isConsentChecked,
                kyc_consent_datetime: new Date().toISOString(),
                aff_id: affId || "",
                source: source || "",
                utm_source: utmSource || "",
                utm_medium: utmMedium || "",
              },
            },
            "core"
          );

          if (leadRes.status === "Success") {
            leadId = leadRes.data.businessloanlead?.lead?._id;
            const lead = leadRes.data.businessloanlead?.lead;
            if (lead) {
              dispatch(setLead(lead));
              if (lead.is_stage1_completed !== "true") {
                setCurrentStep(2);
              } else if (
                lead.is_stage1_completed === "true" &&
                lead.is_stage5_completed === "true"
              ) {
                setCurrentStep(5);
              } else if (lead.is_stage3_completed !== "true") {
                setCurrentStep(3);
              } else if (lead.is_stage4_completed !== true) {
                setCurrentStep(4);
              } else if (
                lead.is_stage3_completed === "true" &&
                lead.is_stage4_completed === true
              ) {
                setCurrentStep(5);
              } else {
                setCurrentStep(2);
              }
            }
          }
          // setCurrentStep(2);
        } catch (err) {
          console.warn("Lead update failed, continuing flow.");
        }
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (otpError) {
      console.error("Error occurred while verifying OTP:", otpError);
      toast.error("An error occurred while verifying OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lead-capture-container">
      {!isOtpGenerated ? (
        <>
          <h2 className="form-title" style={{ paddingLeft: "4px" }}>
            Get Your Loan Approved in
            <br />
            Quick & Simple Steps!
          </h2>

          <p className="form-subtitle" style={{ paddingLeft: "4px" }}>
            We will use your contact details to proceed further.
          </p>

          <input type="hidden" name="utm_campaign" value="" />
          <input type="hidden" name="utm_source" value={utmSource || ""} />
          <input type="hidden" name="utm_medium" value="" />
          <input type="hidden" name="utm_content" value="" />
          <input type="hidden" name="click_id" value="" />
          <input type="hidden" name="aff_id" value={affId || ""} />
          <input type="hidden" name="src" value={source || ""} />

          <FormInputStyle2
            label="Full Name as per Pan Card"
            value={name}
            onChange={(e) => {
              const input = e.target.value;
              if (/^[a-zA-Z\s]*$/.test(input)) {
                setName(input);
              }
            }}
            isValid={!errors.name}
            required
            errorMessage="Name is required and must contain only letters"
          />

          <FormInputStyle2
            type="text"
            name="mobile"
            isValid={showErrors ? isMobileValid : true}
            id="mobile"
            minLength="10"
            maxLength="10"
            pattern="[0-9]{10}"
            value={mobile}
            onChange={handleMobileChange}
            required
            label={"Mobile Number"}
            inputMode="numeric"
            errorMessage={"Please enter a valid Mobile Number"}
          />

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="consent"
              checked={isConsentChecked}
              onChange={handleConsentChange}
            />
            <label htmlFor="consent">
              I have read and agreed to the Terms of Use and hereby appoint
              DigitMoney and its Lending Partners to receive my credit
              information from credit bureaus. By submitting my details I
              override my NDNC registration & authorize DigitMoney and its
              Lending Partners / representatives to contact me through Call,
              SMS, Email, Whatsapp or any other mode. I also authorize you to
              send me promotional offers of financial & non-financial products
              or services from time to time.
            </label>
          </div>

          <FormButtonStyle2
            text="Get OTP"
            onClick={handleSendOtp}
            disabled={mobile.length !== 10 || isLoading}
            id="btn-get-otp-landing-v1"
            className="tracking-btn-get-otp-landing-v1"
          />
        </>
      ) : (
        <div className="otp-verification-container-v1">
          <h3>Mobile OTP verification</h3>
          <p>
            A One Time Password (OTP) has been sent to your mobile number{" "}
            <strong>{mobile}</strong>{" "}
            <span
              onClick={() => {
                setIsOtpGenerated(false);
                setOtp("");
                setCurrentStep(1);
              }}
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
                gap: "19px",
                margin: "16px 0",
                justifyContent: "center",
              }}
              placeholder={"----"}
              renderInput={(props) => (
                <input
                  {...props}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d?$/.test(val)) {
                      props.onChange(e);
                    }
                  }}
                />
              )}
            />
          </div>

          <FormButtonStyle2
            text={isLoading ? "Verifying" : "Verify OTP"}
            onClick={handleOtpSubmit}
            disabled={otp.length !== 4 || isLoading}
            id="btn-verify-otp-landing-v1"
            className="tracking-verify-get-otp-landing-v1"
          />

          <p className="resend-otp">
            Don’t receive the OTP? Click here to{" "}
            <span onClick={handleResendOtp}>Regenerate OTP</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default LeadCaptureForm;
