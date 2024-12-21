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
import moment from "moment/moment";
import { triggerDripApi } from "../../../utility/dripApiUtils";

const Verification = ({
  refName,
  refId,
  campaignName,
  formData,
  setFormData,
  ...props
}) => {
  const [otp, setOtp] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isTncChecked, setIsTncChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

  const getQueryParams = () => {
    let query = "";
    if (refName) {
      query = `${query}ref_name=${refName}`;
    }
    if (refId) {
      query = `${query}ref_id=${refId}`;
    }
    if (campaignName) {
      query = `${query}campaign_name=${campaignName}`;
    }
    return `?${query}`;
  };

  const handleMobileChange = (event) => {
    const { value } = event.target;
    setIsMobileValid(true);
    setMobile(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = handleValidation();

    if (!isTncChecked) {
      toast("Please accept the Terms and Conditions to proceed", {
        hideProgressBar: true,
        type: "error",
      });
      return;
    }

    if (isValid) {
      setIsLoading(true);
      try {
        const res = await callApi(
          `v1/sms/send-otp${getQueryParams()}`,
          "post",
          {
            contact_phone: mobile,
            kyc_consent: isTncChecked,
          },
          "messaging"
        );
        if (res["status"] === "Success") {
          setUserClickData({
            event_name: "otp-sent-check-offers-v2",
            user_id: mobile || "unknown",
          });

          triggerDripApi({
            user_id: mobile,
          });

          setIsOtpGenerated(true);
        }
      } catch (error) {
        toast("Failed to send OTP. Please try again.", {
          hideProgressBar: true,
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = () => {
    setIsTncChecked((prev) => !prev);
  };

  const handleResendOtp = async () => {
    setUserClickData({
      event_name: "resend-otp-check-offer-v2",
      user_id: mobile || "unknown",
    });
    try {
      setIsLoading(false);
      const res = await callApi(
        `v1/sms/send-otp${getQueryParams()}`,
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitOtp = async () => {
    setIsLoading(true);
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
        setUserClickData({
          event_name: "verify-otp-check-offer-v2",
          user_id: mobile || "unknown",
        });

        triggerDripApi({
          user_id: mobile,
          is_verified: true,
          verified_at: moment().utcOffset(330).toDate(),
        });

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
        );

        if (
          processLeadResponse["status"] === "Success" &&
          processLeadResponse.data.lead
        ) {
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
        setUserClickData({
          event_name: "wrong-otp-entered-check-offer-v2",
          user_id: mobile || "unknown",
        });
        toast("Wrong OTP", { hideProgressBar: true, type: "error" });
      }
      console.log(err);
    } finally {
      setIsLoading(false);
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
              disabled={!isMobileValid || isLoading}
            >
              {isLoading ? "Sending..." : "Get OTP"}
            </FormButton>
          </div>
        </>
      )}
    </div>
  );
};

export default Verification;
