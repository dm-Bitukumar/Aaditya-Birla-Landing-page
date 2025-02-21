import { useEffect, useState } from "react";
import _ from "lodash";
import FormButton from "../../../components/Buttons/FormButton";
import GstRegistrationOption from "./GstRegistrationOption";
import { useDispatch } from "react-redux";
import { setLead } from "../../../store/app/appReducer";
import { setUserClickData } from "../../../utility/setUserClickData";
import FormInput from "../../PreApprovedNew/Components/FormInputBtn";
import FormSelect from "../../PreApprovedNew/Components/FormSelectBtn";
import { toast } from "react-toastify";
import callApi from "../../../utility/apiCaller";

const residential_type_options = [
  { value: "", label: "Select Residential Type" },
  { value: "owned", label: "Owned" },
  { value: "rented", label: "Rented" },
  { value: "owned_by_parents", label: "Owned by Parents" },
];

const ApplyFormStep1 = ({ formData, setFormData, nextStep, ...props }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [data, setData] = useState({
    full_name: "",
    residence_pincode: "",
    residential_type: "",
    gst_available: "",
    gst: "",
  });
  const [touched, setTouched] = useState({
    full_name: false,
    residence_pincode: false,
    residential_type: false,
    gst: false,
  });
  const udyamRegex = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/;
  const gstRegex = /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[0-9a-zA-Z]{3}$/;

  useEffect(() => {
    if (formData.full_name) {
      setData((prevData) => ({
        ...prevData,
        full_name: formData.full_name,
      }));
    }
  }, [formData.full_name]);

  const handleDataChange = (keyName, keyValue) => {
    setData((prevData) => {
      let updatedData = { ...prevData, [keyName]: keyValue };

      if (keyName === "udyam_number") {
        let formattedValue = keyValue.toUpperCase().replace(/[^A-Z0-9-]/g, "");
        updatedData.udyam_number = formattedValue;
        console.log("Updated Udyam Number:", formattedValue);
      }

      if (keyName === "gst") {
        let formattedValue = keyValue.toUpperCase();
        updatedData.gst = formattedValue;
        console.log(
          "GST Number Changed (Stored as Uppercase):",
          formattedValue
        );
      }

      if (keyName === "gst_available" && keyValue === "no") {
        updatedData.gst = "";
      }

      if (keyName === "gst_available") {
        updatedData.udyam_available = "";
        updatedData.udyam_number = "";
      }

      return updatedData;
    });
  };

  const handleBlur = (keyName) => {
    setTouched((prevTouched) => ({ ...prevTouched, [keyName]: true }));
    handleValidation();
  };

  const handleValidation = () => {
    let validationErrors = {};
    let isValid = true;

    if (touched.full_name) {
      if (data.full_name.length > 0 && !/^[A-Za-z ]+$/.test(data.full_name)) {
        validationErrors.full_name = "Only alphabets are allowed.";
        isValid = false;
      }
    }

    if (
      touched.residence_pincode &&
      data.residence_pincode &&
      !/^\d{6}$/.test(data.residence_pincode)
    ) {
      validationErrors.residence_pincode = "Please enter a valid Pincode.";
      isValid = false;
    }

    if (touched.residential_type && data.residential_type === "") {
      validationErrors.residential_type = "Please select Residential Type.";
      isValid = false;
    }

    if (touched.gst && data.gst_available === "yes") {
      if (_.isEmpty(data.gst)) {
        validationErrors.gst = "Please enter GST Number.";
        isValid = false;
      } else if (!gstRegex.test(data.gst)) {
        validationErrors.gst = "Please enter a valid GST Number.";
        isValid = false;
      }
    }

    setErrors(validationErrors);
    return isValid && data.full_name.length > 0;
  };

  const fetchGSTAddress = async (gstNumber) => {
    try {
      const response = await callApi(
        "v1/lender/gst",
        "post",
        { gst_no: gstNumber },
        "loan"
      );

      if (
        response?.status === "Success" &&
        response?.data?.raw_response?.gstdetails?.pradr?.addr
      ) {
        const addressData = response.data.raw_response.gstdetails.pradr.addr;
        return `${addressData.bno}, ${addressData.bnm}, ${addressData.flno}, ${addressData.st}, ${addressData.loc}, ${addressData.locality}, ${addressData.dst}, ${addressData.stcd} - ${addressData.pncd}`;
      }

      return "Unable to fetch address";
    } catch (error) {
      console.error("Error fetching GST Address:", error);
      return "Unable to fetch address";
    }
  };

  const fetchUdyamAddress = async (udyamNumber) => {
    try {
      const response = await callApi(
        "v1/lender/udyam",
        "post",
        { udyamno: udyamNumber },
        "loan"
      );

      if (
        response?.status === "Success" &&
        response?.data?.raw_response?.data?.main_details
      ) {
        const details = response.data.raw_response.data.main_details;

        const address = `${details.flat}, ${details.name_of_building}, ${details.road}, ${details.village}, ${details.block}, ${details.city}, ${details.state} - ${details.pin}`;

        return address;
      }

      return "Unable to fetch address";
    } catch (error) {
      console.error("Error fetching Udyam Address:", error);
      return "Unable to fetch address";
    }
  };

  const handleSubmit = async () => {
    const isValid = handleValidation();
    if (isValid) {
      console.log("GST Number:", data.gst);
      console.log("Udyam Number:", data.udyam_number);

      setIsFetching(true);

      let fetchedAddress = "";
      if (data.gst) {
        fetchedAddress = await fetchGSTAddress(data.gst);
        // console.log("Fetched GST Address:", fetchedAddress);
      } else if (data.udyam_number) {
        fetchedAddress = await fetchUdyamAddress(data.udyam_number);
        // console.log("Fetched Udyam Address:", fetchedAddress);
      }
      const isGst = data.gst_available === "yes";
      const isUdyam = data.udyam_available === "yes";

      const payload = {
        businessloanlead: {
          contact_phone: formData.mobile,
          pan_no: formData.pancard,
          contact_name: data.full_name,
          pincode: data.residence_pincode,
          residence_type: data.residential_type,
          is_gst: isGst,
          is_udyam: isUdyam,
          udyamno: isUdyam ? data.udyam_number : "",
          gst_no: isGst ? data.gst : "",
          is_stage1_completed: "true",
          work_address1: fetchedAddress,
        },
      };

      try {
        const leadResponse = await callApi(
          "v1/businessloanlead/new",
          "post",
          payload,
          "core"
        );

        if (leadResponse.status === "Success") {
          toast.success("Data uploaded successfully.");
          setUserClickData({
            event_name: "step1-business-loan-page-completed",
            user_id: formData.mobile || "unknown",
          });
        } else {
          toast.error("Failed to update data.");
        }
      } catch (err) {
        console.error("API Error:", err);
        toast.error("An error occurred while submitting the data.");
      }

      setFormData((prev) => ({
        ...prev,
        gst: data.gst,
        udyam_number: data.udyam_number,
        confirm_business_address: fetchedAddress,
      }));

      dispatch(setLead({ ...data, stepDone: 1 }));
      setIsFetching(false);
      nextStep();
    }
  };

  const isBothNo = data.gst_available === "no" && data.udyam_available === "no";

  useEffect(() => {
    const isValid =
      !!data.full_name &&
      /^[A-Za-z ]+$/.test(data.full_name) &&
      !!data.residence_pincode &&
      data.residence_pincode.length === 6 &&
      !!data.residential_type &&
      data.gst_available !== "" &&
      !isBothNo &&
      ((data.gst_available === "yes" &&
        !!data.gst &&
        data.gst.length === 15 &&
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{3}$/.test(data.gst)) ||
        (data.udyam_available === "yes" &&
          !!data.udyam_number &&
          udyamRegex.test(data.udyam_number)));

    setIsFormValid(isValid);
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-between p-4">
      <img className="mt-4 w-36" src="/assets/img/logo.png" alt="Logo" />

      <div className="flex flex-col w-full max-w-md flex-grow justify-center">
        {/* Full Name Field */}
        <FormInput
          icon={
            <img src="/assets/icons/male.png" className="h-6 px-2" alt="icon" />
          }
          type="text"
          name="full_name"
          placeholder="Full Name as per PAN Card"
          label="Full Name"
          value={data.full_name}
          onChange={(e) =>
            handleDataChange("full_name", e.target.value.toUpperCase())
          }
          onBlur={() => handleBlur("full_name")}
          isValid={!errors.full_name}
          errorMessage={errors.full_name}
        />

        {/* Residence Pincode Field */}
        <FormInput
          icon={
            <img
              src="/assets/icons/pincode.png"
              className="h-6 px-2"
              alt="Pincode"
            />
          }
          type="text"
          name="residence_pincode"
          placeholder="Residence Pincode"
          label="Residence Pincode"
          value={data.residence_pincode}
          onChange={(e) => {
            if (/^\d{0,6}$/.test(e.target.value)) {
              handleDataChange("residence_pincode", e.target.value);
            }
          }}
          onBlur={() => handleBlur("residence_pincode")}
          isValid={!errors.residence_pincode}
          errorMessage={errors.residence_pincode}
        />

        {/* Residential Type Dropdown */}
        <FormSelect
          icon={
            <img
              src="/assets/icons/Icon C Type.png"
              className="h-6 px-2"
              alt="Residential Type"
            />
          }
          label="Residential Type"
          name="residential_type"
          value={data.residential_type}
          onChange={(value) => handleDataChange("residential_type", value)}
          options={residential_type_options}
          onBlur={() => handleBlur("residential_type")}
          isValid={!errors.residential_type}
          errorMessage={errors.residential_type}
        />

        <input type="hidden" name="utm_campaign" value="" />
        <input type="hidden" name="utm_source" value="" />
        <input type="hidden" name="utm_medium" value="" />
        <input type="hidden" name="utm_content" value="" />
        <input type="hidden" name="click_id" value="" />
        <input type="hidden" name="aff_id" value="" />
        <input type="hidden" name="src" value="" />

        {/* GST Section */}
        <GstRegistrationOption
          errorMessage={errors.gst_available}
          errors={errors}
          data={data}
          handleDataChange={handleDataChange}
          handleBlur={handleBlur}
        />
      </div>

      {/* Submit Button at the Bottom */}
      <FormButton
        className={`w-full max-w-md text-white font-semibold py-3 rounded-lg 
    ${
      isFetching || !isFormValid
        ? "bg-gray-400 cursor-not-allowed opacity-50"
        : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
    }`}
        type="submit"
        onClick={handleSubmit}
        disabled={!isFormValid || isFetching}
        id="myBtn"
      >
        {isBothNo
          ? "One Document Required"
          : isFetching
          ? "Fetching..."
          : "Next"}
      </FormButton>
    </div>
  );
};

export default ApplyFormStep1;
