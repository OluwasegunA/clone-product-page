import React, { children, createContext, useState, useReducer} from 'react';
import { productReducer } from '../reducer/ProductReducer';

export const ProductContext = createContext({});

const ProductContextProvider = ({ children }) => {
   const [currentCategory, setCurrentCategory] = useState({});
   const [categories, setCategories] = useState([]);
   const [currentProducts, setCurrentProducts] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');
   const [productData, setProductData] = useState({});
   const [productToBeEdited, setProductToBeEdited] = useState({})

   const[currentProductState, dispatch] = useReducer(productReducer, currentProducts)
   const [inputs, setInput] = useState({ title: productToBeEdited?.title, description: productToBeEdited?.description, category: productToBeEdited?.category, price: productToBeEdited?.price, discountPercentage: productToBeEdited?.discountPercentage })


   return (
      <ProductContext.Provider
         value={{currentProductState, dispatch, inputs, setInput, productToBeEdited, setProductToBeEdited, currentCategory, setCurrentCategory, categories, setCategories, currentProducts, setCurrentProducts, searchQuery, setSearchQuery, productData, setProductData }}>
         {children}
      </ProductContext.Provider>
   )
}

export default ProductContextProvider