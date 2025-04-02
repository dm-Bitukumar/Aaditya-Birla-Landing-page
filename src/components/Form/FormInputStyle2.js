import React, { useState } from "react";

const FormInputStyle2 = ({
  isValid,
  value,
  onChange,
  label,
  errorMessage,
  tick = false,
  disabled = false,
  labelClassName,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const showFloatingLabel = isFocused || value;

  return (
    <div style={{ position: "relative", marginBottom: "1rem", width: "340px",marginLeft: "auto",marginRight: "auto", }}>
      <input
        {...props}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        style={{
          width: "340px",
          height: "55px",
          borderRadius: "5px",
          border: isValid ? "1px solid #B3B3B3" : "1px solid red",
          padding: "20px 40px 8px 12px",
          fontSize: "16px",
          outline: "none",
          backgroundColor: disabled ? "#F5F5F5" : "white",
          color: disabled ? "#A0A0A0" : "inherit",
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
      <label
        htmlFor={label}
        className={labelClassName}
        style={{
          position: "absolute",
          left: "12px",
          top: showFloatingLabel ? "6px" : "18px",
          fontSize: showFloatingLabel ? "11px" : "14px",
          color: isValid ? "#B3B3B3" : "red",
          backgroundColor: disabled ? "#F5F5F5" : "white",
          transition: "all 0.2s ease-in-out",
          pointerEvents: "none",
        }}
      >
        {label || "Label"}
      </label>

      {tick && isValid && !disabled && (
        <img
          src="/assets/img/lightGreenTick.svg"
          alt="tick"
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            height: "20px",
            width: "20px",
          }}
        />
      )}

      {!isValid && !disabled && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "6px" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default FormInputStyle2;
