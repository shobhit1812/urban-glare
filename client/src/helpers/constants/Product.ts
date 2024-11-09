export interface Product {
  _id: string;
  name: string;
  price: number;
  productImages: string[];
  brand: string;
  rating: number;
  sizes: string[];
}

export interface ProductDetailsProps {
  _id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  sizes: string[];
  productImages: string[];
}
