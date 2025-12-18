// src/pages/ProfilePage.js
import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  Ticket,
  Heart,
} from "lucide-react";

export default function ProfilePage({ user, setUser, bookings, navigateTo }) {
  const handleLogout = () => {
    setUser(null);
    navigateTo("home");
  };

  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: <Ticket size={24} />,
    },
    {
      label: "Movies Watched",
      value: bookings.length,
      icon: <Heart size={24} />,
    },
    {
      label: "Total Spent",
      value: `₹${bookings.reduce((sum, b) => sum + b.total, 0).toFixed(0)}`,
      icon: <CreditCard size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <User className="text-red-600" size={32} />
          <h1 className="text-3xl font-black text-black dark:text-white">
            My Profile
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-3xl font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-black dark:text-white mb-1">
                  {user.name}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Member since Dec 2025
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                  <Mail size={18} className="text-zinc-500" />
                  <span className="text-sm text-black dark:text-white">
                    {user.email || "user@example.com"}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                  <Phone size={18} className="text-zinc-500" />
                  <span className="text-sm text-black dark:text-white">
                    {user.phone || "+91 98765 43210"}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                  <MapPin size={18} className="text-zinc-500" />
                  <span className="text-sm text-black dark:text-white">
                    Bengaluru, Karnataka
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-red-600">{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-black text-black dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Settings */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-black text-black dark:text-white mb-4">
                Settings
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Bell
                      size={20}
                      className="text-zinc-600 dark:text-zinc-400"
                    />
                    <div className="text-left">
                      <div className="font-bold text-black dark:text-white">
                        Notifications
                      </div>
                      <div className="text-xs text-zinc-500">
                        Manage your notification preferences
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-red-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <CreditCard
                      size={20}
                      className="text-zinc-600 dark:text-zinc-400"
                    />
                    <div className="text-left">
                      <div className="font-bold text-black dark:text-white">
                        Payment Methods
                      </div>
                      <div className="text-xs text-zinc-500">
                        Manage saved payment methods
                      </div>
                    </div>
                  </div>
                  <div className="text-zinc-400">→</div>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Shield
                      size={20}
                      className="text-zinc-600 dark:text-zinc-400"
                    />
                    <div className="text-left">
                      <div className="font-bold text-black dark:text-white">
                        Privacy & Security
                      </div>
                      <div className="text-xs text-zinc-500">
                        Manage your privacy settings
                      </div>
                    </div>
                  </div>
                  <div className="text-zinc-400">→</div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-black text-black dark:text-white mb-4">
                Recent Activity
              </h3>
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Ticket
                    size={48}
                    className="mx-auto text-zinc-300 dark:text-zinc-700 mb-3"
                  />
                  <p className="text-zinc-600 dark:text-zinc-400">
                    No recent bookings
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.slice(0, 5).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl"
                    >
                      <img
                        src={booking.movie.image}
                        alt={booking.movie.title}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-black dark:text-white mb-1">
                          {booking.movie.title}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {booking.date} • {booking.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-red-600">
                          ₹{booking.total.toFixed(0)}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {booking.seats.length} seats
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
