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
    <div>
      <UserContext.Provider
        value={{
          allEmployees,
          setAllEmployees,
          newEmployee,
          setNewEmployee
        }}
      >
        <div className='container'>
            {newEmployee && <EmployeeForm />}
            <NavigationBar />
            <EmployeeList />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
