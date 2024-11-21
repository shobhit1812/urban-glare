interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  rating: number;
  gender: string;
  sizes: string[];
  productImages: string[];
}

export default Product;
