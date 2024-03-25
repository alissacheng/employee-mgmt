const OneEmployee = ({ employee, handleDelete, searchInput }) => {
    const indexOfSearch = employee.name.toLowerCase().indexOf(searchInput.toLowerCase());
    const indexOfBoldPart = indexOfSearch === 0 ? 0 : employee.name.toLowerCase().indexOf(" " + searchInput.toLowerCase())
    const beforeBold = employee.name.slice(0, indexOfBoldPart);
    const searchLength = indexOfBoldPart === 0 ? searchInput.length : 1 + searchInput.length
    const boldPart = employee.name.slice(indexOfBoldPart, indexOfBoldPart + searchLength);
    const afterBold = employee.name.slice(indexOfBoldPart + searchLength);

    return(
        <tr>
            <td className="col p-lg-3 p-2 align-middle no-wrap">
                {beforeBold}
                {searchInput && <strong>{boldPart}</strong>}
                {afterBold}
            </td>
            <td className="col p-lg-3 p-2 align-middle">
                {employee.email}
            </td>
            <td className="col p-lg-3 p-2 align-middle min-w-200">
                {employee.position}
            </td>
            <td className="col p-lg-3 p-2 align-middle">
                {employee.department}
            </td>
            <td className="col p-lg-3 p-2 align-middle">
                ${parseInt(employee.salary).toLocaleString()}
            </td>
            <td className="col p-lg-3 p-2 align-middle no-wrap">
                {employee.start_date}
            </td>
            <td className="col p-lg-3 p-2 align-middle">
                <button
                    className="rounded-circle border-0 delete-btn d-inline"
                    type="button"
                    onClick={()=>{handleDelete(employee.id, employee.name)}}
                    data-bs-toggle="deleteModal" 
                    data-bs-target="#deleteModal"
                    aria-label="Delete"
                >
                    <img 
                        src="/images/trash.svg" 
                        alt="Trash can icon"
                        className="py-2 px-1"
                    />
                </button>
            </td>
        </tr>
    )
};

export default OneEmployee;