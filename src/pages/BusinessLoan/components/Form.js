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
import { useDispatch, useSelector } from "react-redux";
import { setUserClickData } from "../../../utility/setUserClickData";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

const Form = ({ formData, setFormData, ...props }) => {
  const [otp, setOtp] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isTncChecked, setIsTncChecked] = useState(true);
  const [contactName, setContactName] = useState("");
  const [pan, setPan] = useState("");
  const [mobile, setMobile] = useState("");
  const [source, setSource] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isPanValid, setIsPanValid] = useState(true);
  const [mobileTouched, setMobileTouched] = useState(false);
  const [panTouched, setPanTouched] = useState(false);
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
  }, [params]);

  const handlePanChange = (event) => {
    const { value } = event.target;
    setPan(value);
  };

  const handlePanBlur = () => {
    setPanTouched(true);
    if (pan.length === 0) {
      setIsPanValid(true);
    } else {
      setIsPanValid(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan));
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
    isPanValid && !_.isEmpty(pan) && isMobileValid && mobile.length === 10;

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

      if (res.status === "Success") {
        dispatch(login({ ...res.data.customer, token: res.data.token }));
        setUserClickData({
          event_name: `otp-verify-business-loan-page`,
          user_id: mobile || "unknown",
        });

        toast.success("OTP verified successfully.");

        let fullName = "";
        let dateofbirth = "";
        try {
          const panRes = await callApi(
            "v1/M2P_data/get-data-from-pan",
            "post",
            { pancard: pan },
            "core",
            res.data.token
          );

          if (panRes.status === "Success" && panRes.data?.fullname) {
            fullName = panRes.data.fullname;
            dateofbirth = moment(panRes.data.dob, "DD/MM/YYYY").format("YYYY-MM-DDT00:00:00.000+00:00");
          }
        } catch (err) {
          console.warn(
            "Failed to fetch PAN details. Proceeding without full name."
          );
        }

        let leadId = "";
        try {
          const leadRes = await callApi(
            "v1/businessloanlead/new",
            "post",
            {
              businessloanlead: {
                contact_name: fullName,
                contact_phone: mobile,
                dob: dateofbirth,
                pan_no: pan,
                is_pan_verified: true,
                is_pan_mobile_verify_completed: "true",
              },
            },
            "core"
          );

          if (leadRes.status === "Success") {
            leadId = leadRes.data.businessloanlead?.lead?._id;
            dispatch(setLead(leadRes.data.lead));
          }
        } catch (err) {
          console.warn("Lead update failed, continuing flow.");
        }

        if (leadId) {
          try {
            await callApi(
              "v1/ican_api/bl-data-send-to-ican",
              "post",
              {
                lead: {
                  id: leadId,
                  contact_phone: mobile,
                  pan_no: pan,
                  contact_name: fullName,
                },
              },
              "core"
            );
          } catch (err) {
            console.warn("ICAN API call failed.");
          }
        }

        setFormData((prev) => {
          const updatedData = {
            ...prev,
            pancard: pan,
            mobile: mobile,
            full_name: fullName,
          };
          navigate(`/business-loan/apply?source=${source}`, {
            state: updatedData,
          });
          return updatedData;
        });
      }
    } catch (err) {
      if (err.response?.data?.message === "Invalid OTP") {
        toast.error("Wrong OTP");
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
            <h2 className="text-center mt-28 text-xl text-gray-600 mb-8">
              Fuel Your Business Growth with Instant,{" "}
              <span className="text-cyan-500 font-normal">
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
                  src="/assets/icons/pancard.png"
                  height="25"
                  alt="PAN Icon"
                />
              }
              type="text"
              name="pancard"
              id="pancard"
              value={pan}
              placeholder="Enter PAN"
              minLength="10"
              maxLength="10"
              pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
              onChange={handlePanChange}
              onBlur={handlePanBlur}
              isValid={!panTouched || isPanValid}
              style={{ textTransform: "uppercase" }}
              required
              label={"Pancard"}
              errorMessage={
                panTouched && !isPanValid
                  ? "Please enter a valid PAN number."
                  : ""
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
