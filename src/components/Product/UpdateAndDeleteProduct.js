import React, {useContext} from 'react';
import '../../style/button.css';
import {FaEdit, FaTrash} from "react-icons/fa";
import { ModalContext } from '../../Contexts/ModalContext';

const UpdateAndDeleteProduct = ({id}) => {
const { openModal, setOpenModal, openEditForm, setOpenEditForm } = useContext(ModalContext);

  return (
    <div style={{width: '100px', display: 'flex', justifyContent: "space-between", fontSize: '8px'}}>
      <button className='custom-btn btn-update' style={{width: '45%', textAlign: 'center'}} onClick={()=> 
        {
          setOpenEditForm(!openEditForm)
          setOpenModal(!openModal)}}>
          <FaEdit /></button>
      <button  className='custom-btn btn-5' style={{ width: '45%', textAlign: 'center'}} onClick={()=> setOpenModal(!openModal)}><FaTrash /></button>
    </div>
  )
}

export default UpdateAndDeleteProduct;