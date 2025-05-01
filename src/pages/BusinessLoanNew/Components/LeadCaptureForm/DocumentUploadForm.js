import React, { useEffect, useState, useRef } from "react";
import "./DocumentUploadForm.css";
import _ from "lodash";
import axios from "axios";
import callApi from "../../../../utility/apiCaller";
import { setUserClickData } from "../../../../utility/setUserClickData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import FormButtonStyle2 from "../../../../components/Form/FormButtonStyle2";
import { Info, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

const DocumentUploadForm = ({ formData, setFormData, setCurrentStep }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOffer, setisOffer] = useState([]);
  const [params] = useSearchParams();
  const [leadId, setLeadId] = useState("");
  const [affId, setAffId] = useState("");
  const user = useSelector((state) => state.app.user);
  const lead = useSelector((state) => state.app.lead);
  const [uploadedFilePaths, setUploadedFilePaths] = useState({
    bank_statement_file: [],
    gst_certificate_file: "",
    pan_card_file: "",
    aadhar_card_file: "",
    electricity_bill_file: "",
  });
  const [files, setFiles] = useState({
    bank_statement: [],
    gst_certificate: null,
    pan_card: null,
    aadhar_card: null,
    electricity_bill: null,
  });
  const fileInputRefs = {
    bank_statement: useRef(null),
    gst_certificate: useRef(null),
    pan_card: useRef(null),
    aadhar_card: useRef(null),
    electricity_bill: useRef(null),
  };
  const navigate = useNavigate();
  const allowedFileTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "application/pdf",
  ];
  const MAX_FILE_SIZE_MB = 2;
  const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

  console.log("ID in document upload: ", formData._id);

  useEffect(() => {
    if (params.get("aff_id")) setAffId(params.get("aff_id"));
  }, [params]);

  const handleFileChange = (event, key) => {
    const selectedFiles = Array.from(event.target.files);

    if (key === "bank_statement") {
      if (selectedFiles.length + files.bank_statement.length > 3) {
        toast.error("You can upload a maximum of 3 bank statement files.");
        return;
      }

      const validFiles = selectedFiles.filter((file) => {
        if (!allowedFileTypes.includes(file.type)) {
          toast.error(`${file.name} is not a supported file type.`);
          return false;
        }
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`${file.name} exceeds 2MB limit.`);
          return false;
        }
        return true;
      });

      if (validFiles.length !== selectedFiles.length) return;

      setFiles((prevFiles) => ({
        ...prevFiles,
        bank_statement: [...prevFiles.bank_statement, ...validFiles],
      }));
    } else {
      const file = selectedFiles[0];
      if (!allowedFileTypes.includes(file.type)) {
        toast.error(
          "Invalid file type. Only JPG, JPEG, PNG, and PDF are allowed."
        );
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds 2MB limit.`);
        return;
      }
      setFiles((prevFiles) => ({ ...prevFiles, [key]: file }));
    }
  };

  const removeFile = (key, index = null) => {
    setFiles((prevFiles) => {
      if (key === "bank_statement") {
        return {
          ...prevFiles,
          bank_statement: prevFiles.bank_statement.filter(
            (_, i) => i !== index
          ),
        };
      } else {
        return { ...prevFiles, [key]: null };
      }
    });
    if (fileInputRefs[key]?.current) {
      fileInputRefs[key].current.value = "";
    }
  };

  const uploadFile = async (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) {
      console.error("No files selected!");
      return [];
    }

    if (!(selectedFiles instanceof FileList || Array.isArray(selectedFiles))) {
      console.warn("selectedFiles is not an array. Wrapping in an array.");
      selectedFiles = [selectedFiles];
    }
    console.log(formData);
    if (!formData._id) {
      console.error("leadId is required for file uploads.");
      return [];
    }

    const uploadedPaths = [];
    for (const file of selectedFiles) {
      const bodyFormData = new FormData();
      bodyFormData.append("file", file);
      bodyFormData.append("leadId", formData.leadId);
      console.log("Uploading file:", file.name, "for leadId:", formData.leadId);
      try {
        const res = await axios.post(
          "https://report-api.digitmoney.in/api/v1/upload/user-loan-documents/file-upload",
          // "http://localhost:8090/api/v1/upload/user-loan-documents/file-upload",
          bodyFormData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (!res.data.data || !res.data.data.file_path) {
          console.error("Upload failed for", file.name, "Response:", res.data);
          continue;
        }
        uploadedPaths.push(res.data.data.file_path);
      } catch (error) {
        console.error("Upload error for", file.name, ":", error);
      }
    }
    return uploadedPaths;
  };

  const fetchOffers = async (leadId) => {
    if (!leadId) return false;

    try {
      const loanOfferRes = await callApi(
        `v1/loan_offer/lead_id/${leadId}`,
        "get",
        {},
        "core",
        user.token
      );

      return loanOfferRes;
    } catch (err) {
      console.error("Error in offer fetching", err);
      toast.error("Something went wrong while fetching offers.");
      return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log("isSubmitting:", true);
    console.log(formData);
    if (!formData || !formData.mobile) {
      toast.error("Missing required user details.");
      setIsSubmitting(false);
      console.log("isSubmitting:", false);
      return;
    }

    if (files.bank_statement.length < 1) {
      toast.error("Please upload at least one bank statement file.");
      setIsSubmitting(false);
      console.log("isSubmitting:", false);
      return;
    }

    const fileEntries = Object.entries(files).filter(
      ([_, file]) => file !== null && file.length !== 0
    );

    if (fileEntries.length !== 5) {
      toast.error("Please upload all files before submitting.");
      setIsSubmitting(false);
      console.log("isSubmitting:", false);
      return;
    }

    let uploadedFiles = {};
    const S3_BASE_URL =
      "https://user-loan-documents.s3.ap-south-1.amazonaws.com/";

    try {
      console.log("Starting file upload process...");

      for (const [docType, file] of fileEntries) {
        console.log(`\nUploading document type: ${docType}`);
        console.log("File(s) to upload:", file);

        try {
          const fileUploadResponse = await uploadFile(
            Array.isArray(file) ? file : [file]
          );

          console.log(`Upload response for ${docType}:`, fileUploadResponse);

          if (!fileUploadResponse || fileUploadResponse.length === 0) {
            toast.error(`❌ Upload failed for ${docType}`);
            setIsSubmitting(false);
            console.log("isSubmitting set to:", false);
            return; // Optional: could use continue if you want to skip failed files instead of stopping
          }

          const formattedFilePath = Array.isArray(fileUploadResponse)
            ? fileUploadResponse.map((path) => `${S3_BASE_URL}${path}`)
            : [`${S3_BASE_URL}${fileUploadResponse}`];

          console.log(`Formatted file path for ${docType}:`, formattedFilePath);

          if (docType === "bank_statement") {
            uploadedFiles[`${docType}_file`] = formattedFilePath;
          } else {
            uploadedFiles[`${docType}_file`] = formattedFilePath[0];
          }

          console.log(`Uploaded file stored under key: ${docType}_file`);
        } catch (error) {
          console.error(`❌ Error uploading file for ${docType}:`, error);
          toast.error(`Upload error for ${docType}`);
          setIsSubmitting(false);
          return;
        }
      }

      console.log(
        "\nAll files uploaded. Final uploadedFiles object:",
        uploadedFiles
      );
      setUploadedFilePaths(uploadedFiles);
      toast.success("✅ All files uploaded successfully!");

      console.log("isSubmitting:", true);

      const payload = {
        businessloanlead: {
          is_stage4_completed: "true",
          contact_phone: formData?.mobile,
          ...uploadedFiles,
        },
      };
      console.log("Payload for API call:", payload);
      console.log("Form data:", formData);
      const leadResponse = await callApi(
        "v1/businessloanlead/new-v1",
        "post",
        payload,
        "core"
      );

      if (leadResponse?.status === "Success") {
        setUserClickData({
          event_name: "step4-file-upload-completed-for-business-loan-v1",
          user_id: formData.mobile || "unknown",
          affiliate_id: affId || "No Aff_id found",
        });
        const leadId = leadResponse.data.businessloanlead?.lead?._id;
        console.log("Lead ID:", leadId);
        localStorage.setItem("lead_id", leadId);
        toast.success("Lead successfully created!");

        try {
          await callApi(
            "v1/lead/process-lead-for-bl-to-docUpload",
            "post",
            {
              lead_id: leadId,
            },
            "core",
            user.token
          );

          try {
            console.log("DocUpload API call successful!");

            const fetchAndSetOffers = async () => {
              const firstResult = await fetchOffers(formData._id);
              if (firstResult && firstResult.status === "Success") {
                if (firstResult.data.offers.length > 0) {
                  await callApi(
                    "v1/sms/send-bl-lead-sms",
                    "post",
                    {
                      lead: formData,
                      offers: firstResult.data.offers,
                    },
                    "messaging",
                    user.token
                  );
                }
              }
            };

            await fetchAndSetOffers(); // <-- This was missing
          } catch (err) {
            console.warn("DocUpload API call failed:", err);
          }
        } catch (err) {
          console.warn("DocUpload API call failed:", err);
        }

        setUserClickData({
          event_name: "doc-file-upload-api-completed-for-business-loan-v1",
          user_id: formData.mobile || "unknown",
          affiliate_id: affId || "No Aff_id found",
        });

        try {
          await callApi(
            "v1/ican_api/bl-data-send-with-offers-to-ican_for_update",
            "post",
            {
              lead_id: leadId,
              is_document_upload: "Yes",
            },
            "core"
          );

          console.log("ICAN API call successful!");
        } catch (err) {
          console.warn("ICAN API call failed:", err);
        }
        await triggerCallCenterApi(leadId);
        setCurrentStep(5);
      } else {
        toast.error("Error submitting lead data. Please try again.");
      }
    } catch (err) {
      toast.error("Error uploading files. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
      console.log("isSubmitting:", false);
    }
  };

  const triggerCallCenterApi = async (leadId) => {
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
        const bank_statementOne = bankStatements[0] || "";
        const bank_statementTwo = bankStatements[1] || "";
        const bank_statementThree = bankStatements[2] || "";

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
          console.warn("Call Center API responded with non-200 status");
        }
      } else {
        console.warn("Lead details not found for Call Center API");
      }
    } catch (err) {
      console.error("Call Center API Call Failed:", err);
    }
  };

  const tooltipTexts = {
    bank_statement:
      "Please upload bank statement for current account of last 1 year",
    gst_certificate: "GST Certificate OR Udyam Certificate with Annexure",
    pan_card: "Original Pan card",
    aadhar_card: "Front and Back OR E-Aadhar",
    electricity_bill: "Latest Bill only",
  };

  return (
    <div className="personal-details-container">
      <h2 className="form-title">Upload Document's</h2>
      <p className="form-subtitle">
        You're just a few steps away from your ideal loan!
      </p>
      <div className="mt-2 w-full max-w-md">
        {[
          {
            label: "Bank Statement (12 Months)",
            key: "bank_statement",
            multiple: true,
          },
          { label: "GST/MSME Certificate", key: "gst_certificate" },
          { label: "Pan Card", key: "pan_card" },
          { label: "Aadhar Card", key: "aadhar_card" },
          { label: "Electricity Bill", key: "electricity_bill" },
        ].map(({ label, key, multiple }) => (
          <div key={key} className="mb-3">
            <div
              className={`bg-white border border-gray-300 px-3 py-2 rounded-lg shadow-sm w-full ${
                key === "electricity_bill" ? "items-start" : "items-center"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-medium text-gray-600 flex items-center gap-1 ${
                    key === "electricity_bill" ? "w-1/2 leading-tight" : ""
                  }`}
                >
                  {label}
                  <div className="relative group">
                    <Info size={14} className="text-gray-400 cursor-pointer" />
                    <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-1 w-max max-w-xs px-2 py-1 bg-gray-100 text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {tooltipTexts[key]}
                    </div>
                  </div>
                </span>

                <input
                  type="file"
                  id={key}
                  className="hidden"
                  ref={fileInputRefs[key]}
                  onChange={(e) => handleFileChange(e, key)}
                  multiple={multiple && key === "bank_statement"}
                />
                <label
                  htmlFor={key}
                  className="px-3 py-2 bg-white text-gray-900 text-xs font-normal rounded cursor-pointer border border-gray-800"
                >
                  Browse file
                </label>
              </div>

              {files[key] && (
                <div className="m-1 space-y-2">
                  {(key === "bank_statement" ? files[key] : [files[key]]).map(
                    (file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-2 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src="assets/img/pdf.png"
                            alt="PDF"
                            className="w-5 h-5"
                          />
                          <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                            {file.name}
                          </p>
                        </div>
                        <button
                          className="text-gray-500 hover:text-red-600"
                          onClick={() =>
                            key === "bank_statement"
                              ? removeFile(key, index)
                              : removeFile(key)
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <FormButtonStyle2
          text="Get My Offers"
          onClick={handleSubmit}
          id="btn-document-upload"
          className="tracking-btn-document-upload"
        />
      </div>
    </div>
  );
};

export default DocumentUploadForm;
