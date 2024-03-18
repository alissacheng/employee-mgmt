import { useState, useContext, useEffect } from "react"
import Search from "./Search"
import UserContext from "../../lib/UserContext";
import Filter from "./Filter";
import filteredEmployees from "./filteredEmployees";

const SearchFilter = ({ updateSearch, updateEmployees }) => {
    const {allEmployees} = useContext(UserContext);
    const [checkedItems, setCheckedItems] = useState([]);
    const [searchInput, setSearchInput] = useState("")

    const handleCheck = (event) => {
        const { value: department, checked: isChecked } = event.target;
        const newCheckedItems = isChecked ? [...checkedItems, department] : checkedItems.filter(item => item !== department);
        setCheckedItems(newCheckedItems);
        updateEmployees(filteredEmployees(searchInput, newCheckedItems, allEmployees));
    };

    const handleChange = (e) => {
        const search = (e.target.value).toLowerCase().trim()
        setSearchInput(search);
        updateSearch(search);
        updateEmployees(filteredEmployees(search, checkedItems, allEmployees));
    }

    useEffect(()=> {
        if(allEmployees.length){
            updateEmployees(filteredEmployees(searchInput, checkedItems, allEmployees));
        }
    }, [allEmployees])

    return(
        <div className="row">
            <Search handleChange={handleChange} />
            <Filter handleCheck={handleCheck} checkedItems={checkedItems} />
        </div>
    )
}

export default SearchFilter;