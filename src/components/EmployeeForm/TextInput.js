const TextInput = ({name, label, type, handleChange, value, error}) => {
    // console.log("render", name)
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
                min={0}
            />
            <label htmlFor={name + "-input"}>{label}</label>
            {error && <p>{error}</p>}
        </div>
    )
}

export default TextInput;