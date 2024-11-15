import React from 'react';

const BajajFinservPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-gray-800">
      <div
        className="w-full max-w-sm"
        style={{
          height: '15px',
          borderRadius: '5px',
          backgroundColor: '#13c1fb',
          margin: '-3.5px auto',
          marginBottom: '20px',
        }}
      ></div>

      <div className="flex flex-col items-center text-center w-full max-w-sm p-4">
        <img class="mb-1" src="assets/img/logo.png" alt="" height="30" />

        <div className="mt-24 mb-4 flex items-center justify-center">
          <img
            className="mb-1 h-12 w-12"
            src="assets/img/check-mark.png"
            alt="Check Mark"
          />
        </div>

        <h2 className="text-md font-semibold mb-4">Thank you</h2>
        <p className="text-black font-medium mb-4 text-sm px-4">
          You will shortly receive a call from Bajaj Finserv Loan Advisor who
          will quickly help you with your application & initiate disbursal.
        </p>
        <p className="text-black mb-4 text-sm px-4">
          Please keep the following documents readily available to expedite
          your application process
        </p>

        <div className="flex justify-center space-x-3 text-black font-medium text-sm">
          <span>Pan Card</span>
          <span>|</span>
          <span>Aadhar Card</span>
          <span>|</span>
          <span>Address Proof</span>
        </div>
      </div>
    </div>
  );
};

export default BajajFinservPage;
