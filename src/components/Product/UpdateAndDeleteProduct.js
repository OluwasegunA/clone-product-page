import React, { useContext, useEffect, useReducer } from 'react';
import '../../style/button.css';
import { FaEdit, FaTrash } from "react-icons/fa";
import { ModalContext } from '../../Contexts/ModalContext';
import { ProductContext } from '../../Contexts/ProductContext';
import HttpCall from '../../utils/HttpClient';
import { productReducer } from '../../reducer/ProductReducer';

const UpdateAndDeleteProduct = ({ product }) => {
   const { openModal, setOpenModal, openEditForm, setOpenEditForm, } = useContext(ModalContext);
   const { productToBeEdited, setProductToBeEdited, setInput, input, currentProducts, dispatch } = useContext(ProductContext);

   const handleClick = async () => {
      setOpenEditForm(true);
      setOpenModal(!openModal);
      setProductToBeEdited(product);
      setInput({ 
         title: product?.title, 
         description: product?.description, 
         category: product?.category, 
         price: product?.price, 
         discountPercentage: product?.discountPercentage 
      });
   }

   return (
      <div style={{ width: '100px', display: 'flex', justifyContent: "space-between", fontSize: '8px' }}>
         <button className='custom-btn btn-update' style={{ width: '45%', textAlign: 'center' }} onClick={() => handleClick()}>
            <FaEdit /></button>
         <button className='custom-btn btn-5' style={{ width: '45%', textAlign: 'center' }} onClick={() => setOpenModal(!openModal)}><FaTrash /></button>
      </div>
   )
}

export default UpdateAndDeleteProduct;