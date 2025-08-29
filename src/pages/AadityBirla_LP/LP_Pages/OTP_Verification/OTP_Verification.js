import React, { useState, useRef } from "react";
import "./OTP_Verification.css"
import Header from '../../Components/Header/Header'
import HeroSection from '../../Components/Hero/HeroSection'
import GoogleRatingCard from '../../Components/GoogleRatingCard/GoogleRatingCard'

const OTP_Verification = () => {

const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Entered OTP is ${otp.join("")}`);
  };

  return (
    <div className="main">
      <Header />
      <GoogleRatingCard />
      <HeroSection /> 
      <div className="otp-container">
        <div className="otp-heading">
          <div className="line"></div>
          <div  className="otp-title"><h3>Mobile OTP verification</h3></div>
          <div className="line"></div>
        </div>
        <p className="otp-subtitle">
          A One Time Password (OTP) has been sent to your mobile number{" "}
          <strong style={{color: "black", fontSize: '15px'}}> 9223838888 </strong>{" "}
          <a href="#" className="edit-link">Edit </a>
          Please enter the OTP below
        </p>
 
        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
  
          <p className="resend">
            Don’t receive the OTP? Click here to{" "}
            <a href="#" className="resend-link">Regenerate OTP</a>
          </p>
  
          <button type="submit" className="offer-btn">
            <span> Check your offers</span><img src="/assets/img/cta_arrow_new.png " alt="" height={16} width={21} />
          </button>
        </form>
     </div>
    </div>
  )
}

export default OTP_Verification