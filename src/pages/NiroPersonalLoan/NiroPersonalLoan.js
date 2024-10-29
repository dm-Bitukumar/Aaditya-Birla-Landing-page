import { useState } from "react";
import "./css/personal-loan.css";
import Form from "./components/Form";
import HeadBar from "../../components/Static/HeadBar";
import { useEffect } from "react";
import { initializeHotjar } from "../../utility/hotJar";
import { GoogleAnalytics } from "../../utility/googleAnalitic";
import { FacebookPixelTracker } from "../../utility/facebookPixelTracker";

const PersonalLoan = () => {
  const [id] = useState({ pixelId: "1354731888554618" });
  useEffect(() => {
    initializeHotjar(5179138, 6);
    GoogleAnalytics({ trackingId: "G-MYL42F1SJ1" });
  }, []);
  useEffect(() => {
    if (id) {
      FacebookPixelTracker({ pixelId: id.pixelId });
    }
  }, [id]);

  return (
    <div className={"personal-loan-container2"}>
      {/* <HeadBar /> */}
      <Form />
    </div>
  );
};

export default PersonalLoan;
