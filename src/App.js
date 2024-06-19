import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage/Homepage";
import { Route } from "react-router";
import PersonalLoan from "./pages/PersonalLoan/PersonalLoan";
import PersonalDetails from "./pages/PersonalDetails/PersonalDetails";
import PreApprovedLoan from "./pages/PAO/PreApprovedLoan";
import BusinessLoan from "./pages/BusinessLoan/BusinessLoan";
import BusinessLoanApply from "./pages/BusinessLoan/BusinessLoanApply";
import Term from "./pages/Term";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import OffersPage from "./pages/Offers/Offerspage";

function App() {
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
