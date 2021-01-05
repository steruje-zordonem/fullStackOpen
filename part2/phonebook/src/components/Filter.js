const Filter = (props) => {
    const {filter,handleFilter} = props
    
    return (
        <div>
            filter shown with <input value={filter} onChange={handleFilter} />
        </div>
    )
}

export default Filter;