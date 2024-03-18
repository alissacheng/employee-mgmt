import { useEffect, useState, useContext } from "react";
import Papa from 'papaparse';
import UserContext from "../../lib/UserContext";
import SearchFilter from "../SearchFilter";
import EmployeesTable from "./EmployeesTable";

const EmployeeList = () => {
    const {setAllEmployees, allEmployees} = useContext(UserContext);
    const [searchInput, setSearchInput] = useState("")
    const [employees, setEmployees] = useState([])

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
        console.log(id)
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
            <EmployeesTable
                searchInput={searchInput}
                employees={employees}
                handleDelete={handleDelete}
            />
        </div>
    )
};

export default EmployeeList;