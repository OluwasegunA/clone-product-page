import React, { useState, useContext, useEffect } from 'react'
import { ProductContext } from '../../Contexts/ProductContext';
import HttpCall from '../../utils/HttpClient';

const Category = (props) => {
   const [category, setCategory] = useState(props.category);
   const currentCategory = useContext(ProductContext)
   const currentProducts = useContext(ProductContext);


   let baseUrl = process.env.REACT_APP_BASE_URL;

   const fetchByCategory = async (cat) => {
      let url = Object.keys(currentCategory).length > 0 ? baseUrl + "/category/" + cat : baseUrl;
      const httpCall = new HttpCall(url);

      const resp = await httpCall.makeGetApiCall();
      const data = resp.data.products
      currentProducts.setCurrentProducts([...data]);
   }

   const handleChange = async (e) => {
      // to find out if it's checked or not; returns true or false
      let checked = e.target.checked;
      if (checked) {
         setCategory(e.target.value);
         currentCategory.setCurrentCategory(e.target.value)
      }

      await fetchByCategory(category);
   };


   return (
      <div style={{ display: "flex", justifyContent: "flex-start", width: "150px", alignItems: "center", height: "20px" }}>
         <div style={{ fontSize: "12px", color: "gray", width: "20px", height: "20px" }}>
            <input type="radio" value={category} name="category" onChange={e => handleChange(e)} />
         </div>
         <div style={{ fontSize: "12px", color: "gray", width: "100px", height: "20px" }}>
            <span>{props.category}</span>
         </div>
      </div>
   )
}

export default Category