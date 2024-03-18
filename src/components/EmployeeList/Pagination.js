const Pagination = ({ updatePage, page, totalPages }) => {
    return(
        <div className="row">
            <div className="col-12">
            {page > 1 && (
                <button onClick={()=>{updatePage(-1)}}>
                    {"<"}
                </button>
            )}
            {totalPages && <p>page {page} of {totalPages}</p>}
            {page <  totalPages && (
                <button onClick={()=>{updatePage(1)}}>
                    {">"}
                </button>
            )}
            </div>
        </div>
    )
};

export default Pagination;