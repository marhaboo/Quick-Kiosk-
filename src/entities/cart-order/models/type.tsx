export interface OrderItem {
  productId: number;
  quantity: number;
  priceAtMoment: number;
}

export interface OrderItems {
  items: OrderItem[];
  fullName: string;
  phoneNumber: string;
  tableId: number | null;
  type: string;
  deliveryAddress: string | null;
  bookingDateTime: string | null;
  status: string;
  totalAmount: number;
}
