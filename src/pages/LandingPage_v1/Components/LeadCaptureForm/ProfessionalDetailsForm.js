import React, { useEffect, useState } from "react";
import "./ProfessionalDetailsForm.css";
import FormInputStyle2 from "../../../../components/Form/FormInputStyle2";
import FormSelectStyle2 from "../../../../components/Form/FormSelectStyle2";
import FormButtonStyle2 from "../../../../components/Form/FormButtonStyle2";
import { setUserClickData } from "../../../../utility/setUserClickData";

const ProfessionalDetailsForm = ({ formData, setFormData, setCurrentStep }) => {
  const [companyName, setCompanyName] = useState(formData.companyName || "");
  const [companyType, setCompanyType] = useState(formData.companyType || "");
  const [workEmail, setWorkEmail] = useState(formData.workEmail || "");
  const [monthlyIncome, setMonthlyIncome] = useState(
    formData.monthlyIncome || ""
  );
  const [work_pincode, setwork_pincode] = useState(formData.work_pincode || "");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!companyName.trim()) newErrors.companyName = true;
    if (!companyType) newErrors.companyType = true;
    if (!workEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.workEmail = true;
    if (!monthlyIncome.match(/^[\d,]+$/)) newErrors.monthlyIncome = true;
    if (!work_pincode.match(/^\d{6}$/)) newErrors.work_pincode = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  console.log("Professional formData:", formData);

  const handleContinue = () => {
    if (!validate()) return;
    const plainMonthlyIncome = monthlyIncome.replace(/,/g, "");
    const updated = {
      companyName,
      companyType,
      workEmail,
      monthlyIncome: plainMonthlyIncome,
      work_pincode,
      stepDone: 3,
    };

    setFormData((prev) => ({
      ...prev,
      ...updated,
    }));

    console.log("Form Data after Professional Info:", {
      ...formData,
      ...updated,
    });

    setUserClickData({
      event_name: "professional-details-submit-for-pl-pan",
      user_id: formData.mobile || "No User ID found here",
    });
    setCurrentStep(5);
  };

  useEffect(() => {
    if (formData) {
      setCompanyName(formData.companyName || "");
      setCompanyType(formData.companyType || "");
      setWorkEmail(formData.workEmail || "");
      setMonthlyIncome(formData.monthlyIncome || "");
      setwork_pincode(formData.work_pincode || "");
    }
  }, []);

  return (
    <div className="personal-details-container">
      <h2 className="form-title">Professional information</h2>
      <p className="form-subtitle">
        You're just a few steps away from your ideal loan!
      </p>
      <div className="professional-details-input">
        <FormInputStyle2
          label="Company Name"
          value={companyName}
          id="companyName"
          onChange={(e) => {
            setCompanyName(e.target.value);
            if (errors.companyName)
              setErrors((prev) => ({ ...prev, companyName: false }));
          }}
          onBlur={() => {
            if (!companyName.trim())
              setErrors((prev) => ({ ...prev, companyName: true }));
          }}
          isValid={!errors.companyName}
          errorMessage="Company name is required"
        />

        <FormSelectStyle2
          label="Company Type"
          value={companyType}
          id="companyType"
          onChange={(val) => {
            setCompanyType(val);
            if (errors.companyType)
              setErrors((prev) => ({ ...prev, companyType: false }));
          }}
          onBlur={() => {
            if (!companyType)
              setErrors((prev) => ({ ...prev, companyType: true }));
          }}
          options={[
            { label: "Private Limited", value: "Private Limited" },
            { label: "Public Limited", value: "Public Limited" },
            {
              label: "Limited liability partnership (LLP)",
              value: "Limited liability partnership (LLP)",
            },
            { label: "Partnership", value: "Partnership" },
            { label: "Proprietorship", value: "Proprietorship" },
            { label: "Government", value: "Government" },
            { label: "One Person Company", value: "One Person Company" },
          ]}
          isValid={!errors.companyType}
          errorMessage="Please select company type"
        />

        <FormInputStyle2
          label="Work Email Address"
          value={workEmail}
          id="workEmail"
          onChange={(e) => {
            setWorkEmail(e.target.value);
            if (errors.workEmail)
              setErrors((prev) => ({ ...prev, workEmail: false }));
          }}
          onBlur={() => {
            if (!workEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
              setErrors((prev) => ({ ...prev, workEmail: true }));
            }
          }}
          isValid={!errors.workEmail}
          errorMessage="Enter a valid work email"
        />

        <FormInputStyle2
          label="Monthly Income"
          value={monthlyIncome}
          id="monthlyIncome"
          onChange={(e) => {
            let raw = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(raw)) {
              const formatted = Number(raw).toLocaleString("en-IN");
              setMonthlyIncome(formatted);
              if (errors.monthlyIncome) {
                setErrors((prev) => ({ ...prev, monthlyIncome: false }));
              }
            }
          }}
          onBlur={() => {
            const raw = monthlyIncome.replace(/,/g, "");
            if (!raw.match(/^\d+$/)) {
              setErrors((prev) => ({ ...prev, monthlyIncome: true }));
            }
          }}
          isValid={!errors.monthlyIncome}
          errorMessage="Enter valid income"
        />

        <FormInputStyle2
          label="Work Pin Code"
          value={work_pincode}
          id="work_pincode"
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,6}$/.test(value)) {
              setwork_pincode(value);
              if (errors.work_pincode) {
                setErrors((prev) => ({ ...prev, work_pincode: false }));
              }
            }
          }}
          onBlur={() => {
            if (!work_pincode.match(/^\d{6}$/)) {
              setErrors((prev) => ({ ...prev, work_pincode: true }));
            }
          }}
          isValid={!errors.work_pincode}
          errorMessage="Enter 6-digit pincode"
          tick={work_pincode.length === 6}
        />
      </div>
      <FormButtonStyle2 text="Get My Offers" onClick={handleContinue} />
    </div>
  );
};

export const getProfessionalFormData = () => {
  const data = {
    companyName: document.getElementById("companyName")?.value || "",
    companyType: document.getElementById("companyType")?.value || "",
    workEmail: document.getElementById("workEmail")?.value || "",
    monthlyIncome: document.getElementById("monthlyIncome")?.value || "",
    work_pincode: document.getElementById("work_pincode")?.value || "",
  };
  console.log("🔄 Collected Professional Form Data on Back:", data);
  return data;
};

export default ProfessionalDetailsForm;
