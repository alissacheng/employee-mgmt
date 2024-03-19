import { useState } from "react";
import departmentList from "../../lib/departmentList";

const Filter = ({ handleCheck, checkedItems }) => {
    const [open, setOpen] = useState(false)
    return(
        <div className="col filter position-relative mb-3">
            <button 
                className="border-0 px-4 py-1 h-100 btn btn-light rounded"
                onClick={()=>setOpen(!open)}
            >
                <img 
                    src="/filter.svg" 
                    alt="Filter icon"
                    className="mx-1"
                />
                <span className="mx-1">Filter</span>
            </button>
            <div className={`position-absolute bg-white shadow-sm px-2 py-3 rounded w-100 ${open ? '' : 'invisible'}`}>
            {departmentList.map((option) => (
                <div key={option.name} classvalue="form-check">
                    <input
                        classvalue="form-check-input"
                        type="checkbox"
                        id={option.name}
                        value={option.label}
                        checked={checkedItems.includes(option.label) || false}
                        onChange={handleCheck}
                    />
                    <label classvalue="form-check-label w-100 block" htmlFor={option.name}>
                        {option.label}
                    </label>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Filter;