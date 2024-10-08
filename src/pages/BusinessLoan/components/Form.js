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
  const [mobile, setMobile] = useState("");
  const [source, setSource] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
  }, [params]);

  const handleValidation = () => {
    let isValid = true;

    if (_.isEmpty(mobile)) {
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
    const { value } = event.target;
    setIsMobileValid(true);
    setMobile(value);
  };

  const handleSubmit = async (event) => {
    setUserClickData({ event_name: "otp-button-business-loan-page" });
    event.preventDefault();
    let isValid = handleValidation();
    if (isValid) {
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
      }
    }
  };
  // Handle form submission

  const handleChange = () => {
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
    setUserClickData({ event_name: "otp-verify-button-business-loan-page" });
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
            handleSubmitOtp={handleSubmitOtp}
          />
        </div>
      ) : (
        <>
          <img
            className="my-5 mb-3 img header-img"
            src="/assets/img/dm-bs.png"
            alt=""
          />
          <h1
            className="mt-5 text-center h3 fw-normal"
            style={{ fontSize: "20px", letterSpacing: "2pxs" }}
          >
            Lets Check Your
            <br />
            <strong>Eligibility Quicklyr</strong>
          </h1>
          <input type="hidden" name="utm_campaign" value="" />
          <input type="hidden" name="utm_source" value="" />
          <input type="hidden" name="utm_medium" value="" />
          <input type="hidden" name="utm_content" value="" />
          <input type="hidden" name="click_id" value="" />
          <input type="hidden" name="aff_id" value="" />
          <input type="hidden" name="src" value="" />
          <FormInput
            className={"my-5"}
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
          <CheckboxTnC checked={isTncChecked} handleChange={handleChange} />
          <FormButton
            style={{ marginTop: "10px" }}
            className="w-100 btn btn-lg btn-primary btn-get-otp"
            type="submit"
            onClick={handleSubmit}
            id="myBtn"
          >
            GET OTP
          </FormButton>
        </>
      )}
    </div>
  );
};

export default Form;
