import { useContext, useState } from "react";
import HttpCall from "../../utils/HttpClient";
import { ProductContext } from '../../ProductContext';

const CreateProduct = () => {
   const [create, setCreate] = useState({});
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
      const httpCall = new HttpCall(baseUrl);
      productData?.setProductData({ ...create })

      await httpCall.makePostApiCall(productData?.productData);
      await fetchAllProducts();
      setCreate({});
   };

   return (
      <form onSubmit={e => handleSubmit(e)}>
         <div className="wrapper" style={{width: "500px", height: "500px", marginTop: "30px", marginBottom: "30px", padding: "20px", fontSize: "14px"}}>
            <div style={{display: "flex", width: "400px"}}>
               <input type="text" value={create.title} onChange={e => setCreate({title: e.target.value})} placeholder="Product Title" required />
               <input type="text" value={create.category} onChange={e => setCreate({title: e.target.category})} placeholder="Product Category" />
            </div>
            <div style={{display: "flex", fontSize: "14px"}}>
               <input type="number" value={create.price} onChange={e => setCreate({title: e.target.price})} placeholder="Product Price" required />
               <input type="text" value={create.discountPercentage} onChange={e => setCreate({title: e.target.discountPercentage})} placeholder="Product discount Percentage" />
            </div>
            <div>
               <input type="text" value={create.description} onChange={e => setCreate({title: e.target.description})} placeholder="Product Description" />
            </div>
         </div>

         <button>Create Product</button>
      </form>
   );
}

export default CreateProduct;