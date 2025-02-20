import React from "react";

const ConfirmationPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative">
      <div className="absolute top-12">
        <img src="/assets/img/logo.png" alt="DigitMoney" className="w-36" />
      </div>

      <div className="flex flex-col items-center text-center mt-24">
        <h2 className="text-4xl font-extrabold text-cyan-500">Done!</h2>

        <div className="mt-4">
          <img src="/assets/icons/thumbs-up.jpg" alt="Success" className="h-12" />
        </div>

        <p className="mt-4 text-gray-600 text-lg px-4 m-5">
          Thank you for helping us with your details, our representative will contact you shortly.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
