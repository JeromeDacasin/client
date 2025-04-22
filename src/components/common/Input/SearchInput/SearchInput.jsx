
import './SearchInput.css';


const SearchInput = ({title, onChange}) => {

    const handleChange = (e) => {
        onChange(e.target.value)
    }

    return (
        <input
            className='search-input'
            type="search"
            onChange={handleChange}
            placeholder={`Search for ${title}`}
        />
    )
}

export default SearchInput;