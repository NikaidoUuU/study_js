import React from 'react'
import { useProducts } from './utils'
import ProductItem from './ProductItem'

function ProductList() {
  const products = useProducts()

  return (
    <div>
      {
        !products.length &&
        <span>로딩 중...</span>
      }
      {Array.isArray(products) &&
        products.map(product => {
          return (
            <ProductItem
              key={product.id}
              name={product.name}
              price={product.price}
              imagePath={product.imagePath}
            />
          )
        })}
    </div>
  )
}

export default ProductList
