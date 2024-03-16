const Search = ({ handleChange }) => {
    return(
        <div className="col">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder={"Search Name"}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default Search;