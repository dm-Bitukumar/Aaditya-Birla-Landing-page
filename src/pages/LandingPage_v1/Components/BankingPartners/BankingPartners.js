import React, { useEffect, useState } from "react";
import "./BankingPartners.css";
import callApi from "../../../../utility/apiCaller";

const BankingPartners = () => {
  const [lenders, setLenders] = useState([]);

  useEffect(() => {
    const fetchLenders = async () => {
      const localData = await callApi(
        "v1/lender/active-lenders",
        "get",
        {},
        "loan"
      );
      if (localData?.data?.lenderList) {
        setLenders(localData.data.lenderList);
      }
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
              src={lender.logo_image_url}
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
