  "use client"

  import { useSelector, useDispatch } from "react-redux"
  import { useEffect, useState } from "react"
  import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
  import { Button } from "@/shared/ui/button"
  import { Badge } from "@/shared/ui/badge"
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
  import { Input } from "@/shared/ui/input"
  import { Label } from "@/shared/ui/label"
  import { Users, Shield, Store, CreditCard, Mail, Calendar, Edit, Trash2, UserPlus } from "lucide-react"
  import type { RootState, AppDispatch } from "@/app/store/store"
  import { deleteUser, getUsers, postUser, updateUserRole } from "@/entities/user/api/api"

  interface User {
    username: string
    fullName: string
    email: string
    imageUrl?: string
    phoneNumber?: string
    role: string
    password: string
  }

  export default function UserTable() {
    const dispatch: AppDispatch = useDispatch()
    const { users, loading, error } = useSelector((state: RootState) => state.users)
    const [visibleCount, setVisibleCount] = useState(6)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<{ id: string; username: string; currentRole: string } | null>(null)
    const [newRole, setNewRole] = useState("")
    const [newUser, setNewUser] = useState<User>({
      username: "",
      fullName: "",
      email: "",
      imageUrl: "",
      phoneNumber: "",
      role: "",
      password: "",
    })

    useEffect(() => {
      dispatch(getUsers())
    }, [dispatch])

    const getRoleColor = (role: string) => {
      switch (role) {
        case "Admin":
          return "border-red-500/30 text-red-400"
        case "Owner":
          return "border-blue-500/30 text-blue-400"
        case "Cashier":
          return "border-green-500/30 text-green-400"
        default:
          return "border-gray-500/30 text-gray-400"
      }
    }

    const getRoleIcon = (role: string) => {
      switch (role) {
        case "Admin":
          return <Shield className="h-4 w-4" />
        case "Owner":
          return <Store className="h-4 w-4" />
        case "Cashier":
          return <CreditCard className="h-4 w-4" />
        default:
          return <Users className="h-4 w-4" />
      }
    }

    const getRoleText = (role: string) => {
      switch (role) {
        case "Admin":
          return "Администратор"
        case "Owner":
          return "Владелец ресторана"
        case "Cashier":
          return "Кассир"
        default:
          return role
      }
    }

    const handleEditUser = (username: string) => {
      const user = users.find((u) => u.username === username)
      if (user) {
        setSelectedUser({
          id: user.id || username, // Use user.id if available, fallback to username
          username: username,
          currentRole: user.role,
        })
        setNewRole(user.role)
        setEditModalOpen(true)
      }
    }

    const handleUpdateRole = () => {
      if (selectedUser && newRole) {
        dispatch(updateUserRole({ id: selectedUser.id, role: newRole }))
        console.log(`Updating user ${selectedUser.id} to role ${newRole}`)
        setEditModalOpen(false)
        setSelectedUser(null)
        setNewRole("")
      }
    }

    const handleDeleteUser = (id: string) => {
      dispatch(deleteUser(id))
    }

    const handleAddUser = () => {
      setAddModalOpen(true)
    }

    const handleCreateUser = () => {
      if (newUser.username && newUser.fullName && newUser.email && newUser.role && newUser.password) {
        dispatch(postUser(newUser))
        setAddModalOpen(false)
        setNewUser({
          username: "",
          fullName: "",
          email: "",
          imageUrl: "",
          phoneNumber: "",
          role: "",
          password: "",
        })
      }
    }

    const handleNewUserChange = (field: keyof User, value: string) => {
      setNewUser((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

    const roleCounts = {
      admin: users.filter((user) => user.role === "Admin").length,
      restaurantOwner: users.filter((user) => user.role === "Owner").length,
      cashier: users.filter((user) => user.role === "Cashier").length,
    }

    if (loading) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="border border-[#333333] bg-[#1a1a1a] animate-pulse">
                <CardContent className="p-4 text-center">
                  <div className="h-8 bg-gray-700 rounded w-16 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-24 mx-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="border border-[#333333] bg-[#1a1a1a] animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-400">Ошибка загрузки пользователей: {error}</p>
          <Button onClick={() => dispatch(getUsers())} className="mt-4 bg-orange-500 hover:bg-orange-600">
            Попробовать снова
          </Button>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white">Управление Пользователями</h1>
            <p className="text-gray-400 mt-1">Управление учетными записями и ролями пользователей системы</p>
          </div>
          <Button onClick={handleAddUser} className="bg-orange-500 hover:bg-orange-600 text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Добавить Пользователя
          </Button>
        </div>

        {/* Role Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-[#333333] bg-[#1a1a1a]">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{roleCounts.admin}</div>
              <div className="text-sm text-gray-400">Администраторы</div>
            </CardContent>
          </Card>
          <Card className="border border-[#333333] bg-[#1a1a1a]">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{roleCounts.restaurantOwner}</div>
              <div className="text-sm text-gray-400">Владельцы ресторанов</div>
            </CardContent>
          </Card>
          <Card className="border border-[#333333] bg-[#1a1a1a]">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{roleCounts.cashier}</div>
              <div className="text-sm text-gray-400">Кассиры</div>
            </CardContent>
          </Card>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {users.slice(0, visibleCount).map((user) => (
            <Card
              key={user.username}
              className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                      {getRoleIcon(user.role)}
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{user.username}</CardTitle>
                      <p className="text-sm text-gray-400">ID: {user.username.toLowerCase()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditUser(user.username)}
                      className="text-gray-400 hover:text-white hover:bg-gray-700/50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{user.username.toLowerCase()}@restaurant.ru</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Создан: {new Date().toLocaleDateString("ru-RU")}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-700">
                  <p className="text-sm text-gray-400 mb-2">Роль:</p>
                  <Badge variant="outline" className={getRoleColor(user.role)}>
                    <div className="flex items-center space-x-1">
                      {getRoleIcon(user.role)}
                      <span>{getRoleText(user.role)}</span>
                    </div>
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More button */}
        {visibleCount < users.length && (
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="text-white border-gray-700 hover:border-orange-500 hover:bg-orange-500/20"
            >
              Показать ещё
            </Button>
          </div>
        )}

        {users.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Пользователи не найдены</p>
            <p className="text-gray-500 text-sm mt-2">Добавьте первого пользователя в систему</p>
          </div>
        )}

        {/* Edit Role Modal */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="bg-[#1a1a1a] border border-[#333333] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Изменить роль пользователя</DialogTitle>
              <DialogDescription className="text-gray-400">
                Изменение роли для пользователя:{" "}
                <span className="font-semibold text-white">{selectedUser?.username}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Текущая роль:</label>
                <div className="flex items-center space-x-2">
                  {selectedUser && getRoleIcon(selectedUser.currentRole)}
                  <span className="text-gray-400">{selectedUser && getRoleText(selectedUser.currentRole)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Новая роль:</label>
                <Select value={newRole} onValueChange={setNewRole}>
                  <SelectTrigger className="bg-[#2a2a2a] border-[#333333] text-white">
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-[#333333]">
                    <SelectItem value="Owner" className="text-white hover:bg-[#333333]">
                      <div className="flex items-center space-x-2">
                        <Store className="h-4 w-4" />
                        <span>Владелец ресторана</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Admin" className="text-white hover:bg-[#333333]">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Администратор</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Cashier" className="text-white hover:bg-[#333333]">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Кассир</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditModalOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Отмена
              </Button>
              <Button
                onClick={handleUpdateRole}
                disabled={!newRole || newRole === selectedUser?.currentRole}
                className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Сохранить изменения
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add User Modal */}
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogContent className="bg-[#1a1a1a] border border-[#333333] text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Добавить нового пользователя</DialogTitle>
              <DialogDescription className="text-gray-400">
                Заполните информацию для создания нового пользователя
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-300">
                  Имя пользователя *
                </Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) => handleNewUserChange("username", e.target.value)}
                  className="bg-[#2a2a2a] border-[#333333] text-white"
                  placeholder="Введите имя пользователя"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-300">
                  Полное имя *
                </Label>
                <Input
                  id="fullName"
                  value={newUser.fullName}
                  onChange={(e) => handleNewUserChange("fullName", e.target.value)}
                  className="bg-[#2a2a2a] border-[#333333] text-white"
                  placeholder="Введите полное имя"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => handleNewUserChange("email", e.target.value)}
                  className="bg-[#2a2a2a] border-[#333333] text-white"
                  placeholder="Введите email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-300">
                  Номер телефона
                </Label>
                <Input
                  id="phoneNumber"
                  value={newUser.phoneNumber}
                  onChange={(e) => handleNewUserChange("phoneNumber", e.target.value)}
                  className="bg-[#2a2a2a] border-[#333333] text-white"
                  placeholder="Введите номер телефона"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-300">
                  Роль *
                </Label>
                <Select value={newUser.role} onValueChange={(value) => handleNewUserChange("role", value)}>
                  <SelectTrigger className="bg-[#2a2a2a] border-[#333333] text-white">
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-[#333333]">
                    <SelectItem value="Owner" className="text-white hover:bg-[#333333]">
                      <div className="flex items-center space-x-2">
                        <Store className="h-4 w-4" />
                        <span>Владелец ресторана</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Admin" className="text-white hover:bg-[#333333]">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Администратор</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Cashier" className="text-white hover:bg-[#333333]">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Кассир</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Пароль *
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => handleNewUserChange("password", e.target.value)}
                  className="bg-[#2a2a2a] border-[#333333] text-white"
                  placeholder="Введите пароль"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-sm font-medium text-gray-300">
                  URL изображения
                </Label>
                <Input
                  id="imageUrl"
                  value={newUser.imageUrl}
                  onChange={(e) => handleNewUserChange("imageUrl", e.target.value)}
                  className="bg-[#2a2a2a] border-[#333333] text-white"
                  placeholder="Введите URL изображения"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setAddModalOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Отмена
              </Button>
              <Button
                onClick={handleCreateUser}
                disabled={!newUser.username || !newUser.fullName || !newUser.email || !newUser.role || !newUser.password}
                className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Создать пользователя
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
