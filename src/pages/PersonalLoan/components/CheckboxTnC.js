import React, {useState} from 'react';

const CheckboxTnC = ({checked, handleChange}) => {
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckChanged = () => {
        setIsChecked(prev => !prev);
    }

    return (
        <div className="checkbox mb-3 pull-left">
            <label className="tnc">
                <input
                    onChange={handleChange ? handleChange: handleCheckChanged}
                    checked={checked}
                    className="form-check-input"
                    type="checkbox"
                    name="is_consent"
                    value="Yes"
                    style={{ fontSize: "14px", marginRight: "4px" }}
                />
                I have read and agreed to the{" "}
                <a href="https://digitmoney.in/terms" style={{ color: "#000", fontSize: "10px" }}>
                    <b>Terms of Use</b>
                </a>{" "}
                and hereby give my consent to DigitMoney and its{" "}
                <a href="https://digitmoney.in/lenders" style={{ color: "#000", fontSize: "10px" }}>
                    <b>Lending Partners</b>
                </a>{" "}
                receive my credit information from credit bureaus. By submitting my details | override my NDNO registration & give consent to DigitMoney and its{" "}
                <a href="https://digitmoney.in/lenders" style={{ color: "#000", fontSize: "10px" }}>
                    <b>Lending Partners</b>
                </a>{" "}
                / representatives to contact me through Call, SMS, Email, WhatsApp, or any other mode. You also authorize us to send you new promotional offers of financial & non-financial products or services from time to time.
            </label>
        </div>
    );
};

export default CheckboxTnC;
