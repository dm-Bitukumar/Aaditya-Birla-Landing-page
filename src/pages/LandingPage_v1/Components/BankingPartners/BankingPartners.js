import React, { useEffect, useState } from "react";
import "./BankingPartners.css";
import callApi from "../../../../utility/apiCaller";

const BankingPartners = () => {
  const [lenders, setLenders] = useState([]);

  useEffect(() => {
    const preferredOrder = [
      "Aditya Birla Finance Limited",
      "L&T",
      "Poonawalla",
      "UnityBank",
      "Hero Fincorp",
      "Kissht",
      "KreditBee",
      "Branch",
      "Incred",
    ];

    const fetchLenders = async () => {
      const [bucket1, bucket2] = await Promise.all([
        callApi("v1/lender/active-bucket1-lenders", "post", {}, "loan"),
        callApi("v1/lender/active-bucket2-lenders", "post", {}, "loan"),
      ]);

      const combined =
        bucket1?.status === "Success" && bucket2?.status === "Success"
          ? [...bucket1.data.lenderList, ...bucket2.data.lenderList]
          : [];

      // Add hardcoded lender manually
      const hardcodedLender = [
        {
          name: "Aditya Birla Finance Limited",
          logo_image_url: "https://digitmoney.in/image/partners/abc.png",
        },
        {
          name: "Incred",
          logo_image_url: "https://digitmoney.in/image/partners/incred.png",
        },
      ];

      const merged = [...hardcodedLender, ...combined];

      const ordered = [
        ...preferredOrder
          .map((name) => merged.find((l) => l.name === name))
          .filter(Boolean),
        ...merged.filter((l) => !preferredOrder.includes(l.name)),
      ];

      setLenders(ordered);
      console.log(lenders);
    };

    fetchLenders();
  }, []);

  return (
    <div className="banking-partners-section">
      <h3 className="partners-title">Banking Partners</h3>
      <div className="partners-grid">
        {lenders.map((lender, index) => (
          <div key={index} className="partner-card">
            <img
              src={lender.banking_partners || lender.logo_image_url}
              alt="Lender Logo"
              className="partner-logo"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankingPartners;
