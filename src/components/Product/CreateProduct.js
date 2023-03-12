import { useContext, useReducer } from "react";
import HttpCall from "../../utils/HttpClient";
import { ProductContext } from '../../Contexts/ProductContext';
import { ModalContext } from "../../Contexts/ModalContext";
import { FaAngleLeft } from "react-icons/fa";
import { productReducer } from "../../reducer/ProductReducer";

const CreateProduct = ({ productObject }) => {
   const { openModal, setOpenModal, openCreateForm, setOpenCreateForm, openEditForm, setOpenEditForm } = useContext(ModalContext);
   const { productToBeEdited, productData, inputs, setInput, currentProducts, setCurrentProducts } = useContext(ProductContext);
   const [state, dispatch] = useReducer(productReducer, currentProducts);
   
   let baseUrl = process.env.REACT_APP_BASE_URL;
   // const fetchAllProducts = async () => {
   //    let url = baseUrl;
   //    const httpCall = new HttpCall(url);

   //    const resp = await httpCall.makeGetApiCall();
   //    const data = resp.data.products
   //    setCurrentProducts([...data]);
   // }

   const createOrEditProductAPICall = async () => {
      const url = productToBeEdited ? `${baseUrl}/${productToBeEdited?.id}` : baseUrl;
      const httpCall = new HttpCall(url);

      const newProduct = productToBeEdited ? await httpCall.makePutApiCall({title: inputs?.title}) : await httpCall.makePostApiCall(inputs);

      productToBeEdited ? dispatch({type: "EDIT", payload:{productToBeEdited, currentProducts, newProduct}}) : dispatch({type: "CREATE", payload:{inputs, currentProducts}})
   }

   const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("productToBeEdited", productToBeEdited);
      await createOrEditProductAPICall();
      // await fetchAllProducts();
      setInput({
         title:"", 
         description:"", 
         price:"", 
         discountPercentage: "", 
         category: ""
      })
   };

   const handleChnage = (e) => {
      setInput({
         [e.target.name]: e.target.value
      });
   }
   

   return (
      <form onSubmit={e => handleSubmit(e)} style={{ dispaly: "flex", alignItems: "center", background: 'orangered', width: "500px", height: "550px", justifyContent: "center" }}>
         <div className="" style={{ marginTop: "30px", fontSize: "14px", height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", padding: "10px" }}>
            <button type="submit" className="btn" style={{background: 'grey', color: 'black'}} onClick={() => {
               setOpenModal(!openModal)
               setOpenCreateForm(false)
               setOpenEditForm(false)
               setInput({
                  title:"", description:"", price:"", discountPercentage: "", category: ""
               })
            }}><FaAngleLeft />
            </button>
            <input type="text" style={{ width: "100%", height: "45px" }} name="title" value={inputs?.title} onChange={e => handleChnage(e)} placeholder="Product Title" required />
            <input type="text" style={{ width: "100%", height: "45px" }} name="category" value={inputs?.category} onChange={e => handleChnage(e)} placeholder="Product Category" />
            <input type="text" style={{ width: "100%", height: "45px" }} name="price" value={inputs?.price} onChange={e => handleChnage(e)} placeholder="Product Price" required />
            <input type="text" style={{ width: "100%", height: "45px" }} name="discountPercentage" value={inputs?.discountPercentage} onChange={e => handleChnage(e)} placeholder="Product discount Percentage" />
            <textarea cols="4" rows="10" style={{ padding: "6px", width: "100%" }} name="description" value={inputs?.description} onChange={e => handleChnage(e)} placeholder="Product Description">
            </textarea>
            <button style={{ padding: '6px', color: "gray" }} type="submit" onClick={() => {
               dispatch({type: "EDIT", payload:{productToBeEdited}})
               setOpenModal(!openModal)
            }} >{openCreateForm ? "Create" : "Edit"} Product</button>
         </div>
      </form>
   );
}

export default CreateProduct;