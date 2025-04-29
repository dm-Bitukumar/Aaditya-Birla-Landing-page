import React, { useState } from "react";

const FormDatePickerStyle2 = ({
  isValid,
  value,
  onChange,
  label,
  errorMessage,
  disabled = false,
  labelClassName,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const showFloatingLabel = isFocused || value;

  const handleInputChange = (e) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "").slice(0, 8);

    let formatted = "";

    if (digits.length <= 2) {
      const dd = parseInt(digits.slice(0, 2), 10);
      if (digits.length === 2 && (dd < 1 || dd > 31)) return;
      formatted = digits;
    } else if (digits.length <= 4) {
      const dd = parseInt(digits.slice(0, 2), 10);
      const mm = parseInt(digits.slice(2), 10);
      if (dd < 1 || dd > 31) return;
      if (digits.length >= 4 && (mm < 1 || mm > 12)) return;
      formatted = `${digits.slice(0, 2)}-${digits.slice(2)}`;
    } else {
      const dd = parseInt(digits.slice(0, 2), 10);
      const mm = parseInt(digits.slice(2, 4), 10);
      if (dd < 1 || dd > 31 || mm < 1 || mm > 12) return;
      formatted = `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(
        4
      )}`;
    }

    if (onChange) {
      onChange({
        target: {
          value: formatted,
        },
      });
    }
  };

  return (
    <div
      style={{
        position: "relative",
        marginBottom: "1rem",
        width: "340px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="DD-MM-YYYY"
        disabled={disabled}
        style={{
          width: "340px",
          height: "55px",
          borderRadius: "5px",
          border: isValid ? "1px solid #B3B3B3" : "1px solid red",
          padding: "20px 12px 8px 12px",
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
        {label || "Date of Birth"}
      </label>

      {!isValid && !disabled && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "6px" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default FormDatePickerStyle2;
