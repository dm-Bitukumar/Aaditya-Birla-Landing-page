import React, {useState} from 'react';
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import FormButton from "../../../components/Buttons/FormButton";
import _ from "lodash";
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
        gst_no: '',
        regd_proof: [],
        category: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState('');

    const handleDataChange = (key, value) => {
        setErrors('');
        setData(prevData => ({...prevData, [key]: value}));
    };

    const handleValidate = () => {
        let isValid = true;
        setErrors('');
        const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/

        if (profession === 'Salaried') {
            const {company_name, company_type, monthly_income, salary_mode} = data;

            if (_.isEmpty(company_name)) {
                isValid = false;
                setErrors('company_name');
                setErrorMessage('Please enter Company Name');
            } else if (_.isEmpty(company_type)) {
                isValid = false;
                setErrors('company_type');
                setErrorMessage('Please enter Company Type');
            } else if (_.isEmpty(monthly_income)) {
                isValid = false;
                setErrors('monthly_income');
                setErrorMessage('Please enter your Monthly Income');
            } else if (_.isEmpty(salary_mode)) {
                isValid = false;
                setErrors('salary_mode');
                setErrorMessage('Please select a Salary Mode');
            }
        } else {
            const {
                company_name,
                company_age,
                TypeOfBusiness,
                company_type2,
                turnover,
                gst,
                category,
                gst_no,
                regd_proof
            } = data;

            if (_.isEmpty(company_name)) {
                isValid = false;
                setErrors('company_name');
                setErrorMessage('Please enter Company Name');
            } else if (_.isEmpty(company_age)) {
                isValid = false;
                setErrors('company_age');
                setErrorMessage('Please select Company Age');
            } else if (_.isEmpty(TypeOfBusiness)) {
                isValid = false;
                setErrors('TypeOfBusiness');
                setErrorMessage('Please select Business Type');
            } else if (_.isEmpty(company_type2)) {
                isValid = false;
                setErrors('company_type2');
                setErrorMessage('Please select Company Type');
            } else if (_.isEmpty(turnover)) {
                isValid = false;
                setErrors('turnover');
                setErrorMessage('Please enter Average Monthly Sales');
            } else if (_.isEmpty(gst)) {
                isValid = false;
                setErrors('gst');
                setErrorMessage('Please select GST availability');
            } else if (gst === 'Yes') {
                if (_.isEmpty(gst_no)) {
                    isValid = false;
                    setErrors('gst_no');
                    setErrorMessage('Please enter GST Number');
                } else if (!gstRegex.test(gst_no)) {
                    isValid = false;
                    setErrors('gst_no');
                    setErrorMessage('Please enter valid GST Number');
                } else if (_.isEmpty(category)) {
                    isValid = false;
                    setErrors('category');
                    setErrorMessage('Please select a Category');
                }
            } else if (gst === 'No') {
                if (_.isEmpty(regd_proof)) {
                    isValid = false;
                    setErrors('regd_proof');
                    setErrorMessage('Please select a Registration Proof');
                } else if (_.isEmpty(category)) {
                    isValid = false;
                    setErrors('category');
                    setErrorMessage('Please select a Category');
                }
            }
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
            <div className={'d-flex gap-3'} style={profession === 'Salaried' ? {position:  'absolute', bottom: "10px"} : {}}>
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
