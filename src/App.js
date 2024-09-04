import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage/Homepage";
import LenderPage from "./pages/LenderPage/LenderPage";
import { Route, useLocation } from "react-router";
import PersonalLoan from "./pages/PersonalLoan/PersonalLoan";
import PersonalDetails from "./pages/PersonalDetails/PersonalDetails";
import PreApprovedLoan from "./pages/PAO/PreApprovedLoan";
import BusinessLoan from "./pages/BusinessLoan/BusinessLoan";
import BusinessLoanApply from "./pages/BusinessLoan/BusinessLoanApply";
import Term from "./pages/Term";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import OffersPage from "./pages/Offers/Offerspage";
import PreLoan from "./pages/PreApprovedLoan/PreApprovedLoan";
import { v4 as uuidv4 } from "uuid";
import { SESSION_ID, TRACK_ID } from "./utility/enum";
import callApi from "./utility/apiCaller";
import { saveMetaData } from "./utility/setUserClickData";
import New from "./pages/PreApprovedLoan/components/New/New";
import NewForm from "./pages/PreApprovedLoan/components/New/NewForm";
import PreApprove from "./pages/PreApprove/PreApprove";

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
        <Route path={"/apply"} element={<PersonalDetails />} />
        <Route path={"/pao"} element={<PreApprovedLoan />} />
        <Route path={"/offers"} element={<OffersPage />} />
        <Route path={"/rtg"} element={<PreLoan />} />
        <Route path={"/business-loan"} element={<BusinessLoan />} />
        <Route path={"/business-loan/apply"} element={<BusinessLoanApply />} />
        <Route path="/terms" element={<Term />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/preapprove" element={<PreApprove />} />
        <Route
          path="/new-loan"
          element={<New pages={pages} setPages={setPages} />}
        />
        {/* <Route path="/newform" element={<NewForm />} /> */}
      </Routes>
    </>
  );
}

export default App;
