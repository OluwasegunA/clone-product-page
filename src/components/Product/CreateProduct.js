import { useContext, useState } from "react";
import HttpCall from "../../utils/HttpClient";
import { ProductContext } from '../../ProductContext';

const CreateProduct = ({ productObject }) => {
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
      <form onSubmit={e => handleSubmit(e)}>
         <div className="wrapper" style={{ width: "500px", height: "500px", marginTop: "30px", marginBottom: "30px", padding: "20px", fontSize: "14px" }}>
            <div style={{ display: "flex", width: "400px" }}>
               <input type="text" name={"title"} value={create.title} onChange={e => handleChnage(e)} placeholder="Product Title" required />
               <input type="text" name={"category"} value={create.category} onChange={e => handleChnage(e)} placeholder="Product Category" />
            </div>
            <div style={{ display: "flex", fontSize: "14px" }}>
               <input type="number" name={"price"} value={create.price} onChange={e => handleChnage(e)} placeholder="Product Price" required />
               <input type="text" name={"discountPercentage"} value={create.discountPercentage} onChange={e => handleChnage(e)} placeholder="Product discount Percentage" />
            </div>
            <div>
               <input type="text" name={"description"} value={create.description} onChange={e => handleChnage(e)} placeholder="Product Description" />
            </div>
         </div>

         <button type="submit">{productObject ? "Edit" : "Create"} Product</button>
      </form>
   );
}

export default CreateProduct;