import FormButton from "../../Buttons/FormButton";
import OTPInput from "react-otp-input";
import _ from "lodash";
import { useEffect, useState } from "react";
import { setUserClickData } from "../../../utility/setUserClickData";
import { Link } from "react-router-dom";
import "./otpForm.css";

const OtpInputForm = ({
  otpValue,
  pages,
  setPages,
  setOtpValue,
  phone_number,
  handleResendOtp,
  handleSubmitOtp,
  style,
  buttonStyle,
  handleChange: handleKycChecked,
  checked,
  lenderId,
}) => {
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [name, setName] = useState("");
  const [tnc, setTnc] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [concent, setConcent] = useState("");

  useEffect(() => {
    if (lenderId) {
      if (lenderId === "667ffb7b0dd50ee1bb6556c5") {
        setName("Prefr");
        setTnc("https://prefr.com/terms_and_conditions");
        setPrivacy("https://prefr.com/privacy_policy");
        setConcent("https://prefr.com/bureau_consent");
      }
      //  else if (lenderId === "") {
      //   setName("Prefr");
      //   setTnc(
      //     "https://www.tatacapital.com/content/dam/tata-capital/pdf/tcfsl/PL_App_Form_TC.pdf"
      //   );
      //   setPrivacy(
      //     "https://www.tatacapital.com/content/dam/tata-capital/pdf/tcfsl/PL_App_Form_TC.pdf"
      //   );
      //   setConcent("https://prefr.com/bureau_consent");
      // } else if (lenderId === "") {
      //   setName("Prefr");
      //   setTnc("https://prefr.com/terms_and_conditions");
      //   setPrivacy("https://prefr.com/privacy_policy");
      //   setConcent("https://prefr.com/bureau_consent");
      // }
    }
  }, [lenderId]);

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
  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          setOtpValue(otp.code);
        })
        .catch((err) => {
          console.error(err);
        });

      return () => {
        ac.abort();
      };
    }
  }, []);
  const handleChange = (value) => {
    setIsOtpValid(true);
    setOtpValue(value);
  };

  return (
    <div>
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
        </span>{" "}
        <Link
          className="text-blue-700"
          style={{ fontSize: "12px" }}
          onClick={() => {
            setPages(pages - 2);
          }}
        >
          Edit
        </Link>
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
            width: "80%",
            boxShadow: "0 0 5px 0.5pt #d3d3d3",
            padding: ".75rem .1rem",
            fontSize: "1rem",
            fontWeight: "400",
            lineHeight: 2.5,
            color: "#212529",
            backgroundColor: "#fff",
            backgroundClip: "padding-box",
            border: "1px solid #ced4da",
            appearance: "none",
            borderRadius: "1.1rem",
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
        style={{ paddingTop: "5px", paddingBottom: "3em" }}
      >
        <p style={{ fontSize: "12px" }}>
          Don't receive the OTP? Click here to{" "}
          <a className={"text-blue-700"} href="#" onClick={handleResendOtp}>
            Regenerate OTP
          </a>
        </p>
      </div>
      <div
        style={{
          marginTop: "22em",
        }}
      >
        {handleKycChecked && (
          <div className="mt-10 mb-3 checkbox pull-left">
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
              I have agreed to {name} have read
              {/* <Link
                target="_blank"
                to={tnc}
                style={{ color: "#00A9DD", fontSize: "10px" }}
              >
                <b>T&C</b>
              </Link>{" "} */}{" "}
              &{" "}
              {/* <Link
                target="_blank"
                to={privacy}
                style={{ color: "#00A9DD", fontSize: "10px" }}
              >
                <b>Privacy Policy</b>
              </Link>{" "}
              consent to CKYC and{" "}
              <Link
                target="_blank"
                to={concent}
                style={{ color: "#00A9DD", fontSize: "10px" }}
              >
                <b>Authorized</b>
              </Link>{" "}
              Prfer to retrieve my credit report */}
              understood the "Terms & Conditions" and confirm to the
              "declaration" provided in the link{" "}
              <Link
                target="_blank"
                to={privacy}
                style={{ color: "#00A9DD", fontSize: "10px" }}
              >
                <b>Click here</b>
              </Link>{" "}
            </label>
          </div>
        )}
      </div>
      <div className="stick_button1">
        <FormButton style={buttonStyle} onClick={handleSubmit} id="myBtn">
          SEE MY OFFERS
        </FormButton>
      </div>
    </div>
  );
};

export default OtpInputForm;
