export interface RestaurantFormData {
  name: string
  description: string
  address: string
  phone: string
  email: string
  website: string
  cuisine: string
  priceRange: string
  capacity: string
  openingHours: {
    monday: { open: string; close: string; closed: boolean }
    tuesday: { open: string; close: string; closed: boolean }
    wednesday: { open: string; close: string; closed: boolean }
    thursday: { open: string; close: string; closed: boolean }
    friday: { open: string; close: string; closed: boolean }
    saturday: { open: string; close: string; closed: boolean }
    sunday: { open: string; close: string; closed: boolean }
  }
  images: File[]
  menu: File | null
  ownerName: string
  ownerPhone: string
  ownerEmail: string
}
