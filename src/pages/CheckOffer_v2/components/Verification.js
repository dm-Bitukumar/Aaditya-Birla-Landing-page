import React, { useEffect, useState } from "react";
import _ from "lodash";
import CheckboxTnC from "../../../components/Buttons/CheckboxTnC";
import FormButton from "../../../components/Buttons/FormButton";
import FormInput from "../../../components/Form/FormInput";
import OtpInputForm from "../../../components/Form/OtpInputForm";
import { useNavigate } from "react-router";
import { setUserClickData } from "../../../utility/setUserClickData";
import callApi from "../../../utility/apiCaller";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import "../css/Verification.css";
import { setLead, login } from "../../../store/app/appReducer";

const Verification = ({ formData, setFormData, ...props }) => {
  const [otp, setOtp] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isTncChecked, setIsTncChecked] = useState(true);
  const [mobile, setMobile] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
  }, [params]);

  const fetchIpAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (err) {
      return "";
    }
  };

  const handleValidation = () => {
    let isValid = true;

    if (_.isEmpty(mobile)) {
      isValid = false;
      setIsMobileValid(false);
    } else {
      const isValidMobile = /^\d{10}$/.test(mobile);
      isValid = isValidMobile;
      setIsMobileValid(isValidMobile);
    }

    return isValid;
  };

  const handleMobileChange = (event) => {
    const { value } = event.target;
    setIsMobileValid(true);
    setMobile(value);
  };

  const handleSubmit = async (event) => {
    setUserClickData({
      event_name: "generate-otp-button-click-check-offers-v2",
    });
    event.preventDefault();

    let isValid = handleValidation();
    if (isValid) {
      const res = await callApi(
        "v1/sms/send-otp",
        "post",
        {
          contact_phone: mobile,
          kyc_consent: isTncChecked,
        },
        "messaging"
      );
      if (res["status"] === "Success") {
        setUserClickData({
          event_name: "otp-page-loaded-check-offers-v2",
        });
        setIsOtpGenerated(true);
      }
    }
  };

  const handleChange = () => {
    setUserClickData({
      event_name: "tnc-checkbox-toggled-check-offers-v2 ",
    });
    setIsTncChecked((prev) => !prev);
  };

  const handleResendOtp = async () => {
    setUserClickData({
      event_name: "resend-otp-form-for-check-offer-v2",
    });
    try {
      const res = await callApi(
        "v1/sms/send-otp",
        "post",
        {
          contact_phone: mobile,
          kyc_consent: isTncChecked,
        },
        "messaging"
      );
      if (res["status"] === "Success") {
        toast("Otp sent", { hideProgressBar: true, type: "success" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitOtp = async () => {
    setUserClickData({
      event_name: "verify-otp-check-offer-v2",
    });
    try {
      const ipAddress = await fetchIpAddress();

      const res = await callApi(
        "v1/sms/validate-otp",
        "post",
        {
          contact_phone: mobile,
          otp,
        },
        "messaging"
      );

      if (res["status"] === "Success") {
        const processLeadResponse = await callApi(
          "v1/lead/process-lead-for-loan-v2",
          "post",
          {
            contact_phone: mobile,
            // contact_phone: "9861670786",
            kyc_consent: isTncChecked,
            ip_address: ipAddress,
          },
          "core",
          res.data.token
        )

        if (processLeadResponse["status"] === "Success" && processLeadResponse.data.lead) {
          dispatch(setLead(processLeadResponse.data.lead));
          dispatch(
            login({
              phone_number: mobile,
              token: res.data.token,
            })
          );

          navigate(
            `/offers-v2?lid=${processLeadResponse.data.lead._id}&source=${source}`
          );          
        }
      }
    } catch (err) {
      if (err.response?.data?.data?.message === "Invalid OTP") {
        toast("Wrong OTP", { hideProgressBar: true, type: "error" });
      }
      console.log(err);
    }
  };

  return (
    <div className={"personal-loan-form"}>
      <img
        className="mt-3 mb-1 img logo-img"
        src="/assets/img/logo.png"
        alt=""
      />
      {isOtpGenerated ? (
        <div style={{ marginTop: "180px" }}>
          <OtpInputForm
            buttonStyle={{ marginTop: "200px", marginBottom: "50px" }}
            otpValue={otp}
            setIsOtpGenerated={setIsOtpGenerated}
            setOtpValue={setOtp}
            handleResendOtp={handleResendOtp}
            phone_number={mobile}
            handleSubmitOtp={handleSubmitOtp}
          />
        </div>
      ) : (
        <>
          {" "}
          <img
            className="mt-3 img header-img"
            src="/assets/img/header.png"
            alt=""
          />
          <h1
            className="mb-3 text-center h3 fw-normal"
            style={{ fontSize: "20px", marginTop: "3em" }}
          >
            Get Instant Personal Loan
            <br />
          </h1>
          <p className="mb-3 text-center" style={{ fontSize: "14px" }}>
            • Instant Approvals • Complete Digital Process •
            <span className="bullet">•</span>Quick Disbursal
          </p>{" "}
          <input type="hidden" name="utm_campaign" value="" />
          <input type="hidden" name="utm_source" value="" />
          <input type="hidden" name="utm_medium" value="" />
          <input type="hidden" name="utm_content" value="" />
          <input type="hidden" name="click_id" value="" />
          <input type="hidden" name="aff_id" value="" />
          <input type="hidden" name="src" value="" />
          <FormInput
            icon={
              <img
                src="/assets/icons/phone-call.png"
                height="25"
                alt="Phone Icon"
              />
            }
            type="number"
            name="mobile"
            isValid={isMobileValid}
            id="mobile"
            aria-describedby="name"
            placeholder="Mobile"
            minLength="10"
            maxLength="10"
            pattern="[0-9]{10}"
            value={mobile}
            onChange={handleMobileChange}
            required
            label={"Mobile Number"}
            errorMessage={"Please enter a valid Mobile Number"}
          />

<p
            style={{
              fontSize: "9px",
              color: "#6c757d",
              textAlign: "left",
              paddingBottom: "10px",
            }}
          >
            *DigitMoney is associated with RBI-registered Banks & NBFCs only
          </p>

          <CheckboxTnC checked={isTncChecked} handleChange={handleChange} />
          <div className="">
            <FormButton
              onClick={handleSubmit}
              className="!py-4 !px-6"
            >
              GET OTP
            </FormButton>
          </div>
        </>
      )}
    </div>
  );
};

export default Verification;
