import type Product  from "../helpers/interfaces"
interface ProductsCardProps {
  product: Product;
}
const ProductsCard = ({ product }: ProductsCardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-xl bg-white">
      <img src={product.image} alt={product.title} className="w-full h-48 object-contain rounded-md mb-4" />
      <h2 className="text-xl font-semibold text-blue-900">{product.title}</h2>
      <p className="text-gray-800"><strong>Precio: </strong>${product.price.toFixed(2)}</p>
      <p className="text-gray-800"><strong>Categoría: </strong>{product.category}</p>
      <p className="text-gray-800"><strong>Descripción: </strong>{product.description}</p>
      <p className="text-gray-600"><strong>Calificación: </strong>{product.rating.rate} ({product.rating.count} reseñas)</p>
    </div>
  );
}
export default ProductsCard;