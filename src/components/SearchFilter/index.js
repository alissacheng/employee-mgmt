import { useState, useContext } from "react"
import Search from "./Search"
import UserContext from "../../lib/UserContext";
import Filter from "./Filter";

const SearchFilter = () => {
    const {allEmployees, setEmployees, searchInput, setSearchInput} = useContext(UserContext);
    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheck = (event) => {
        const { value: department, checked: isChecked } = event.target;
        const newCheckedItems = isChecked ? [...checkedItems, department] : checkedItems.filter(item => item !== department);
        setCheckedItems(newCheckedItems);
        filterEmployees(searchInput, newCheckedItems);
    };

    const handleChange = (e) => {
        const search = (e.target.value).toLowerCase().trim()
        setSearchInput(search);
        filterEmployees(search, checkedItems);
    }

    const joinArrayFromIndex = (array, index) => array.slice(index).join(" ");

    const filterEmployees = (search, checked) => {
        const firstWordInput = search.split(" ")[0]

        const newEmployees = allEmployees.filter(({ name, department }) => {
            const nameArr = name.toLowerCase().split(" ")
            const startsWithName = nameArr.find(name=>name.startsWith(firstWordInput))

            if(!startsWithName) return false

            const joinedStr = joinArrayFromIndex(nameArr, nameArr.indexOf(startsWithName))
            // Filter eployees by departments selected, or remove filter if none were selected
            const filterDepartments = checked.length ? checked.includes(department.toLowerCase()) : true;
            return joinedStr.startsWith(search) && filterDepartments;
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