import { useEffect, useState, useContext } from "react";
import Papa from 'papaparse';
import UserContext from "../../utils/UserContext";
import SearchFilter from "../SearchFilter";
import EmployeeTable from "./EmployeeTable";
import DeleteModal from "../DeleteModal";
import sortByName from "../../utils/sortByName";

const EmployeeList = () => {
    const {setAllEmployees, allEmployees} = useContext(UserContext);
    const [searchInput, setSearchInput] = useState("")
    const [employees, setEmployees] = useState([])
    const [deleteEmployee, setDeleteEmployee] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [fetchError, setFetchError] = useState(false)

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
                    setIsLoading(false)
                }
            });
        } catch (error) {
            setFetchError("An error has occured and we were unable to fetch the employee list. Please try again later.");
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchEmployees()
    }, [])

    const submitDelete = () => {
        setAllEmployees(
            allEmployees.filter((employee)=> employee.id !== deleteEmployee.id)
        );
        setDeleteEmployee(false);
    }

    return(
        <div className="container-lg px-3 px-md-5 px-lg-0 employee-list">
            <SearchFilter 
                updateSearch={(input)=>setSearchInput(input)}
                updateEmployees={(list)=>setEmployees(sortByName(list))}
            />
            {isLoading &&
                <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border custom-spinner" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            {!isLoading && !fetchError &&
                <EmployeeTable
                    searchInput={searchInput}
                    employees={employees}
                    handleDelete={(id, name)=>setDeleteEmployee({id, name})}
                />
            }
            {fetchError && <h3 className="text-center my-5 fs-4">{fetchError}</h3>}
            <DeleteModal 
                name={deleteEmployee.name ?? ''}
                cancel={()=>setDeleteEmployee(false)}
                submitDelete={submitDelete}
            />
        </div>
    )
};

export default EmployeeList;