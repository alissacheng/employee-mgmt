import {useContext} from 'react';
import UserContext from '../../lib/UserContext';

import { useState } from 'react';
const NavigationBar = () => {
  const {setNewEmployee, allEmployees} = useContext(UserContext);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  console.log("list")

  const arrayToCSV = (arr) => {
    const csv = arr.map(row => {
        Object.values(row).join(',')
    }).join('\n');
    return csv;
  }

  const handleDownload = () => {
    const csv = arrayToCSV(allEmployees);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.getElementById("export")
    a.href = url;
    a.download =  'employees.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return(
    <nav className="navbar navbar-expand-lg px-4">
      <div>
        <h1 className="fs-3 fw-bold">Employee List</h1>
        <p>View and manage employee data</p>
      </div>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
        onClick={toggleNav}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isNavOpen && 'show'} d-flex justify-content-end`} id="navbarNav">
        <ul className="navbar-nav">
          {/* <li>
            <img src="/people.svg" alt='People icon' />
          </li>
          <li className="nav-item">
            <a className='fw-bold' href='/'>Employees</a>
          </li> */}
          <li className="nav-item">
            <button 
              className='btn btn-dark mx-2' 
              onClick={()=>setNewEmployee(true)}
            >
              New Employee
            </button>
          </li>
          <li className='nav-item'>
            <a className='btn btn-light border' onClick={handleDownload} id="export">Export</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;