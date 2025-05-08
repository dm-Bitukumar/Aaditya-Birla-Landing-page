import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./PersonalDetailsForm.css";
import FormInputStyle2 from "../../../../components/Form/FormInputStyle2";
import FormSelectStyle2 from "../../../../components/Form/FormSelectStyle2";
import FormButtonStyle2 from "../../../../components/Form/FormButtonStyle2";
import { setUserClickData } from "../../../../utility/setUserClickData";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import GstRegistrationOption from "../../../BusinessLoan/components/GstRegistrationOption";
import GstRegistrationOptionv1 from "../GstRegistrationOptionV1";
import { toast } from "react-toastify";
import callApi from "../../../../utility/apiCaller";
import { useSelector } from "react-redux";
import { setpanDetails } from "../../../../store/app/appReducer";
// const dispatch = useDispatch();

const PersonalDetailsForm = ({ formData, setFormData, setCurrentStep }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [isPanLoading, setIsPanLoading] = useState(false);
  const [params] = useSearchParams();
  const [email, setEmail] = useState("");
  const [isPanValid, setIsPanValid] = useState(true);
  const lead = useSelector((state) => state.app.lead);
  const [pan, setPan] = useState("");
  const user = useSelector((state) => state.app.user);
  const [affId, setAffId] = useState("");
  const udyamRegex = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/;
  const gstRegex = /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[0-9a-zA-Z]{3}$/;
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);
  const [data, setData] = useState({
    gst_available: "",
    gst: "",
    residential_type: "",
    residence_pincode: "",
    pan: "",
    email: "",
  });

  useEffect(() => {
    console.log("Final Updated FormData:", formData);
  }, [formData]);

  useEffect(() => {
    if (params.get("aff_id")) setAffId(params.get("aff_id"));
  }, [params]);

  const residential_type_options = [
    { value: "owned", label: "Owned" },
    { value: "rented", label: "Rented" },
    { value: "owned_by_parents", label: "Owned by Parents" },
  ];

  const [touched, setTouched] = useState({
    full_name: false,
    residence_pincode: false,
    residential_type: false,
    gst: false,
    pan: false,
    email: false,
  });

  const handleContinue = async () => {
    const isValid = handleValidation();
    if (isValid) {
      const isBothNo =
        data.gst_available === "no" && data.udyam_available === "no";
      if (isBothNo) {
        if (!isPanValid) {
          toast.error("Please enter a valid PAN.");
          return;
        }

        try {
          const payload = {
            businessloanlead: {
              contact_phone: formData.mobile,
              contact_email: data.email,
              pancard: data.pan,
              pincode: data.residence_pincode,
              residence_type: data.residential_type,
              is_gst: false,
              is_udyam: false,
              is_stage1_completed: "true",
            },
          };

          const leadResponse = await callApi(
            "v1/businessloanlead/new-v1",
            "post",
            payload,
            "core"
          );

          if (leadResponse.status !== "Success") {
            toast.error("Failed to update basic data.");
            return;
          }

          const res = await callApi(
            "v1/M2P_data/get-data-from-pan",
            "post",
            { pancard: data.pan },
            "core",
            user.token
          );

          if (res.status === "Success") {
            const { first_name, last_name, gender, dob, fullname } =
              res.data || {};
            const dobFormatted = moment(dob, "DD/MM/YYYY", true).isValid()
              ? moment(dob, "DD/MM/YYYY").format("YYYY-MM-DD")
              : undefined;

            const enrichedPayload = {
              businessloanlead: {
                contact_phone: formData.mobile,
                pancard: data.pan,
                contact_name: fullname?.trim(),
                dob: dobFormatted,
                gender,
              },
            };

            await callApi(
              "v1/businessloanlead/new-v1",
              "post",
              enrichedPayload,
              "core"
            );

            dispatch(
              setpanDetails({
                fullName: fullname,
                firstName: first_name,
                lastName: last_name,
                gender,
                dob,
                pancard: data.pan,
              })
            );

            setFormData((prev) => ({
              ...prev,
              fullname,
              firstName: first_name,
              lastName: last_name,
              gender,
              dob,
            }));

            toast.success("PAN verified and data saved.");
          } else {
            toast.error("Failed to fetch PAN details.");
          }

          setUserClickData({
            event_name: "step1-business-loan-page-completed",
            user_id: formData.mobile || "unknown",
            affiliate_id: affId || "No Aff_id found",
          });

          setCurrentStep(5);
        } catch (err) {
          console.error("PAN flow error:", err);
          toast.error("Something went wrong.");
        }

        return;
      } else {
        console.log("Personal formData:", formData);
        if (!isPanValid) {
          toast.error("Please enter a valid PAN.");
          return;
        }
        try {
          setIsPanLoading(true);

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

          const doiUdyam =
            data.doi_udyam && moment(data.doi_udyam).isValid()
              ? moment(data.doi_udyam).format("YYYY-MM-DD")
              : undefined;

          const payload = {
            businessloanlead: {
              contact_phone: formData.mobile,
              contact_email: data.email,
              pancard: data.pan,
              //contact_name: fullname.trim(),
              pincode: data.residence_pincode,
              residence_type: data.residential_type,
              is_gst: isGst,
              is_udyam: isUdyam,
              udyamno: isUdyam ? data.udyam_number : "",
              ...(doiUdyam && { doi_udyam: doiUdyam }),
              gst: isGst ? data.gst : "",
              is_stage1_completed: "true",
              work_address1: fetchedAddress,
              // dob: dob,
              // gender: gender,
            },
          };

          try {
            const leadResponse = await callApi(
              "v1/businessloanlead/new-v1",
              "post",
              payload,
              "core"
            );

            if (leadResponse.status === "Success") {
              toast.success("Data uploaded successfully.");
              setUserClickData({
                event_name: "step1-business-loan-page-completed",
                user_id: formData.mobile || "unknown",
                affiliate_id: affId || "No Aff_id found",
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
            pancard: data.pan,
            // fullname: fullname,
            // firstName: first_name,
            // lastName: last_name,
            // gender,
            // dob,
            is_gst: isGst,
            is_udyam: isUdyam,
            gst: data.gst,
            udyam_number: data.udyam_number,
            doi_udyam: moment(data.doi_udyam).format("YYYY-MM-DD"),
            confirm_business_address: fetchedAddress,
          }));

          const res = await callApi(
            "v1/M2P_data/get-data-from-pan",
            "post",
            {
              pancard: data.pan,
            },
            "core",
            user.token
          );

          if (res.status === "Success") {
            setUserClickData({
              event_name: `details-fetched-for-pl-pan-${data.pan || "unknown"}`,
              user_id: formData.mobile || "unknown",
              affiliate_id: affId || "No Aff_id found",
            });
            const { first_name, last_name, gender, dob, fullname } =
              res.data || {};
            dispatch(
              setpanDetails({
                fullName: fullname,
                firstName: first_name,
                lastName: last_name,
                gender,
                dob,
                pancard: data.pan,
              })
            );
            const dobFormatted = moment(dob, "DD/MM/YYYY", true).isValid()
              ? moment(dob, "DD/MM/YYYY").format("YYYY-MM-DD")
              : undefined;
            const payload = {
              businessloanlead: {
                contact_phone: formData.mobile,
                pancard: data.pan,
                contact_name: fullname.trim(),
                dob: dobFormatted,
                gender: gender,
              },
            };

            try {
              const leadResponse1 = await callApi(
                "v1/businessloanlead/new-v1",
                "post",
                payload,
                "core"
              );

              if (leadResponse1.status === "Success") {
                toast.success("Data uploaded successfully.");
                setUserClickData({
                  event_name: "step1-business-loan-page-completed",
                  user_id: formData.mobile || "unknown",
                  affiliate_id: affId || "No Aff_id found",
                });
                setFormData((prev) => ({
                  ...prev,
                  fullname: fullname,
                  firstName: first_name,
                  lastName: last_name,
                  gender,
                  dob,
                }));
              } else {
                toast.error("Failed to update data.");
              }
            } catch (err) {
              console.error("API Error:", err);
              toast.error("An error occurred while submitting the data.");
            }
            toast.success("PAN verified and data fetched successfully.");
            setCurrentStep(3);
          } else {
            console.error("PAN API returned an error:", res.message);
            toast.error("Failed to fetch data from PAN. Please try again.");
          }
        } catch (err) {
          console.error("Error during PAN API call:", err);
          toast.error("An error occurred while fetching data from PAN.");
        }

        setUserClickData({
          event_name: "personal-details-submit-for-business-loan-page-v1",
          user_id: formData.mobile || "No User ID found here",
          affiliate_id: affId || "No Aff_id found",
        });
        setCurrentStep(3);
      }
      console.log(isValid);
    }
  };

  const handleDataChange = (keyName, keyValue) => {
    setData((prevData) => {
      let updatedData = { ...prevData, [keyName]: keyValue };

      if (keyName === "udyam_number") {
        let formatted = keyValue
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, "")
          .slice(0, 16);

        if (formatted.length > 5)
          formatted = formatted.slice(0, 5) + "-" + formatted.slice(5);
        if (formatted.length > 8)
          formatted = formatted.slice(0, 8) + "-" + formatted.slice(8);
        if (formatted.length > 11)
          formatted = formatted.slice(0, 11) + "-" + formatted.slice(11);
        if (formatted.length > 19) formatted = formatted.slice(0, 19);

        updatedData.udyam_number = formatted;
      }

      if (keyName === "doi_udyam") {
        let formattedValue = keyValue.trim();

        // Allow clearing the field
        if (!formattedValue) {
          updatedData.doi_udyam = "";
        }
        // Only validate when the user has typed exactly 10 characters (dd-mm-yyyy)
        else if (formattedValue.length === 10) {
          const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
          const match = formattedValue.match(dateRegex);

          if (match) {
            const [, day, month, year] = match;
            const momentDate = moment(
              `${day}-${month}-${year}`,
              "DD-MM-YYYY",
              true
            );
            if (momentDate.isValid()) {
              updatedData.doi_udyam = momentDate.format("YYYY-MM-DD");
            } else {
              console.warn("Invalid date provided:", formattedValue);
              updatedData.doi_udyam = "";
            }
          } else {
            console.warn("Invalid date format. Expected dd-mm-yyyy");
            updatedData.doi_udyam = "";
          }
        }
        // Don't process or log anything until 10 characters are typed
        else {
          updatedData.doi_udyam = formattedValue;
        }
      }

      if (keyName === "pan") {
        let formattedValue = keyValue.toUpperCase().replace(/[^A-Z0-9]/g, "");
        updatedData.pan = formattedValue;
        console.log("Updated PAN:", formattedValue);
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
        updatedData.doi_udyam = "";
      }

      return updatedData;
    });
  };

  const handleValidation = () => {
    let validationErrors = {};
    let isValid = true;

    if (touched.pan) {
      const trimmedPan = data.pan.trim();
      if (trimmedPan === "") {
        validationErrors.pan = "";
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(trimmedPan)) {
        validationErrors.pan = "Please enter a valid PAN.";
        isValid = false;
      }
    }
    if (touched.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        validationErrors.email = "Please enter a valid email address.";
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

    if (!["yes", "no"].includes(data.gst_available)) {
      toast.error("Please select GST Yes/No.");
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

    if (
      data.gst_available === "no" &&
      !["yes", "no"].includes(data.udyam_available)
    ) {
      toast.error("Please select Udyam Yes/No.");
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleBlur = (keyName) => {
    setTouched((prevTouched) => ({ ...prevTouched, [keyName]: true }));
    handleValidation();
  };

  const fetchGSTAddress = async (gstNumber) => {
    setIsFetchingAddress(true);
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
    } finally {
      setIsFetchingAddress(false);
    }
  };

  const fetchUdyamAddress = async (udyamNumber) => {
    setIsFetchingAddress(true);
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
    } finally {
      setIsFetchingAddress(false);
    }
  };

  const isBothNo = data.gst_available === "no" && data.udyam_available === "no";
  useEffect(() => {
    const isValid =
      ((data.gst_available === "yes" &&
        !!data.gst &&
        data.gst.length === 15 &&
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{3}$/.test(data.gst)) ||
        data.gst_available !== "yes") &&
      (data.udyam_available === "yes"
        ? !!data.udyam_number &&
          udyamRegex.test(data.udyam_number) &&
          !!data.doi_udyam &&
          moment(data.doi_udyam, "YYYY-MM-DD", true).isValid()
        : true) &&
      !!data.pan &&
      !!data.email &&
      !!data.residence_pincode &&
      data.residence_pincode.length === 6 &&
      !!data.residential_type;

    setIsFormValid(isValid);
  }, [data]);

  return (
    <div className="personal-details-container">
      <h2 className="form-title">Personal Information</h2>
      <p className="form-subtitle">
        You're just a few steps away from your ideal loan!
      </p>
      <div className="personal-details-1">
        <div className="personal-details-input">
          <FormInputStyle2
            type="text"
            name="pan"
            isValid={!errors.pan}
            id="pan"
            minLength="10"
            maxLength="10"
            value={data.pan}
            onChange={(e) => {
              const inputValue = e.target.value.toUpperCase();
              if (/^[A-Z0-9]{0,10}$/.test(inputValue)) {
                handleDataChange("pan", inputValue);
              }
            }}
            required
            onBlur={() => handleBlur("pan")}
            label={"Pan Number"}
            inputMode="text"
            errorMessage={errors.pan}
          />

          <FormInputStyle2
            label="Email Address"
            value={data.email}
            onChange={(e) => {
              const inputValue = e.target.value;
              handleDataChange("email", inputValue);
            }}
            required
            onBlur={() => handleBlur("email")}
            isValid={!errors.email}
            errorMessage="Enter a valid email"
          />

          <FormInputStyle2
            type="text"
            name="residence_pincode"
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

          <FormSelectStyle2
            label="Residence Type"
            name="residential_type"
            value={data.residential_type}
            onChange={(value) => handleDataChange("residential_type", value)}
            options={residential_type_options}
            onBlur={() => handleBlur("residential_type")}
            isValid={!errors.residential_type}
            errorMessage={errors.residential_type}
          />

          {/* GST Section */}
          <GstRegistrationOptionv1
            errorMessage={errors.gst_available}
            errors={errors}
            data={data}
            handleDataChange={handleDataChange}
            handleBlur={handleBlur}
          />
        </div>

        <FormButtonStyle2
          text={isPanLoading || isFetchingAddress ? "Fetching" : "Continue"}
          onClick={handleContinue}
          disabled={!isFormValid || isPanLoading || isFetchingAddress}
          id="btn-personal-details-landing-v1"
          className="tracking-btn-personal-details-landing-v1"
        />
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
