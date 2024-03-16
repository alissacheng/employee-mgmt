const TextInput = ({name, label, type, handleChange, value}) => {
    console.log("render", name)
    return(
        <div className="form-floating mb-3">
            <input
                className="form-control" 
                id={name + "-input"}
                name={name}
                type={type}
                required
                onChange={handleChange}
                placeholder={label}
                value={value}
            />
            <label htmlFor={name + "-input"}>{label}</label>
        </div>
    )
}

export default TextInput;