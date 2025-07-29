export interface User {
  username: string;
  fullName: string;
  email: string;
  imageUrl?: string;
  phoneNumber?: string;
  role: string
  password?: string;
}

export interface UserGet extends User {
  id: string;
  createdAt: string;
}
