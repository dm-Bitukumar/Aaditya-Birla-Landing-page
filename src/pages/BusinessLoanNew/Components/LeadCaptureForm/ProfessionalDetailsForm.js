import React, { useEffect, useState, useRef } from "react";
import "./ProfessionalDetailsForm.css";
import callApi from "../../../../utility/apiCaller";
import { toast } from "react-toastify";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import FormButtonStyle2 from "../../../../components/Form/FormButtonStyle2";
import { setUserClickData } from "../../../../utility/setUserClickData";
import { useSearchParams } from "react-router-dom";
import industryOptions from "../../../../constants/industries.json";
import BusinessAddressBox from "./BusinessAddressBox";
import FormSelectStyleBLv1 from "../../../../components/Form/FormSelectStyleBLv1";
import { setLead, setOffers } from "../../../../store/app/appReducer";
import axios from "axios";

const ProfessionalDetailsForm = ({ formData, setFormData, setCurrentStep }) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [leadId, setLeadId] = useState(null);
  const user = useSelector((state) => state.app.user);
  const [isFinished, setIsFinished] = useState(false);
  const [leadName, setLeadName] = useState("Customer");
  const [affId, setAffId] = useState("");
  const [params] = useSearchParams();
  const offers = useSelector((state) => state.app.offers);
  const [leadSubmitSuccess, setLeadSubmitSuccess] = useState(false);
  const callCountRef = useRef(0);
  const callCenterApiCalledRef = useRef(false);
  const icanApiCalledRef = useRef(false);
  const [hasTriggeredCallCenterApi, setHasTriggeredCallCenterApi] =
    useState(false);
  const [data, setData] = useState({
    annual_turnover: "",
    industry: null,
    confirm_business_address: "",
    address_type: "",
    ownership: "",
  });

  useEffect(() => {
    if (params.get("aff_id")) setAffId(params.get("aff_id"));
  }, [params]);

  const handleDataChange = (keyName, keyValue) => {
    setData((prevData) => ({ ...prevData, [keyName]: keyValue }));
    setFormData((prev) => ({ ...prev, [keyName]: keyValue }));
  };

  const turnoverOptions = [
    { value: "<10Lacs", label: "Less than 10 Lacs" },
    { value: "10Lacs-40Lacs", label: "10 Lacs - 40 Lacs" },
    { value: "40Lacs-1Cr", label: "40 Lacs - 1 Crore" },
    { value: "1Cr-3Cr", label: "1 Crore - 3 Crore" },
    { value: "3Cr-7Cr", label: "3 Crore - 7 Crore" },
    { value: ">7Cr", label: "More than 7 Crore" },
  ];

  const ownershipOptions = [
    { value: "Sole Proprietorship", label: "Sole Proprietorship" },
    { value: "Partnership", label: "Partnership" },
    { value: "Private Limited", label: "Private Limited Company (PVT LTD)" },
    { value: "LLP", label: "Limited Liability Partnership (LLP)" },
    { value: "Other", label: "Other" },
  ];

  const handleBlur = (keyName) => {
    if (data[keyName] === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [keyName]: "This field is required.",
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[keyName];
        return newErrors;
      });
    }
  };

  // Validation
  const fieldsToValidate = [
    { key: "annual_turnover", value: data.annual_turnover },
    { key: "industry", value: data.industry },
    { key: "confirm_business_address", value: data.confirm_business_address },
    { key: "address_type", value: data.address_type },
    { key: "ownership", value: data.ownership },
  ];

  const invalidFields = fieldsToValidate
    .filter((field) => !field.value)
    .map((field) => field.key);

  if (invalidFields.length > 0) {
    console.log("Invalid fields:", invalidFields);
  } else {
    console.log("Form is valid");
  }

  useEffect(() => {
    if (!leadSubmitSuccess || !leadId) return;

    const intervalId = setInterval(async () => {
      console.log(`Call count before fetchOffers: ${callCountRef.current}`);

      if (callCountRef.current < 3) {
        await fetchOffers();
        callCountRef.current += 1;
      } else {
        clearInterval(intervalId);

        if (
          !icanApiCalledRef.current &&
          formData.is_stage4_completed === false
        ) {
          console.log("Triggering ican API");
          icanApiCalledRef.current = true;

          try {
            await callApi(
              "v1/ican_api/bl-data-send-with-offers-to-ican_for_update",
              "post",
              {
                lead_id: leadId,
                is_document_upload: "",
              },
              "core"
            );
          } catch (err) {
            console.error("ican API Call Failed:", err.message || err);
          }
        }

        if (
          !hasTriggeredCallCenterApi &&
          offers.length > 0 &&
          formData.is_stage4_completed === false
        ) {
          setHasTriggeredCallCenterApi(true);
          triggerCallCenterApi();
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [leadSubmitSuccess, offers]);

  const fetchOffers = async () => {
    console.log("fetchOffers() triggered");
    if (!leadId) {
      return;
    }

    try {
      console.log(`Fetching offers for leadId: ${leadId}`);
      const res = await callApi(
        `v1/loan_offer/lead_id/${leadId}`,
        "get",
        {},
        "core"
      );

      if (res.status === "Success") {
        dispatch(setOffers(res.data.offers ?? []));
        if (res.data.lead?.all_responses) {
          setIsFinished(
            res.data.lead?.all_responses === res.data.lead?.total_response
          );
        }

        setLeadName(res.data.lead?.contact_name ?? "Customer");
        console.log("Fetched lead name:", res.data.lead?.contact_name);
      } else {
        console.warn("Offer API did not return success:", res);
      }
    } catch (err) {
      console.error("fetchOffers API Call Failed:", err);
    }
  };

  const triggerCallCenterApi = async () => {
    try {
      console.log("triggerCallCenterApi");

      const leadDetailsResponse = await callApi(
        "v1/lead/list",
        "post",
        {
          filters: { _id: leadId },
        },
        "core"
      );

      if (
        leadDetailsResponse.status === "Success" &&
        Array.isArray(leadDetailsResponse.data?.leadList) &&
        leadDetailsResponse.data.leadList.length > 0
      ) {
        const leadDetails = leadDetailsResponse.data.leadList[0];

        const bankStatements = leadDetails.bank_statement_file || [];
        const bank_statementOne =
          bankStatements.length > 0 ? bankStatements[0] : "";
        const bank_statementTwo =
          bankStatements.length > 1 ? bankStatements[1] : "";
        const bank_statementThree =
          bankStatements.length > 2 ? bankStatements[2] : "";

        const payload = {
          leadid: leadDetails._id || "",
          name: leadDetails.contact_name || "",
          phonenumber: leadDetails.contact_phone || "",
          pan: leadDetails.pancard || "",
          email: leadDetails.contact_email || "",
          dob: leadDetails.dob ? leadDetails.dob.split("T")[0] : "",
          residence_pincode: leadDetails.pincode || "",
          residence_type: leadDetails.residence_type || "",
          gst_number: leadDetails.gst || "",
          udyam_number: leadDetails.udyamno || "",
          annual_turnover: leadDetails.annual_turnover || "",
          industry: leadDetails.industry || "",
          business_address: leadDetails.work_address1 || "",
          address_type: leadDetails.business_type || "",
          company_type: leadDetails.ownership || "",
          bank_statementOne,
          bank_statementTwo,
          bank_statementThree,
          electricity_bill: leadDetails.electricity_bill_file?.[0] || "",
          gst_certificate: leadDetails.gst_certificate_file || "",
          pan_card: leadDetails.pan_card_file || "",
          aadhar_card: leadDetails.aadhar_card_file || "",
        };

        console.log("📨 Sending data to Call Center API:", payload);

        const callCenterApiResponse = await axios.post(
          "https://api.digitmoney.in/new-api/callcenter-bl.php",
          payload
        );

        console.log("Call Center API Response:", callCenterApiResponse.data);

        if (callCenterApiResponse.status === 200) {
          console.log("Call Center API triggered successfully");
        } else {
          console.log(callCenterApiResponse.status);
          callCenterApiCalledRef.current = false;
        }
      } else {
        console.warn("Lead details not found for Call Center API");
        callCenterApiCalledRef.current = false;
      }
    } catch (err) {
      console.error("Call Center API Call Failed:", err);
      callCenterApiCalledRef.current = false;
    }
  };

  const isFormValid = invalidFields.length === 0;

  const handleContinue = async () => {
    if (data.confirm_business_address) {
      const updatedFormData = {
        work_address1: data.confirm_business_address,
        annual_turnover: data.annual_turnover,
        industry: data.industry,
        business_type: data.address_type,
        ownership: data.ownership,
      };

      setFormData((prev) => ({
        ...prev,
        ...updatedFormData,
      }));

      console.log("Setting form data:", updatedFormData);
    }

    if (isFormValid) {
      const payload = {
        businessloanlead: {
          contact_phone: formData.mobile,
          pan_no: formData.pancard,
          work_address1: data.confirm_business_address,
          business_type: data.address_type,
          ownership: data.ownership,
          annual_turnover: data.annual_turnover,
          industry: data.industry,
          is_stage2_completed: "true",
          leadId: leadId,
        },
      };

      console.log("Payload:", payload);

      try {
        const leadCreateResponse = await callApi(
          "v1/businessloanlead/new-v1",
          "post",
          payload,
          "core"
        );

        if (leadCreateResponse.status === "Success") {
          toast.success("Data saved successfully.");
          setUserClickData({
            event_name: "step2-business-loan-page-v1-completed",
            user_id: formData.mobile || "unknown",
            affiliate_id: affId || "No Aff_id found",
          });

          setUserClickData({
            event_name: "professional-details-submit-for-business-loan-page-v1",
            user_id: formData.mobile || "No User ID found here",
            affiliate_id: affId || "No Aff_id found",
          });

          const _leadId = leadCreateResponse.data.businessloanlead?.lead?._id;
          setLeadId(_leadId); // update state

          try {
            console.log(`Submitting Lead API for leadId: ${_leadId}`);
            const leadSubmitResponse = await callApi(
              "v1/lead/business-lead",
              "post",
              { lead_id: _leadId },
              "core",
              user.token
            );
            console.log("Lead API Response:", leadSubmitResponse);

            if (
              leadSubmitResponse.status === "Success" &&
              leadSubmitResponse.data
            ) {
              setLeadSubmitSuccess(true);
              await callApi(
                "v1/businessloanlead/new-v1",
                "post",
                {
                  businessloanlead: {
                    contact_phone: formData.mobile,
                    is_stage3_completed: true,
                  },
                },
                "core"
              );
              setCurrentStep(5);
            } else {
              console.warn(
                "Lead API did not return success:",
                leadSubmitResponse
              );
            }
          } catch (err) {
            console.error("Second API Call Failed:", err.message || err);
          }
        } else {
          console.warn(
            "Failed to update business loan lead:",
            leadCreateResponse
          );
          toast.error("Failed to update data.");
        }
      } catch (err) {
        console.error("API Error:", err.message || err);
        toast.error("An error occurred while updating the data.");
      }
    } else {
      setErrors({
        annual_turnover: !data.annual_turnover ? "Required" : "",
        industry: !data.industry ? "Required" : "",
        confirm_business_address: !data.confirm_business_address
          ? "Required"
          : "",
        address_type: !data.address_type ? "Required" : "",
        ownership: !data.ownership ? "Required" : "",
      });
    }
  };

  return (
    <div className="personal-details-container">
      <h2 className="form-title">Professional information</h2>
      <p className="form-subtitle">
        You're just a few steps away from your ideal loan!
      </p>
      <div className="professional-details-1">
        <div className="professional-details-input">
          <FormSelectStyleBLv1
            label="Annual Turnover"
            name="annual_turnover"
            options={turnoverOptions}
            value={data.annual_turnover}
            onChange={(value) => handleDataChange("annual_turnover", value)}
            onBlur={() => handleBlur("annual_turnover")}
            isValid={!errors.annual_turnover}
            errorMessage={errors.annual_turnover}
          />

          <FormSelectStyleBLv1
            label="Industry"
            name="industry"
            options={industryOptions}
            value={data.industry}
            onChange={(value) => handleDataChange("industry", value)}
            isValid={!errors.industry}
            errorMessage={errors.industry}
          />
          <BusinessAddressBox
            data={{
              ...formData,
              confirm_business_address: formData.confirm_business_address || "",
            }}
            handleDataChange={handleDataChange}
          />
          <FormSelectStyleBLv1
            label="Company Type"
            name="ownership"
            options={ownershipOptions}
            value={data.ownership}
            onChange={(value) => handleDataChange("ownership", value)}
            onBlur={() => handleBlur("ownership")}
            isValid={!errors.ownership}
            errorMessage={errors.ownership}
          />
        </div>
        <FormButtonStyle2
          text="Get My Offers"
          onClick={handleContinue}
          disabled={!isFormValid}
          id="btn-professional-details-landing-v1"
          className="tracking-btn-professional-details-landing-v1"
        />
      </div>
    </div>
  );
};

export const getProfessionalFormData = () => {
  const data = {
    companyName: document.getElementById("companyName")?.value || "",
    companyType: document.getElementById("companyType")?.value || "",
    workEmail: document.getElementById("workEmail")?.value || "",
    monthlyIncome: document.getElementById("monthlyIncome")?.value || "",
    work_pincode: document.getElementById("work_pincode")?.value || "",
  };
  console.log("🔄 Collected Professional Form Data on Back:", data);
  return data;
};

export default ProfessionalDetailsForm;
