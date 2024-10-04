import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setUserClickData } from "../../../utility/setUserClickData";

const CheckboxTnC = ({ checked, handleChange }) => {
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckChanged = () => {
    setUserClickData({
      event_name: "check-tick-personal-form-loan",
    });
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="mb-3 checkbox pull-left">
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
        <Link
          to="/terms"
          style={{
            color: "#111",
            fontWeight: "600",
            fontSize: "10px",
            textDecoration: "underline",
            textDecorationColor: "grey",
          }}
          onClick={() => {
            setUserClickData({
              event_name: "link-to-terms-page",
            });
          }}
        >
          Terms of Use
        </Link>{" "}
        and hereby give my consent to DigitMoney and its{" "}
        {/* <Link
          to="/lenders"
          style={{ color: "#000", fontSize: "10px" }}
          onClick={() => {
            setUserClickData({
              event_name: "link-to-lenders-page",
            });
          }}
        > */}
        Lending Partners
        {/* </Link> */}
        receive my credit information from credit bureaus. By submitting my
        details | override my NDNO registration & give consent to DigitMoney and
        its{" "}
        {/* <Link
          to="/lenders"
          style={{ color: "#000", fontSize: "10px" }}
          onClick={() => {
            setUserClickData({
              event_name: "link-to-lenders-page",
            });
          }}
        > */}
        Lending Partners
        {/* </Link> */} / representatives to contact me through Call, SMS,
        Email, WhatsApp, or any other mode. You also authorize us to send you
        new promotional offers of financial & non-financial products or services
        from time to time.
      </label>
    </div>
  );
};

export default CheckboxTnC;
