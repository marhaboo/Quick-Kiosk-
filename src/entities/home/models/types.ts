export interface Restaurant {
  id: number;
  name: string;
  description: string;
  cuisine: string;
  address: string;
  phone: string;
  rating: number;
  openingHours: string;
  categories: Category[];
  menu: MenuItem[];
  tables: Table[];
  imageUrl: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
  createdAt: string;
}

export interface ShortMenuItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  description?: string
}
export interface Table {
  id: number;
  restaurantId: number;
  seats: number;
  status: string;
}

export interface RestaurantApiResponse {
  isSuccess: boolean;
  data: Restaurant[];
  statusCode: number;
  message: string;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}
