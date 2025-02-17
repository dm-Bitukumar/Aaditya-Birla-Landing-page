import { useEffect, useState } from "react";
import _ from "lodash";
import CheckboxTnC from "../../../components/Buttons/CheckboxTnC";
import FormButton from "../../../components/Buttons/FormButton";
import FormInput from "../../../components/Form/FormInput";
import OtpInputForm from "../../../components/Form/OtpInputForm";
import { useNavigate } from "react-router";
import callApi from "../../../utility/apiCaller";
import { toast } from "react-toastify";
import { login, setLead } from "../../../store/app/appReducer";
import { useDispatch } from "react-redux";
import { setUserClickData } from "../../../utility/setUserClickData";
import { useSearchParams } from "react-router-dom";

const Form = ({ formData, setFormData, ...props }) => {
  const [otp, setOtp] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isTncChecked, setIsTncChecked] = useState(true);
  const [contactName, setContactName] = useState("");
  const [mobile, setMobile] = useState("");
  const [source, setSource] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [nameTouched, setNameTouched] = useState(false);
  const [mobileTouched, setMobileTouched] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
  }, [params]);

  const handleNameChange = (event) => {
    const { value } = event.target;
    setContactName(value);
  };

  const handleNameBlur = () => {
    setNameTouched(true);
    if (contactName.length === 0) {
      setIsNameValid(true);
    } else {
      setIsNameValid(/^[A-Za-z ]+$/.test(contactName));
    }
  };

  const handleMobileChange = (event) => {
    const { value } = event.target;
    if (/^\d{0,10}$/.test(value)) {
      setMobile(value);
    }
  };

  const handleMobileBlur = () => {
    setMobileTouched(true);
    if (mobile.length === 0) {
      setIsMobileValid(true);
    } else {
      setIsMobileValid(mobile.length === 10);
    }
  };

  const isFormValid =
    isNameValid && !_.isEmpty(contactName) && isMobileValid && mobile.length === 10;

  const handleSendOtp = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      setIsOtpGenerated(true);
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
        setIsOtpGenerated(true);
        setUserClickData({
          event_name: `otp-send-business-loan-page`,
          user_id: mobile || "unknown",
        });
      }
    }
  };

  const handleChange = () => {
    setIsTncChecked((prev) => !prev);
  };

  const handleResendOtp = async () => {
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
        setUserClickData({
          event_name: `resend-otp-business-loan-page`,
          user_id: mobile || "unknown",
        });
        toast("Otp sent", { hideProgressBar: true, type: "success" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitOtp = async () => {
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
        dispatch(login({ ...res.data.customer, token: res.data.token }));
        setUserClickData({
          event_name: `otp-verify-business-loan-page`,
          user_id: mobile || "unknown",
        });
        await callApi(
          "v1/lead/lead-from-phone",
          "post",
          {
            phone: mobile,
            website_kyc_consent: isTncChecked,
          },
          "core",
          res.data.token
        )
          .then((response) => {
            if (response["status"] === "Success") {
              dispatch(setLead(response.data.lead));
              navigate(`/business-loan/apply?source=${source}`);
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
            contactName={contactName}
            setContactName={setContactName}
            handleSubmitOtp={handleSubmitOtp}
          />
        </div>
      ) : (
        <>
          <div className="">
            <h2 className="text-center mt-28 text-xl mb-8">
              Fuel Your Business Growth with Instant,{" "}
              <span style={{ color: "#007bff", fontWeight: "600" }}>
                Unsecured Business Loans.
              </span>
            </h2>
            <p className="mt-2 text-center text-base">
              • Fast Approvals • Quick Disbursal
            </p>
            <p className="mt-1 text-center text-base">• Zero Collateral</p>
            <input type="hidden" name="utm_campaign" value="" />
            <input type="hidden" name="utm_source" value="" />
            <input type="hidden" name="utm_medium" value="" />
            <input type="hidden" name="utm_content" value="" />
            <input type="hidden" name="click_id" value="" />
            <input type="hidden" name="aff_id" value="" />
            <input type="hidden" name="src" value="" />
            <FormInput
              className={"my-4"}
              icon={
                <img
                  src="/assets/icons/male.png"
                  height="25"
                  alt="Phone Icon"
                />
              }
              type="text"
              name="name"
              id="name"
              value={contactName}
              aria-describedby="name"
              placeholder="Name"
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              isValid={!nameTouched || isNameValid}
              required
              label={"Full Name as per PAN Card"}
              errorMessage={
                nameTouched && !isNameValid ? "Please enter a valid name" : ""
              }
            />
            <FormInput
              className={"my-2"}
              icon={
                <img
                  src="/assets/icons/phone-call.png"
                  height="25"
                  alt="Phone Icon"
                />
              }
              type="number"
              name="mobile"
              id="mobile"
              aria-describedby="name"
              placeholder="Mobile"
              minLength="10"
              maxLength="10"
              pattern="[0-9]{10}"
              value={mobile}
              onChange={handleMobileChange}
              onBlur={handleMobileBlur}
              isValid={!mobileTouched || isMobileValid}
              required
              label={"Mobile Number"}
              errorMessage={
                mobileTouched && !isMobileValid
                  ? "Please enter a valid mobile number"
                  : ""
              }
            />
          </div>
          <div className="mt-16">
            <CheckboxTnC checked={isTncChecked} handleChange={handleChange} />
            <FormButton
              style={{ marginTop: "10px" }}
              className="w-100 btn btn-lg btn-primary btn-get-otp"
              type="submit"
              onClick={handleSendOtp}
              disabled={!isFormValid}
              id="myBtn"
            >
              GET OTP
            </FormButton>
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
