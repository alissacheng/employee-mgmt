import { useState, useContext } from "react"
import Search from "./Search"
import UserContext from "../../lib/UserContext";
import Filter from "./Filter";

const SearchFilter = () => {
    const {allEmployees, setEmployees, searchInput, setSearchInput} = useContext(UserContext);
    // const [searchInput, setSearchInput] = useState("")
    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheck = (event) => {
        const { value: department, checked: isChecked } = event.target;
        const newCheckedItems = isChecked ? [...checkedItems, department] : checkedItems.filter(item => item !== department);
        setCheckedItems(newCheckedItems);
        filterEmployees(searchInput, newCheckedItems);
    };

    const handleChange = (e) => {
        const search = (e.target.value).toLowerCase()
        setSearchInput(search);
        filterEmployees(search, checkedItems);
    }

    const filterEmployees = (search, checked) => {
        const joinArrayFromIndex = (array, index) => array.slice(index).join(" ");
        const firstWordInput = search.split(" ")[0]

        const newEmployees = allEmployees.filter(({ name, department }) => {
            const nameArr = name.toLowerCase().split(" ")
            const startsWithAnyName = nameArr.filter(name=>name.startsWith(firstWordInput))
            const startIndex = nameArr.indexOf(startsWithAnyName[0])
            const joinedStr = startsWithAnyName.length ? joinArrayFromIndex(nameArr, startIndex) : ""

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