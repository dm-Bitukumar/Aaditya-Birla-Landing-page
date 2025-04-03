import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./PersonalDetailsForm.css";
import { useDispatch, useSelector } from "react-redux";
import FormInputStyle2 from "../../../../components/Form/FormInputStyle2";
import FormSelectStyle2 from "../../../../components/Form/FormSelectStyle2";
import FormButtonStyle2 from "../../../../components/Form/FormButtonStyle2";
import moment from "moment";
import { toast } from "react-toastify";
import callApi from "../../../../utility/apiCaller";
import { setUserClickData } from "../../../../utility/setUserClickData";
import { useNavigate } from "react-router";
import { login } from "../../../../store/app/appReducer";
import OTPInput from "react-otp-input";

const PersonalDetailsForm = ({
  isFormStarted,
  setIsFormStarted,
  currentStep,
  setCurrentStep,
  formData,
  setFormData,
}) => {
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [professionType, setprofessionType] = useState("");
  const [mobile, setMobile] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [source, setSource] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [affId, setAffId] = useState("");
  const [params] = useSearchParams();
  const [errors, setErrors] = useState({});
  const [pancard, setPan] = useState("");
  const [isPanValid, setIsPanValid] = useState(true);
  const [isConsentChecked, setIsConsentChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lenderName, lenderId } = useSelector((state) => state.app.lead);
  const [isFocused, setIsFocused] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
    if (params.get("utm_source")) setUtmSource(params.get("utm_source"));
    if (params.get("aff_id")) setAffId(params.get("aff_id"));
  }, [params]);

  useEffect(() => {
    const container = document.getElementById("personal-loan-form");
    if (container)
      container.resetOtpState = () => {
        setIsOtpGenerated(false);
        setOtp("");
      };
  }, []);

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

  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase();
    setPan(value);
    const isValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);

    if (value.length === 10) {
      setIsPanValid(isValid);
    } else {
      setIsPanValid(true);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!gender) newErrors.gender = true;
    if (!name.trim()) newErrors.name = true;
    if (!dob.trim()) newErrors.dob = true;
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = true;
    if (!pincode.match(/^\d{6}$/)) newErrors.pincode = true;
    if (!professionType) newErrors.professionType = true;

    // PAN validation logic
    if (!pancard || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pancard)) {
      newErrors.pancard = true;
      setIsPanValid(false);
    } else {
      setIsPanValid(true);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  console.log("Personal formData:", formData);

  useEffect(() => {
    const allValid =
      gender &&
      name.trim() &&
      dob.trim() &&
      email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
      pincode.match(/^\d{6}$/) &&
      professionType &&
      pancard;

    setIsFormValid(allValid);
  }, [gender, name, dob, email, pincode, professionType, pancard, isPanValid]);

  useEffect(() => {
    if (formData) {
      setGender(formData.gender || "");
      setName(formData.name || "");
      setMobile(formData.mobile || "");
      setPan(formData.pancard || "");
      setDob(formData.dob || "");
      setEmail(formData.email || "");
      setPincode(formData.pincode || "");
      setprofessionType(formData.professionType || "");
    }
  }, []);

  const handleConsentChange = () => {
    setIsConsentChecked((prev) => !prev);
  };

  const handleValidation = () => {
    let isValid = true;
    if (!validate()) return;
    if (!/^\d{10}$/.test(mobile) || mobile.length !== 10) {
      isValid = false;
      setIsMobileValid(false);
    } else {
      setIsMobileValid(true);
    }

    return isValid;
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
          event_name: `otp-send-for-pl-non-pan`,
          user_id: mobile || "unknown",
          affiliate_id: affId || "No Aff_id found",
        });
        setFormData((prev) => ({
          ...prev,
          gender,
          pancard,
          name,
          dob: moment(dob, "DD/MM/YYYY").format("YYYY-MM-DD"),
          email,
          pincode,
          professionType,
          mobile,
          mobiletncchecked: true,
          mobiletnctime: new Date().toISOString(),
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
          kyc_consent_datetime: new Date().toISOString(),
        },
        "messaging"
      );
      if (response.status === "Success") {
        setUserClickData({
          event_name: `resend-otp-for-pl-non-pan`,
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
          event_name: `otp-submit-for-pl-non-pan`,
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

        setCurrentStep(2);
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (otpError) {
      console.error("Error occurred while verifying OTP:", otpError);
      toast.error("An error occurred while verifying OTP. Please try again.");
    }
  };

  return !isOtpGenerated ? (
    <>
      <div className="personal-details-container-v3">
        <h2 className="form-title-v3">Personal information</h2>
        <p className="form-subtitle-v3">
          We will use your contact details to proceed further.
        </p>
        <input type="hidden" name="utm_campaign" value="" />
        <input type="hidden" name="utm_source" value={utmSource || ""} />
        <input type="hidden" name="utm_medium" value="" />
        <input type="hidden" name="utm_content" value="" />
        <input type="hidden" name="click_id" value="" />
        <input type="hidden" name="aff_id" value={affId || ""} />
        <input type="hidden" name="src" value={source || ""} />

        <div className="personal-details-input">
          <div className="gender-toggle-v3">
            <button
              className={`gender-btn-v3 ${gender === "Male" ? "active" : ""}`}
              onClick={() => setGender("Male")}
            >
              <div className="gender-content-v3">
                <img
                  src={
                    gender === "Male"
                      ? "/assets/img/Male_green.svg"
                      : "/assets/img/Male_black.svg"
                  }
                  alt="Male Icon"
                />
                <span>Male</span>
              </div>
            </button>
            <button
              className={`gender-btn-v3 ${gender === "Female" ? "active" : ""}`}
              onClick={() => setGender("Female")}
            >
              <div className="gender-content-v3">
                <img
                  src={
                    gender === "Female"
                      ? "/assets/img/Female_green.svg"
                      : "/assets/img/Female_black.svg"
                  }
                  alt="Female Icon"
                />
                <span>Female</span>
              </div>
            </button>
          </div>

          <FormInputStyle2
            label="Full Name as per Pan Card"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isValid={!errors.name}
            errorMessage="Name is required"
          />
          <FormInputStyle2
            label="Mobile Number"
            value={mobile}
            isValid={showErrors ? isMobileValid : true}
            minLength="10"
            maxLength="10"
            pattern="[0-9]{10}"
            inputMode="numeric"
            onChange={handleMobileChange}
            errorMessage="Mobile Number is required"
          />
          <FormInputStyle2
            type="text"
            name="pancard"
            isValid={isPanValid}
            id="pancard"
            minLength="10"
            maxLength="10"
            value={pancard}
            onChange={handlePanChange}
            required
            label={"PAN Number"}
            inputMode="text"
            errorMessage={"Please enter a valid PAN Number"}
          />
          <FormInputStyle2
            label="Date of Birth"
            value={dob}
            onChange={(e) => {
              let input = e.target.value.replace(/\D/g, "");

              if (input.length > 2)
                input = input.slice(0, 2) + "/" + input.slice(2);
              if (input.length > 5)
                input = input.slice(0, 5) + "/" + input.slice(5, 9);

              if (input.length > 10) return;

              setDob(input);
            }}
            isValid={!errors.dob}
            errorMessage="DOB is required"
            placeholder={dob ? "" : "DD/MM/YYYY"}
            maxLength={10}
            labelClassName="dob-label"
          />
          <FormInputStyle2
            label="Personal Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: false }));
              }
            }}
            onBlur={() => {
              if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                setErrors((prev) => ({ ...prev, email: true }));
              }
            }}
            isValid={!errors.email}
            errorMessage="Enter a valid email"
          />

          <FormInputStyle2
            label="Home Pin Code"
            value={pincode}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,6}$/.test(value)) {
                setPincode(value);
                if (errors.pincode) {
                  setErrors((prev) => ({ ...prev, pincode: false }));
                }
              }
            }}
            onBlur={() => {
              if (!pincode.match(/^\d{6}$/)) {
                setErrors((prev) => ({ ...prev, pincode: true }));
              }
            }}
            isValid={!errors.pincode}
            errorMessage="Enter 6-digit pincode"
            tick={pincode.length === 6}
          />

          <FormSelectStyle2
            label="Occupation"
            value={professionType}
            onChange={(val) => {
              setprofessionType(val);
              if (errors.professionType) {
                setErrors((prev) => ({ ...prev, professionType: false }));
              }
            }}
            onBlur={() => {
              if (!professionType) {
                setErrors((prev) => ({ ...prev, professionType: true }));
              }
            }}
            options={[
              { label: "Salaried", value: "Salaried" },
              { label: "Self-Employed", value: "Self-Employed" },
              { label: "Business Owner", value: "business owner" },
            ]}
            isValid={!errors.professionType}
            errorMessage="Please select professionType"
          />
        </div>

        <div className="checkbox-wrapper-v3">
          <input
            type="checkbox"
            id="consent"
            checked={isConsentChecked}
            onChange={handleConsentChange}
          />
          <label htmlFor="consent" className="consent">
            I have read and agreed to the Terms of Use and hereby appoint
            DigitMoney and its Lending Partners to receive my credit information
            from credit bureaus. By submitting my details I override my NDNC
            registration & authorize DigitMoney and its Lending Partners /
            representatives to contact me through Call, SMS, Email, Whatsapp or
            any other mode. You also authorize us to send you promotional offers
            of financial & non-financial products or services from time to time.
          </label>
        </div>

        <FormButtonStyle2
          text="Continue"
          onClick={handleSendOtp}
          disabled={mobile.length !== 10 || isLoading || !isFormValid}
          id="btn-personal-details-landing-v4"
          className="tracking-btn-personal-details-landing-v4"
        />
      </div>
    </>
  ) : (
    <div className="otp-verification-container-v3">
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
          renderInput={(props) => <input {...props} />}
        />
      </div>

      <FormButtonStyle2
        text="Verify OTP"
        onClick={handleOtpSubmit}
        disabled={otp.length !== 4 || isLoading}
        id="btn-verify-otp-personal-details-v4"
        className="tracking-btn-verify-otp-personal-details-v4"
      />

      <p className="resend-otp">
        Don’t receive the OTP? Click here to{" "}
        <span onClick={handleResendOtp}>Regenerate OTP</span>
      </p>
    </div>
  );
};

export default PersonalDetailsForm;
