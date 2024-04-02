import FormInput from "../../../components/Form/FormInput";
import FormSelect from "../../../components/Form/FormSelect";
import {company_type_options, salary_mode_options} from "../../../constants/formData";
import CustomSquareCheckBoxGroup from "../../../components/Form/CustomSquareCheckBoxGroup";
import {numberToWordIncome} from "../../../utility/numberUtility";

const SalariedForm = ({data, errors, errorMessage, handleDataChange}) => {
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
            {
                data.monthly_income && <p className={'my-3'}>{numberToWordIncome(data.monthly_income)}</p>
            }
            <div>
                <p style={{fontSize: '0.8rem'}}>Salary Mode</p>
                <CustomSquareCheckBoxGroup
                    options={salary_mode_options}
                    onSelect={(value) => handleDataChange('salary_mode', value)}
                />
                {errors === 'salary_mode' && (
                    <div style={{color: 'red', textAlign: 'center', marginTop: '4px'}}>
                        {errorMessage}
                    </div>
                )}
            </div>
        </>
    )
}

export default SalariedForm
