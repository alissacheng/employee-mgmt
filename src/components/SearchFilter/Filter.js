import departmentList from "../../lib/departmentList";

const Filter = ({ handleCheck, checkedItems }) => {

    return(
        <div classvalue="col">
            {departmentList.map((option) => (
                <div key={option.value} classvalue="form-check">
                <input
                    classvalue="form-check-input"
                    type="checkbox"
                    id={option.value}
                    value={option.value}
                    checked={checkedItems.indexOf(option.value) > -1 || false}
                    onChange={handleCheck}
                />
                <label classvalue="form-check-label" htmlFor={option.id}>
                    {option.label}
                </label>
                </div>
            ))}
        </div>
    )
}

export default Filter;