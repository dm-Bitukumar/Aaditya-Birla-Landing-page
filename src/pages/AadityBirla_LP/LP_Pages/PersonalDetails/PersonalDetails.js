import React, { useState } from "react";
import "./PersonalDetails.css";
import Header from "../../Components/Header/Header";

const PersonalDetails = () => {
  const [gender, setGender] = useState("female");
  const [fullName, setFullName] = useState("Alexander Graham Bell");
  const [panCard, setPanCard] = useState("")
  const [dob, setDob] = useState("DD MM YYYY")
  const [personalEmail, setPersonalEmail] = useState("Alexander.Graham@Yahoo.com")
  const [maritalStatus, setMaritalStatus] = useState("Married")
  const [address, setAddress] = useState("Laxmi Nagar Extn, Gopalapuram")
  const [address1, setAddress1] = useState("Chennai, Tamil Nadu.")
  const [pincode, setPincode] = useState("600 086")

  const Female_icon = (gender=== "female")
    ? "/assets/img/Female_green.svg"
    : "/assets/img/Female_black.svg";

  const Male_icon = (gender=== "male")
    ? "/assets/img/Male_green.svg"
    : "/assets/img/Male_black.svg";

  return (
    <div className="main">
      <Header />
    <div className="personal-container">
      <div className="personal-info-heading">
        <div className="line"></div>
        <div className="title1"> <h3>Personal information</h3></div>
        <div className="line"></div>
      </div>
      <div className="gender-section">
        <button
          className={`gender-btn ${gender === "male" ? "active" : ""}`}
          onClick={() => setGender("male")}
        >
          <img src={Male_icon} alt="Male" /> Male
        </button>
        <button
          className={`gender-btn ${gender === "female" ? "active" : ""}`}
          onClick={() => setGender("female")}
        >
          <img src={Female_icon} alt="Male" /> Female
        </button>
      </div>

       <div className="form-group">
  
          <div className="input-box">
            <label className="input-label">Full Name as per Pan Card</label>
            <input
              type="text"
              className="form-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group2"   >  
          <input
            type="text"
            className="form-input"
            value={panCard}
            onChange={(e) => setPanCard(e.target.value)}
            placeholder="Pan Card Number"
            style={{ marginTop: "2px" }}
          />   
        </div>  
        <div className="form-group">
          <div className="input-box">
          <label className="input-label">Date of Birth</label>
            <input
              type="text"
              className="form-input"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <p className="hint">Please enter your date of birth as per your PAN CARD</p>
        </div>

        <div className="form-group">
  
          <div className="input-box">
            <label className="input-label">Full Name as per Pan Card</label>
            <input
              type="text"
              className="form-input"
              value={personalEmail}
              onChange={(e) => setPersonalEmail(e.target.value)}
            />
          </div>
          
        </div>
  
        <div className="form-group1">
          <div className="input-box1">
            <label className="input-label">Marital Status</label>
            <input
              type="text"
              className="form-input"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              placeholder="Selected organization will appear here"
              style={{ marginTop: "2px" }}
            />
        </div>
        <img src="/assets/icons/arrow_drop_down.png" /> 
        </div>
  
        <div className="form-group">
          <div className="input-box" style={{marginTop:"20px"}}>
          <label className="input-label">Address Line 1</label>
            <input
              type="text"
              className="form-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-box" style={{marginTop:"20px"}}>
          <label className="input-label">Address Line 2</label>
            <input
              type="text"
              className="form-input"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>
        </div>
  
        <div className="form-group1">
          <div className="input-box1">
            <label className="input-label">Pincode</label>
            <input
              type="text"
              className="form-input"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Selected organization will appear here"
              style={{ marginTop: "2px" }}
            />
        </div>
        <img src="/assets/icons/Vector (5).png" alt=" " />   
        </div>
  
        <div className="address-hint">
        <div className="city">
         City
        </div>
        <div className="state">
          State
        </div>
        </div>
        <div className="checkbox-section">
            <input type="checkbox" id="agree" required />
            <label htmlFor="agree">
              I hereby authorize Aditya Birla Capital Limited to collect, store, verify my 
              credit bureau report and KYC details (from CERSAI / Digilocker), and contact me
             through SMS/Whatsapp/call with reference to my loan application.
            </label>
          </div>

          <div className="checkbox-section">
            <input type="checkbox" id="agree1" required />
            <label htmlFor="agree1">
              I understand and agree that Lenders doesn't grant any microfinance 
              loans and further, I hereby confirm that my annual household Income is more
              than 3 Lakh.
            </label>
          </div>

          <p className="note"> *Annual household income refers to the yearly income of the entire household</p>
  
        <button type="submit" className="offer-btn">
        <span> Proceed </span><img src="/assets/img/cta_arrow_new.png " alt="" height={16} width={21} />
        </button>

    </div>
    </div>
  );
};

export default PersonalDetails;
