const FormInput = ({
  isValid,
  value,
  onChange,
  label,
  errorMessage,
  icon,
  ...props
}) => {
  return (
    <div
      className={`input-group mb-3 ${props.className}`}
      style={{
        // boxShadow: "0 0 5px 0.5pt #d3d3d3",
        borderRadius: "1.2em",
      }}
    >
      <span
        className="input-group-text"
        style={{
          height: "58px",
          borderRadius: "1.1em 0 0 1.1em ",
          background: "#fff",
          borderRight: "none",
          boxShadow: "0 0 5px 0pt #d3d3d3",
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
        <input
          {...props}
          style={{
            borderRadius: "0 1.1em 1.1em 0",
            boxShadow: "2px 0px 5px 0pt #d3d3d3",
            borderLeft: "none",

            // padding: "20px",
          }}
          className={`form-control ${isValid ? "" : "is-invalid"}`}
          value={value}
          onChange={onChange}
        />
        <label htmlFor={label}>{label ? label : "Label here"}</label>
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
