import { useState, useContext } from "react"

import UserContext from "../../lib/UserContext"
import employeeFormInputData from "../../lib/employeeFormInputData"
import TextInput from "./TextInput"
import SelectInput from "./SelectInput"
import validateForm from "../../utils/validateForm"

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
        <div className="container bg-white">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-8 col-12 my-sm-4 my-2">
                    <button
                        className="bg-white border-0 mb-2"
                        onClick={()=>setNewEmployee(false)}
                    >
                        <img src="/images/left-arrow.svg" alt="Left arrow icon" className="me-2" />
                        Back to Employee List
                    </button>
                    <form 
                        noValidate={true} 
                        id="employee-form" 
                        className="border shadow-sm p-sm-4 p-2 rounded-2 bg-white"
                    >
                        <div>
                            <img 
                                src="/images/people.svg" 
                                alt="People icon" 
                                className="mx-auto d-block people-icon my-2"
                            />
                            <h1 className="pb-3 text-center fs-3 fw-bold">New Employee</h1>
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
                        <div className="mb-4">
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