import React, { useState } from "react";
import MobileVerification from "./Components/MobileVerification";
import OffersPage from "./Components/OffersPage";
import PANVerification from "./Components/PANVerification";
import PersonalDetailsPage from "./Components/PersonalDetailsPage";
import WorkDetailsPage from "./Components/WorkDetailsPage";
import OfferSearchPage from "./Components/OfferSearchPage";

const PreApprovedNew = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    mobile: "",
    pan: "",
    personalDetails: {},
    workDetails: {},
    offers: [],
  });

  const steps = [
    {
      id: 1,
      component: (props) => <MobileVerification {...props} />,
    },
    {
      id: 2,
      component: (props) => <OffersPage {...props} />,
    },
    {
      id: 3,
      component: (props) => <PANVerification {...props} />,
    },
    {
      id: 4,
      component: (props) => <PersonalDetailsPage {...props} />,
    },
    {
      id: 5,
      component: (props) => <WorkDetailsPage {...props} />,
    },
    {
      id: 6,
      component: (props) => <OfferSearchPage {...props} />,
    },
  ];

  const handlePageRender = () => {
    const stepComponent = steps.find((s) => s.id === step);
    return stepComponent
      ? stepComponent.component({
          setStep,
          setUserData,
          userData,
        })
      : null;
  };

  return (
    <div className="preapproved-new-container">
      {handlePageRender()}
    </div>
  );
};

export default PreApprovedNew;
