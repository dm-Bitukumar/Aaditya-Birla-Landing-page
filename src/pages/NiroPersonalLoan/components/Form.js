import { useEffect, useState } from "react";
import _ from "lodash";
import CheckboxTnC from "./CheckboxTnC";
import FormButton from "../../../components/Buttons/FormButton";
import FormInputNewNiro from "../../../components/Form/FormInputNewNiro";
import OtpInputForm from "../../../components/Form/OtpInputForm";
import { useNavigate } from "react-router";
import callApi from "../../../utility/apiCaller";
import HeadBar from "../../../components/Static/HeadBar";
import { useDispatch } from "react-redux";
import { login, setLead } from "../../../store/app/appReducer";
import { toast } from "react-toastify";
import { setUserClickData } from "../../../utility/setUserClickData";
import { useSearchParams } from "react-router-dom";
import PersonalDetails from "../../NiroPersonalDetail/PersonalDetails";
import ReactPixel from "react-facebook-pixel";
import OfferDetailsSegmentNiro from "../../NiroPersonalDetail/components/OfferDetailsSegmentNiro";

const Form = () => {
  const [otp, setOtp] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isTncChecked, setIsTncChecked] = useState(true);
  const [mobile, setMobile] = useState("");
  const [userName, setUserName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [personalData, setPersonalData] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [affId, setAffId] = useState("");
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [stepper, setStepper] = useState("0");

  const [isMobileValid, setIsMobileValid] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [sources, setSources] = useState("");
  const [amount, setAmount] = useState("");
  const [contactName, setContactName] = useState("");

  useEffect(() => {
    if (params.get("app_url")) setSources(params.get("app_url"));
    if (params.get("amount")) setAmount(params.get("amount"));
    if (params.get("contact_name")) setContactName(params.get("contact_name"));
    if (params.get("step")) setStepper(params.get("step"));
    // if (params.get("source")) setSource(params.get("source"));
    // if (params.get("utm_source")) setUtmSource(params.get("utm_source"));
    // if (params.get("aff_id")) setAffId(params.get("aff_id"));
  }, [params]);

  async function fetchIp() {
    await fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        // ipAddress = data?.ip;
        setIpAddress(data?.ip);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
  useEffect(() => {
    fetchIp();
  }, []);

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
    if (_.isEmpty(userName)) {
      isValid = false;
      setIsUserNameValid(false);
    }

    return isValid;
  };

  const handleMobileChange = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, "");
    setIsMobileValid(true);
    setMobile(inputValue);
  };

  const handleSubmit = async (event) => {
    setUserClickData({
      event_name: "fb-lp-login",
    });
    // if (window.fbq) {
    //   window.fbq("track", "Get_OTP");
    // }
    ReactPixel.track("Get_OTP");
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
        setIsOtpGenerated(true);
      }
    }
  };

  const handleChange = () => {
    setIsTncChecked((prev) => !prev);
  };

  const handleUserNameChange = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^A-Za-z" "]/g, "");
    setIsUserNameValid(true);
    setUserName(inputValue);
  };

  const handleResendOtp = async () => {
    setUserClickData({
      event_name: "fb-lp-resend-otp",
    });
    ReactPixel.track("Get_OTP");
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
      event_name: "fb-lp-otp",
    });
    ReactPixel.track("OTP_Verified");
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
        dispatch(
          login({
            ...res.data.customer,
            token: res.data.token,
            website_kyc_consent: isTncChecked,
          })
        );
        try {
          const result = await callApi(
            "v1/lender/fb-niro-first-check",
            "post",
            {
              contact_name: userName,
              contact_phone: mobile,
              ip_address: ipAddress,
            },
            "loan"
          );
          if (result?.status === "Success") {
            if (result?.data?.status === true) {
              setUserClickData({
                event_name: "fb-lp-offer",
              });
              setStepper("2");
              setContactName(result.data?.contact_name);
              setAmount(result?.data?.offers?.[0]?.credit_limit);
              setSources(result?.data?.app_url);
              // navigate(
              //   `/fb/lp01?step=${"2"}&contact_name=${
              //     result.data?.contact_name
              //   }&amount=${result?.data?.offers?.[0]?.credit_limit}&app_url=${
              //     result?.data?.app_url
              //   }`
              // );
            } else {
              // navigate(
              //   `/fb/lp01?step=${"3"}&aff_id=${affId}&utm_source=${utmSource}`
              // );
              // navigate({ state: result.data });
              setStepper("3");
              setPersonalData(userName);
            }
          }
        } catch (err) {}
      }
    } catch (err) {
      if (err.response.data.data.message === "Invalid OTP") {
        toast("Wrong OTP", { hideProgressBar: true, type: "error" });
      }
      console.log(err);
    }
  };

  return (
    <>
      {stepper === "0" ? (
        <div
          className={"personal-loan-form"}
          style={{
            height: "30dvh",
            padding: "15px 20px",
          }}
        >
          <HeadBar />{" "}
          <img
            className="mt-3 mb-1 img logo-img"
            src="/assets/img/logo.png"
            alt=""
          />
          {isOtpGenerated ? null : (
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
                {/* <strong>Upto 25 Lacs</strong> */}
              </h1>
              <p className="mb-3 text-center" style={{ fontSize: "14px" }}>
                • Instant Approvals • Complete Digital Process •
                <span className="bullet">•</span>Quick Disbursal
              </p>{" "}
            </>
          )}
          {isOtpGenerated ? (
            <div style={{ marginTop: "13em" }}>
              <OtpInputForm
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
              {/* <h1
            className="mb-2 h3 fw-normal"
            align="left"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            Let's connect
          </h1> */}
              <input type="hidden" name="utm_campaign" value="" />
              <input type="hidden" name="utm_source" value="" />
              <input type="hidden" name="utm_medium" value="" />
              <input type="hidden" name="utm_content" value="" />
              <input type="hidden" name="click_id" value="" />
              <input type="hidden" name="aff_id" value="" />
              <input type="hidden" name="src" value="" />
              <FormInputNewNiro
                icon={
                  <img
                    src="/assets/icons/male.png"
                    height="25"
                    style={{ maxHeight: "25px" }}
                    alt="icon 2.png"
                  />
                }
                type="text"
                name="userName"
                isValid={isUserNameValid}
                id="userName"
                aria-describedby="name"
                placeholder="Full Name"
                value={userName}
                onChange={handleUserNameChange}
                required
                label={"Full Name"}
                errorMessage={"Please enter a valid user name"}
              />

              <FormInputNewNiro
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
              <div
                className="preApprovebutton"
                style={{
                  background: "#fff",
                }}
              >
                <FormButton
                  style={{ marginTop: "30px" }}
                  className="w-100 btn btn-lg btn-primary btn-get-otp"
                  type="submit"
                  onClick={handleSubmit}
                  id="myBtn"
                >
                  GET OTP
                </FormButton>
              </div>
            </>
          )}
        </div>
      ) : null}
      {stepper === "2" ? (
        <OfferDetailsSegmentNiro
          source={sources}
          amount={amount}
          contactName={contactName}
        />
      ) : null}
      {stepper === "3" ? (
        <PersonalDetails personalData={personalData} lender={"niro"} />
      ) : null}
    </>
  );
};

export default Form;
