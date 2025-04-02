import React, { useState, useRef, useEffect } from "react";

const FormSelectStyle2 = ({
  label,
  options = [],
  value,
  onChange,
  isValid = true,
  errorMessage = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

  return (
    <div
      ref={ref}
      style={{
        width: "340px",
        marginBottom: "1rem",
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          border: isValid ? "1px solid #B3B3B3" : "1px solid red",
          height: "55px",
          borderRadius: "5px",
          padding: "20px 40px 8px 12px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#fff",
          position: "relative",
          fontFamily: "Atkinson Hyperlegible",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: value ? "6px" : "18px",
            left: "12px",
            fontSize: value ? "11px" : "14px",
            color: isValid ? "#B3B3B3" : "red",
            transition: "all 0.2s ease-in-out",
            pointerEvents: "none",
          }}
        >
          {label}
        </span>
        <span>{selectedLabel}</span>
        <img
          src="/assets/img/arrow_drop_down.svg"
          alt="Dropdown Arrow"
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            height: "20px",
            pointerEvents: "none",
          }}
        />
      </div>

      {isOpen && (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: "8px 0",
            border: "1px solid #B3B3B3",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            position: "absolute",
            top: "60px",
            width: "100%",
            zIndex: 10,
          }}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt)}
              style={{
                padding: "10px 16px",
                cursor: "pointer",
                fontFamily: "Atkinson Hyperlegible",
                backgroundColor: value === opt.value ? "#F0F0F0" : "white",
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {!isValid && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "6px" }}>
          {errorMessage}
        </div>
      )}
      <input type="hidden" id="companyType" value={value} />
    </div>
  );
};

export default FormSelectStyle2;
