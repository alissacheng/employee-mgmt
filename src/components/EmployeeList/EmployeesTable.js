import { useState } from "react";
import Pagination from "./Pagination"
import OneEmployee from "./OneEmployee"
import employeeFormInputData from "../../lib/employeeFormInputData";

const EmployeesTable = ({ employees, handleDelete, searchInput }) => {
  const [page, setPage] = useState(1)
  const pageSize = 50
  const start = (page -1) * pageSize
  const end = page * pageSize

  return(
    <>
      <table className="table table-borderless table-hover">
        <thead>
            <tr>
              {employeeFormInputData.map(({label})=><th scope="col" key={label}>{label}</th>)}
              <th scope="col">Actions</th>
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
    </>
  )
}

export default EmployeesTable;