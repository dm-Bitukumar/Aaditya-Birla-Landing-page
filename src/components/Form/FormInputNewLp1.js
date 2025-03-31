const ForminputNewLp1 = ({
  isValid,
  value,
  onChange,
  label,
  errorMessage,
  icon,
  ...props
}) => {
  return (
    <div className={`input-group mb-3 ${props.className}`}>
      <div className="form-floating flex-grow-1">
        <input
          {...props}
          className={`form-control`}
          value={value}
          onChange={onChange}
        />
        <label htmlFor={label}>{label ? label : "Label here"}</label>
      </div>
    </div>
  );
};

export default ForminputNewLp1;
