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
      <div className={`input-group mb-1 ${props.className}`} style={{ border: "none" }}>
        <span
          className="input-group-text"
          style={{
            height: "58px",
            background: "#fff",
            borderRight: "none",
            color: props.iconColor,
          }}
        >
          {icon}
        </span>
        <div className="form-floating flex-grow-1">
          <input
            {...props}
            className={`form-control ${isValid ? "" : "is-invalid"}`}
            value={value}
            onChange={onChange}
            style={{ borderLeft: "none" }} 
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
  