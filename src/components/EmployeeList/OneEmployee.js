const OneEmployee = ({ employee, handleDelete, searchInput }) => {
    const indexOfBoldPart = employee.name.toLowerCase().indexOf(searchInput.toLowerCase());
    const beforeBold = employee.name.slice(0, indexOfBoldPart);
    const boldPart = employee.name.slice(indexOfBoldPart, indexOfBoldPart + searchInput.length);
    const afterBold = employee.name.slice(indexOfBoldPart + searchInput.length);

    return(
        <tr>
            <td className="col">
                {beforeBold}
                {searchInput && <strong>{boldPart}</strong>}
                {afterBold}
            </td>
            <td className="col">
                {employee.email}
            </td>
            <td className="col">
                {employee.position}
            </td>
            <td className="col">
                {employee.department !== 'HR' ? employee.department : "Human Resources"}
            </td>
            <td className="col">
                ${parseInt(employee.salary).toLocaleString()}
            </td>
            <td className="col">
                {employee.start_date}
            </td>
            <td className="col">
                <button
                    onClick={()=>{handleDelete(employee.id)}}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
};

export default OneEmployee;