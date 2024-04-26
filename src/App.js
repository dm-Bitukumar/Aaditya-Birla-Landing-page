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
          <Route path={"/business-loan"} element={<BusinessLoan />} />
          <Route
            path={"/business-loan/apply"}
            element={<BusinessLoanApply />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
