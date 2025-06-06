import type Product  from "../helpers/interfaces"
import ProductsCard from "./ProductsCard"

const ProductsList = ({products}:any) => {
  return (
    <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Mi lista de Productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product:Product)=>(
                <ProductsCard key={product.id} product={product}/>
            ))}
        </div>
    </div>
  )
}

export default ProductsList