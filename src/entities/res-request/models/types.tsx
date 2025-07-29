export interface WorkingHour {
  dayOfWeek: string;
  isEnabled: boolean;
  from: string;
  to: string;
}

export interface RestaurantRequest {
  id: number;
  name: string;
  description: string;
  cuisine: string;
  address: string;
  phone: string;
  ownerFullName: string;
  ownerEmail: string;
  ownerPhone: string;
  status: "Accepted" | "Pending" | "Rejected";
  createdAt: string;
  workingHours: WorkingHour[];
}

export interface PostRestaurant {
  Name: string;
  Description: string;
  Cuisine: string;
  Address: string;
  Phone: string;
  OwnerFullName: string;
  OwnerEmail: string;
  OwnerPhone: string;
  CreatedAt: string; // ISO date string
  WorkingHours: WorkingHour[];
}