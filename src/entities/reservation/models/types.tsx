export interface TableProps {
  id: number
  restaurantId: number
  seats: number
  status: string
}

export interface Reservation {
  tableId: number,
  fullName: string,
  phoneNumber: string,
  bookingFrom: string,
  bookingTo: string,
  guests: number
}