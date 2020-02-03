import React from "react";
import { useProducts } from "./utils";
import ProductItem from "./ProductItem";

function ProductList({ addToCart }) {
  const products = useProducts();

  return (
    <div>
      {!products.length && <span>로딩 중...</span>}
      {Array.isArray(products) &&
        products.map(product => (
          <ProductItem
            key={product.id}
            name={product.name}
            price={product.price}
            imagePath={product.imagePath}
            addToCart={addToCart}
          />
        ))}
    </div>
  );
}

export default ProductList;
