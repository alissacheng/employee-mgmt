import { useEffect, useState, useContext } from "react";
import Papa from 'papaparse';
import OneEmployee from "./OneEmployee";
import Pagination from "./Pagination";
import UserContext from "../../lib/UserContext";
import employeeFormInputData from "../../lib/employeeFormInputData";

const EmployeeList = () => {
    const {setAllEmployees, employees, setEmployees, searchInput} = useContext(UserContext);
    const [page, setPage] = useState(1)
    const pageSize = 50
    const start = (page -1) * pageSize
    const end = page * pageSize

    const sortByName =  (array) => {
        return array.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
        
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }

    const fetchEmployees = async () => {
        try {
            const response = await fetch('/employees.csv');
            const csvData = await response.text();

            Papa.parse(csvData, {
                header: true,
                complete: (result) => {
                    const sortedEmployees = sortByName(result.data)
                    setEmployees(sortedEmployees)
                    setAllEmployees(sortedEmployees)
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
                        {employeeFormInputData.map(({label})=><th scope="col" key={label}>{label}</th>)}
                    </tr>
                </thead>
                <tbody>
                {(employees.slice(start, end)).map((employee)=>{
                    return (
                    <OneEmployee 
                        key={employee.id} 
                        employee={employee}
                        handleDelete={handleDelete}
                        searchInput={searchInput}
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