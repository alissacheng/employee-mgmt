const Pagination = ({ updatePage, page, totalPages }) => {
    return(
        <div className="d-flex my-4">
        {totalPages && <p className="fw-bold mb-0">{page} of {totalPages}</p>}
        {page > 1 && (
            <button 
                onClick={()=>{updatePage(-1)}}
                className="bg-white border-1 rounded-2 ms-2"
            >
                {"<"}
            </button>
        )}
        {page <  totalPages && (
            <button 
                onClick={()=>{updatePage(1)}}
                className="bg-white border-1 rounded-2 ms-2"
            >
                {">"}
            </button>
        )}
        </div>
    )
};

export default Pagination;