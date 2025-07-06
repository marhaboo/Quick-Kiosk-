import { RestaurantCard } from "@/widgets/home/restaurant-card/restaurant-card"
import Image from "./загрузка.webp"

const restaurants = [
  {
    id: 1,
    name: "Рохат",
    description: "Традиционная таджикская кухня в уютной атмосфере. Известен своим пловом и шашлыком.",
    image: Image,
    cuisine: "Таджикская кухня",
  },
  {
    id: 2,
    name: "Чайхона №1",
    description: "Аутентичная восточная чайхона с широким выбором чая и национальных блюд.",
    image: Image,
    cuisine: "Восточная кухня",
  },
  {
    id: 3,
    name: "Дастархон",
    description: "Семейный ресторан с домашней атмосферой и традиционными рецептами.",
    image: Image,
    cuisine: "Домашняя кухня",
  },
  {
    id: 4,
    name: "Памир",
    description: "Ресторан высокой кухни с панорамным видом на город и изысканными блюдами.",
    image: Image,
    cuisine: "Европейская кухня",
  },
]

export function RestaurantList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {restaurants.map((restaurant, index) => (
        <div key={restaurant.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
          <RestaurantCard restaurant={restaurant} />
        </div>
      ))}
    </div>
  )
}
