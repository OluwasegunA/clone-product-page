import React, { children, createContext, useState } from 'react'

export const ProductContext = createContext({});

const ProductContextProvider = ({children}) => {
   const [currentCategory, setCurrentCategory] = useState({});
   const [categories, setCategories] = useState([]);
   const [currentProducts, setCurrentProducts] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');
   const [productData, setProductData] = useState({});

   return (
      <ProductContext.Provider 
      value={{ currentCategory, setCurrentCategory, categories, setCategories, currentProducts, setCurrentProducts,searchQuery, setSearchQuery, productData, setProductData }}>
         {children}
      </ProductContext.Provider>
   )
}

export default ProductContextProvider