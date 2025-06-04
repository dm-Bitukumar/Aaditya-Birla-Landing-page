import React from "react";
import MainFooter from "./Homepage/components/MainFooter";
import { Link } from "react-router-dom";
import { setUserClickData } from "../utility/setUserClickData";

const IncredGrievance = () => {
  return (
    <div className="bg-black">
      <div className="container w-full h-full mx-auto text-white">
        <div className="px-20 leading-6">
          <Link
            to={"/"}
            onClick={() => {
              setUserClickData({
                event_name: "link-to-home-page",
              });
            }}
          >
            <img
              className="pt-5"
              src="/assets/img/Digit-Money-Logo.png"
              alt=""
              width={150}
            />
          </Link>
          <div className="leading-7">
            <h1 className="pt-5 text-2xl font-semibold">
              Grievance Redressal Mechanism
            </h1>
            <p className="pt-4 font-medium">
                 <h4>1. How to log in a complaint/where can a complaint be made</h4>
                 Any customer having a grievance/complaint/feedback with 
                 respect to the product and services offered by InCred Financial 
                 Services Limited (hereinafter referred to as 'the Company') 
                 may write to the Company's Customer Service Department through 
                 any of the following channels:
                 <br />
                 Call at 18001022192<br />
                 Email- care@incred.com<br />
                 You may write a letter at the address- Unit No. 1203, 12th floor, B Wing, The Capital, Plot No. C - 70, G Block, Bandra - Kurla Complex Mumbai-400051 Maharashtra
                 Website- <a href="www.incred.com" target="blank">www.incred.com</a>
             </p>


              <p className="pt-4 font-medium">
                 <h4>2. Whom to approach for redressal</h4>
                 Customers are requested to first raise their concerns through any of the 
                 channels mentioned above. And if the same is not resolved within 5 days or 
                 if the customer is not satisfied with the solution provided by the customer 
                 care service, then the customer may follow below escalations for resolving their grievances.
                 <br /><br />
                 Name: Ms. Rosy Dsouza<br />
                 Contact: 022-42117799<br />
                 Email Id: care@incred.com<br /><br />

                 In case the complaint is not resolved within a period of five days or if the customer is not
                 satisfied with the solution provided by Mr. Kiran Gawand then the customer may approach the 
                 Grievance Redressal Officer. The name and contact details of the Grievance Redressal Officer is as
                 follows: <br /><br />
                 Grievance Redressal Officer Name: Mr. Vaidyanathan Ramamoorthy<br /><br />
                 E-mail ID: incred.grievance@incred.com<br />
                 ETelephone no.: 022-42117799<br />
                 Address: Incred Financial Services Limited, 1203, 12th Floor, B Wing, The Capital, 
                 Bandra Kurla Complex, Mumbai - 400 051<br /><br />
                <a href="https://www.incred.com/grievance.html">https://www.incred.com/grievance.html</a>
            </p>


             <p className="pt-4 font-medium">
                <h4>3. Details of InCred Personal Loan:</h4>
                Details of InCred Personal loans can be found at <a href="https://personal-loans.incred.com/personal-loan" target="blank">
                https://personal-loans.incred.com/personal-loan
                </a>
             </p>

             <p className="pt-4 font-medium">
                <h4>4. RBI Sachet Link: <a href="https://sachet.rbi.org.in" target="blank">https://sachet.rbi.org.in</a> </h4>
             </p>
           
            </div>
        </div>
        <div className="h-10"></div>
      </div>

      <MainFooter />
    </div>
  );
};

export default IncredGrievance;