import React, { useState } from "react";
import OtpInputForm from "../../../../components/Form/OtpInputForm2";
import { toast } from "react-toastify";
import callApi from "../../../../utility/apiCaller";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUserClickData } from "../../../../utility/setUserClickData";
import { login } from "../../../../store/app/appReducer";
const NewOtp = ({ pages, setPages, phone }) => {
  const [pancard, setPancard] = useState("");
  const [isTncChecked, setIsTncChecked] = useState(true);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const { gender, name, dob, email, pincode, profession } = data;

  //   const handleDataChange = (key, value) => {
  //     setErrors("");
  //     setData((prevData) => ({ ...prevData, [key]: value }));
  //   };
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
          contact_phone: phone,
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
      event_name: "otp-form-for-personal-loan",
    });
    try {
      const res = await callApi(
        "v1/sms/validate-otp",
        "post",
        {
          contact_phone: phone,
          otp,
        },
        "messaging"
      );

      if (res["status"] === "Success") {
        dispatch(login({ ...res.data.customer, token: res.data.token }));
        setPages(pages + 1);
        // navigate(`/apply?source=${source}`);
      }
    } catch (err) {
      if (err.response.data.data.message === "Invalid OTP") {
        toast("Wrong OTP", { hideProgressBar: true, type: "error" });
      }
      console.log(err);
    }
  };

  return (
    <div className="bg-[#F4F8FF] h-screen">
      <center>
        <img src="/assets/img/logo.png" alt="" />
      </center>
      <div style={{ marginTop: "5em" }}>
        <OtpInputForm
          otpValue={otp}
          setOtpValue={setOtp}
          handleResendOtp={handleResendOtp}
          phone_number={phone}
          handleSubmitOtp={handleSubmitOtp}
          checked={isTncChecked}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default NewOtp;
