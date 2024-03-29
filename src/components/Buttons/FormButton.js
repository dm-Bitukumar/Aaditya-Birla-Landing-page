const FormButton = ({...props}) => {
    return (
        <button
            {...props}
        >
            {props.children}
        </button>
    )
}

export default FormButton
