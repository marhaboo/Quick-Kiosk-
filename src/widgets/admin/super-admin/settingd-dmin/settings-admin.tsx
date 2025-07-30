"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import {
  Settings,
  Database,
  Mail,
  Bell,
  Shield,
  Globe,
  Palette,
  Server,
  Key,
  Users,
  BarChart3,
  Save,
  RefreshCw,
} from "lucide-react"

export default function SettingsAdmin() {
  const [activeSection, setActiveSection] = useState("general")

  const settingSections = [
    { id: "general", label: "Общие настройки", icon: Settings },
    { id: "database", label: "База данных", icon: Database },
    { id: "email", label: "Почтовые уведомления", icon: Mail },
    { id: "notifications", label: "Уведомления", icon: Bell },
    { id: "security", label: "Безопасность", icon: Shield },
    { id: "localization", label: "Локализация", icon: Globe },
    { id: "appearance", label: "Внешний вид", icon: Palette },
    { id: "system", label: "Система", icon: Server },
  ]

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card className="border border-[#333333] bg-[#1a1a1a]">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Основные параметры</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Название платформы</label>
              <input
                type="text"
                defaultValue="Restaurant Management System"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Версия системы</label>
              <input
                type="text"
                defaultValue="v2.1.0"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                readOnly
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-2">Описание</label>
            <textarea
              defaultValue="Комплексная система управления ресторанами с возможностями администрирования, управления меню, заказами и персоналом."
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none h-24 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-[#333333] bg-[#1a1a1a]">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Лимиты пользователей</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Максимум ресторанов</label>
              <input
                type="number"
                defaultValue="1000"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Максимум пользователей</label>
              <input
                type="number"
                defaultValue="10000"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Максимум заявок в день</label>
              <input
                type="number"
                defaultValue="100"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <Card className="border border-[#333333] bg-[#1a1a1a]">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Подключение к базе данных</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div>
                <p className="text-green-400 font-medium">Подключение активно</p>
                <p className="text-sm text-gray-400">PostgreSQL 14.2 - Сервер: localhost:5432</p>
              </div>
            </div>
            <Badge variant="outline" className="border-green-500/30 text-green-400">
              Стабильно
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Хост</label>
              <input
                type="text"
                defaultValue="localhost"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Порт</label>
              <input
                type="text"
                defaultValue="5432"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button className="bg-blue-500 hover:bg-blue-600">
              <RefreshCw className="h-4 w-4 mr-2" />
              Проверить соединение
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
              Создать резервную копию
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-[#333333] bg-[#1a1a1a]">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Статистика базы данных</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">127</div>
              <div className="text-sm text-gray-400">Ресторанов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">2,847</div>
              <div className="text-sm text-gray-400">Пользователей</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">15,432</div>
              <div className="text-sm text-gray-400">Заказов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">2.3 ГБ</div>
              <div className="text-sm text-gray-400">Размер БД</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <Card className="border border-[#333333] bg-[#1a1a1a]">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>SMTP настройки</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">SMTP сервер</label>
              <input
                type="text"
                defaultValue="smtp.gmail.com"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Порт</label>
              <input
                type="text"
                defaultValue="587"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Email отправителя</label>
              <input
                type="email"
                defaultValue="noreply@restaurant-system.ru"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Имя отправителя</label>
              <input
                type="text"
                defaultValue="Restaurant System"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="ssl"
              defaultChecked
              className="w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500"
            />
            <label htmlFor="ssl" className="text-sm text-gray-300">
              Использовать SSL/TLS шифрование
            </label>
          </div>

          <Button className="bg-green-500 hover:bg-green-600">Отправить тестовое письмо</Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card className="border border-[#333333] bg-[#1a1a1a]">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Политики безопасности</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Двухфакторная аутентификация</p>
                <p className="text-sm text-gray-400">Обязательная 2FA для администраторов</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Автоматический выход</p>
                <p className="text-sm text-gray-400">Выход из системы при неактивности</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Логирование действий</p>
                <p className="text-sm text-gray-400">Запись всех действий пользователей</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Время сессии (минуты)</label>
              <input
                type="number"
                defaultValue="60"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Максимум попыток входа</label>
              <input
                type="number"
                defaultValue="5"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-[#333333] bg-[#1a1a1a]">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>API ключи</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Основной API ключ</p>
                <p className="text-sm text-gray-400 font-mono">sk_live_*********************abc123</p>
              </div>
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                Обновить
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Тестовый API ключ</p>
                <p className="text-sm text-gray-400 font-mono">sk_test_*********************def456</p>
              </div>
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                Обновить
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return renderGeneralSettings()
      case "database":
        return renderDatabaseSettings()
      case "email":
        return renderEmailSettings()
      case "security":
        return renderSecuritySettings()
      case "notifications":
        return (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Настройки уведомлений будут добавлены в следующем обновлении</p>
          </div>
        )
      case "localization":
        return (
          <div className="text-center py-12">
            <Globe className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Настройки локализации будут добавлены в следующем обновлении</p>
          </div>
        )
      case "appearance":
        return (
          <div className="text-center py-12">
            <Palette className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Настройки внешнего вида будут добавлены в следующем обновлении</p>
          </div>
        )
      case "system":
        return (
          <div className="text-center py-12">
            <Server className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Системные настройки будут добавлены в следующем обновлении</p>
          </div>
        )
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Системные Настройки</h1>
          <p className="text-gray-400 mt-1">Управление конфигурацией и параметрами системы</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Сбросить
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Save className="h-4 w-4 mr-2" />
            Сохранить
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="border border-[#333333] bg-[#1a1a1a]">
            <CardHeader>
              <CardTitle className="text-white text-lg">Разделы настроек</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {settingSections.map((section) => {
                  const Icon = section.icon
                  const isActive = activeSection === section.id
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 ${
                        isActive
                          ? "bg-orange-500/20 text-orange-400 border-r-2 border-orange-500"
                          : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{section.label}</span>
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">{renderContent()}</div>
      </div>
    </div>
  )
}
