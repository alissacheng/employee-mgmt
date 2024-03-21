import { useEffect, useState, useContext } from "react";
import Papa from 'papaparse';
import UserContext from "../../lib/UserContext";
import SearchFilter from "../SearchFilter";
import EmployeeTable from "./EmployeeTable";
import DeleteModal from "./DeleteModal";

const EmployeeList = () => {
    const {setAllEmployees, allEmployees} = useContext(UserContext);
    const [searchInput, setSearchInput] = useState("")
    const [employees, setEmployees] = useState([])
    const [deleteEmployee, setDeleteEmployee] = useState(false)

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

    const submitDelete = () => {
        console.log("click")
        setAllEmployees(
            allEmployees.filter((employee)=> employee.id !== deleteEmployee.id)
        );
        setDeleteEmployee(false);
    }

    return(
        <div className="container">
            {/* <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="fs-3 fw-bold">Employee List</h1>
                    <p>View and manage employee data</p>
                </div>
                <div>
                    <button 
                        className='btn btn-dark mx-2' 
                        onClick={()=>setNewEmployee(true)}
                    >
                        New Employee
                    </button>
                    <a className='btn btn-light border' onClick={handleDownload} id="export">Export</a>
                </div>
            </div> */}
            <SearchFilter 
                updateSearch={(input)=>setSearchInput(input)}
                updateEmployees={(list)=>setEmployees(sortByName(list))}
            />
            <EmployeeTable
                searchInput={searchInput}
                employees={employees}
                handleDelete={(id, name)=>setDeleteEmployee({id, name})}
            />
            <DeleteModal 
                name={deleteEmployee.name ?? ''}
                cancel={()=>setDeleteEmployee(false)}
                submitDelete={submitDelete}
            />
        </div>
    )
};

export default EmployeeList;