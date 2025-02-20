import { useState, useEffect, useRef } from "react";
import HeadBar from "../../components/Static/HeadBar";
import StepWizard from "react-step-wizard";
import ApplyFormStep1 from "./components/ApplyFormStep1";
import ApplyFormStep2 from "./components/ApplyFormStep2";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OfferDetailsSegment from "./components/OfferDetailsSegment";
import UploadFiles from "./components/UploadFiles";
import callApi from "../../utility/apiCaller";

let noTransitions = {
  enterRight: "",
  enterLeft: "",
  exitRight: "",
  exitLeft: "",
};

const BusinessLoanApply = () => {
  const user = useSelector((state) => state.app.user);
  const navigate = useNavigate();
  const location = useLocation();
  const stepWizardRef = useRef(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    return (
      location.state || {
        full_name: "",
        pancard: "",
        mobile: "",
        gst: "",
        udyam_number: "",
        work_address1: "",
      }
    );
  });

  useEffect(() => {
    if (!user) {
      navigate("/business-loan", { replace: true });
    } else if (formData.mobile && formData.pancard) {
      fetchLeadStatus();
    }
  }, [user, formData.mobile, formData.pancard]);

  const fetchLeadStatus = async () => {
    try {
      const res = await callApi(
        "v1/businessloanlead/new",
        "post",
        {
          businessloanlead: {
            contact_phone: formData.mobile,
            contact_name: formData.full_name,
            pan_no: formData.pancard,
          },
        },
        "core"
      );

      if (res.status === "Success" && res.data?.businessloanlead?.lead) {
        const {
          _id,
          is_stage1_completed,
          is_stage2_completed,
          is_stage3_completed,
          work_address1,
          contact_name,
          udyam_number,
          gst,
          is_pan_mobile_verify_completed,
        } = res.data.businessloanlead.lead;
        console.log("Lead status fetched:", {
          _id,
          is_stage1_completed,
          is_stage2_completed,
          is_stage3_completed,
          work_address1,
          contact_name,
          udyam_number,
          gst,
          is_pan_mobile_verify_completed,
        });

        let startStep = 1;

        if (is_stage3_completed === "true") {
          navigate(`/business-loan/offer?lid=${_id}`, {
            state: {
              ...formData,
              _id,
              udyam_number: udyam_number || formData.udyam_number,
              gst: gst || formData.gst,
              full_name: contact_name || formData.full_name,
              work_address1: work_address1 || formData.work_address1,
              is_pan_mobile_verify_completed:
                is_pan_mobile_verify_completed ||
                formData.is_pan_mobile_verify_completed ||
                "false",
            },
          });
          return;
        } else if (is_stage2_completed === "true") {
          startStep = 3;
        } else if (is_stage1_completed === "true") {
          startStep = 2;
        }

        setFormData((prev) => ({
          ...prev,
          _id,
          udyam_number: udyam_number || prev.udyam_number,
          gst: gst || prev.gst,
          full_name: contact_name || prev.full_name,
          work_address1: work_address1 || prev.work_address1,
          is_pan_mobile_verify_completed:
            is_pan_mobile_verify_completed ||
            prev.is_pan_mobile_verify_completed ||
            "true",
        }));

        setStep(startStep);

        setTimeout(() => {
          if (stepWizardRef.current) {
            stepWizardRef.current.goToStep(startStep);
          }
        }, 100);
      }
    } catch (error) {
      console.error("Failed to fetch lead status:", error);
    }
  };

  return (
    <div className={"personal-loan-container"} style={{ maxHeight: "100vh" }}>
      <HeadBar />
      <StepWizard
        instance={(wizard) => (stepWizardRef.current = wizard)}
        transitions={noTransitions}
        initialStep={1}
        onStepChange={({ activeStep }) => setStep(activeStep)}
      >
        <ApplyFormStep1 formData={formData} setFormData={setFormData} />
        <ApplyFormStep2 formData={formData} setFormData={setFormData} />
        <UploadFiles formData={formData} setFormData={setFormData} />
        <OfferDetailsSegment formData={formData} setFormData={setFormData} />
      </StepWizard>
    </div>
  );
};

export default BusinessLoanApply;
