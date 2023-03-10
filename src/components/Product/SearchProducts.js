import React, { useContext } from 'react';
import { ProductContext } from '../../ProductContext';
import '../../style/style.css';
import {FaSearch} from "react-icons/fa"

const SearchProducts = ({onSubmit}) => {
  const searchQuery = useContext(ProductContext);

  const handleChange = (e) => {
    e.preventDefault();
    searchQuery?.setSearchQuery(e.target.value);
 };

  return (
    <div className='wrapper'>
      <div className="wrap">
        <input type="search" value={searchQuery?.searchQuery} placeholder="Search Product..."
          onChange={e => handleChange(e)} />
        <button type="submit" className="searchButton" onClick={onSubmit}>
          <div><FaSearch/></div>
        </button>
      </div>
    </div>
  );
}

export default SearchProducts