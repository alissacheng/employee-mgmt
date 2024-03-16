import { useEffect, useState, useContext } from "react";
import Papa from 'papaparse';
import OneEmployee from "./OneEmployee";
import Pagination from "./Pagination";
import UserContext from "../../lib/UserContext";
import employeeFormInputData from "../../lib/employeeFormInputData";

const EmployeeList = () => {
    const {setAllEmployees, employees, setEmployees} = useContext(UserContext);
    const [page, setPage] = useState(1)
    const pageSize = 100
    const start = (page -1) * pageSize
    const end = page * pageSize

    const fetchEmployees = async () => {
        try {
            const response = await fetch('/employees.csv');
            const csvData = await response.text();

            Papa.parse(csvData, {
                header: true,
                complete: (result) => {
                    setEmployees(result.data)
                    setAllEmployees(result.data)
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=>{
        fetchEmployees()
    }, [])

    const handleDelete = (id) => {
        setEmployees(
            employees.filter((employee)=> employee.id !== id)
        );
    }

    const updatePage = (update) => {
        setPage(page + update)
    }
    
    return(
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        {employeeFormInputData.map(({label})=><th scope="col">{label}</th>)}
                    </tr>
                </thead>
                <tbody>
                {(employees.slice(start, end)).map((employee)=>{
                    return (
                    <OneEmployee 
                        key={employee.id} 
                        employee={employee}
                        handleDelete={handleDelete}
                    />)
                })}
                </tbody>
            </table>
            <Pagination
                updatePage={updatePage}
                page={page}
                totalPages={Math.ceil(employees.length/pageSize)}
            />
        </div>
    )
};

export default EmployeeList;