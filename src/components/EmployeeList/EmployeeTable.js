import { useEffect, useState } from "react";
import Pagination from "../Pagination"
import OneEmployee from "./OneEmployee"
import employeeFormInputData from "../../data/employeeFormInputData";

const EmployeeTable = ({ employees, handleDelete, searchInput }) => {
  const [page, setPage] = useState(1)
  const pageSize = 10
  const start = (page -1) * pageSize
  const end = page * pageSize
  const totalPages = Math.ceil(employees.length/pageSize)

  useEffect(()=> {
    if(employees.length && page !== 1){
      setPage(1)
    }
  }, [employees])

  const updatePage = (update) => {
    const newPage = page + update
    //prevent page update to be outside of range
    if(newPage > 0 && newPage <= totalPages){
      setPage(newPage)
    }
  }

  return(
    <>
      {
        employees.length ?
        <>
          <div className="border rounded-3 shadow-sm table-responsive">
            <table className="table bg-blue-100 table-spaced border-rounded mb-0">
              <thead>
                  <tr>
                    {employeeFormInputData.map(({label})=>{
                        return (
                          <th className="text-light-theme px-lg-3 px-2 py-2 no-wrap" scope="col" key={label}>
                            {label}
                          </th>
                        )
                    })}
                    <th scope="col" className="text-light-theme px-3 py-2">Actions</th>
                  </tr>
              </thead>
              <tbody className="rounded text-theme">
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
          </div>
          <Pagination
            updatePage={updatePage}
            page={page}
            totalPages={totalPages}
          />
        </>
        :
        <h3 className="text-center my-5 fs-4">No employees matched your search criteria.</h3>
      }
    </>
  )
}

export default EmployeeTable;