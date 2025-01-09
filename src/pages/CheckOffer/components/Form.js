import { useEffect, useState } from "react";
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
import { login } from "../../../store/app/appReducer";
import { useSearchParams } from "react-router-dom";

const Form = ({ formData, setFormData, ...props }) => {
  const [otp, setOtp] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isTncChecked, setIsTncChecked] = useState(true);
  const [mobile, setMobile] = useState("");
  const [pancard, setPancard] = useState("");
  const [isPancardValid, setIsPancardValid] = useState(true);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
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
      event_name: "otp-button-check-offer-loan-page",
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
          kyc_consent: isTncChecked,
        },
        "messaging"
      );
      if (res["status"] === "Success") {
        setUserClickData({
          event_name: "otp-page-for-check-offer",
        });
        setIsOtpGenerated(true);
      }
    }
    // Handle form submission
  };

  const handleChange = () => {
    setUserClickData({
      event_name: "check-offer-loan-page",
    });
    setIsTncChecked((prev) => !prev);
  };

  const handleResendOtp = async () => {
    // todo resend login with timer
    setUserClickData({
      event_name: "resend-otp-form-for-check-offer",
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
      event_name: "verify-otp-check-offer-loan-page",
    });

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
        const leadResponse = await callApi(
          "v1/lead/lead-from-phone",
          "post",
          {
            phone: mobile,
            website_kyc_consent: isTncChecked,
          },
          "core",
          res.data.token
        )
          .then(async (response) => {
            if (response["status"] === "Success" && response.data.lead) {
              const leadData = response.data.lead;

              try {
                const offersRes = await callApi(
                  `v1/loan_offer/lead_id/${leadData._id}`,
                  "get",
                  {},
                  "core"
                );

                const offers =
                  offersRes.status === "Success"
                    ? offersRes.data.offers ?? []
                    : [];

                await callApi(
                  "v1/ican_api/data-send-with-offers-to-ican_with_dynamic_tag",
                  "post",
                  {
                    priority: "P1",
                    lead: {
                      id: leadData._id,
                      contact_name: leadData.contact_name,
                      contact_phone: leadData.contact_phone,
                    },
                    offers: offers,
                  },
                  "core"
                );
                navigate(
                  `/offers?lid=${response.data.lead._id}&source=${source}`
                );
              } catch (offersError) {
                console.log("Error fetching offers:", offersError);
                navigate(`/personal-loan?source=${source}`);
              }
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
          <CheckboxTnC checked={isTncChecked} handleChange={handleChange} />
          <FormButton
            style={{ marginTop: "120px" }}
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
