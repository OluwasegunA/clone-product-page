import SubImages from "./SubImages";
import UpdateAndDeleteProduct from "./UpdateAndDeleteProduct";
import { useContext } from "react";
import { ProductContext } from '../../Contexts/ProductContext';

const ProductCard = (props) => {
   const discountedPrice = (price = props?.price) => {
      return ((price - ((props?.discountPercentage / 100) * price)))
         .toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
         });
   }
   const { setInput, currentProductData } = useContext(ProductContext)
   function handleInputChange() {
      console.log("title", props.title)
      setInput({
         title: props.title
      });
   }
   return (
      <div className="card-wrapper" style={{ width: "30%", height: "230px", display: "flex", marginBottom: "10px", background: "#ffffff", marginTop: "10px" }}>
         <div style={{ width: "60%", height: "100%", objectFit: "cover", display: "flex", justifyContent: "center", background: "blue", alignItems: "center" }}>
            <img style={{ height: "100%", width: "100%" }} src={props?.thumbnail} alt={props?.title} />
         </div>
         <div style={{ width: "40%", height: "100%", fontSize: "12px", padding: "8px", color: "gray", textAlign: "left" }}>
            <div style={{ marginBottom: "5px" }}>
               {props?.images?.splice(0, 2).map((image, index) => {
                  return (
                     <SubImages key={index} image={image} />)
               })}
            </div>
            <div style={{ fontWeight: "bold", color: "gray", marginBottom: "8px" }}>
               <span>{props?.title}</span>
            </div>
            <div className="decription" style={{ marginBottom: "5px" }}>
               <span>{props?.decription}</span>
            </div>
            <div className="category" style={{ marginBottom: "5px" }}>
               <span>{props?.category}</span>
            </div>
            <div className="price" style={{ marginBottom: "5px", fontSize: "0.8rem", color: "black", textDecoration: "line-through" }}>
               <span>{props?.price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
               })}</span>
            </div>
            <div className="price" style={{ marginBottom: "5px", fontSize: "20px", color: "black", fontWeight: "bolder" }}>
               <span>{discountedPrice()}</span>
            </div>
            <div className="discountPercentage" style={{ marginBottom: "5px", color: "red" }}>
               <span>{props?.discountPercentage}%</span>
            </div>
            <div>
               <UpdateAndDeleteProduct product={props} />
            </div>
         </div>
      </div>
   );
}
export default ProductCard;