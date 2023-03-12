export function productReducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return [action.payload.products]
            
        case "EDIT":
            const allProducts = action.payload?.currentProducts
            const currentProduct = action.payload?.productToBeEdited
            const newEditedProduct = action.payload?.newProduct?.data;
            const currentProductIndex = allProducts?.findIndex((product)=> currentProduct.id === product.id )
            const updatedProduct = allProducts?.map((product)=>{
                if(product.id == currentProduct.id){
                    product = newEditedProduct;
                    console.log(product)
                }
                return product;
            })
            console.log(updatedProduct)
            return [...state, updatedProduct]

        case "CREATE":
            /* const productToCreate = action.payload.inputs
            const index = state.findIndex(productToCreate.id)
            state.splice(index, index + 1)
            return { ...state, state 
 */
            return
        case "SEARCH":
            return [action.payload.searchedProduct]

        case "CATEGORY":
            return [action.payload.products]

        default:
            return state
    }
}
