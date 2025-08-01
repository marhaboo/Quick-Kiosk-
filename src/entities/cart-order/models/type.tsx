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
  restaurantId: number;
  type: string;
  deliveryAddress: string | null;
  bookingDateTime: string | null;
  status: string;
  totalAmount: number;
}

export interface OrderProps {
  id: number;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
  fullName: string;
  phoneNumber: string;
  deliveryAddress: string | null;
  status: string;
}
