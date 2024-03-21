const OneEmployee = ({ employee, handleDelete, searchInput }) => {
    const indexOfBoldPart = employee.name.toLowerCase().indexOf(searchInput.toLowerCase());
    const beforeBold = employee.name.slice(0, indexOfBoldPart);
    const boldPart = employee.name.slice(indexOfBoldPart, indexOfBoldPart + searchInput.length);
    const afterBold = employee.name.slice(indexOfBoldPart + searchInput.length);

    return(
        <tr className="fs-6">
            <td className="col py-3 px-3 align-middle">
                {beforeBold}
                {searchInput && <strong>{boldPart}</strong>}
                {afterBold}
            </td>
            <td className="col py-3 px-3 align-middle">
                {employee.email}
            </td>
            <td className="col py-3 px-3 align-middle">
                {employee.position}
            </td>
            <td className="col py-3 px-3 align-middle">
                {employee.department}
            </td>
            <td className="col py-3 px-3 align-middle">
                ${parseInt(employee.salary).toLocaleString()}
            </td>
            <td className="col py-3 px-3 align-middle">
                {employee.start_date}
            </td>
            <td className="col py-3 px-3 align-middle">
                <button
                    className="rounded-circle border-0 delete-btn"
                    type="button"
                    onClick={()=>{handleDelete(employee.id, employee.name)}}
                    data-bs-toggle="modal" 
                    data-bs-target="#deleteModal"
                >
                    <img 
                        src="/trash.svg" 
                        alt="Trash can icon"
                        className="py-2 px-1"
                    />
                    <span className="visually-hidden">Delete</span>
                </button>
            </td>
        </tr>
    )
};

export default OneEmployee;