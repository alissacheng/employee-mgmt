const OneEmployee = ({ employee, handleDelete }) => {
    return(
        <tr>
            <td className="col">
                {employee.name}
            </td>
            <td className="col">
                {employee.email}
            </td>
            <td className="col">
                {employee.position}
            </td>
            <td className="col">
                {employee.department}
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