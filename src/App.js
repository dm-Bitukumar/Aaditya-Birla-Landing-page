import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage/Homepage";
import LenderPage from "./pages/LenderPage/LenderPage";
import { Route, useLocation } from "react-router";
import PersonalLoan from "./pages/PersonalLoan/PersonalLoan";
import PersonalLoanV2 from "./pages/PersonalLoanV2/PersonalLoanV2";
import PersonalDetails from "./pages/PersonalDetails/PersonalDetails";
import PersonalDetailsV2 from "./pages/PersonalDetailsV2/PersonalDetailsV2";
import PreApprovedLoan from "./pages/PAO/PreApprovedLoan";
import BusinessLoan from "./pages/BusinessLoan/BusinessLoan";
import BusinessLoanNew from "./pages/BusinessLoanNew/LandingPage";
import BusinessLoanApply from "./pages/BusinessLoan/BusinessLoanApply";
import Term from "./pages/Term";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import OffersPage from "./pages/Offers/Offerspage";
import OffersPageNew from "./pages/OffersNew/Offerpagenew";
import PreLoan from "./pages/PreApprovedLoan/PreApprovedLoan";
import { v4 as uuidv4 } from "uuid";
import { SESSION_ID, TRACK_ID } from "./utility/enum";
import callApi from "./utility/apiCaller";
import { saveMetaData } from "./utility/setUserClickData";
import New from "./pages/PreApprovedLoan/components/New/New";
import NewForm from "./pages/PreApprovedLoan/components/New/NewForm";
import PreApprove from "./pages/PreApprove/PreApprove";
import NiroPersonalLoan from "./pages/NiroPersonalLoan/NiroPersonalLoan";
import PreapprovedOffer from "./pages/PreapprovedOffer/PreapprovedOffer";
import PreApprovedNew from "./pages/PreApprovedNew/PreApprovedNew";
import OfferDetailsSegmentNiro2 from "./pages/NiroPersonalDetail/components/OfferDetailsSegmentNiro2";
import LtPersonalLoan from "./pages/L&TPersonalLoan/L&TPersonalLoan";
import AdityaBirlaPersonalLoan from "./pages/AdityaBirlaPersonalLoan/AdityaBirlaPersonalLoan";
import OfferDetailsSegment from "./pages/AdityaBirlaPersonalLoan/components/OfferDetailsSegment";
import CheckOffers from "./pages/CheckOffer/PreApprovedLoan";
import PreapprovedOfferAbfl from "./pages/PreapprovedOfferAbfl/PreapprovedOfferAbfl";
import BajajFinserv from "./pages/BajajFinserv";
import CheckOffers_v2 from "./pages/CheckOffer_v2/CheckOffers_v2";
import OffersPage_v2 from "./pages/Offers_v2/Offerspage_v2";
import NewPreapproveOffersPage from "./pages/NewPreaaprovedOffersFlow/NewPreapproveOffers";
import BusinessLoanOld from "./pages/BusinessLoanOld/OldBusinessLoan";
import BusinessApplyOld from "./pages/BusinessLoanOld/BusinessLoanApply";
import BusinessOfferDetailsSegment from "./pages/BusinessLoan/components/OfferDetailsSegment";
import ConfirmationPage from "./pages/BusinessLoan/components/ConfirmationPage";
import LandingPage_v1 from "./pages/LandingPage_v1/LandingPage";
import LandingPage_v3 from "./pages/LandingPage_v3/LandingPage";
import LandingPage_v5 from "./pages/LandingPage_v5/LandingPage";
import OfferPage_v1 from "./pages/LandingPage_v1/Components/LeadCaptureForm/OfferSection/OfferPageWithLeadId";
import OfferPage_v3 from "./pages/LandingPage_v3/Components/LeadCaptureForm/OfferSection/OfferPageWithLeadId";
import OfferPage_v5 from "./pages/LandingPage_v5/Components/LeadCaptureForm/OfferSection/OfferPageWithLeadId";
import OfferPage_bl from "./pages/BusinessLoanNew/Components/LeadCaptureForm/OfferSection/OfferPageWithLeadId";
import CheckOffers_v3 from "./pages/CheckOffer_v3/LandingPage";
import OfferCheck_v1 from "./pages/OfferCheck_v1/LandingPage";
import OfferCheck_v2 from "./pages/OfferCheck_v2/LandingPage";
import OfferCheck_v3 from "./pages/OfferCheck_v3/LandingPage";
import CheckOffers_v4 from "./pages/CheckOffer_v4/LandingPage";

function App() {
  const location = useLocation();
  const [path, setPath] = useState("");
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const trackId = localStorage.getItem(TRACK_ID);
    const sessionId = sessionStorage.getItem(SESSION_ID);
    if (!sessionId) {
      sessionStorage.setItem(SESSION_ID, uuidv4());
    }
    if (!trackId) {
      localStorage.setItem(TRACK_ID, uuidv4());
    }
    setTimeout(() => {
      saveMetaData();
    }, 100);
  }, []);

  useEffect(() => {
    if (location?.pathname) {
      setPath(location.pathname);
    }
  }, [location?.pathname]);

  useEffect(() => {
    const setTime = setInterval(() => {
      if (path) {
        if (process.env.NODE_ENV !== "development") sessionTrack(path);
      }
    }, 5000);

    return () => clearTimeout(setTime);
  }, [path]);

  async function sessionTrack(path) {
    const trackId = localStorage.getItem(TRACK_ID);
    const sessionId = sessionStorage.getItem(SESSION_ID);
    await callApi(
      `v1/pages/ping/${sessionId}`,
      "post",
      {
        analytics: {
          path,
          user_id: "",
          tracking_id: trackId,
          session_id: sessionId,
        },
      },
      "jasoos"
    );
  }

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/lenders"} element={<LenderPage />} />
        <Route path={"/personal-loan"} element={<PersonalLoan />} />
        <Route path={"/personal-loan-v2"} element={<PersonalLoanV2 />} />
        <Route path={"/apply"} element={<PersonalDetails />} />
        <Route path={"/apply-v2"} element={<PersonalDetailsV2 />} />
        <Route path={"/pao"} element={<PreApprovedLoan />} />
        <Route path={"/offers"} element={<OffersPage />} />
        <Route path={"/offersv2"} element={<OffersPageNew />} />
        <Route path={"/offers-v2"} element={<OffersPage_v2 />} />

        <Route path={"/rtg"} element={<PreLoan />} />

        {/* New Landing Pages */}
        <Route path={"/personal-loan-v3"} element={<LandingPage_v1 />} />
        <Route path={"/personal-loan-v4"} element={<LandingPage_v3 />} />
        <Route path={"/personal-loan-v5"} element={<LandingPage_v5 />} />
        <Route path={"/offer-page-v1"} element={<OfferPage_v1 />} />
        <Route path={"/offer-page-v3"} element={<OfferPage_v3 />} />
        <Route path={"/offer-page-v5"} element={<OfferPage_v5 />} />
        <Route path={"/offer-page-bl"} element={<OfferPage_bl />} />

        {/* Business Loan */}
        <Route path={"/business-loan"} element={<BusinessLoan />} />
        <Route path={"/business-loan-v1"} element={<BusinessLoanNew />} />
        <Route path={"/business-loan/apply"} element={<BusinessLoanApply />} />
        <Route
          path={"/business-loan/offer"}
          element={<BusinessOfferDetailsSegment />}
        />
        <Route path={"/business-loan-old"} element={<BusinessLoanOld />} />
        <Route
          path={"/business-loan-old/apply"}
          element={<BusinessApplyOld />}
        />
        <Route
          path={"/business-loan/confirmation"}
          element={<ConfirmationPage />}
        />

        <Route
          path={"/personal-loan/confirmation"}
          element={<ConfirmationPage />}
        />
        <Route path="/terms" element={<Term />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/preapprove" element={<PreApprove />} />
        <Route path="/loan-offers" element={<PreApprovedNew />} />
        <Route path="/fb/lp01" element={<NiroPersonalLoan />} />
        <Route path="/pa-lt" element={<LtPersonalLoan />} />
        <Route path="/pa-ab" element={<AdityaBirlaPersonalLoan />} />
        <Route path="/abfl-offer" element={<PreapprovedOfferAbfl />} />
        <Route
          path="/new-loan"
          element={<New pages={pages} setPages={setPages} />}
        />
        <Route path={"/check-offers-v3"} element={<CheckOffers />} />
        <Route path={"/check-offers"} element={<CheckOffers_v3 />} />
        <Route path={"/check-offers-v4"} element={<CheckOffers_v4 />} />
        <Route path="/preapproved-offers" element={<PreapprovedOffer />} />
        <Route path="/fb-offer" element={<OfferDetailsSegmentNiro2 />} />
        <Route path="/pa-ab/offer" element={<OfferDetailsSegment />} />
        <Route path={"/offer_check_v1"} element={<OfferCheck_v1 />} />
        <Route path={"/offer_check_v2"} element={<OfferCheck_v2 />} />
        <Route path={"/offer_check_v3"} element={<OfferCheck_v3 />} />
        {/* <Route path="/newform" element={<NewForm />} /> */}

        <Route path="/bajaj-finserv" element={<BajajFinserv />} />
        <Route path="/check-offers-v2" element={<CheckOffers_v2 />} />
        <Route path={"/preapp-offers"} element={<NewPreapproveOffersPage />} />
      </Routes>
    </>
  );
}

export default App;
