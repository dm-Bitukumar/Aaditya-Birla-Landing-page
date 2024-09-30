const FormButton = ({ className, type, ...props }) => {
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
      style={{
        minWidth: props.small ? "60px" : "164px",
        whiteSpace: "nowrap",
        background:
          type === "secondary"
            ? "linear-gradient(3deg, darkgrey 0%, lightgray 100%)"
            : "linear-gradient(to right, #0095bd 0%, #0095bd 100%)",
        color: "#fff",

        borderRadius: "5px",
        backgroundImage:
          type === "secondary"
            ? "linear-gradient(3deg, darkgrey 0%, lightgray 100%)"
            : "linear-gradient(3deg, #008bae 0%, #00c0ff 100%)",
        fontSize: "14px",
        letterSpacing: "3px",
        textTransform: "uppercase",

        fontWeight: "400",
        textAlign: "center",
        border: 0,
        /* padding: 1rem; */

        margin: "2rem auto 0 auto",
      }}
      className={`w-100 btn btn-lg ${className}`}
      type="submit"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default FormButton;
