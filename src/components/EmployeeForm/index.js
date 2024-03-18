import { useState, useContext } from "react"

import UserContext from "../../lib/UserContext"
import employeeFormInputData from "../../lib/employeeFormInputData"
import TextInput from "./TextInput"
import SelectInput from "./SelectInput"
import validateForm from "./validateForm"

const EmployeeForm = () => {
    const {allEmployees, setAllEmployees} = useContext(UserContext);
    const [formData, setFormData] = useState({})
    const [formErr, setFormErr] = useState({})
    const [firstSubmit, setFirstSubmit] = useState(false)

    const handleChange = (e) => {
        //Update formData object
        const newFormData = {
            ...formData,
            [e.target.name]: e.target.value
        }
        setFormData(newFormData);
        // Validate form if user has already clicked submit once
        if(firstSubmit) validateForm(allEmployees, newFormData, setFormErr);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!firstSubmit) setFirstSubmit(true)

        if(validateForm(allEmployees, formData, setFormErr)){
            const lastEmployee = allEmployees[allEmployees.length - 1];
            const id = lastEmployee ? lastEmployee.id + 1 : 1;
        
            setAllEmployees([...allEmployees, { ...formData, id }]);
            setFormData({});
            setFormErr({});
            setFirstSubmit(false);
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <form noValidate={true} id="employee-form">
                        {employeeFormInputData.map(input => (
                            input.type === "select" ?
                                <SelectInput
                                    options={input.options}
                                    name={input.name}
                                    label={input.label}
                                    handleChange={handleChange}
                                    key={input.name}
                                    value={formData[input.name] ?? ""}
                                    error={formErr[input.name] ?? ""}
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
                                    error={formErr[input.name] ?? ""}
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