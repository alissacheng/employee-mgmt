const Pagination = ({ updatePage, page, totalPages }) => {
    return(
        <div className="d-flex my-4 justify-content-center">
            <button 
                onClick={()=>{updatePage(-1)}}
                className={`border rounded-2 me-2 ${page < 2 && 'invisible'} p-0 btn`}
            >
                <img src="/left-chevron.svg" alt="Left chevron icon" />
                <span className="visually-hidden">Previous page</span>
            </button>
        {totalPages && <p className="fw-bold mb-0">page {page} of {totalPages}</p>}
            <button 
                onClick={()=>{updatePage(1)}}
                className={`btn border rounded-2 ms-2 p-0 ${page >= totalPages && 'invisible'}`}
            >
                <img src="/right-chevron.svg" alt="Left chevron icon" />
                <span className="visually-hidden">Next page</span>
            </button>
        </div>
    )
};

export default Pagination;