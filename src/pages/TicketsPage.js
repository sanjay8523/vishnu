// src/pages/TicketsPage.js
import React, { useState } from "react";
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Download,
  Share2,
  CheckCircle,
  QrCode,
} from "lucide-react";

export default function TicketsPage({ bookings }) {
  const [activeTab, setActiveTab] = useState("upcoming"); // upcoming, past

  const upcomingBookings = bookings.filter(
    (b) => new Date(b.date) >= new Date()
  );
  const pastBookings = bookings.filter((b) => new Date(b.date) < new Date());

  const renderBooking = (booking) => (
    <div
      key={booking.id}
      className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl"
    >
      <div className="relative">
        <img
          src={booking.movie.image}
          alt={booking.movie.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-6">
          <h3 className="text-2xl font-black text-white mb-1">
            {booking.movie.title}
          </h3>
          <p className="text-white/80 text-sm">
            {booking.movie.language} • {booking.movie.genre}
          </p>
        </div>
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm">
          <CheckCircle size={16} />
          CONFIRMED
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-sm text-zinc-500 mb-1">Booking ID</div>
            <div className="font-black text-black dark:text-white">
              #{booking.id}
            </div>
          </div>
          <div>
            <div className="text-sm text-zinc-500 mb-1">Total Amount</div>
            <div className="font-black text-red-600 text-xl">
              ₹{booking.total.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
              <Calendar size={14} />
              Date
            </div>
            <div className="font-bold text-black dark:text-white">
              {booking.date}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
              <Clock size={14} />
              Time
            </div>
            <div className="font-bold text-black dark:text-white">
              {booking.time}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm text-zinc-500 mb-2">
            Seats ({booking.seats.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {booking.seats.map((seat) => (
              <span
                key={seat.id}
                className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-bold"
              >
                {seat.row}
                {seat.seat + 1}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white p-4 rounded-2xl border-2 border-zinc-200">
              <QrCode size={120} className="text-black" />
            </div>
          </div>
          <p className="text-center text-xs text-zinc-500 mb-4">
            Show this QR code at the theater entrance
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors">
              <Download size={18} />
              Download
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl font-bold transition-colors">
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Ticket className="text-red-600" size={32} />
          <h1 className="text-3xl font-black text-black dark:text-white">
            My Tickets
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "upcoming"
                ? "bg-red-600 text-white"
                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "past"
                ? "bg-red-600 text-white"
                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            Past ({pastBookings.length})
          </button>
        </div>

        {/* Tickets Grid */}
        {activeTab === "upcoming" && (
          <>
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-20">
                <Ticket
                  size={64}
                  className="mx-auto text-zinc-300 dark:text-zinc-700 mb-4"
                />
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  No Upcoming Bookings
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Book your next movie ticket and it will appear here
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingBookings.map(renderBooking)}
              </div>
            )}
          </>
        )}

        {activeTab === "past" && (
          <>
            {pastBookings.length === 0 ? (
              <div className="text-center py-20">
                <Ticket
                  size={64}
                  className="mx-auto text-zinc-300 dark:text-zinc-700 mb-4"
                />
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  No Past Bookings
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Your booking history will appear here
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastBookings.map(renderBooking)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
