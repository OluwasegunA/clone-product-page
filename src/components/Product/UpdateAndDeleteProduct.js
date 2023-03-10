import React from 'react';
import '../../style/button.css'
import {FaEdit, FaTrash} from "react-icons/fa"

const UpdateAndDeleteProduct = () => {
  return (
    <div style={{width: '100px', display: 'flex', justifyContent: "space-between", fontSize: '8px'}}>
      <button className='custom-btn btn-update' style={{width: '45%', textAlign: 'center'}}><FaEdit /></button>
      <button  className='custom-btn btn-5' style={{ width: '45%', textAlign: 'center'}}><FaTrash /></button>
    </div>
  )
}

export default UpdateAndDeleteProduct;