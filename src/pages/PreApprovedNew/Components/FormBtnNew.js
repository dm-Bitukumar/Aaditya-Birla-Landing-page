const FormButton = ({ className, type, id, ...props }) => {
  const handleCalculateStyles = () => {
    switch (type) {
      case "primary":
        return props.small ? "continue-button-sm" : "continue-button";
      case "secondary":
        return "back-button";
      case "otp":
        return "btn-get-otp";
      default:
        return props.small ? "continue-button-sm" : "continue-button";
    }
  };

  return (
    <button
      style={{ minWidth: props.small ? "60px" : "164px", whiteSpace: "nowrap" }}
      className={`w-100 btn btn-lg ${handleCalculateStyles(type)} ${className}`}
      type="submit"
      id={id}
      {...props}
    >
      {props.children}
    </button>
    // <button
    //   style={{
    //     minWidth: props.small ? "60px" : "164px",
    //     padding: props.small ? "10px 16px" : "20px 24px", 
    //     margin: "0",
    //     whiteSpace: "nowrap",
    //   }}
    //   className={`w-100 btn btn-lg ${handleCalculateStyles(type)} ${className}`}
    //   type="submit"
    //   id={id}
    //   {...props}
    // >
    //   {props.children}
    // </button>
  );
};

export default FormButton;
