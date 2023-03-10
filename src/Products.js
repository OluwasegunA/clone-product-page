import ProductCard from "./components/Product/ProductCard";

const Products = (props) => {
   return (<div style={{display: "flex", gap: "20px", width: "100%", flexWrap: "wrap", justifyContent: "center", background: "#EFEFEF", marginTop: "100px"}}>
      {props.products.map((product) => {
         return (
            <ProductCard key={product.id} {...product} />)
      })}
   </div>)
}

export default Products;