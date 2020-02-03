import { useState, useEffect } from 'react'
import SAMPLE_PRODUCTS from './SAMPLE_PRODUCTS.json'

function getProducts() {
  return new Promise(resolve => {
    setTimeout(() => resolve(SAMPLE_PRODUCTS), 1500);
  });
}

export function useProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    let isCurrent = true
    getProducts().then(products => {
      if (!isCurrent) return
      setProducts(products)
    })
    return () => (isCurrent = false)
  }, [])

  return products
}

export function formatCurrency (amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
