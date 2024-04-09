import './App.css';
import {BrowserRouter, Routes} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {AUTHENTICATED, AUTHENTICATING, NOT_AUTHENTICATED} from "./constants/authEnums";
import {ToastContainer} from "react-toastify";
import FullPageLoader from "./components/Loaders/FullPageLoader";
import Homepage from "./pages/Homepage/Homepage";
import {Route} from "react-router";
import PersonalLoan from "./pages/PersonalLoan/PersonalLoan";
import PersonalDetails from "./pages/PersonalDetails/PersonalDetails";
import PreApprovedLoan from "./pages/PAO/PreApprovedLoan";
import BusinessLoan from "./pages/BusinessLoan/BusinessLoan";
import BusinessLoanApply from "./pages/BusinessLoan/BusinessLoanApply";

function App() {


    const authState = useSelector((state) => state?.app?.authState);

    const NotAuthenticatedRoutes = () => {
        return(
            <Routes>
                <Route path={'/'} element={<Homepage />} />
                <Route path={'/personal-loan'} element={<PersonalLoan />} />
                <Route path={'/pao'} element={<PreApprovedLoan />} />
                <Route path={'/business-loan'} element={<BusinessLoan />} />
                <Route path={'/business-loan/apply'} element={<BusinessLoanApply />} />
            </Routes>
        )
    }
        const AuthenticatedRoutes = () => {
            return (
                <Routes>
                    <Route path={'/'} element={<Homepage />} />
                    <Route path={'/personal-loan'} element={<PersonalLoan />} />
                    <Route path={'/apply'} element={<PersonalDetails />} />
                    <Route path={'/pao'} element={<PreApprovedLoan />} />
                    <Route path={'/business-loan'} element={<BusinessLoan />} />
                    <Route path={'/business-loan/apply'} element={<BusinessLoanApply />} />
                </Routes>
            )
        }

    const getRoutes = () => {
        switch (authState) {
            case AUTHENTICATED:
                return <AuthenticatedRoutes/>;
            case NOT_AUTHENTICATED:
                return <NotAuthenticatedRoutes/>;
            case AUTHENTICATING:
                return <FullPageLoader/>;
            default:
                return <AuthenticatedRoutes />;
        }
    };

    return (
        <>
            <ToastContainer/>
            <BrowserRouter>
                    {getRoutes()}
            </BrowserRouter>
        </>
    );
}

export default App;
