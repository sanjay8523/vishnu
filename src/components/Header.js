// src/components/Header.js
import React, { useState } from "react";
import {
  Search,
  MapPin,
  Sun,
  Moon,
  Menu,
  X,
  Film,
  Calendar,
  User,
  Ticket,
} from "lucide-react";

export default function Header({
  darkMode,
  setDarkMode,
  user,
  setShowAuthModal,
  navigateTo,
  searchQuery,
  setSearchQuery,
  currentPage,
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = [
    { name: "Home", page: "home", icon: <Film size={18} /> },
    { name: "Movies", page: "movies", icon: <Film size={18} /> },
    { name: "Events", page: "events", icon: <Calendar size={18} /> },
    { name: "My Tickets", page: "tickets", icon: <Ticket size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            onClick={() => navigateTo("home")}
            className="text-2xl md:text-3xl font-black tracking-tighter italic cursor-pointer text-red-600 hover:scale-105 transition-transform"
          >
            IT'S SHOW TIME
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                  currentPage === item.page
                    ? "text-red-600 border-b-2 border-red-600 pb-1"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-red-600"
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search movies, events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Location */}
            <div className="hidden sm:flex items-center gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              <MapPin size={16} className="text-red-600" />
              <span>Bengaluru</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Section */}
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => navigateTo("profile")}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  <User size={18} />
                  <span className="text-sm font-bold">{user.name}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="hidden md:block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold text-sm transition-transform active:scale-95"
              >
                SIGN IN
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search movies, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden mt-4 pb-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    navigateTo(item.page);
                    setShowMobileMenu(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-colors ${
                    currentPage === item.page
                      ? "bg-red-600 text-white"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
              {!user && (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setShowMobileMenu(false);
                  }}
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold text-sm"
                >
                  SIGN IN
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
