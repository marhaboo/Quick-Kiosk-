"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/app/store/store"
import { getUsers, deleteUser, updateUserRole } from "@/entities/user/api/api"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { UserIcon, Trash2, ShieldCheck, Shield, Plus } from "lucide-react"
import AddUserModal from "../add-user-modal/add-user-modal"
import type { User } from "@/entities/user/models/types"
import Image from "next/image"

const roleColors: Record<string, string> = {
  Admin: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  Cashier: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
}

const UserTable = () => {
  const dispatch: AppDispatch = useDispatch()
  const { users, loading, error } = useSelector((state: RootState) => state.users)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id))
    }
  }

  const handleRoleChange = (id: string, currentRole: string) => {
    const newRole = currentRole === "Admin" ? "Cashier" : "Admin"
    dispatch(updateUserRole({ id, role: newRole }))
  }

  const handleAddUser = () => {
    setShowModal(false)
  }

  if (loading) {
    return (
      <Card className="border border-[#333333] bg-[#1a1a1a] glass-effect animate-pulse">
        <CardHeader>
          <div className="h-8 bg-gray-700 rounded w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gray-800/30">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-32" />
                  <div className="h-3 bg-gray-700 rounded w-24" />
                </div>
              </div>
              <div className="h-4 bg-gray-700 rounded w-20" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border border-[#333333] bg-[#1a1a1a] glass-effect">
        <CardContent className="p-8 text-center">
          <p className="text-red-400">Error: {error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold text-white text-shadow-glow">User Management</h2>
        <p className="text-gray-300">Manage system users and their roles</p>
      </div>

      <Card className="border border-[#333333] bg-[#1a1a1a] glass-effect animate-fade-in-up">
        <CardContent className="p-0">
          <div className="flex justify-end p-6">
            <Button
              size="sm"
              className="flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/40 transition-all duration-200"
              onClick={() => setShowModal(true)}
            >
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          </div>

          {showModal && <AddUserModal onClose={() => setShowModal(false)} onSubmit={handleAddUser} />}

          <div className="divide-y divide-[#333333]">
            {users.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No users found</div>
            ) : (
              users.map((user, idx) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-6 hover:bg-gray-800/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-700/50 border border-gray-600/30 flex items-center justify-center overflow-hidden">
                      {user.imageUrl ? (
                        <Image
                          src={user.imageUrl || "/placeholder.svg"}
                          alt={user.fullName}
                          className="w-12 h-12 object-cover rounded-full"
                          width={48}
                          height={48}
                        />
                      ) : (
                        <UserIcon className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{user.fullName}</h3>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                      <p className="text-gray-500 text-xs">{user.phoneNumber}</p>
                      <p className="text-gray-500 text-xs">{user.createdAt?.slice(0, 10)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      className={roleColors[user.role] || "bg-gray-500/20 text-gray-400 border border-gray-500/30"}
                    >
                      {user.role === "Admin" ? (
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-4 h-4" /> Super Admin
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Shield className="w-4 h-4" /> Owner
                        </span>
                      )}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-200 bg-transparent"
                      onClick={() => handleRoleChange(user.id, user.role)}
                    >
                      {user.role === "Admin" ? "Make Owner" : "Make Super Admin"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 bg-transparent"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserTable
