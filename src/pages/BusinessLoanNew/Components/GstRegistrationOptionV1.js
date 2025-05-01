import CustomSquareRadioWithIconV1 from "../../../components/Form/CustomSquareRadioWIthIconV1";
import FormDatePickerStyle2 from "../../../components/Form/FormDatePickerStyle2";
import FormInputStyle2 from "../../../components/Form/FormInputStyle2";

const GstRegistrationOptionv1 = ({
  handleDataChange,
  data,
  errorMessage,
  errors,
  handleBlur,
}) => {
  return (
    <div className="pl-4 pr-4">
      <div className={`input-group pl-3`}>
        <p>Do you have GST Registration?</p>
      </div>

      <CustomSquareRadioWithIconV1
        value={data.gst_available}
        onChange={(value) => handleDataChange("gst_available", value)}
        name="gst_available"
      />

      {data.gst_available === "yes" && (
        <div className={"my-0"}>
          <FormInputStyle2
            maxLength={15}
            required
            id="gst"
            value={data.gst}
            onChange={(e) => handleDataChange("gst", e.target.value)}
            // errorMessage={errorMessage}
            onBlur={() => handleBlur("gst")}
            isValid={errors !== "gst"}
            icon={
              <img src="/assets/icons/gst.png" style={{ height: "25px" }} />
            }
            label={"GST Number"}
            errorMessage="Enter a valid Gst Number"
          />
        </div>
      )}

      {data.gst_available === "no" && (
        <div className={"mb-3 mt-0"}>
          <hr style={{ border: "1px solid #000000", marginBottom: "1rem" }} />
          <div className={`input-group pl-3`}>
            <p>Are you registered with Udyam/MSME?</p>
          </div>

          <CustomSquareRadioWithIconV1
            value={data.udyam_available}
            onChange={(value) => handleDataChange("udyam_available", value)}
            name="udyam_available"
          />

          {data.udyam_available === "yes" && (
            <div className={"my-0"}>
              <FormInputStyle2
                required
                id="udyam_number"
                value={data.udyam_number}
                onChange={(e) =>
                  handleDataChange("udyam_number", e.target.value)
                }
                errorMessage="Enter a valid Udyam Number"
                onBlur={() => handleBlur("udyam_number")}
                isValid={errors !== "udyam_number"}
                label={"Udyam Number"}
              />
              <FormDatePickerStyle2
                required
                id="doi_udyam"
                value={data.doi_udyam}
                onChange={(e) => handleDataChange("doi_udyam", e.target.value)}
                errorMessage={errorMessage}
                isValid={errors !== "doi_udyam"}
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
