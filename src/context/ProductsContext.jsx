import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        console.log(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const addProduct = (product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <ProductsContext.Provider
      value={{
        products,
        filteredProducts,
        loading,
        error,
        category,
  setCategory,
  addProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
