import CustomSquareRadioWithIcon from "../../../components/Form/CustomSquareRadioWIthIcon";
import FormInput from "../../PreApprovedNew/Components/FormInputBtn";
import FormSelect from "../../PreApprovedNew/Components/FormSelectBtn";

const GstRegistrationOption = ({
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
        <span
          className="input-group-text"
          style={{ height: "58px", background: "#fff" }}
        >
          <img
            src="/assets/icons/gst.png"
            alt={""}
            style={{ height: "25px", padding: "0 5px" }}
          />
        </span>
        <div className="form-floating flex-grow-1">
          <div
            className={`form-control`}
            style={{
              padding: "1.2rem 0.75rem",
              fontSize: "12px",
              borderLeft: "0px",
            }}
          >
            Do you have GST Registration
          </div>
        </div>
      </div>

      <CustomSquareRadioWithIcon
        onChange={(value) => handleDataChange("gst_available", value)}
      />

      {/* GST Number Field (Only Shows if User Selects 'Yes') */}
      {data.gst_available === "yes" && (
        <div className={"my-3"}>
          <FormInput
            maxLength={15}
            placeholder="GST Number"
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

      {/* Udyam / MSME Registration Section */}
      {data.gst_available === "no" && (
        <div className={"my-3"}>
          <div className={`input-group mb-3`}>
            <span
              className="input-group-text"
              style={{ height: "58px", background: "#fff" }}
            >
              <img
                src="/assets/icons/gst.png"
                alt={""}
                style={{ height: "25px" }}
              />
            </span>
            <div className="form-floating flex-grow-1">
              <div
                className={`form-control`}
                style={{
                  padding: "1.2rem 0.75rem",
                  fontSize: "11px",
                  borderLeft: "0px",
                }}
              >
                Are you registered with Udyam / MSME
              </div>
            </div>
          </div>

          <CustomSquareRadioWithIcon
            onChange={(value) => handleDataChange("udyam_available", value)}
          />

          {/* Udyam Number Field (Only Shows if User Selects 'Yes') */}
          {data.udyam_available === "yes" && (
            <div className={"my-3"}>
              <FormInput
                icon={
                  <img src="/assets/icons/gst.png" style={{ height: "25px" }} />
                }
                placeholder="Udyam Number"
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GstRegistrationOption;
