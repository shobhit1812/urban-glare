import Product from "./product.interface";

interface CartItem {
  _id: string;
  productId: Product;
  quantity: number;
}

export default CartItem;
