import { Product } from "./product";

export interface CartItem {
  productId: Product;
  quantity: number;
  _id: string;
}
