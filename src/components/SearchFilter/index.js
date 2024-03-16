import { useState, useContext } from "react"
import Search from "./Search"
import UserContext from "../../lib/UserContext";
import Filter from "./Filter";

const SearchFilter = () => {
    const {allEmployees, setEmployees} = useContext(UserContext);
    const [searchInput, setSearchInput] = useState("")
    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheck = (event) => {
      const { value: department, checked: isChecked } = event.target;
      const newCheckedItems = isChecked ? [...checkedItems, department] : [...checkedItems].filter((item)=>item !== department)
    
      setCheckedItems(newCheckedItems);
      filterEmployees(searchInput, newCheckedItems);
    };

    const handleChange = (e) => {
        const search = (e.target.value).toLowerCase()
        setSearchInput(search);
        filterEmployees(search, checkedItems);
    }

    const filterEmployees = (search, checked) => {
        const newEmployees = allEmployees.filter(({name, department}) => {
            const startsWithName = name.toLowerCase().startsWith(search);
            const startsWithlastName = name.toLowerCase().split(" ").slice(-1)[0].startsWith(search);
            const filterDepartments = checked.length ? checked.includes(department.toLowerCase()) : true
            return (startsWithName || startsWithlastName) && filterDepartments;
          });
          setEmployees(newEmployees);
    }

    return(
        <div className="container">
            <div className="row">
                <Search handleChange={handleChange} />
                <Filter handleCheck={handleCheck} checkedItems={checkedItems} />
            </div>
        </div>
    )
}

export default SearchFilter;