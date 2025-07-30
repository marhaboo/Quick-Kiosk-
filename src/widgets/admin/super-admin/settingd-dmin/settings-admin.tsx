"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import {
  User,
  Settings,
  Bell,
  Shield,
  Palette,
  Database,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Trash2,
  Upload,
  Download,
} from "lucide-react"
import Image from "next/image"

interface SettingsPageProps {
  userRole?: "super-admin" | "restaurant-owner"
}

export default function SettingsPage({ userRole = "super-admin" }: SettingsPageProps) {
  const [activeSection, setActiveSection] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    avatar: "",
  })
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    theme: "dark",
    language: "en",
    timezone: "UTC",
  })

  useEffect(() => {
    // Load user data from localStorage
    const userDataString = localStorage.getItem("user")
    if (userDataString) {
      try {
        const data = JSON.parse(userDataString)
        setUserData({
          fullName: data.fullName || data.userName || "",
          email: data.email || "",
          phone: data.phoneNumber || "",
          role: data.role || "",
          avatar: data.imageUrl || "",
        })
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  const settingsSections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "system", label: "System", icon: Settings, adminOnly: true },
    { id: "database", label: "Database", icon: Database, adminOnly: true },
  ]

  const visibleSections = settingsSections.filter((section) => !section.adminOnly || userRole === "super-admin")

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            {userData.avatar ? (
              <Image
                src={userData.avatar || "/placeholder.svg"}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-white">
                {userData.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">{userData.fullName}</h3>
          <p className="text-gray-400">{userData.email}</p>
          <Badge className="mt-2 bg-orange-500/20 text-orange-400 border border-orange-500/30">
            {userData.role === "Admin" ? "Super Admin" : "Restaurant Owner"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              value={userData.fullName}
              onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/30 text-white placeholder-gray-400 focus:border-orange-500/50 focus:bg-gray-800/70 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/30 text-white placeholder-gray-400 focus:border-orange-500/50 focus:bg-gray-800/70 transition-all duration-300"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600/30 text-white placeholder-gray-400 focus:border-orange-500/50 focus:bg-gray-800/70 transition-all duration-300"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
            <input
              type="text"
              value={userData.role === "Admin" ? "Super Administrator" : "Restaurant Owner"}
              disabled
              className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600/30 text-gray-400 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
          Cancel
        </Button>
        <Button className="gradient-orange text-white">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-gray-600/30 bg-gray-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Lock className="h-5 w-5 mr-2 text-orange-400" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600/30 text-white placeholder-gray-400 focus:border-orange-500/50 transition-all duration-300"
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600/30 text-white placeholder-gray-400 focus:border-orange-500/50 transition-all duration-300"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600/30 text-white placeholder-gray-400 focus:border-orange-500/50 transition-all duration-300"
                placeholder="Confirm new password"
              />
            </div>
            <Button className="w-full gradient-orange text-white">Update Password</Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-600/30 bg-gray-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-400" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <span className="text-green-400">Two-Factor Authentication</span>
              <Badge className="bg-green-500/20 text-green-400">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <span className="text-yellow-400">Last Password Change</span>
              <span className="text-gray-400 text-sm">30 days ago</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <span className="text-blue-400">Login Sessions</span>
              <span className="text-gray-400 text-sm">3 active</span>
            </div>
            <Button
              variant="outline"
              className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Revoke All Sessions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-gray-600/30 bg-gray-800/30">
          <CardHeader>
            <CardTitle className="text-white">Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
              { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
              { key: "sms", label: "SMS Notifications", desc: "Text message alerts" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30">
                <div>
                  <p className="text-white font-medium">{item.label}</p>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          [item.key]: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-gray-600/30 bg-gray-800/30">
          <CardHeader>
            <CardTitle className="text-white">Alert Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "New restaurant applications",
              "Job application updates",
              "System maintenance alerts",
              "Security notifications",
              "Performance reports",
            ].map((alert, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/30">
                <input
                  type="checkbox"
                  defaultChecked={index < 3}
                  className="w-4 h-4 text-orange-500 bg-gray-600 border-gray-500 rounded focus:ring-orange-500"
                />
                <span className="text-gray-300">{alert}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <Card className="border border-gray-600/30 bg-gray-800/30">
        <CardHeader>
          <CardTitle className="text-white">Theme & Display</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Theme</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: "dark", label: "Dark", preview: "bg-gray-900" },
                { id: "light", label: "Light", preview: "bg-white" },
                { id: "auto", label: "Auto", preview: "bg-gradient-to-r from-gray-900 to-white" },
              ].map((theme) => (
                <div
                  key={theme.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    settings.theme === theme.id
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-gray-600/30 hover:border-gray-500/50"
                  }`}
                  onClick={() => setSettings({ ...settings, theme: theme.id })}
                >
                  <div className={`w-full h-12 rounded-lg ${theme.preview} mb-2`}></div>
                  <p className="text-white text-center font-medium">{theme.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Language</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600/30 text-white focus:border-orange-500/50 transition-all duration-300"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600/30 text-white focus:border-orange-500/50 transition-all duration-300"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT">Greenwich Mean Time</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-gray-600/30 bg-gray-800/30">
          <CardHeader>
            <CardTitle className="text-white">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <span className="text-green-400">Server Status</span>
              <Badge className="bg-green-500/20 text-green-400">Online</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <span className="text-blue-400">Database</span>
              <Badge className="bg-blue-500/20 text-blue-400">Connected</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <span className="text-yellow-400">Last Backup</span>
              <span className="text-gray-400 text-sm">2 hours ago</span>
            </div>
            <Button className="w-full gradient-orange text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-600/30 bg-gray-800/30">
          <CardHeader>
            <CardTitle className="text-white">Maintenance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button
              variant="outline"
              className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
            <Button
              variant="outline"
              className="w-full border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Cache
            </Button>
            <Button
              variant="outline"
              className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Reset System
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <Card className="border border-gray-600/30 bg-gray-800/30">
        <CardHeader>
          <CardTitle className="text-white">Database Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-2xl font-bold text-blue-400">1,234</p>
              <p className="text-gray-400 text-sm">Total Records</p>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-2xl font-bold text-green-400">98.5%</p>
              <p className="text-gray-400 text-sm">Uptime</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-2xl font-bold text-orange-400">2.1GB</p>
              <p className="text-gray-400 text-sm">Storage Used</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <p className="text-2xl font-bold text-purple-400">45ms</p>
              <p className="text-gray-400 text-sm">Avg Response</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button className="flex-1 gradient-orange text-white">
              <Download className="h-4 w-4 mr-2" />
              Backup Now
            </Button>
            <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Optimize
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSettings()
      case "security":
        return renderSecuritySettings()
      case "notifications":
        return renderNotificationSettings()
      case "appearance":
        return renderAppearanceSettings()
      case "system":
        return renderSystemSettings()
      case "database":
        return renderDatabaseSettings()
      default:
        return renderProfileSettings()
    }
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white text-shadow-glow">Settings</h1>
        <p className="text-lg text-gray-300">Manage your account and system preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <Card className="border border-gray-600/30 bg-gray-800/30 glass-effect">
            <CardContent className="p-0">
              <nav className="space-y-1 p-4">
                {visibleSections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-300 ${
                        activeSection === section.id
                          ? "gradient-orange text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {section.label}
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <Card className="border border-gray-600/30 bg-gray-800/30 glass-effect">
            <CardContent className="p-8">{renderContent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
