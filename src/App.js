import './App.css';
import Products from './Products.js';
import SearchProducts from './components/Product/SearchProducts';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import HttpCall from './utils/HttpClient';
import Category from './components/Product/Category';
import CreateProduct from './components/Product/CreateProduct';
import { ProductContext } from './Contexts/ProductContext';
import { ModalContext } from './Contexts/ModalContext';


const App = () => {
  const [isloading, setIsLoading] = useState(true);
 const {openModal, setOpenModal} = useContext(ModalContext)
  const categories = useContext(ProductContext);
  const currentProducts = useContext(ProductContext);
  const searchQuery = useContext(ProductContext);


  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [isloading]);

  let baseUrl = process.env.REACT_APP_BASE_URL;

  const fetchProducts = async () => {
    const httpCall = new HttpCall();

    const resp = await httpCall.makeGetApiCall();
    const dataProducts = resp.data.products
    currentProducts.setCurrentProducts([...dataProducts]);

    setIsLoading(false)
  }

  const fetchCategories = async () => {
    let url = baseUrl + "/categories";
    const httpCall = new HttpCall(url);

    const resp = await httpCall.makeGetApiCall();
    const data = resp.data
    categories.setCategories([...data]);
  }

  const fetchBySearch = async (query) => {
    let url = `${baseUrl}/search?q=${query}`;
    const httpCall = new HttpCall(url);

    const resp = await httpCall.makeGetApiCall();
    const data = resp.data.products
    currentProducts.setCurrentProducts([...data]);
  }

  const handleSubmit = async () => {
    // console.log(searchQuery?.searchQuery);
    await fetchBySearch(searchQuery?.searchQuery);
    searchQuery?.setSearchQuery('');
  };

  return (
    isloading ? 'Loading' :
      <div style={{ height: openModal ? '100vh' : "100%", width: openModal ? '100vw' : "100%", position: 'relative', overflow: openModal ? 'hidden' : '' }}>
        <div style={{ justifyContent:"center", alignItems:"center", height: "100%", width: "100%", background: 'rgba(220,220,220, 0.5)', position: 'absolute', display: openModal ? 'flex' : 'none', zIndex:"1000"}}>
         <CreateProduct/>
        </div>
        <div>
          <nav>
            <SearchProducts onSubmit={() => handleSubmit()} />
          </nav>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", marginTop: "8px", justifyContent: "center", width: "15%", flexDirection: "column", height: "600px", padding: "10px" }}>
              <div style={{ fontSize: "18px", color: "gray", fontWeight: "bolder" }}>
                <span>Categories</span>
              </div>
              <div style={{ alignSelf: "flex-start", padding: "6px" }}>
                {categories.categories.map((category, index) => {
                  return (
                    <Category key={index} category={category} />)
                })}
              </div>
            </div>
            <div className="">
              {currentProducts?.currentProducts && <Products products={currentProducts?.currentProducts} />}
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
