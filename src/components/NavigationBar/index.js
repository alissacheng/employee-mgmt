import {useContext, useState} from 'react';
import UserContext from '../../lib/UserContext';

const NavigationBar = () => {
  const {setNewEmployee, allEmployees} = useContext(UserContext);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

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
    const a = document.getElementById("export");
    a.href = url;
    a.download =  'employees.csv';
    URL.revokeObjectURL(url);
  };

  return(
    <nav className="navbar navbar-expand-lg py-3 container-lg px-3 px-md-5 px-lg-0 bg-white">
      <div className='w-75'>
        <h1 className="fs-3 fw-bold m-0">Employee List</h1>
        <p className='m-0'>View and manage employee data</p>
      </div>
      <button 
        className={`navbar-toggler ${isNavOpen ? 'active' : ''}`}
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
        onClick={toggleNav}
      >
        <span className="border-bottom-1 d-block"></span>
        <span className="border-bottom-1"></span>
        <span className="border-bottom-1 d-block"></span>
      </button>
      <div className={`navbar-collapse ${isNavOpen ? 'active' : ''} bg-white w-100 d-lg-flex justify-content-end py-lg-0 py-4 px-lg-0 px-3 px-md-5`} id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button 
              className='btn btn-dark me-2' 
              onClick={()=>setNewEmployee(true)}
            >
              New Employee
            </button>
          </li>
          <li className='nav-item'>
            <a 
              className='btn btn-light border mt-2 mt-lg-0' 
              onClick={handleDownload} 
              id="export"
            >
              Export List
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;