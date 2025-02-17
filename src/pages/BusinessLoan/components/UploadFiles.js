import React, { useEffect, useState } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import FormButton from "../../../components/Buttons/FormButton";
import { useDispatch, useSelector } from "react-redux";
import callApi from "../../../utility/apiCaller";
import { setUserClickData } from "../../../utility/setUserClickData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sourceConvert } from "../../../utility/commonUtils";
import { useSearchParams } from "react-router-dom";

const UploadFiles = ({ nextStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lead = useSelector((state) => state.app.lead);
  const user = useSelector((state) => state.app.user);
  const [leadId, setLeadId] = useState(null);
  const [source, setSource] = useState("");
  const [params] = useSearchParams();
  const [files, setFiles] = useState({
    bank_statement: null,
    gst_certificate: null,
    pan_card: null,
    aadhar_card: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
  }, [params]);

  useEffect(() => {
    if (lead.stepDone === 2) {
      submitLeadData();
    }
  }, [lead]);

  const submitLeadData = async () => {
    setUserClickData({ event_name: "upload-documents-page" });

    try {
      const trackId = localStorage.getItem("TRACK_ID");
      const res = await callApi(
        `v1/lead/${lead._id}/update-lead`,
        "post",
        {
          lead: {
            ...lead,
            tracking_id: trackId,
            gst: lead.gst_no,
            turnover: lead.turnover,
            business_vintage: lead.company_age,
            utm_medium: lead.utm_medium,
            is_data_filled: true,
            utm_medium: sourceConvert(source),
          },
        },
        "core",
        user.token
      );

      if (res.status === "Success" && res.data.lead) {
        setLeadId(res.data.lead._id);
      }
    } catch (err) {
      //   toast.error("Error submitting data.");
      console.log(err);
    }
  };

  const handleFileChange = (event, key) => {
  const file = event.target.files[0];

  if (file) {
    if (!allowedFileTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPG, JPEG, PNG, and PDF are allowed.");
      return;
    }

    setFiles((prevFiles) => ({ ...prevFiles, [key]: file }));
  }
};

  const handleSubmit = async () => {
    setUserClickData({ event_name: "upload-documents-page" });

    if (
      !files.bank_statement ||
      !files.gst_certificate ||
      !files.pan_card ||
      !files.aadhar_card
    ) {
      toast.error("Please upload all files before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("bank_statement", files.bank_statement);
      formData.append("gst_certificate", files.gst_certificate);
      formData.append("pan_card", files.pan_card);
      formData.append("aadhar_card", files.aadhar_card);

      const res = await callApi(
        `v1/upload-files/${leadId}`,
        "post",
        formData,
        "core",
        user.token
      );

      if (res.status === "Success") {
        toast.success("Files uploaded successfully!");
        nextStep(); // Proceed to ConfirmationPage only if API is successful
      } else {
        toast.error("File upload failed. Please try again.");
      }
    } catch (err) {
      toast.error("Error uploading files. Please try again.");
      nextStep();
      console.log(err);
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

        {/* File Upload Fields */}
        {[
          { label: "Bank Statement", key: "bank_statement" },
          { label: "GST/MSME Certificate", key: "gst_certificate" },
          { label: "Pan Card", key: "pan_card" },
          { label: "Aadhar Card", key: "aadhar_card" },
        ].map(({ label, key }) => (
          <div key={key} className="mb-3">
            <div className="flex items-center justify-between w-full bg-white border border-gray-300 px-4 py-3 rounded-lg shadow-sm">
              <span className="text-sm font-medium text-gray-600">{label}</span>
              <input
                type="file"
                id={key}
                className="hidden"
                onChange={(e) => handleFileChange(e, key)}
              />
              <label
                htmlFor={key}
                className="px-4 py-2 bg-cyan-500 text-white text-sm font-semibold rounded cursor-pointer hover:bg-blue-600 transition"
              >
                {files[key] ? "Change File" : "Attach File"}
              </label>
            </div>

            {files[key] && (
              <div className="text-xs text-gray-500 mt-2 px-2 truncate max-w-full">
                Uploaded File: {files[key].name}
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
