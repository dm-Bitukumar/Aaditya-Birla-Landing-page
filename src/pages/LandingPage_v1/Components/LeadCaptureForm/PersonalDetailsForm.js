import React, { useEffect, useState } from "react";
import "./PersonalDetailsForm.css";
import FormInputStyle2 from "../../../../components/Form/FormInputStyle2";
import FormSelectStyle2 from "../../../../components/Form/FormSelectStyle2";
import FormButtonStyle2 from "../../../../components/Form/FormButtonStyle2";
import moment from "moment";

const PersonalDetailsForm = ({ formData, setFormData, setCurrentStep }) => {
  const [gender, setGender] = useState("");
  const [name, setName] = useState(formData.fullname || "");
  const [dob, setDob] = useState(formData.dob || "");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [professionType, setprofessionType] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!gender) newErrors.gender = true;
    if (!name.trim()) newErrors.name = true;
    if (!dob.trim()) newErrors.dob = true;
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = true;
    if (!pincode.match(/^\d{6}$/)) newErrors.pincode = true;
    if (!professionType) newErrors.professionType = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  console.log("Personal formData:", formData);
  const handleContinue = () => {
    if (!validate()) return;
    setFormData((prev) => ({
      ...prev,
      gender,
      fullname: name,
      dob: moment(dob, "DD/MM/YYYY").format("YYYY-MM-DD"),
      email,
      pincode,
      professionType,
    }));
    setCurrentStep(4);
  };

  useEffect(() => {
    if (formData) {
      setGender(formData.gender || "");
      setName(formData.fullname || "");
      setDob(formData.dob || "");
      setEmail(formData.email || "");
      setPincode(formData.pincode || "");
      setprofessionType(formData.professionType || "");
    }
  }, []);

  return (
    <div className="personal-details-container">
      <h2 className="form-title">Personal information</h2>
      <p className="form-subtitle">
        We will use your contact details to proceed further.
      </p>

      <div className="personal-details-input">
        <div className="gender-toggle">
          <button
            className={`gender-btn ${gender === "Male" ? "active" : ""}`}
            onClick={() => setGender("Male")}
          >
            <div className="gender-content">
              <img
                src={
                  gender === "Male"
                    ? "/assets/img/Male_green.svg"
                    : "/assets/img/Male_black.svg"
                }
                alt="Male Icon"
              />
              <span>Male</span>
            </div>
          </button>
          <button
            className={`gender-btn ${gender === "Female" ? "active" : ""}`}
            onClick={() => setGender("Female")}
          >
            <div className="gender-content">
              <img
                src={
                  gender === "Female"
                    ? "/assets/img/Female_green.svg"
                    : "/assets/img/Female_black.svg"
                }
                alt="Female Icon"
              />
              <span>Female</span>
            </div>
          </button>
        </div>

        <FormInputStyle2
          label="Full Name as per Pan Card"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isValid={!errors.name}
          errorMessage="Name is required"
          disabled
        />
        <FormInputStyle2
          label="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          isValid={!errors.dob}
          errorMessage="DOB is required"
          placeholder="DD MM YYYY"
          disabled
        />
        <FormInputStyle2
          label="Personal Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) {
              setErrors((prev) => ({ ...prev, email: false }));
            }
          }}
          onBlur={() => {
            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
              setErrors((prev) => ({ ...prev, email: true }));
            }
          }}
          isValid={!errors.email}
          errorMessage="Enter a valid email"
        />

        <FormInputStyle2
          label="Home Pin Code"
          value={pincode}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,6}$/.test(value)) {
              setPincode(value);
              if (errors.pincode) {
                setErrors((prev) => ({ ...prev, pincode: false }));
              }
            }
          }}
          onBlur={() => {
            if (!pincode.match(/^\d{6}$/)) {
              setErrors((prev) => ({ ...prev, pincode: true }));
            }
          }}
          isValid={!errors.pincode}
          errorMessage="Enter 6-digit pincode"
          tick={pincode.length === 6}
        />

        <FormSelectStyle2
          label="professionType"
          value={professionType}
          onChange={(val) => {
            setprofessionType(val);
            if (errors.professionType) {
              setErrors((prev) => ({ ...prev, professionType: false }));
            }
          }}
          onBlur={() => {
            if (!professionType) {
              setErrors((prev) => ({ ...prev, professionType: true }));
            }
          }}
          options={[
            { label: "Salaried", value: "Salaried" },
            { label: "Self-Employed", value: "Self-Employed" },
            { label: "Business Owner", value: "business owner" },
          ]}
          isValid={!errors.professionType}
          errorMessage="Please select professionType"
        />
      </div>
      <FormButtonStyle2 text="Continue" onClick={handleContinue} />
    </div>
  );
};

export default PersonalDetailsForm;
