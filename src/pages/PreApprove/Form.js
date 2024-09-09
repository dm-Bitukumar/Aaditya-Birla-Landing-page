import { useEffect, useState } from "react";
import _ from "lodash";

import FormButton from "../../components/Buttons/FormButton";
import FormInput from "../../components/Form/FormInput";
import OtpInputForPreApprove from "../../components/Form/OtpInputForPreApprove";
import { useNavigate } from "react-router";
import { setUserClickData } from "../../utility/setUserClickData";
import callApi from "../../utility/apiCaller";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../store/app/appReducer";
import { useSearchParams } from "react-router-dom";
import CheckboxTnC from "../../components/Buttons/CheckboxTnC";
import PreOffer from "./PreOffer";
import { sourceConvert } from "../../utility/commonUtils";

const Form = ({ formData, setFormData, ...props }) => {
  const [otp, setOtp] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(0);
  const [isTncChecked, setIsTncChecked] = useState(true);
  const [mobile, setMobile] = useState("");
  const [pancard, setPancard] = useState("");
  const [isPancardValid, setIsPancardValid] = useState(true);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [affId, setAffId] = useState("");
  const [params] = useSearchParams();
  const [select, setSelect] = useState(false);
  const [PreData, setPreData] = useState();

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
    if (params.get("aff_id")) setAffId(params.get("aff_id"));
  }, [params]);

  const handleValidation = () => {
    let isValid = true;

    if (_.isEmpty(pancard)) {
      isValid = false;
      setIsPancardValid(false);
    } else {
      const isValidPancard = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pancard);
      isValid = isValidPancard;
      setIsPancardValid(isValidPancard);
    }

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

  const handlePancardChange = (event) => {
    const { value } = event.target;
    setIsPancardValid(true);
    setPancard(value);
  };

  const handleMobileChange = (event) => {
    const { value } = event.target;
    setIsMobileValid(true);
    setMobile(value);
  };

  const handleSubmit = async (event) => {
    setUserClickData({
      event_name: "otp-button-pre-approved-loan-page",
    });
    event.preventDefault();
    // let isValid = handleValidation();
    // if (isValid) {
    //   setIsOtpGenerated(true);
    // }
    let isValid = handleValidation();
    if (isValid) {
      const res = await callApi(
        "v1/sms/send-otp",
        "post",
        {
          contact_phone: mobile,
        },
        "messaging"
      );
      if (res["status"] === "Success") {
        setIsOtpGenerated(isOtpGenerated + 1);
      }
    }
    // Handle form submission
  };

  const handleChange = () => {
    setUserClickData({
      event_name: "check-tick-pre-approved-loan-page",
    });
    setIsTncChecked((prev) => !prev);
  };

  const handleResendOtp = async () => {
    // todo resend login with timer
    setUserClickData({
      event_name: "resend-otp-form-for-personal-loan",
    });
    try {
      const res = await callApi(
        "v1/sms/send-otp",
        "post",
        {
          contact_phone: mobile,
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
    // todo submit logic
    try {
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
        await callApi(
          "v1/preapproved_lead/preapproved-lead-from-phone",
          "post",
          {
            phone: mobile,
          },
          "core",
          res.data.token
        )
          .then(async (response) => {
            try {
              if (response.data.lead.lender_id === "662752eb65fdba1a48d6e47e") {
                response.data.lead.redirection_link = `${
                  response.data.lead.redirection_link
                }&utm_medium=${sourceConvert(source)}&utm_source=${affId}`;
              } else if (
                response.data.lead.lender_id === "662752eb65fdba1a48d6e480"
              ) {
                response.data.lead.redirection_link = `https://oneapp.abfldirect.com/esb/login?dsa_hash=32d899515d13789903053da851d2beb4408727f62ce87daa772960fa323fcccb&utmsource=PA_${sourceConvert(
                  source
                )}${affId}`;
              }
              const data = await callApi(
                "urls/new",
                "post",
                {
                  longUrl: response.data.lead.redirection_link,
                  refId: response.data.lead._id,
                  refName: `preapproved`,
                },
                "url",
                res.data.token
              );
              setPreData({
                ...response.data.lead,
                app_url: data.data.shortUrl.shortUrl,
                credit_limit: response.data.lead.loan_amount,
                emi: response.data.lead.loan_emi,
                tenure: response.data.lead.loan_tenure,
              });
              setIsOtpGenerated(isOtpGenerated + 1);
            } catch (err) {
              console.log(err);
              toast("Some error occurred", {
                hideProgressBar: true,
                type: "error",
              });
            }
          })
          .catch((e) => navigate(`/personal-loan?source=${source}`));
      }
    } catch (err) {
      if (err.response.data.data.message === "Invalid OTP") {
        toast("Wrong OTP", { hideProgressBar: true, type: "error" });
      }
      console.log(err);
    }
  };

  return (
    <div className={"personal-loan-form"}>
      <img
        className="mt-3 mb-2 img logo-img"
        src="/assets/img/logo.png"
        alt=""
      />
      {isOtpGenerated === 1 && (
        <div style={{ marginTop: "180px" }}>
          <OtpInputForPreApprove
            setIsOtpGenerated={setIsOtpGenerated}
            buttonStyle={{ marginTop: "200px", marginBottom: "50px" }}
            otpValue={otp}
            setOtpValue={setOtp}
            handleResendOtp={handleResendOtp}
            phone_number={mobile}
            handleSubmitOtp={handleSubmitOtp}
          />
        </div>
      )}

      {isOtpGenerated === 0 && (
        <>
          <div className="absolute top-[30%] -translate-y-[50%] left-0 right-0">
            <img
              className="my-5 mb-3 img header-img lock_img"
              src="/assets/icons/header.png"
              alt=""
            />
            <h1
              className="mb-5 text-center h3 fw-normal"
              style={{ fontSize: "20px" }}
            >
              Unlock Your Pre-approved
              <br />
              <strong>Personal Loan Offer</strong>
            </h1>
          </div>

          <div className="flex flex-col preApproveForm grow ">
            <input type="hidden" name="utm_campaign" value="" />
            <input type="hidden" name="utm_source" value="" />
            <input type="hidden" name="utm_medium" value="" />
            <input type="hidden" name="utm_content" value="" />
            <input type="hidden" name="click_id" value="" />
            <input type="hidden" name="aff_id" value="" />
            <input type="hidden" name="src" value="" />

            <div className="preApprovebutton">
              <FormInput
                icon={
                  <img
                    src="/assets/icons/phone-call.png"
                    height="25"
                    alt="Phone Icon"
                  />
                }
                iconColor="#fff"
                type="number"
                name="mobile"
                isValid={isMobileValid}
                id="mobile"
                aria-describedby="name"
                placeholder="Mobile"
                minLength="10"
                maxLength="10"
                pattern="[0-9]{10}"
                title="Please enter a Valid mobile no."
                value={mobile}
                onChange={handleMobileChange}
                required
                label={"Mobile Number"}
                errorMessage={"Please enter a valid Mobile Number"}
              />
              <CheckboxTnC checked={isTncChecked} handleChange={handleChange} />
              <FormButton
                // style={{ marginTop: "120px" }}
                className="w-100 btn btn-lg btn-primary btn-get-otp"
                type="submit"
                onClick={handleSubmit}
                id="myBtn"
              >
                GET OTP
              </FormButton>
            </div>
          </div>
        </>
      )}
      {isOtpGenerated === 2 && <PreOffer PreData={PreData} source={source} />}
    </div>
  );
};

export default Form;
