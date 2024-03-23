const Search = ({ handleChange }) => {
    return(
        <div className="col position-relative ps-sm-4 ps-3">
            <img 
                src="/images/search.svg"
                className="search-icon position-absolute"
                alt="Magnifying glass icon" 
            />
            <input
                type="text"
                className="form-control ps-sm-5 py-2"
                placeholder={"Search employees"}
                onChange={handleChange}
            />
        </div>
    )
}

export default Search;