import { useState, useContext, useCallback, useEffect } from "react"
import Search from "./Search"
import UserContext from "../../lib/UserContext";
import Filter from "./Filter";
import filteredEmployees from "./filteredEmployees";

const SearchFilter = ({ updateSearch, updateEmployees }) => {
    const {allEmployees} = useContext(UserContext);
    const [checkedItems, setCheckedItems] = useState([]);
    const [searchInput, setSearchInput] = useState("")

    const handleCheck = (e) => {
        const { value: department, checked: isChecked } = e.target;
        const newCheckedItems = isChecked ? [...checkedItems, department] : checkedItems.filter(item => item !== department);
        setCheckedItems(newCheckedItems);
    }

    const handleChange = (e) => {
        const search = (e.target.value).toLowerCase().trim()
        setSearchInput(search);
        updateSearch(search);
    }

    useEffect(() => {
        if (allEmployees.length) {
            updateEmployees(filteredEmployees(searchInput, checkedItems, allEmployees));
        }
    }, [allEmployees, searchInput, checkedItems]);

    return(
        <div className="d-flex position-relative">
            <Filter handleCheck={handleCheck} checkedItems={checkedItems} />
            <Search handleChange={handleChange} />
        </div>
    )
}

export default SearchFilter;