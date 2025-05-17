// types.ts
export interface Product {
  rating: ReactNode;
  reviews: ReactNode;
  similarProducts: any;
  category: any;
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { product: Product };
};
