import FormInput from "../../../components/Form/FormInput";
import FormSelect from "../../../components/Form/FormSelect";
import {
  company_type_options,
  salary_mode_options,
} from "../../../constants/formData";
import CustomSquareCheckBoxGroup from "../../../components/Form/CustomSquareCheckBoxGroup";
import { numberToWordIncome } from "../../../utility/numberUtility";
import numberToWords from "../../../utility/numberToWords";

const SalariedForm = ({
  data,
  errors,
  words,
  errorMessage,
  handleDataChange,
  handleMonthlyIncome,
  monthlyIncome,
}) => {
  return (
    <>
      {/* <FormSelect
        options={profession_options}
        placeholder="profession"
        required
        id="profession"
        value={data.profession}
        onChange={(value) => handleDataChange("profession", value)}
        errorMessage={errorMessage}
        isValid={errors !== "profession"}
        icon={
          <img src="/assets/icons/profession.png" style={{ height: "25px" }} />
        }
        label={"Profession"}
      /> */}
      <FormInput
        placeholder="Company Name"
        required
        id="company_name"
        value={data.company_name}
        onChange={(e) => handleDataChange("company_name", e.target.value)}
        errorMessage={errorMessage}
        isValid={errors !== "company_name"}
        icon={<img src="/assets/icons/cname.png" style={{ height: "25px" }} />}
        label={"Company Name"}
      />
      <FormSelect
        options={company_type_options}
        placeholder="company_type"
        required
        id="company_type"
        value={data.company_type}
        onChange={(value) => handleDataChange("company_type", value)}
        errorMessage={errorMessage}
        isValid={errors !== "company_type"}
        icon={<img src="/assets/icons/toc.png" style={{ height: "25px" }} />}
        label={"Company Type"}
      />
      <FormInput
        type={"text"}
        placeholder="monthly_income"
        required
        id="monthly_income"
        value={monthlyIncome}
        onChange={(e) => handleMonthlyIncome(e)}
        errorMessage={errorMessage}
        isValid={errors !== "monthly_income"}
        icon={<img src="/assets/icons/income.png" style={{ height: "25px" }} />}
        label={"Monthly Income"}
      />
      {words && <p className={"my-3"}>{words}</p>}
      {/* <div>
        <p style={{ fontSize: "0.8rem" }}>Salary Mode</p>
        <CustomSquareCheckBoxGroup
          options={salary_mode_options}
          onSelect={(value) => handleDataChange("salary_mode", value)}
        />
        {errors === "salary_mode" && (
          <div style={{ color: "red", textAlign: "center", marginTop: "4px" }}>
            {errorMessage}
          </div>
        )}
      </div> */}
    </>
  );
};

export default SalariedForm;
