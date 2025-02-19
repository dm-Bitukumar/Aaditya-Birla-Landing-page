import React, { useEffect, useState } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import FormButton from "../../../components/Buttons/FormButton";
import callApi from "../../../utility/apiCaller";
import { setUserClickData } from "../../../utility/setUserClickData";
import { toast } from "react-toastify";
import axios from "axios";

const UploadFiles = ({ formData, nextStep }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const allowedFileTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
  ];

  useEffect(() => {
    setUserClickData({ event_name: "upload-documents-page" });
  }, []);

  const handleFileChange = (event, key) => {
    const selectedFiles = Array.from(event.target.files);

    if (key === "bank_statement") {
      if (selectedFiles.length + files.bank_statement.length > 3) {
        toast.error("You can upload a maximum of 3 bank statement files.");
        return;
      }

      const validFiles = selectedFiles.filter((file) =>
        allowedFileTypes.includes(file.type)
      );
      if (validFiles.length !== selectedFiles.length) {
        toast.error(
          "Invalid file type. Only JPG, JPEG, PNG, and PDF are allowed."
        );
        return;
      }

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

    const uploadedPaths = [];
    for (const file of selectedFiles) {
      const bodyFormData = new FormData();
      bodyFormData.append("file", file);
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

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!formData || !formData.mobile || !formData.pancard) {
      toast.error("Missing required user details.");
      setIsSubmitting(false);
      return;
    }

    if (files.bank_statement.length < 1) {
      toast.error("Please upload at least one bank statement file.");
      setIsSubmitting(false);
      return;
    }

    const fileEntries = Object.entries(files).filter(
      ([_, file]) => file !== null && file.length !== 0
    );

    if (fileEntries.length !== 5) {
      toast.error("Please upload all files before submitting.");
      setIsSubmitting(false);
      return;
    }

    let uploadedFiles = {};

    try {
      for (const [docType, file] of fileEntries) {
        console.log("Uploading document:", docType);
        const fileUploadResponse = await uploadFile(file);

        if (!fileUploadResponse || fileUploadResponse.length === 0) {
          toast.error(`Upload failed for ${docType}`);
          setIsSubmitting(false);
          return;
        }
        uploadedFiles[`${docType}_file`] =
          docType === "bank_statement"
            ? fileUploadResponse
            : fileUploadResponse[0];
      }
      setUploadedFilePaths(uploadedFiles);
      toast.success("All files uploaded successfully!");

      const payload = {
        businessloanlead: {
          is_stage3_completed: true,
          contact_phone: formData?.mobile,
          pan_no: formData?.pancard,
          ...uploadedFiles,
        },
      };

      const leadResponse = await callApi(
        "v1/businessloanlead/new",
        "post",
        payload,
        "core"
      );

      if (leadResponse?.status === "Success") {
        const leadId = leadResponse.data.businessloanlead._id;
        localStorage.setItem("lead_id", leadId);
        toast.success("Lead successfully created!");
        nextStep();
      } else {
        toast.error("Error submitting lead data. Please try again.");
      }
    } catch (err) {
      toast.error("Error uploading files. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <img src="/assets/img/logo.png" alt="DigitMoney" className="mt-4 w-36" />

      <div className="mt-6 w-full max-w-md">
        <h2 className="text-lg font-normal text-gray-700 mb-2">
          Upload Documents
        </h2>

        {[
          { label: "Bank Statement", key: "bank_statement", multiple: true },
          { label: "GST/MSME Certificate", key: "gst_certificate" },
          { label: "Pan Card", key: "pan_card" },
          { label: "Aadhar Card", key: "aadhar_card" },
          { label: "Electricity Bill", key: "electricity_bill" },
        ].map(({ label, key, multiple }) => (
          <div key={key} className="mb-3">
            <div className="flex items-center justify-between w-full bg-white border border-gray-300 px-4 py-3 rounded-lg shadow-sm">
              <span className="text-sm font-medium text-gray-600">{label}</span>
              <input
                type="file"
                id={key}
                className="hidden"
                onChange={(e) => handleFileChange(e, key)}
                multiple={multiple}
              />
              <label
                htmlFor={key}
                className="px-4 py-2 bg-cyan-500 text-white text-sm font-semibold rounded cursor-pointer hover:bg-blue-600 transition"
              >
                {key === "bank_statement" || !files[key]
                  ? "Attach Files"
                  : "Change File"}
              </label>
            </div>

            {key === "bank_statement" && files[key].length > 0 && (
              <div className="text-xs text-gray-500 mt-2 px-2">
                {files[key].map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border p-2 rounded mt-1"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => removeFile(key, index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {key !== "bank_statement" && files[key] && (
              <div className="text-xs text-gray-500 mt-2 px-2 flex justify-between items-center">
                <span className="truncate">
                  Uploaded File: {files[key].name}
                </span>
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => removeFile(key)}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-center mt-6">
          <FormButton
            className="w-full max-w-xs bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Uploading..." : "SUBMIT"}
          </FormButton>
        </div>
      </div>
    </div>
  );
};

export default UploadFiles;
