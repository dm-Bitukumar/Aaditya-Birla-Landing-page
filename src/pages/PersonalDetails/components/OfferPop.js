import React from "react";
import FormButton from "../../../components/Buttons/FormButton";
const OfferPop = ({ show, setShow, offer }) => {
  const handleClick = () => {
    console.log(123);
    setShow(false);
    var win = window.open(offer.app_url, "_blank");
    win.focus();
  };

  return (
    <div className="">
      <div className="w-full h-full px-4 py-3 rounded bg-[#fff]">
        <p>
          Your Privacy is important to us, and we safeguard your personal
          information. To process your personal loan application today, we
          required verification of your credit information <br /> please click
          <b> "Agree" </b> on the following screen to speed up the loan process
          and receive Funds today.
        </p>
        <div className="flex items-center justify-center">
          <FormButton className={"!w-24"} small onClick={handleClick}>
            continue
          </FormButton>
        </div>
      </div>
    </div>
  );
};

export default OfferPop;
