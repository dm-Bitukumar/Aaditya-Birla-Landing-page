import {useState} from "react";
import _ from "lodash";
import CheckboxTnC from "./CheckboxTnC";
import FormButton from "../../../components/Buttons/FormButton";
import FormInput from "../../../components/Form/FormInput";
import OtpInputForm from "../../../components/Form/OtpInputForm";
import {useNavigate} from "react-router";

const Form = ({formData, setFormData, ...props}) => {
    const [otp, setOtp] = useState("");
    const [isOtpGenerated, setIsOtpGenerated] = useState(false);
    const [isTncChecked, setIsTncChecked] = useState(true);
    const [mobile, setMobile] = useState('');
    const [pancard, setPancard] = useState('');
    const [isPancardValid, setIsPancardValid] = useState(true);
    const [isMobileValid, setIsMobileValid] = useState(true);

    const navigate = useNavigate();

    const handleValidation = () => {
        let isValid = true;

        if (_.isEmpty(pancard)) {
            isValid = false;
            setIsPancardValid(false);
        } else {
            const isValidPancard = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pancard);
            isValid = isValidPancard;
            setIsPancardValid(isValidPancard);
        }

        if (_.isEmpty(mobile)) {
            isValid = false;
            setIsMobileValid(false);
        } else {
            const isValidMobile = /^\d{10}$/.test(mobile);
            isValid = isValidMobile;
            setIsMobileValid(isValidMobile);
        }

        return isValid;
    }

    const handlePancardChange = (event) => {
        const {value} = event.target;
        setIsPancardValid(true);
        setPancard(value);
    };

    const handleMobileChange = (event) => {
        const {value} = event.target;
        setIsMobileValid(true);
        setMobile(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let isValid = handleValidation();
        if(isValid) {
            setIsOtpGenerated(true);
        }
        // Handle form submission
    };

    const handleChange = () => {
        setIsTncChecked(prev => !prev);
    }

    const handleResendOtp = () => {
        // todo resend login with timer
    }

    const handleSubmitOtp = () => {
        // todo submit logic
        navigate('/apply')
    }

    return (
        <div className={'personal-loan-form'}>
            <img className="mb-1 mt-3 img logo-img" src="/assets/img/logo.png" alt=""/>
            <img className="mb-3 mt-3 img header-img" src="/assets/img/header.png" alt=""/>
            <h1 className="h3 mb-3 fw-normal text-center" style={{fontSize: "20px"}}>Get Instant Personal
                Loan<br/><strong>Upto 25 Lacs</strong></h1>
            <p className="mb-3 text-center" style={{fontSize: "14px"}}>• Instant Approvals • Complete Digital Process
                •<span className="bullet">•</span>Lower Interest Rates</p>
            {
                isOtpGenerated ? (
                    <OtpInputForm
                        otpValue={otp}
                        setOtpValue={setOtp}
                        handleResendOtp={handleResendOtp}
                        phone_number={mobile}
                        handleSubmitOtp={handleSubmitOtp}
                    />
                ) : (
                    <>
                        <h1 className="h3 mb-2 fw-normal" align="left" style={{fontSize: "18px", fontWeight: "bold"}}>Let's
                            connect</h1>
                        <input type="hidden" name="utm_campaign" value=""/>
                        <input type="hidden" name="utm_source" value=""/>
                        <input type="hidden" name="utm_medium" value=""/>
                        <input type="hidden" name="utm_content" value=""/>
                        <input type="hidden" name="click_id" value=""/>
                        <input type="hidden" name="aff_id" value=""/>
                        <input type="hidden" name="src" value=""/>
                        <FormInput
                            icon={<img
                                src="/assets/icons/pancard.png"
                                height="25"
                                style={{maxHeight: "25px"}}
                                alt="PAN Card Icon"
                            />}
                            type="text"
                            name="pancard"
                            isValid={isPancardValid}
                            id="pancard"
                            aria-describedby="name"
                            placeholder="PAN Card"
                            minLength="10"
                            maxLength="10"
                            pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
                            title="Please enter a valid PAN number. E.g. AAAAA9999A"
                            value={pancard}
                            onChange={handlePancardChange}
                            required
                            style={{textTransform: "uppercase"}}
                            label={'Pancard'}
                            errorMessage={'Please enter a valid PAN number'}
                        />
                        <FormInput
                            icon={<img src="/assets/icons/phone-call.png" height="25" alt="Phone Icon"/>}
                            type="number"
                            name="mobile"
                            isValid={isMobileValid}
                            id="mobile"
                            aria-describedby="name"
                            placeholder="Mobile"
                            minLength="10"
                            maxLength="10"
                            pattern="[0-9]{10}"
                            value={mobile}
                            onChange={handleMobileChange}
                            required
                            label={'Mobile Number'}
                            errorMessage={'Please enter a valid Mobile Number'}
                        />
                        <CheckboxTnC
                            checked={isTncChecked}
                            handleChange={handleChange}
                        />
                        <FormButton
                            style={{marginTop: "30px"}}
                            className="w-100 btn btn-lg btn-primary btn-get-otp"
                            type="submit"
                            onClick={handleSubmit}
                            id="myBtn"
                        >
                            GET OTP
                        </FormButton>
                    </>
                )
            }
        </div>
    )
}

export default Form
