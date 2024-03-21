const Search = ({ handleChange }) => {
    return(
        <div className="col mb-4 position-relative ps-4">
            <img 
                src="/search.svg"
                className="search-icon position-absolute"
                alt="Magnifying glass icon" 
            />
            <input
                type="text"
                className="form-control ps-5 py-2"
                placeholder={"Search employees"}
                onChange={handleChange}
            />
        </div>
    )
}

export default Search;