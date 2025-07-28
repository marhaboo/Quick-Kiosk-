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
