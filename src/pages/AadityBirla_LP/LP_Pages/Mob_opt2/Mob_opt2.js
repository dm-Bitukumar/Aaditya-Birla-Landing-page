import React, { useState } from "react";
import "./Mob_opt2.css"
import HeroSection from '../../Components/Hero/HeroSection'
import Header from '../../Components/Header/Header'
import GoogleRatingCard from '../../Components/GoogleRatingCard/GoogleRatingCard'

const Mob_opt2 = () => {

  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`OTP sent to ${mobile}`);
  };

  return (
    <div className="main">
      <Header />
      <GoogleRatingCard />
      <HeroSection />
      <div className="loan-container">
        <div className="loan-heading">
          <div className="line"></div>
          <div className="title"><h3>Check your loan eligibility instantly</h3></div> 
          <div className="line"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mob-input-box">
            <label>Mobile Number</label>         
            <input
              type="tel"
              maxLength="10"
              placeholder="+91 98920 977543"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
         </div>
          <div className="checkbox-section">
            <input type="checkbox" id="agree" required />
            <label htmlFor="agree">
              By proceeding, you agree to Aditya Birla Capital Limited's{" "}
              <a href="#">privacy policy</a> and{" "}
              <a href="#">terms and conditions</a>. Mobile number provided is
              linked with my Aadhaar Number.
            </label>
          </div>
 
          <p className="note">You will receive OTP on mobile number</p>
 
          <button type="submit" className="otp-btn">
            <span> Get OTP</span><img src="/assets/img/cta_arrow_new.png " alt="" height={16} width={21} />
          </button>
        </form>
     </div>

    </div>
  )
}

export default Mob_opt2