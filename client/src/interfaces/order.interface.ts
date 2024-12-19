interface Order {
  ownerId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalItem: number;
  totalPrice: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  shippingDetails: {
    address: string;
    country: string;
  };
  orderDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export default Order;
