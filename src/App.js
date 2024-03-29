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

function App() {


    const authState = useSelector((state) => state?.app?.authState);

    const NotAuthenticatedRoutes = () => {
        return(
            <Routes>
                <Route path={'/'} element={<Homepage />} />
                <Route path={'/personal-loan'} element={<PersonalLoan />} />
            </Routes>
        )
    }
        const AuthenticatedRoutes = () => {
            return (
                <Routes>
                    <Route path={'/'} element={<Homepage />} />
                    <Route path={'/personal-loan'} element={<PersonalLoan />} />
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
                return <NotAuthenticatedRoutes />;
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
