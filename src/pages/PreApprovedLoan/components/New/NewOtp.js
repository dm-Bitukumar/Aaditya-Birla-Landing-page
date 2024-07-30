import React, { useState } from "react";
import OtpInputForm from "../../../../components/Form/OtpInputForm";
import { toast } from "react-toastify";
import callApi from "../../../../utility/apiCaller";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUserClickData } from "../../../../utility/setUserClickData";
import { login } from "../../../../store/app/appReducer";
const NewOtp = ({ pages, setPages, phone }) => {
  const [pancard, setPancard] = useState("");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const { gender, name, dob, email, pincode, profession } = data;

  //   const handleDataChange = (key, value) => {
  //     setErrors("");
  //     setData((prevData) => ({ ...prevData, [key]: value }));
  //   };

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
        dispatch(
          login({ ...res.data.customer, token: res.data.token, pancard })
        );
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
      <div>
        <OtpInputForm
          otpValue={otp}
          setOtpValue={setOtp}
          // handleResendOtp={handleResendOtp}
          phone_number={mobile}
          handleSubmitOtp={handleSubmitOtp}
        />
      </div>
    </div>
  );
};

export default NewOtp;
