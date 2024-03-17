import './App.css';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import NavigationBar from './components/NavigationBar';
import SearchFilter from './components/SearchFilter';
import UserContext from './lib/UserContext';
import React, { useState } from 'react';

function App() {
  const [allEmployees, setAllEmployees] = useState([])
  const [employees, setEmployees] = useState([])
  const [searchInput, setSearchInput] = useState("")

  return (
    <div>
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
          <NavigationBar />
          <EmployeeForm />
          <SearchFilter />
          <EmployeeList />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
