import CustomSquareRadioWithIcon from "../../../components/Form/CustomSquareRadioWIthIcon";
import {
  company_type_options,
  companyTypeOptionsMap,
} from "../../../constants/formData";
import FormMultiSelect from "../../../components/Form/FormMultiSelect";
import FormInput from "../../../components/Form/FormInput";
import FormSelect from "../../../components/Form/FormSelect";

const GstRegistrationOption = ({
  handleDataChange,
  data,
  errorMessage,
  errors,
}) => {
  return (
    <div>
      <div className={`input-group mb-3`}>
        <span className="input-group-text" style={{ height: "58px" }}>
          <img
            src="/assets/icons/gst.png"
            alt={""}
            style={{ height: "25px" }}
          />
        </span>
        <div className="form-floating flex-grow-1">
          <div
            className={`form-control`}
            style={{ padding: "1.2rem 0.75rem", fontSize: "12px" }}
          >
            Do you have GST Registration
          </div>
        </div>
      </div>
      <CustomSquareRadioWithIcon
        onChange={(value) => handleDataChange("gst_available", value)}
      />
      {data.gst_available !== "" &&
        (data.gst_available === "yes" ? (
          <div className={"my-3"}>
            <FormInput
              maxLength={15}
              placeholder="GST Number"
              required
              id="gst_no"
              value={data.gst_no}
              onChange={(e) => handleDataChange("gst_no", e.target.value)}
              errorMessage={errorMessage}
              isValid={errors !== "gst_no"}
              icon={
                <img src="/assets/icons/gst.png" style={{ height: "25px" }} />
              }
              label={"Gst Number"}
            />
          </div>
        ) : (
          <div className={"my-3"}>
            <FormSelect
              options={company_type_options}
              placeholder="company_type2"
              required
              id="company_type2"
              value={data.company_type}
              onChange={(value) => handleDataChange("company_type", value)}
              errorMessage={errorMessage}
              isValid={errors !== "company_type"}
              icon={
                <img src="/assets/icons/toc.png" style={{ height: "25px" }} />
              }
              label={"Company Type"}
            />
            <FormMultiSelect
              options={
                data.company_type
                  ? companyTypeOptionsMap[data.company_type]
                  : []
              }
              placeholder="regd_proof"
              required
              id="regd_proof"
              value={data.regd_proof}
              onChange={(value) => handleDataChange("regd_proof", value)}
              errorMessage={errorMessage}
              isValid={errors !== "regd_proof"}
              icon={
                <img src="/assets/icons/toc.png" style={{ height: "25px" }} />
              }
              label={"Select your Business Registration Proof"}
            />
          </div>
        ))}
    </div>
  );
};

export default GstRegistrationOption;