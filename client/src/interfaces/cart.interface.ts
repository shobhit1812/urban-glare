import Product from "./product.interface";

interface CartItem {
  productId?: Product;
  quantity?: number;
  _id?: string;
}

export default CartItem;
