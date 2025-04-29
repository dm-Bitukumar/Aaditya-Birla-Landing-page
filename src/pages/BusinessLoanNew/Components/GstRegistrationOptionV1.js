import CustomSquareRadioWithIcon from "../../../components/Form/CustomSquareRadioWIthIcon";
import CustomSquareRadioWithIconV1 from "../../../components/Form/CustomSquareRadioWIthIconV1";
import FormInputStyle2 from "../../../components/Form/FormInputStyle2";
import FormInput from "../../PreApprovedNew/Components/FormInputBtn";
import FormSelect from "../../PreApprovedNew/Components/FormSelectBtn";

const GstRegistrationOptionv1 = ({
  handleDataChange,
  data,
  errorMessage,
  errors,
  handleBlur,
}) => {
  return (
    <div>
      {/* GST Registration Section */}
      <div className={`input-group mb-3`}>
        <p>Do you have GST Registration</p>
      </div>

      <CustomSquareRadioWithIconV1
        onChange={(value) => handleDataChange("gst_available", value)}
      />

      {/* GST Number Field (Only Shows if User Selects 'Yes') */}
      {data.gst_available === "yes" && (
        <div className={"my-3"}>
          <FormInputStyle2
            maxLength={15}
            // placeholder="GST Number"
            required
            id="gst"
            value={data.gst}
            onChange={(e) => handleDataChange("gst", e.target.value)}
            errorMessage={errorMessage}
            onBlur={() => handleBlur("gst")}
            isValid={errors !== "gst"}
            icon={
              <img src="/assets/icons/gst.png" style={{ height: "25px" }} />
            }
            label={"GST Number"}
          />
        </div>
      )}
      <hr style={{ border: "1px solid #B3B3B3" }} />
      {/* Udyam / MSME Registration Section */}
      {data.gst_available === "no" && (
        <div className={"my-3"}>
          <div className={`input-group mb-3`}>
            <p>Are you registered with Udyam / MSME</p>
          </div>

          <CustomSquareRadioWithIconV1
            onChange={(value) => handleDataChange("udyam_available", value)}
          />

          {/* Udyam Number Field (Only Shows if User Selects 'Yes') */}
          {data.udyam_available === "yes" && (
            <div className={"my-3"}>
              <FormInputStyle2
                // placeholder="Udyam Number"
                required
                id="udyam_number"
                value={data.udyam_number}
                onChange={(e) =>
                  handleDataChange("udyam_number", e.target.value)
                }
                errorMessage={errorMessage}
                isValid={errors !== "udyam_number"}
                label={"Udyam Number"}
              />
              <FormInputStyle2
                // placeholder="Udyam Number"
                required
                id="date_of_incorporation"
                value={data.udyam_number}
                onChange={(e) =>
                  handleDataChange("date_of_incorporation", e.target.value)
                }
                errorMessage={errorMessage}
                isValid={errors !== "date_of_incorporation"}
                label={"Date of Incorporation"}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GstRegistrationOptionv1;
