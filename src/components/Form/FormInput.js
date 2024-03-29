const FormInput = ({isValid, value, onChange, label, errorMessage, icon, ...props}) => {
    return (
        <div className="input-group mb-3">
          <span className="input-group-text" style={{height: "58px"}}>
            {icon}
          </span>
            <div className="form-floating flex-grow-1">
                <input
                    {...props}
                    className={`form-control ${
                        isValid ? "" : "is-invalid"
                    }`}
                    value={value}
                    onChange={onChange}
                />
                <label htmlFor={label}>{label ? label : 'Label here'}</label>
                {!isValid && (
                    <div className="invalid-feedback" id="invalid-pan-no">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FormInput
