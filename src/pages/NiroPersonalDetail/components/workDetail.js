import FormInputNewNiro from "../../../components/Form/FormInputNewNiro";
import FormSelectNewNiro from "../../../components/Form/FormSelectNewNiro";
import {
  company_type_options,
  salary_mode_options,
} from "../../../constants/formData";
import CustomSquareCheckBoxGroup from "../../../components/Form/CustomSquareCheckBoxGroup";
import { numberToWordIncome } from "../../../utility/numberUtility";
import numberToWords from "../../../utility/numberToWords";

const WorkDetail = ({
  data,
  errors,
  words,
  errorMessage,
  handleDataChange,
  handleMonthlyIncome,
  monthlyIncome,
}) => {
  const profession_options = [
    { label: "Salaried", value: "Salaried" },
    { label: "Self Employed", value: "self employed" },
    { label: "Business Owner", value: "business owner" },
  ];

  return (
    <>
      <FormSelectNewNiro
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
      />
      <FormInputNewNiro
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
      <FormSelectNewNiro
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
      <FormInputNewNiro
        type={"email"}
        placeholder="Work Email ID"
        required
        id="workemail"
        value={data.work_email}
        onChange={(e) => handleDataChange("work_email", e.target.value)}
        errorMessage={errorMessage}
        isValid={errors !== "work_email"}
        icon={<img src="/assets/icons/email.png" style={{ height: "25px" }} />}
        label={"Work Email"}
      />
      <FormInputNewNiro
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
      <FormInputNewNiro
        type={"text"}
        placeholder="Work Address Line 1"
        required
        id="address1"
        value={data.work_address1}
        onChange={(e) => handleDataChange("work_address1", e.target.value)}
        errorMessage={errorMessage}
        isValid={errors !== "work_address1"}
        icon={
          <img src="/assets/icons/pincode.png" style={{ height: "25px" }} />
        }
        label={"Work Address Line 1"}
      />
      <FormInputNewNiro
        type={"text"}
        placeholder="Work Address Line 2"
        required
        id="addres2"
        value={data.work_address2}
        onChange={(e) => handleDataChange("work_address2", e.target.value)}
        errorMessage={errorMessage}
        isValid={errors !== "work_address2"}
        icon={
          <img src="/assets/icons/pincode.png" style={{ height: "25px" }} />
        }
        label={"Work Address Line 2"}
      />
      <FormInputNewNiro
        type={"number"}
        placeholder="Enter Work pincode"
        required
        id="pincode2"
        value={data.work_pincode}
        onChange={(e) => handleDataChange("work_pincode", e.target.value)}
        errorMessage={errorMessage}
        isValid={errors !== "work_pincode"}
        icon={
          <img src="/assets/icons/pincode.png" style={{ height: "25px" }} />
        }
        label={"Work Pin Code"}
      />
    </>
  );
};

export default WorkDetail;
