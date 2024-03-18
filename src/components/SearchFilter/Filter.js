import departmentList from "../../lib/departmentList";

const Filter = ({ handleCheck, checkedItems }) => {
    return(
        <div classvalue="col">
            {departmentList.map((option) => (
                <div key={option.name} classvalue="form-check">
                    <input
                        classvalue="form-check-input"
                        type="checkbox"
                        id={option.name}
                        value={option.label}
                        checked={checkedItems.includes(option.label) || false}
                        onChange={handleCheck}
                    />
                    <label classvalue="form-check-label" htmlFor={option.name}>
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
    )
}

export default Filter;