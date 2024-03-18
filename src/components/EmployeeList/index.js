import { useEffect, useState, useContext } from "react";
import Papa from 'papaparse';
import OneEmployee from "./OneEmployee";
import Pagination from "./Pagination";
import UserContext from "../../lib/UserContext";
import employeeFormInputData from "../../lib/employeeFormInputData";
import SearchFilter from "../SearchFilter";

const EmployeeList = () => {
    const {setAllEmployees, allEmployees} = useContext(UserContext);
    const [page, setPage] = useState(1)
    const [searchInput, setSearchInput] = useState("")
    const [employees, setEmployees] = useState([])
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
        setAllEmployees(
            allEmployees.filter((employee)=> employee.id !== id)
        );
    }

    return(
        <div className="container">
            <SearchFilter 
                updateSearch={(input)=>setSearchInput(input)}
                updateEmployees={(list)=>setEmployees(sortByName(list))}
            />
            <table className="table table-borderless table-hover">
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
                updatePage={(update)=>setPage(page+update)}
                page={page}
                totalPages={Math.ceil(employees.length/pageSize)}
            />
        </div>
    )
};

export default EmployeeList;