const SelectInput = ({options, name, label, handleChange, value, error}) => {
    return(
        <div className="form-floating mb-3">
            <select
                className={`form-select ${error && 'error'}`}
                id={name + "-input"}
                name={name}
                value={value}
                onChange={handleChange}
                required
            >
                <option 
                    value={""} 
                    hidden 
                    disabled 
                    defaultValue={true}
                >
                    Select {label}
                </option>
                {options.map((item)=>{
                    return <option key={item.name} value={item.label}>{item.label}</option>
                })}
            </select>
            <label htmlFor={name + "-input"}>{label}</label>
            {error && <p>{error}</p>}
        </div>
    )
}

export default SelectInput