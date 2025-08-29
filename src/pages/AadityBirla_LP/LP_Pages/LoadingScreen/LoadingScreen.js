import React from "react";
import "./LoadingScreen.css";
import Header from "../../Components/Header/Header";

const LoadingScreen = () => {
  return (
    <div className="main">
        <Header />
       <div className="loading-container">
          <div className="spinner"></div>
          <h3 className="wait-text">Please Wait</h3>
          <p className="sub-text">We are fetching your <br/> offer details</p>
       </div>
       <p className="notes">Do not close the app or <br/> hit back button.</p>
       <div className="footer">
         <div className="logo">
            <div className="line"></div>
            <div className="dm-logo"><img src="/assets/img/New_LOGO.svg" alt="Aaditya Birla" /></div> 
            <div className="line"></div>
         </div>
         <div className="footer-text">
            <p>Landing Partner</p>
            <img src="/assets/icons/abfl-logo.png" alt="Aaditya Birla" />
         </div>
       </div>
    </div>
  );
};

export default LoadingScreen;
