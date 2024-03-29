import FormButton from "../Buttons/FormButton";
import OTPInput from "react-otp-input";
import _ from "lodash";
import {useState} from "react";

const OtpInputForm = ({otpValue, setOtpValue, phone_number, handleResendOtp, handleSubmitOtp}) => {
    const [isOtpValid, setIsOtpValid] = useState(true);

    const handleSubmit = () => {
        if(otpValue.length === 4) {
            handleSubmitOtp();
        } else {
            setIsOtpValid(false);
        }
    }

    const handleChange = (value) => {
        setIsOtpValid(true);
        setOtpValue(value);
    }

    return (
        <div>
            <h1 className="h3 mb-2 fw-normal" align="left" style={{fontSize: "18px !important", fontWeight: "lighter"}}>Mobile Verification</h1>
            <p className="mb-2 fw-normal" style={{textAlign: "left", fontSize: "12px"}}>
                A One Time Password (OTP) has been sent to your
                mobile number
                <span className="text-decoration-underline"><u><span id="mobileno">{phone_number ? " " + phone_number : ""}</span></u></span>
                <br />
                    Please enter the OTP below
            </p>
            <div className={'my-3'}>
                <OTPInput
                    value={otpValue}
                    onChange={handleChange}
                    numInputs={4}
                    containerStyle={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        justifyItems: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                    }}
                    inputStyle={{
                        display: "block",
                        width: "100%",
                        padding: ".375rem .75rem",
                        fontSize: "1rem",
                        fontWeight: "400",
                        lineHeight: 1.5,
                        color: "#212529",
                        backgroundColor: "#fff",
                        backgroundClip: "padding-box",
                        border: "1px solid #ced4da",
                        appearance: "none",
                        borderRadius: ".25rem",
                        transition: "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                    }}
                    placeholder={'----'}
                    renderInput={(props) => <input {...props} />}
                />
            </div>
            {
                !isOtpValid && <div id="otperror" className="text-danger text-center">Incorrect OTP. Please enter valid otp.</div>
            }
            <div className="checkbox mb-3 pull-left" style={{paddingTop: "5px", paddingBottom: "45px"}}>
                <p style={{fontSize: "12px"}}>Don't receive the OTP? Click here to <a className={'text-blue-700'} href="#" onClick={handleResendOtp}>Regenerate OTP</a></p>
            </div>
            <FormButton
                onClick={handleSubmit}
                id="myBtn"
            >
                Verify
            </FormButton>
        </div>
    )
}

export default OtpInputForm
