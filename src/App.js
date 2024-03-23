import './styles/style.css'
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import NavigationBar from './components/NavigationBar';
import SearchFilter from './components/SearchFilter';
import UserContext from './lib/UserContext';
import React, { useState } from 'react';

function App() {
  const [allEmployees, setAllEmployees] = useState([])
  const [newEmployee, setNewEmployee] = useState(false)

  return (
    <div className='overflow-hidden'>
      <UserContext.Provider
        value={{
          allEmployees,
          setAllEmployees,
          newEmployee,
          setNewEmployee
        }}
      >
        {newEmployee && <EmployeeForm />}
        <div className={`container-lg px-3 px-md-5 px-lg-0 ${newEmployee && 'd-none'}`}>
            <NavigationBar />
            <EmployeeList />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
