import './App.css';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import SearchFilter from './components/SearchFilter';
import UserContext from './lib/UserContext';
import React, { useState } from 'react';

function App() {
  const [allEmployees, setAllEmployees] = useState([])
  const [employees, setEmployees] = useState([])
  const [searchInput, setSearchInput] = useState("")

  return (
    <div className="App container">
      <UserContext.Provider
        value={{
          allEmployees,
          setAllEmployees,
          employees,
          setEmployees,
          searchInput,
          setSearchInput
        }}
      >
        <div>
          <EmployeeForm />
          <SearchFilter />
          <EmployeeList />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
