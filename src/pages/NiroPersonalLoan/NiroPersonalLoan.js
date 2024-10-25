import { useState } from "react";
import "./css/personal-loan.css";
import Form from "./components/Form";
import HeadBar from "../../components/Static/HeadBar";
import { useEffect } from "react";
import { initializeHotjar } from "../../utility/hotJar";
import { GoogleAnalytics } from "../../utility/googleAnalitic";
//import { FacebookPixelTracker } from "../../utility/facebookPixelTracker";
import ReactPixel from "react-facebook-pixel";

const PersonalLoan = () => {
  useEffect(() => {
    initializeHotjar(5179138, 6);
    GoogleAnalytics({ trackingId: "G-MYL42F1SJ1" });
    ReactPixel.init("1354731888554618");
    ReactPixel.pageView();
    // FacebookPixelTracker({ pixelId: "1354731888554618" });
  }, []);

  return (
    <div className={"personal-loan-container2"}>
      {/* <HeadBar /> */}
      <Form />
    </div>
  );
};

export default PersonalLoan;
