import React, { useState } from "react";
import eligibilityData from "./eligibilityData";
import "./EligibilityDocuments.css";

const EligibilityDocuments = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const currentTab = eligibilityData.tabs[selectedTab];
  const currentContent = eligibilityData.content[currentTab];

  return (
    <div className="eligibility-docs-section">
      <h2 className="eligibility-title">
        Documents Required
        <br />
        and Eligibility Criteria
      </h2>

      <div className="tab-buttons">
        {eligibilityData.tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`tab-button ${selectedTab === idx ? "active" : ""}`}
            onClick={() => setSelectedTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>

      <h3 className="sub-heading">Eligibility Criteria</h3>
      <div className="criteria-grid">
        {currentContent.criteria.map((item, index) => (
          <div className="criteria-card" key={index}>
            <img src={item.icon} alt={item.title} className="criteria-icon" />
            <div>
              <h4>{item.title}</h4>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="sub-heading">Documents Required</h3>
      <div className="documents-list">
        {currentContent.documents.map((doc, index) => (
          <div className="document-item" key={index}>
            <img src={doc.icon} alt={doc.label} />
            <span>{doc.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EligibilityDocuments;
