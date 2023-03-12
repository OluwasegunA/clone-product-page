import React, { useContext } from 'react';
import { ProductContext } from '../../Contexts/ProductContext';
import '../../style/style.css';
import { FaSearch, FaPlus } from "react-icons/fa";
import { ModalContext } from "../../Contexts/ModalContext";

const SearchProducts = ({ onSubmit }) => {
  const searchQuery = useContext(ProductContext);
  const { openModal, setOpenModal, openCreateForm, setOpenCreateForm, openEditForm } = useContext(ModalContext);


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
          <div><FaSearch /></div>
        </button>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <button type="submit" className="btn" onClick={() => {
          setOpenModal(!openModal)
          setOpenCreateForm(true)
        }}>
          <div><FaPlus /></div>
        </button>
      </div>
    </div>
  );
}

export default SearchProducts