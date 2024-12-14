const ProductCard = ({product}) => {
  return (
    <div key={product._id} className="border rounded-lg p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-auto rounded-md"
      />
      <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="mt-2 text-lg font-semibold">Price:{product.price} BDT</p>
    </div>
  );
};

export default ProductCard;
