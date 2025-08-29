import React, { useState } from "react";
import "./EmploymentForm.css";
import Header from "../../Components/Header/Header";

const EmploymentForm = () => {
  const [employmentType, setEmploymentType] = useState("Self-Employed");
  const [income, setIncome] = useState("₹ 2,60,600");
  const [organization, setOrganization] = useState("ABCD India Pvt. Ltd.");
  const [email, setEmail] = useState("Alexander.Graham@abcdindia.com");
  const [address, setAddress] = useState("Aakruti Star Compound..");
  const [officeNumber, setOfficeNumber] = useState("+1416-1420, Akruti Star");
  const [pincode, setPincode] = useState("600 086");

  return (
    <div className="main">
      <Header />
      <div className="employment-container">
        <div className="empolyement-heading">
          <div className="line"></div>
          <div className="professional-heading">Professional information</div>
          <div className="line"></div>
        </div>

        <h3 className="section-title">Employment Type</h3>
  
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="employment"
              value="Salaried"
              checked={employmentType === "Salaried"}
              onChange={(e) => setEmploymentType(e.target.value)}
            />
            <span>Salaried</span>
          </label>
          <label>
            <input
              type="radio"
              name="employment"
              value="Self-Employed"
              checked={employmentType === "Self-Employed"}
              onChange={(e) => setEmploymentType(e.target.value)}
            />
            <span>Self-Employed</span>
          </label>
        </div>
  
        <div className="form-group">
  
          <div className="input-box">
              <label className="input-label">Monthly Income</label>
          <input
            type="text"
            className="form-input"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          </div>
          <p className="hint">
            Enter your net salary from the provided ranges. Net salary excludes
            taxes, bonuses, benefits, and other side income.
          </p>
        </div>
        <div className="form-group1">
          <div className="input-box1" height={45}>
            <label className="input-label">Organization Name</label>
            <input
              type="text"
              className="form-input"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Selected organization will appear here"
              style={{ marginTop: "2px" }}
            />
        </div>
        <select
          className="form-input1"
          defaultValue=""
          onChange={(e) => setOrganization(e.target.value)}
        >
          <option value="" disabled>
            -- Select Organization --
          </option>
          <option value="ABCD India Pvt. Ltd.">ABCD India Pvt. Ltd.</option>
          <option value="XYZ Corp Ltd.">XYZ Corp Ltd.</option>
          <option value="Infosys Technologies">Infosys Technologies</option>
          <option value="Wipro Ltd.">Wipro Ltd.</option>
          <option value="Others">Others</option>
        </select>    
        </div>
        <p className="hint">  * Please select Others, if company is not listed  </p>
  
        <div className="form-group">
          <div className="input-box" style={{marginTop:"20px"}}>
          <label className="input-label">Official Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
  
        <div className="form-group1">
          <div className="input-box1">
            <label className="input-label">Office Address</label>
            <input
              type="text"
              className="form-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Selected organization will appear here"
              style={{ marginTop: "2px" }}
            />
        </div>
        <img src="/assets/icons/Group 324.png" /> 
        </div>
  
        <div className="form-group">
          <div className="input-box" style={{marginTop:"20px"}}>
          <label className="input-label">Office Number and Building Name </label>
            <input
              type="email"
              className="form-input"
              value={officeNumber}
              onChange={(e) => setOfficeNumber(e.target.value)}
            />
          </div>
        </div>
  
        <div className="form-group1">
          <div className="input-box1">
            <label className="input-label">Office Pincode</label>
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
  
        <button type="submit" className="offer-btn">
        <span> Proceed </span><img src="/assets/img/cta_arrow_new.png " alt="" height={16} width={21} />
        </button>
      
      </div>
    </div>
  );
};

export default EmploymentForm;
