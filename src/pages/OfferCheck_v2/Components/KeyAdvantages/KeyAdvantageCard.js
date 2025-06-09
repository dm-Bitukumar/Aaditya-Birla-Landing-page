import React from "react";

const KeyAdvantageCard = ({ icon, title, subtitle }) => {
  return (
    <div className="advantage-card1">
      <div className="card-icon-wrapper">
        <img src={icon} alt={title} className="card-icon" />
      </div>

      <div className="card-content-wrapper">
        <h4 className="card-title_v2">{title}</h4>
        <p className="card-subtitle_v2">{subtitle}</p>
      </div>
    </div>
  );
};

export default KeyAdvantageCard