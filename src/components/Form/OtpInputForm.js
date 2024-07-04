import FormButton from "../Buttons/FormButton";
import OTPInput from "react-otp-input";
import _ from "lodash";
import { useState } from "react";
import { setUserClickData } from "../../utility/setUserClickData";
import { Link } from "react-router-dom";

const OtpInputForm = ({
  otpValue,
  setOtpValue,
  phone_number,
  handleResendOtp,
  handleSubmitOtp,
  style,
  buttonStyle,
  handleChange: handleKycChecked,
  checked,
}) => {
  const [isOtpValid, setIsOtpValid] = useState(true);

  const handleSubmit = () => {
    setUserClickData({
      event_name: "otp-input-form",
    });
    if (otpValue.length === 4) {
      handleSubmitOtp();
    } else {
      setIsOtpValid(false);
    }
  };

  const handleChange = (value) => {
    setIsOtpValid(true);
    setOtpValue(value);
  };

  return (
    <div style={style}>
      <h1
        className="my-4 h3 fw-normal"
        align="left"
        style={{ fontSize: "18px !important", fontWeight: "lighter" }}
      >
        Mobile OTP Verification
      </h1>
      <p
        className="my-4 fw-normal"
        style={{ textAlign: "left", fontSize: "12px" }}
      >
        A One Time Password (OTP) has been sent to your mobile number
        <span className="text-decoration-underline">
          <u>
            <span id="mobileno">{phone_number ? " " + phone_number : ""}</span>
          </u>
        </span>
        <br />
        Please enter the OTP below
      </p>
      <div className={"my-3"}>
        <OTPInput
          value={otpValue}
          onChange={handleChange}
          inputType="number"
          numInputs={4}
          containerStyle={{
            display: "flex",
            flexWrap: "nowrap",
            justifyItems: "center",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
          inputStyle={{
            display: "block",
            width: "100%",
            padding: ".375rem .75rem",
            fontSize: "1rem",
            fontWeight: "400",
            lineHeight: 1.5,
            color: "#212529",
            backgroundColor: "#fff",
            backgroundClip: "padding-box",
            border: "1px solid #ced4da",
            appearance: "none",
            borderRadius: ".25rem",
            transition:
              "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
          }}
          placeholder={"----"}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      {!isOtpValid && (
        <div id="otperror" className="text-center text-danger">
          Incorrect OTP. Please enter valid otp.
        </div>
      )}
      <div
        className="mb-3 checkbox pull-left"
        style={{ paddingTop: "5px", paddingBottom: "45px" }}
      >
        <p style={{ fontSize: "12px" }}>
          Don't receive the OTP? Click here to{" "}
          <a className={"text-blue-700"} href="#" onClick={handleResendOtp}>
            Regenerate OTP
          </a>
        </p>
      </div>
      {handleKycChecked && (
        <div className="mt-40 mb-3 checkbox pull-left">
          <label className="tnc">
            <input
              onChange={handleKycChecked}
              checked={checked}
              className="form-check-input"
              type="checkbox"
              name="is_consent"
              value="Yes"
              style={{ fontSize: "10px", marginRight: "4px" }}
            />
            I have agreed to Prefr{" "}
            <Link to="/terms" style={{ color: "#00A9DD", fontSize: "10px" }}>
              <b>T&C</b>
            </Link>{" "}
            and{" "}
            <Link to="/lenders" style={{ color: "#00A9DD", fontSize: "10px" }}>
              <b>Privacy Policy</b>
            </Link>{" "}
            consent to CKYC and{" "}
            <Link to="/lenders" style={{ color: "#00A9DD", fontSize: "10px" }}>
              <b>Authorized</b>
            </Link>{" "}
            Prfer to retrieve my credit report
          </label>
        </div>
      )}
      <FormButton style={buttonStyle} onClick={handleSubmit} id="myBtn">
        Verify
      </FormButton>
    </div>
  );
};

export default OtpInputForm;
