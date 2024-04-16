import FormInput from "../../../components/Form/FormInput";
import FormSelect from "../../../components/Form/FormSelect";
import {
    categoryOptions,
    company_age_options,
    company_type_options, companyTypeOptionsMap, gstOptions,
    turnoverOptions,
    typeOfBusinessOptions
} from "../../../constants/formData";
import FormSearchSelect from "../../../components/Form/FormSearchSelect";
import FormMultiSelect from "../../../components/Form/FormMultiSelect";

const SelfEmployedForm = ({data, errors, errorMessage, handleDataChange}) => {

    const getProofOptions = () => {
        switch (data.company_type2) {

        }
    }

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
            {
                data.gst && (
                    data.gst === 'Yes' ?
                        <FormInput
                            maxLength={15}
                            placeholder="GST Number"
                            required
                            id="gst_no"
                            value={data.gst_no}
                            onChange={(e) => handleDataChange('gst_no', e.target.value)}
                            errorMessage={errorMessage}
                            isValid={errors !== 'gst_no'}
                            icon={<img src="/assets/icons/gst.png" style={{height: '25px'}}/>}
                            label={'Gst Number'}
                        /> :
                        <FormMultiSelect
                            options={data.company_type2 ? companyTypeOptionsMap[data.company_type2] : []}
                            placeholder="regd_proof"
                            required
                            id="regd_proof"
                            value={data.regd_proof}
                            onChange={(value) => handleDataChange('regd_proof', value)}
                            errorMessage={errorMessage}
                            isValid={errors !== 'regd_proof'}
                            icon={<img src="/assets/icons/toc.png" style={{height: '25px'}}/>}
                            label={'Select your Business Registration Proof'}
                        />
                )
            }
            <FormSearchSelect
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

export default SelfEmployedForm
