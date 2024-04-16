import React, {useState} from "react";
import _ from "lodash";
import FormButton from "../../../components/Buttons/FormButton";
import OtpInputForm from "../../../components/Form/OtpInputForm";
import {useNavigate} from "react-router";
import GstRegistrationOption from "./GstRegistrationOption";
import FormSelect from "../../../components/Form/FormSelect";
import {business_type_options, company_type_options, turnoverOptions} from "../../../constants/formData";

const ApplyFormStep2 = ({formData, setFormData, nextStep, previousStep, ...props}) => {
    const [errors, setErrors] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [data, setData] = useState({
        gst_available: "",
        gst_no: "",

        company_type: "",
        regd_proof: ""
    })

    const navigate = useNavigate();

    const handleValidation = () => {
        let isValid = true;
        setErrors('');
        const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/

        if(data.gst_available === "") {
            isValid = false;
            setErrors('gst_available');
            setErrorMessage('Please select gst status');
        } else if (data.gst_available === 'yes') {
            const {gst_no} = data;

            if (_.isEmpty(gst_no)) {
                isValid = false;
                setErrors('gst_no');
                setErrorMessage('Please enter GST Number');
            } else if (gstRegex.test(gst_no)) {
                isValid = false;
                setErrors('gst_no');
                setErrorMessage('Please enter valid GST Number');
            }
        } else if (data.gst_available === 'no') {
            const {company_type, regd_proof} = data;

            if (_.isEmpty(company_type)) {
                isValid = false;
                setErrors('company_type');
                setErrorMessage('Please select Company Type');
            } else if (_.isEmpty(regd_proof)) {
                isValid = false;
                setErrors('regd_proof');
                setErrorMessage('Please select a Registration proof');
            }
        }

        return isValid;
    }

    const handleDataChange = (keyName, keyValue) => {
        let update = {...data};
        update[keyName] = keyValue;
        setData(update);
    }

    const handleSubmit = () => {
        if(handleValidation()) {
        }
        // todo submit logic
    }

    const handleBack = () => {
        previousStep();
    }

    return (
        <div className={'personal-loan-form'}>
            <img className="mb-1 my-5 img logo-img" src="/assets/img/logo.png" alt=""/>
            <div className={'d-flex flex-column justify-content-between'}>
                <FormSelect
                    className={'my-3'}
                    options={business_type_options}
                    placeholder="TypeOfBusiness"
                    required
                    id="TypeOfBusiness"
                    value={data.TypeOfBusiness}
                    onChange={(value) => handleDataChange('TypeOfBusiness', value)}
                    errorMessage={errorMessage}
                    isValid={errors !== 'TypeOfBusiness'}
                    icon={<img src="/assets/icons/ctype.png" style={{height: '25px'}}/>}
                    label={'Type Of Business'}
                />
                <FormSelect
                    className={'my-3'}
                    options={turnoverOptions}
                    placeholder="turnover"
                    required
                    id="turnover"
                    value={data.turnover}
                    onChange={(value) => handleDataChange('turnover', value)}
                    errorMessage={errorMessage}
                    isValid={errors !== 'turnover'}
                    icon={<img src="/assets/icons/startup.png" style={{height: '25px'}}/>}
                    label={'Average Monthly Sales'}
                />
                <FormSelect
                    options={company_type_options}
                    placeholder="TypeOfIndustry"
                    required
                    id="TypeOfIndustry"
                    value={data.TypeOfIndustry}
                    onChange={(value) => handleDataChange('TypeOfIndustry', value)}
                    errorMessage={errorMessage}
                    isValid={errors !== 'TypeOfIndustry'}
                    icon={<img src="/assets/icons/toc.png" style={{height: '25px'}}/>}
                    label={'Select Your Industry'}
                />
                <div className={'d-flex gap-3'}>
                    <FormButton
                        type={'secondary'}
                        onClick={handleBack}
                    >
                        Back
                    </FormButton>
                    <FormButton
                        onClick={handleSubmit}
                    >
                        Continue
                    </FormButton>
                </div>
            </div>

        </div>
    )
}

export default ApplyFormStep2
