import { useCallback, useState, useContext } from "react"
import employeeFormInputData from "../../lib/employeeFormInputData"
import TextInput from "./TextInput"
import SelectInput from "./SelectInput"
import UserContext from "../../lib/UserContext"

const EmployeeForm = () => {
    const {allEmployees, setAllEmployees} = useContext(UserContext);
    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const lastEmployee = allEmployees[allEmployees.length - 1];
        const id = lastEmployee ? lastEmployee.id + 1 : 1;
    
        setAllEmployees([...allEmployees, { ...formData, id }]);
        setFormData({});
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <form>
                        {employeeFormInputData.map(input => (
                            input.type === "select" ?
                                <SelectInput
                                    options={input.options}
                                    name={input.name}
                                    label={input.label}
                                    handleChange={handleChange}
                                    key={input.name}
                                    value={formData[input.name] ?? ""}
                                />
                                :
                                <TextInput
                                    key={input.name}
                                    name={input.name}
                                    label={input.label}
                                    type={input.type}
                                    prefix={input.prefix ?? false}
                                    handleChange={handleChange}
                                    value={formData[input.name] ?? ""}
                                />
                        ))}
                        <div>
                            <button
                                className="btn btn-primary"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default EmployeeForm;