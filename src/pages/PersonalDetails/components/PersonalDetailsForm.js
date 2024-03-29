import React, { useState } from 'react';
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import CustomCheckboxGroup from "./CustomCheckboxGroup";
import FormInput from "../../../components/Form/FormInput";
import FormDob from "../../../components/Form/FormDob";
import FormSelect from "../../../components/Form/FormSelect";
import FormButton from "../../../components/Buttons/FormButton";
import _ from "lodash";
import dayjs from "dayjs";
import {next} from "lodash/seq";

const profession_options = [
    { label: 'Salaried', value: 'Salaried' },
    { label: 'Self Employed', value: 'self employed' },
    { label: 'Business Owner', value: 'business owner' },
];

const PersonalDetailsForm = ({updateStep, updateData, nextStep}) => {
    const [data, setData] = useState({
        gender: '',
        name: '',
        dob: '',
        email: '',
        pincode: '',
        profession: ''
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
            nextStep();
            updateData(data)
        }
    };

    return (
        <div className={'form-signin-apply form-signin'}>
            <HeadBar/>
            <Stepper steps={['Personal Details', 'Work Details', 'Offer Page']} currentStep={0}/>
            <CustomCheckboxGroup
                isValid={errors !== 'gender'}
                errorMessage={errorMessage}
                activeGender={data.gender}
                setActiveGender={(value) => handleDataChange('gender', value)}
            />
            <FormInput
                placeholder="Name"
                required
                id="name"
                value={data.name}
                onChange={(e) => handleDataChange('name', e.target.value)}
                errorMessage={errorMessage}
                isValid={errors !== 'name'}
                icon={<img src="/assets/icons/male.png" style={{height: '25px'}}/>}
                label={'Full Name'}
            />
            <FormDob
                placeholder="dob"
                required
                id="dob"
                value={data.dob}
                onChange={(dob) => handleDataChange('dob', dob)}
                errorMessage={errorMessage}
                isValid={errors !== 'dob'}
                icon={<img src="/assets/icons/dob.png" style={{height: '25px'}}/>}
                label={'Date Of Birth (DD | MM | YYYY)'}
            />
            <FormInput
                type={'email'}
                placeholder="email"
                required
                id="email"
                value={data.email}
                onChange={(e) => handleDataChange('email', e.target.value)}
                errorMessage={errorMessage}
                isValid={errors !== 'email'}
                icon={<img src="/assets/icons/email.png" style={{height: '25px'}}/>}
                label={'Email'}
            />
            <FormInput
                type={'number'}
                placeholder="pincode"
                required
                id="pincode"
                value={data.pincode}
                onChange={(e) => handleDataChange('pincode', e.target.value)}
                errorMessage={errorMessage}
                isValid={errors !== 'pincode'}
                icon={<img src="/assets/icons/pincode.png" style={{height: '25px'}}/>}
                label={'Pincode'}
            />
            <FormSelect
                options={profession_options}
                placeholder="profession"
                required
                id="profession"
                value={data.profession}
                onChange={(value) => handleDataChange('profession', value)}
                errorMessage={errorMessage}
                isValid={errors !== 'profession'}
                icon={<img src="/assets/icons/profession.png" style={{height: '25px'}}/>}
                label={'Profession'}
            />
            <FormButton
                style={{marginTop: '150px'}}
                onClick={handleSubmit}
            >
                Continue
            </FormButton>
        </div>
    );
};

export default PersonalDetailsForm;
