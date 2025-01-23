import React, { useEffect, useState } from "react";
import OtpInputForm from "../../../components/Form/OtpInputForm";
import FormButton from "../../../components/Buttons/FormButton";
// import FormButton from "./FormBtnNew";
import FormInput from "../../../components/Form/FormInput";
import CheckboxTnC from "../../PersonalLoan/components/CheckboxTnC";
import callApi from "../../../utility/apiCaller";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/app/appReducer";
import { setUserClickData } from "../../../utility/setUserClickData";
import HeadBar from "../../../components/Static/HeadBar";
import "./PreApproved.css";

const MobileVerification = ({ setStep, setUserData, userData }) => {
  const [mobile, setMobile] = useState(userData.mobile || "");
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isConsentChecked, setIsConsentChecked] = useState(true);
  const [otp, setOtp] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lenderName, lenderId } = useSelector((state) => state.app.lead);

  const handleValidation = () => {
    let isValid = true;

    if (!mobile || mobile.trim() === "") {
      isValid = false;
      setIsMobileValid(false);
    }
    if (!/^\d{10}$/.test(mobile)) {
      isValid = false;
      setIsMobileValid(false);
    }

    return isValid;
  };

  const handleMobileChange = (event) => {
    const value = event.target.value;
    setMobile(value);
    setUserData((prev) => ({
      ...prev,
      mobile: value,
    }));
    setIsMobileValid(/^\d{10}$/.test(value));
  };

  const handleConsentChange = () => {
    setIsConsentChecked((prev) => !prev);
  };

  const handleSendOtp = async () => {
    setUserClickData({
      event_name: `otp-send-for-preapp-lender-${lenderName || "unknown"}`,
      user_id: mobile || "unknown",
    });
    if (!handleValidation()) {
      toast.error("Please enter a valid 10-digit mobile number.");
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
          lender_id: lenderId,
        },
        "messaging"
      );
      if (response.status === "Success") {
        toast.success("OTP Sent Successfully");
        setIsOtpGenerated(true);
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
    setUserClickData({
      event_name: `resend-otp-for-preapp-lender-${lenderName || "unknown"}`,
      user_id: mobile || "unknown",
    });
    try {
      setIsLoading(true);
      const response = await callApi(
        "v1/sms/send-otp",
        "post",
        {
          contact_phone: mobile,
          kyc_consent: isConsentChecked,
          lender_id: lenderId,
        },
        "messaging"
      );
      if (response.status === "Success") {
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
          event_name: `otp-submit-for-preapp-lender-${lenderName || "unknown"}`,
          user_id: mobile || "unknown",
        });
        toast.success("OTP Verified Successfully");

        dispatch(
          login({
            ...otpResponse.data.customer,
            token: otpResponse.data.token,
          })
        );

        try {
          const requestBody = {
            pageNum: 1,
            pageSize: 1000,
            filters: {
              lender_id: lenderId,
              contact_phone: mobile,
            },
          };

          const leadResponse = await callApi(
            "v1/preapproved_lead/list",
            "post",
            requestBody,
            "core"
          );
          if (
            leadResponse.status === "Success" &&
            leadResponse?.data?.preapproved_leadList?.length > 0
          ) {
            const leadData = leadResponse.data.preapproved_leadList[0];

            try {
              await callApi(
                "v1/ican_api/pa-data-send-to-ican",
                "post",
                {
                  lead_id: leadData._id,
                  lender_id: lenderId,
                },
                "core"
              );
            } catch (icanError) {
              console.error("Error sending data to iCan:", icanError);
            }
            setStep(2);
          } else {
            console.warn("No lead data found:", leadResponse);
            navigate(`/personal-loan?source=0`);
          }
        } catch (leadError) {
          console.error("Error fetching lead details:", leadError);
          navigate(`/personal-loan?source=0`);
        }
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (otpError) {
      console.error("Error occurred while verifying OTP:", otpError);
      toast.error("An error occurred while verifying OTP. Please try again.");
    }
  };

  return (
    <div className="personal-loan-form">
      <HeadBar />
      <img
        className="mt-3 mb-1 img logo-img"
        src="/assets/img/logo.png"
        alt="DigitMoney Logo"
      />
      <img
        className="mt-3 mb-3 img header-img"
        src="/assets/img/header.png"
        alt="Header Image"
      />
      {!isOtpGenerated ? (
        <>
          <h1 className="h3 text-center fw-normal">
            Get Instant Personal Loan
            <br />
          </h1>
          <p className="mb-3 text-center text-sm">
            • Instant Approvals • Complete Digital Process • Lower Interest
            Rates
          </p>

          <FormInput
            icon={
              <img
                src="/assets/icons/phone-call.png"
                height="25"
                alt="Phone Icon"
              />
            }
            type="text"
            name="mobile"
            isValid={isMobileValid}
            id="mobile"
            placeholder="Mobile"
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

          <p
            style={{
              fontSize: "10px",
              color: "#6c757d",
              textAlign: "left",
              paddingBottom: "10px",
            }}
          >
            *DigitMoney is associated with RBI-registered Banks & NBFCs only
          </p>

          <CheckboxTnC
            checked={isConsentChecked}
            handleChange={handleConsentChange}
          />

          <div className="preApprovebutton_new">
            <FormButton
              onClick={handleSendOtp}
              // className="btn-get-otp"
              className="!py-4 !px-6"
              disabled={!isMobileValid || isLoading}
            >
              {isLoading ? "Sending..." : "Get OTP"}
            </FormButton>
          </div>
        </>
      ) : (
        <>
          <div className="inner-field-otp-section">
            <OtpInputForm
              otpValue={otp}
              setOtpValue={setOtp}
              setIsOtpGenerated={setIsOtpGenerated}
              handleResendOtp={handleResendOtp}
              phone_number={mobile}
              handleSubmitOtp={handleOtpSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MobileVerification;
