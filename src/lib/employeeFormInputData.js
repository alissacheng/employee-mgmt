import departmentList from "./departmentList"

const employeeFormInputData = [
    {
        name: "name",
        label: "Name",
        type: "text"
    },
    {
        name: "email",
        label: "Email",
        type: "email"
    },
    {
        name: "position",
        label: "Position",
        type: "text"
    },
    {
        name: "department",
        label: "Department",
        type: "select",
        options: departmentList
    },
    {
        name: "salary",
        label: "Salary",
        type: "number",
        prefix: "$"
    },
    {
        name: "start_date",
        label: "Start Date",
        type: "date"
    },
] 

export default employeeFormInputData