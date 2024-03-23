const CancelFilters = ({ checkedItems, removeFilter }) => {
  return(
    <div className="mb-3 d-flex filter-cancel flex-wrap">
      {checkedItems.map((department)=>{
        return (
          <button 
            onClick={()=>removeFilter(department)}
            className="rounded-5 btn-dark btn px-1 py-0 me-2 mb-1 mb-sm-0"
          >
            <span className="mx-1">{department}</span>
            <span className="rounded-circle bg-white">
              <img src="/images/cancel.svg" alt="Cancel icon" />
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default CancelFilters;