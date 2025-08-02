export interface Profiole  {
  id: string,
  username: string,
  fullName: string,
  email: string,
  imageUrl: string,
  phoneNumber: string,
  role: "Admin" | "Owner" | "Cashier",
  createdAt: string,
  restaurantName?: string | null

}