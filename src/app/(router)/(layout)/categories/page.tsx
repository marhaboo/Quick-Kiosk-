import { RestaurantMenu } from "@/widgets/categories/restaurant-menu/restaurant-menu"


interface RestaurantPageProps {
  params: {
    id: string
  }
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  return <RestaurantMenu  />
}
