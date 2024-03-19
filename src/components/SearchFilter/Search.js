const Search = ({ handleChange }) => {
    return(
        <div className="col mb-3 position-relative">
            <img 
                src="/search.svg"
                className="search-icon position-absolute"
                alt="Magnifying glass icon" 
            />
            <input
                type="text"
                className="form-control px-4"
                placeholder={"Search employees"}
                onChange={handleChange}
            />
        </div>
    )
}

export default Search;