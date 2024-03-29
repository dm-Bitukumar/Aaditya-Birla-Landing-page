import React, {useState} from 'react';
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import FormInput from "../../../components/Form/FormInput";
import FormSelect from "../../../components/Form/FormSelect";
import FormButton from "../../../components/Buttons/FormButton";
import _ from "lodash";
import dayjs from "dayjs";
import {company_type_options, company_age_options, typeOfBusinessOptions, gstOptions, turnoverOptions, categoryOptions} from "../../../constants/formData";

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
                    <>
                        <FormInput
                            placeholder="Company Name"
                            required
                            id="company_name"
                            value={data.company_name}
                            onChange={(e) => handleDataChange('company_name', e.target.value)}
                            errorMessage={errorMessage}
                            isValid={errors !== 'company_name'}
                            icon={<img src="/assets/icons/cname.png" style={{height: '25px'}}/>}
                            label={'Company Name'}
                        />
                        <FormSelect
                            options={company_type_options}
                            placeholder="company_type"
                            required
                            id="company_type"
                            value={data.company_type}
                            onChange={(value) => handleDataChange('company_type', value)}
                            errorMessage={errorMessage}
                            isValid={errors !== 'company_type'}
                            icon={<img src="/assets/icons/toc.png" style={{height: '25px'}}/>}
                            label={'Company Type'}
                        />
                        <FormInput
                            type={'number'}
                            placeholder="monthly_income"
                            required
                            id="monthly_income"
                            value={data.monthly_income}
                            onChange={(e) => handleDataChange('monthly_income', e.target.value)}
                            errorMessage={errorMessage}
                            isValid={errors !== 'monthly_income'}
                            icon={<img src="/assets/icons/income.png" style={{height: '25px'}}/>}
                            label={'Monthly Income'}
                        />
                    </>
                )
            default:
                return (
                    <>
                        <FormInput
                            placeholder="Company Name"
                            required
                            id="company_name"
                            value={data.company_name}
                            onChange={(e) => handleDataChange('company_name', e.target.value)}
                            errorMessage={errorMessage}
                            isValid={errors !== 'company_name'}
                            icon={<img src="/assets/icons/cname.png" style={{height: '25px'}}/>}
                            label={'Company Name'}
                        />
                        <FormSelect
                            options={company_age_options}
                            placeholder="company_age"
                            required
                            id="company_age"
                            value={data.company_age}
                            onChange={(value) => handleDataChange('company_age', value)}
                            errorMessage={errorMessage}
                            isValid={errors !== 'company_age'}
                            icon={<img src="/assets/icons/startup.png" style={{height: '25px'}}/>}
                            label={'How long have you been in this business?'}
                        />
                        <FormSelect
                            options={typeOfBusinessOptions}
                            placeholder="TypeOfBusiness"
                            required
                            id="TypeOfBusiness"
                            value={data.TypeOfBusiness}
                            onChange={(value) => handleDataChange('TypeOfBusiness', value)}
                            errorMessage={errorMessage}
                            isValid={errors !== 'TypeOfBusiness'}
                            icon={<img src="/assets/icons/tob.png" style={{height: '25px'}}/>}
                            label={'Type of Business'}
                        />
                        <FormSelect
                            options={company_type_options}
                            placeholder="company_type2"
                            required
                            id="company_type2"
                            value={data.company_type2}
                            onChange={(value) => handleDataChange('company_type2', value)}
                            errorMessage={errorMessage}
                            isValid={errors !== 'company_type2'}
                            icon={<img src="/assets/icons/toc.png" style={{height: '25px'}}/>}
                            label={'Company Type'}
                        />
                        <FormSelect
                            options={turnoverOptions}
                            placeholder="turnover"
                            required
                            id="turnover"
                            value={data.turnover}
                            onChange={(value) => handleDataChange('turnover', value)}
                            errorMessage={errorMessage}
                            isValid={errors !== 'turnover'}
                            icon={<img src="/assets/icons/turnover.png" style={{height: '25px'}}/>}
                            label={'Average Monthly Sales'}
                        />
                        <FormSelect
                            options={gstOptions}
                            placeholder="gst"
                            required
                            id="gst"
                            value={data.gst}
                            onChange={(value) => handleDataChange('gst', value)}
                            errorMessage={errorMessage}
                            isValid={errors !== 'gst'}
                            icon={<img src="/assets/icons/gst.png" style={{height: '25px'}}/>}
                            label={'Do you have GST Certificate?'}
                        />
                        <FormSelect
                            options={categoryOptions}
                            placeholder="category"
                            required
                            id="category"
                            value={data.category}
                            onChange={(value) => handleDataChange('category', value)}
                            errorMessage={errorMessage}
                            isValid={errors !== 'category'}
                            icon={<img src="/assets/icons/category.png" style={{height: '25px'}}/>}
                            label={'Category'}
                        />
                    </>
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
