import { useState, useContext } from "react"

import UserContext from "../../lib/UserContext"
import employeeFormInputData from "../../lib/employeeFormInputData"
import TextInput from "./TextInput"
import SelectInput from "./SelectInput"
import validateForm from "./validateForm"

const EmployeeForm = () => {
    const {allEmployees, setAllEmployees, setNewEmployee} = useContext(UserContext);
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
            setNewEmployee(false);
        }
    }

    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 my-4">
                    <button
                        className="bg-white border-0 mb-2"
                        onClick={()=>setNewEmployee(false)}
                    >
                        <img src="/left-arrow.svg" alt="Left arrow icon" />
                        Back to Employee List
                    </button>
                    <form 
                        noValidate={true} 
                        id="employee-form" 
                        className="border shadow-sm p-4 rounded-2"
                    >
                        <div>
                            <img 
                                src="people.svg" 
                                alt="People icon" 
                                className="mx-auto d-block people-icon my-3"
                            />
                            <h1 className="pb-4 text-center fs-3 fw-bold">New Employee</h1>
                        </div>
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
                                className="btn btn-dark"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Add Employee
                            </button>
                            <button
                                className="btn btn-light border mx-2"
                                onClick={()=>setNewEmployee(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default EmployeeForm;