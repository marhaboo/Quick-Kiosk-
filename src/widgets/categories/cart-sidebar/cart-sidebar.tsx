"use client"

import Image from "next/image"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/shared/ui/button"
import CreditCard from "./images/card.svg"
import Smartphone from "./images/nall.svg"
import Banknote from "./images/qr-code.svg"
import { Card } from "@/shared/ui/card"
import type { CartItem } from "../restaurant-menu/restaurant-menu"

interface CartSidebarProps {
  items: CartItem[]
  totalAmount: number
  onUpdateQuantity: (itemId: number, quantity: number) => void
  onRemoveItem: (itemId: number) => void
}

export function CartSidebar({ items, totalAmount, onUpdateQuantity }: CartSidebarProps) {
  return (
    <div className="w-80 backdrop-blur-md">
      <h2 className="text-white text-lg my-6 font-semibold">Корзина</h2>
      <div className="border border-[#3D3A46] rounded-3xl p-4">
        {/* Кнопка очистить корзину */}
        <div className="mb-6 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 px-4 py-2 rounded-xl border border-orange-500/30"
          >
            Очистить корзину
          </Button>
        </div>

        {/* Список товаров */}
        <div className="space-y-3 mb-6 max-h-96 min-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Корзина пуста</p>
          ) : (
            items.map((item) => (
              <Card key={item.id} className="bg-[#222125]/60 border border-[#3D3A46] p-4 rounded-2xl">
                <div className="flex items-start gap-4">
                  {/* Изображение товара */}
                  <div className="w-[100px] h-[104px] rounded-2xl overflow-hidden bg-white/10 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={104}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Информация о товаре */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-base mb-1">{item.name}</h4>
                    <div className="flex flex-col gap-2">
                      {/* Цена */}
                      <p className="text-white font-bold text-sm">{item.price.toFixed(2)} сомони</p>

                      {/* Кнопки изменения количества в виде капсулы */}
                      <div className="flex items-center bg-[#2A2730] rounded-full p-1 w-fit border border-[#3D3A46]">
                        {/* Количество */}
                        <div className="bg-[#1A1A1A] rounded-full w-8 h-8 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{item.quantity}</span>
                        </div>

                        {/* Кнопка минус */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full mx-1 transition-all duration-200"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>

                        {/* Разделитель */}
                        <div className="w-px h-4 bg-[#3D3A46]"></div>

                        {/* Кнопка плюс */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-full mx-1 transition-all duration-200"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Итоговая информация */}
        {items.length > 0 && (
          <div className="space-y-4">
            {/* Общая сумма */}
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Общая сумма:</span>
              <span className="text-white font-bold text-lg">{totalAmount.toFixed(2)}</span>
            </div>

            {/* Способы оплаты */}
            <div className="flex items-center justify-center text-gray-300 gap-4 py-4">
              <div className="p-3 flex items-center justify-center h-20 w-20 rounded-2xl border border-[#3D3A46]  hover:bg-[#2A2730]/80 transition-colors cursor-pointer">
                <Image src={Smartphone} alt="Smartphone" width={50} height={6} />
              </div>
              <div className="p-3 h-20 flex items-center justify-center w-20 rounded-2xl border border-[#3D3A46]  hover:bg-[#2A2730]/80 transition-colors cursor-pointer">
                <Image src={CreditCard} alt="CreditCard" width={50} height={6} />
              </div>
              <div className="p-3 h-20 w-20 flex items-center justify-center rounded-2xl border border-[#3D3A46]  hover:bg-[#2A2730]/80 transition-colors cursor-pointer">
                <Image src={Banknote} alt="Banknote" width={50} height={6} />
              </div>
            </div>

            {/* Кнопка оплаты */}
            <div className=" flex border border-[#3D3A46] rounded-3xl p-3  justify-center">
              <Button className=" border border-[#3D3A46] rounded-3xl  text-green-500 hover:text-green-600  font-bold py-4 text-[16px]">
                Оплачено!
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
