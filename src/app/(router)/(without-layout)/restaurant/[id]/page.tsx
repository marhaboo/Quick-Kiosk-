"use client"
import { RestaurantMenu } from "@/widgets/categories/restaurant-menu/restaurant-menu"
import { useParams } from "next/navigation"



export default function RestaurantPage() {
  const params = useParams()
  const RestaurantId = params?.id as string
  return <RestaurantMenu restaurantId={RestaurantId}  />
}
