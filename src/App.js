import './App.css';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import NavigationBar from './components/NavigationBar';
import SearchFilter from './components/SearchFilter';
import UserContext from './lib/UserContext';
import React, { useState } from 'react';

function App() {
  const [allEmployees, setAllEmployees] = useState([])

  return (
    <div>
      <UserContext.Provider
        value={{
          allEmployees,
          setAllEmployees,
        }}
      >
        <div className='container'>
          <NavigationBar />
          <EmployeeForm />
          <EmployeeList />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
