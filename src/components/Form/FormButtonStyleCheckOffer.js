import React from "react";

const FormButtonStyleCheckOffer = ({
  text = "Get OTP",
  onClick,
  disabled = false,
  className = "",
  id = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      id={id}
      style={{
        width: "340px",
        padding: "14px 0",
        fontSize: "16px",
        fontWeight: 400,
        color: "black",
        background: disabled ? "#B3B3B3" : "#12F280",
        border: "none",
        borderRadius: "5px",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        fontFamily: "Atkinson Hyperlegible",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {text}
      <img
        src="/assets/img/cta_arrow_new.png"
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

export default FormButtonStyleCheckOffer;
