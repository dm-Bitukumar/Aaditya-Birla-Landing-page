import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLead } from "../../store/app/appReducer";
import MobileVerification from "./Components/MobileVerification";
import OffersPage from "./Components/OffersPage";
import PANVerification from "./Components/PANVerification";
import PersonalDetailsPage from "./Components/PersonalDetailsPage";
import WorkDetailsPage from "./Components/WorkDetailsPage";
import OfferSearchPage from "./Components/OfferSearchPage";

const PreApprovedNew = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.app.lead); 
  const [step, setStep] = React.useState(1);

  const handleDataChange = (section, key, value) => {
    dispatch(setLead({
      ...userData,
      [section]: {
        ...userData[section],
        [key]: value,
      },
    }));
  };

  const steps = [
    {
      id: 1,
      component: (props) => (
        <MobileVerification
          {...props}
          userData={userData} 
          setUserData={handleDataChange} 
        />
      ),
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
      component: (props) => (
        <PersonalDetailsPage
          {...props}
          data={userData.personalDetails || {}}
          handleDataChange={(key, value) =>
            handleDataChange("personalDetails", key, value)
          }
          // setUserData={handleDataChange}
        />
      ),
    },
    {
      id: 5,
      component: (props) => (
        <WorkDetailsPage
          {...props}
          data={userData.workDetails || {}}
          handleDataChange={(key, value) =>
            handleDataChange("workDetails", key, value)
          }
        />
      ),
    },
    {
      id: 6,
      component: (props) => <OfferSearchPage {...props} />,
    },
  ];
  

  const handlePageRender = () => {
    const stepComponent = steps.find((s) => s.id === step);
    return stepComponent
      ? stepComponent.component({ setStep })
      : null;
  };

  return <div className="preapproved-new-container">{handlePageRender()}</div>;
};

export default PreApprovedNew;
