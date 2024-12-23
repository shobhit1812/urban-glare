import Product from "./product.interface";

interface CartItem {
  _id: string;
  productId: Product;
  quantity: number;
  totalAmount: number;
}

export default CartItem;
