// src/context/ProductsContext.tsx
import React, { createContext, useContext, useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string;
  category: string;
};

type ProductsContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
};

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};