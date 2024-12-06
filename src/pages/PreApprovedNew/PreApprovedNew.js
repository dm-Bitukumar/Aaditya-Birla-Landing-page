import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLead  } from "../../store/app/appReducer";
import MobileVerification from "./Components/MobileVerification";
import OffersPage from "./Components/OffersPage";
import PANVerification from "./Components/PANVerification";
import PersonalDetailsPage from "./Components/PersonalDetailsPage";
import WorkDetailsPage from "./Components/WorkDetailsPage";
import OfferSearchPage from "./Components/OfferSearchPage";
import { useSearchParams } from "react-router-dom";

const lenderMappings = {
  1: { name: "L&T", lenderId: "662752eb65fdba1a48d6e482" },
  2: { name: "Prefr", lenderId: "662752eb65fdba1a48d6e478" },
  3: { name: "Niro", lenderId: "662752eb65fdba1a48d6e47e" },
  4: { name: "Aditya Birla Finance Limited", lenderId: "66b76539fadd84ed521dcd2a" },
  5: { name: "Olyv", lenderId: "674fed3da1ab07e55d9826ef" },
};

const PreApprovedNew = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.app.lead); 
  const [step, setStep] = React.useState(1);
  const [searchParams] = useSearchParams();
  const [leadId, setLeadId] = React.useState(null);
  const [utmMedium, setUtmMedium] = React.useState("");
  const [affId, setAffId] = React.useState("");

  useEffect(() => {
    const ldr = searchParams.get("ldr");

    if (ldr && lenderMappings[ldr]) {
      const lenderDetails = lenderMappings[ldr];

      dispatch(
        setLead({
          lenderId: lenderDetails.lenderId,
          lenderName: lenderDetails.name,
        })
      );
    } else {
      console.log("No valid lender ID found in the URL.");
    }

    const utmMediumParam = searchParams.get("utm_medium");
    const affIdParam = searchParams.get("aff_id");

    if (utmMediumParam) setUtmMedium(utmMediumParam);
    if (affIdParam) setAffId(affIdParam);
  }, [dispatch, searchParams]);

  const handleDataChange = (section, key, value) => {
    dispatch(
      setLead({
        ...userData,
        [section]: {
          ...userData[section],
          [key]: value,
        },
      })
    );
  };

  const offerSearchData = React.useMemo(
    () => ({
      lead_id: leadId,
      lender_id: userData?.lenderId || "",
      lender_name: userData?.lenderName || "",
      utm_medium: utmMedium || "",
      aff_id: affId || "",
    }),
    [leadId, userData, utmMedium, affId]
  );

  const offerSearchDatanew = React.useMemo(
    () => ({
      lender_id: userData?.lenderId || "",
      lender_name: userData?.lenderName || "",
      utm_medium: utmMedium || "",
      aff_id: affId || "",
    }),
    [ userData, utmMedium, affId]
  );

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
      component: (props) => (
        <OffersPage 
          {...props} 
          setLeadId={(id) => setLeadId(id)} 
        />
      ),
    },    
    {
      id: 3,
      component: (props) => (
        <PANVerification
          {...props}
          userData={userData} 
          setUserData={handleDataChange}
          leadId={leadId}
        />
      ),
    },
    
    {
      id: 4,
      component: (props) => {
        return (
          <PersonalDetailsPage
            {...props}
            data={userData.personalDetails || {}} 
            handleDataChange={(key, value) =>
              handleDataChange("personalDetails", key, value)
            }
            leadId={leadId}
          />
        );
      },
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
          leadId={leadId}
        />
      ),
    },
    {
      id: 6,
      component: (props) => (
        <OfferSearchPage 
          {...props} 
          leadId={leadId}
          offerSearchData={offerSearchData}
        />
      ),
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
