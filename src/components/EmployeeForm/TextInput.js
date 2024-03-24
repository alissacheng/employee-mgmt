const TextInput = ({name, label, type, handleChange, value, error}) => {
    return(
        <div className={`form-floating mb-3`}>
            <input
                className={`form-control ${value.length ? 'active' : ''} ${error ? 'error' : ''}`}
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
            {error && <p className="error mt-1">{error}</p>}
        </div>
    )
}

export default TextInput;