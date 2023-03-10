import { useContext, useState } from "react";
import HttpCall from "../../utils/HttpClient";
import { ProductContext } from '../../Contexts/ProductContext';
import { ModalContext } from "../../Contexts/ModalContext";
import { FaCross } from "react-icons/fa";

const CreateProduct = ({ productObject }) => {
   const { openModal, setOpenModal, openCreateForm, setOpenCreateForm, openEditForm } = useContext(ModalContext);
   const [create, setCreate] = useState({
      title: productObject?.title ? productObject?.title : "",
      category: productObject?.category ? productObject?.category : "",
      price: productObject?.price ? productObject?.price : "",
      discountPercentage: productObject?.discountPercentage ? productObject?.discountPercentage : "",
      description: productObject?.description ? productObject?.description : "",
   });
   const productData = useContext(ProductContext);
   const currentProducts = useContext(ProductContext);

   let baseUrl = process.env.REACT_APP_BASE_URL;

   const fetchAllProducts = async () => {
      let url = baseUrl;
      const httpCall = new HttpCall(url);

      const resp = await httpCall.makeGetApiCall();
      const data = resp.data.products
      currentProducts.setCurrentProducts([...data]);
   }

   const handleSubmit = async (event) => {
      event.preventDefault();
      const customUrl = productObject ? `${baseUrl}/${productObject.id}` : baseUrl
      const httpCall = new HttpCall(customUrl);

      const data = productObject ? {
         title: create.title
      } : { ...create }

      productData?.setProductData({ ...data })

      await httpCall.makePostApiCall(productData?.productData);
      await fetchAllProducts();
      setCreate({});
   };

   const handleChnage = (e) => {
      setCreate((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value
      }))
   }

   return (
      <form onSubmit={e => handleSubmit(e)} style={{ dispaly: "flex", alignItems: "center", background: 'orangered', width: "500px", height: "550px", justifyContent: "center" }}>
         <div className="" style={{ marginTop: "30px", fontSize: "14px", height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", padding: "10px" }}>
            <button type="submit" className="btn" onClick={() => {
               setOpenModal(!openModal)
               setOpenCreateForm(!openCreateForm)
            }}><FaCross />
            </button>
            <input type="text" style={{ width: "100%", height: "45px" }} name={"title"} value={create.title} onChange={e => handleChnage(e)} placeholder="Product Title" required />
            <input type="text" style={{ width: "100%", height: "45px" }} name={"category"} value={create.category} onChange={e => handleChnage(e)} placeholder="Product Category" />
            <input type="number" style={{ width: "100%", height: "45px" }} name={"price"} value={create.price} onChange={e => handleChnage(e)} placeholder="Product Price" required />
            <input type="text" style={{ width: "100%", height: "45px" }} name={"discountPercentage"} value={create.discountPercentage} onChange={e => handleChnage(e)} placeholder="Product discount Percentage" />
            <textarea cols="4" rows="10" style={{ padding: "6px", width: "100%" }} name={"description"} value={create.description} onChange={e => handleChnage(e)} placeholder="Product Description">
            </textarea>
            <button style={{ padding: '6px', color: "gray" }} type="submit" onClick={() => {
               setOpenModal(!openModal)
            }} >{openCreateForm ? "Create" : "Edit"} Product</button>
         </div>
      </form>
   );
}

export default CreateProduct;