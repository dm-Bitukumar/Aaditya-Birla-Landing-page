import React, {useState} from 'react';
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import FormInput from "../../../components/Form/FormInput";
import FormSelect from "../../../components/Form/FormSelect";
import FormButton from "../../../components/Buttons/FormButton";
import _ from "lodash";
import dayjs from "dayjs";
import {company_type_options, company_age_options, typeOfBusinessOptions, gstOptions, turnoverOptions, categoryOptions} from "../../../constants/formData";
import SalariedForm from "./SalariedForm";
import SelfEmployedForm from "./SelfEmployedForm";

const WorkDetailsForm = ({profession, nextStep, previousStep}) => {
    const [data, setData] = useState({
        company_name: '',
        company_type: '',
        monthly_income: '',
        salary_mode: '',

        company_age: '',
        TypeOfBusiness: '',
        company_type2: '',
        turnover: '',
        gst: '',
        category: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState('');

    const handleDataChange = (key, value) => {
        setErrors('');
        setData(prevData => ({ ...prevData, [key]: value }));
    };

    const handleValidate = () => {
        let isValid = true;
        setErrors('');
        const emailRegex = new RegExp(/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/);

        const { gender, name, dob, email, pincode, profession } = data;

        if (_.isEmpty(gender)) {
            isValid = false;
            setErrors('gender');
            setErrorMessage('Please select your gender');
        } else if (_.isEmpty(name)) {
            isValid = false;
            setErrors('name');
            setErrorMessage('Please enter your name');
        } else if (_.isEmpty(dob)) {
            isValid = false;
            setErrors('dob');
            setErrorMessage('Please enter your DOB');
        } else if (!dayjs(dob).isValid()) {
            isValid = false;
            setErrors('dob');
            setErrorMessage('Please enter valid DOB');
        } else if (_.isEmpty(email)) {
            isValid = false;
            setErrors('email');
            setErrorMessage('Please enter your email');
        } else if (!emailRegex.test(email)) {
            isValid = false;
            setErrors('email');
            setErrorMessage('Please enter valid email');
        } else if (_.isEmpty(pincode)) {
            isValid = false;
            setErrors('pincode');
            setErrorMessage('Please enter your pincode');
        } else if (pincode.length !== 6) {
            isValid = false;
            setErrors('pincode');
            setErrorMessage('Please enter valid Indian pincode');
        } else if (_.isEmpty(profession)) {
            isValid = false;
            setErrors('profession');
            setErrorMessage('Please select your profession');
        }

        return isValid;
    };

    const handleSubmit = () => {
        const isValid = handleValidate();
        if (isValid) {
            // Proceed with form submission
            console.log("Form data:", data);
        }
    };

    const handleBack = () => {
        previousStep();
    }

    const renderForm = () => {
        switch (profession) {
            case 'Salaried':
                return (
                    <SalariedForm
                        data={data}
                        errors={errors}
                        errorMessage={errorMessage}
                        handleDataChange={handleDataChange}
                    />
                )
            default:
                return (
                    <SelfEmployedForm
                        data={data}
                        errors={errors}
                        errorMessage={errorMessage}
                        handleDataChange={handleDataChange}
                    />
                )
        }
    }

    return (
        <div className={'form-signin-apply form-signin'}>
            <HeadBar/>
            <Stepper steps={['Personal Details', 'Work Details', 'Offer Page']} currentStep={1}/>
            {renderForm()}
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
    );
};

export default WorkDetailsForm;
