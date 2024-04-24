import React, { useState } from "react";
import { Link } from "react-router-dom";

const CheckboxTnC = ({ checked, handleChange }) => {
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckChanged = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="checkbox mb-3 pull-left">
      <label className="tnc">
        <input
          onChange={handleChange ? handleChange : handleCheckChanged}
          checked={checked}
          className="form-check-input"
          type="checkbox"
          name="is_consent"
          value="Yes"
          style={{ fontSize: "10px", marginRight: "4px" }}
        />
        I have read and agreed to the{" "}
        <Link to="/terms" style={{ color: "#000", fontSize: "10px" }}>
          <b>Terms of Use</b>
        </Link>{" "}
        and hereby give my consent to DigitMoney and its{" "}
        <Link to="/lenders" style={{ color: "#000", fontSize: "10px" }}>
          <b>Lending Partners</b>
        </Link>{" "}
        receive my credit information from credit bureaus. By submitting my
        details | override my NDNO registration & give consent to DigitMoney and
        its{" "}
        <Link to="/lenders" style={{ color: "#000", fontSize: "10px" }}>
          <b>Lending Partners</b>
        </Link>{" "}
        / representatives to contact me through Call, SMS, Email, WhatsApp, or
        any other mode. You also authorize us to send you new promotional offers
        of financial & non-financial products or services from time to time.
      </label>
    </div>
  );
};

export default CheckboxTnC;
