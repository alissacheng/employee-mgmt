const joinArrayFromIndex = (array, index) => array.slice(index).join(" ");

const filteredEmployees = (search, checked, allEmployees) => {
    const firstWordInput = search.split(" ")[0]

    return allEmployees.filter(({ name, department }) => {
        const nameArr = name.toLowerCase().split(" ")
        const startsWithName = nameArr.find(name=>name.startsWith(firstWordInput))

        if(!startsWithName) return false

        const joinedStr = joinArrayFromIndex(nameArr, nameArr.indexOf(startsWithName))
        // Filter eployees by departments selected, or remove filter if none were selected
        const filterDepartments = checked.length ? checked.includes(department) : true;
        return joinedStr.startsWith(search) && filterDepartments;
    });
}

export default filteredEmployees;