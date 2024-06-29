import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage/Homepage";
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

function App() {
  const location = useLocation();
  const [path, setPath] = useState("");
  useEffect(() => {
    if (location.pathname) {
      setPath(location.pathname);
    }
  }, [location.pathname]);
  useEffect(() => {
    const setTime = setInterval(() => {
      if (path) {
        sessionTrack(path);
      }
    }, 5000);

    return () => clearTimeout(setTime);
  }, [path]);
  async function sessionTrack(path) {}
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Homepage />} />
          <Route path={"/personal-loan"} element={<PersonalLoan />} />
          <Route path={"/apply"} element={<PersonalDetails />} />
          <Route path={"/pao"} element={<PreApprovedLoan />} />
          <Route path={"/offers"} element={<OffersPage />} />
          <Route path={"/business-loan"} element={<BusinessLoan />} />
          <Route path="/terms" element={<Term />} />
          <Route path={"/rtg"} element={<PreLoan />} />
          <Route
            path={"/business-loan/apply"}
            element={<BusinessLoanApply />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
