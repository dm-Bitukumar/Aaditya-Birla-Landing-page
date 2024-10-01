import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const FormInput = ({
  isValid,
  placeholder,
  value,
  onChange,
  label,
  errorMessage,
  icon,
  ...props
}) => {
  return (
    <div
      className={`input-group ${!isValid ? "mb-4" : "mb-2"} ${props.className}`}
      style={{
        // boxShadow: "0 0 5px 0.5pt #d3d3d3",
        borderRadius: "1.2em",
      }}
    >
      <span
        className="input-group-text"
        style={{
          height: "58px",
          borderRadius: "0.6em 0 0 0.6em ",
          background: "#fff",
          borderRight: "none",
          boxShadow: "-2px 0 4px -0.2pt #d3d3d3",
        }}
      >
        {icon}
      </span>
      <div
        className="form-floating flex-grow-1"
        style={{
          height: "65px",
        }}
      >
        <DatePicker
          {...props}
          className={`form-control ${isValid ? "" : "is-invalid"} react-date`}
          selected={value}
          scrollableYearDropdown
          dateFormat="dd/MM/yyyy"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText={placeholder}
          onChange={onChange}
        />
        {/* <input
          {...props}
          style={{
            borderRadius: "0 0.6em 0.6em 0",
            boxShadow: "2px 0px 4px -0.2pt #d3d3d3",
            borderLeft: "none",

            // padding: "20px",
          }}
          className={`form-control ${isValid ? "" : "is-invalid"}`}
          value={value}
          onChange={onChange}
        /> */}
        {/* <label htmlFor={label}>{label ? label : "Label here"}</label> */}
        {!isValid && (
          <div className="invalid-feedback" id="invalid-pan-no">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
