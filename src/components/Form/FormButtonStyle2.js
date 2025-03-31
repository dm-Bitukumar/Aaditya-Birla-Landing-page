import React from "react";

const FormButtonStyle2 = ({ text = "Get OTP", onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "350px",
        padding: "14px 0",
        fontSize: "16px",
        fontWeight: 400,
        color: "white",
        background: disabled
          ? "#B3B3B3"
          : "linear-gradient(90deg, #12f280 7.42%, #1b1b1b 105.02%)",
        border: "none",
        borderRadius: "5px",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        fontFamily: "Atkinson Hyperlegible",
      }}
    >
      {text}
      <img
        src="/assets/img/CTA Arrow.svg"
        alt="arrow"
        style={{
          width: "18px",
          height: "18px",
          objectFit: "contain",
        }}
      />
    </button>
  );
};

export default FormButtonStyle2;
