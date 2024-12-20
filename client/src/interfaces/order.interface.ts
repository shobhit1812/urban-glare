interface Order {
  ownerId: string;
  _id: string;
  owner: {
    email: string;
  };
  products: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalItem: number;
  totalPrice: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "cod" | "credit-debit" | "upi";
  shippingDetails: {
    address: string;
    country: string;
  };
  orderDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export default Order;
