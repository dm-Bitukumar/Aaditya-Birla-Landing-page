import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const uploadSuccess = useSelector((state) => state.app.uploadSuccess); // Get upload success state

  useEffect(() => {
    if (!uploadSuccess) {
      navigate("/business-loan/apply", { replace: true }); // Redirect back to UploadFiles
    }
  }, [uploadSuccess, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full bg-blue-500 py-2"></div> {/* Top bar */}
      <img src="/assets/img/logo.png" alt="DigitMoney" className="mt-6 w-36" />

      <div className="flex flex-col items-center text-center mt-12">
        <h2 className="text-2xl font-bold text-blue-600">Done!</h2>

        <div className="mt-4">
          <img src="/assets/icons/thumbs-up.png" alt="Success" className="h-12" />
        </div>

        <p className="mt-4 text-gray-600 text-sm px-6">
          Thank you for helping us with your details, our representative will contact you shortly.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
