// src/pages/BookingPage.js
import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Star,
  Film,
  CreditCard,
} from "lucide-react";
import SeatSelector from "../components/SeatSelector";
import SnackMenu from "../components/SnackMenu";
import { SEAT_TYPES, SNACKS } from "../data/moviesData";

export default function BookingPage({
  movie,
  navigateTo,
  selectedSeats,
  setSelectedSeats,
  snackCart,
  setSnackCart,
  onBook,
  user,
  setShowAuthModal,
}) {
  const [selectedDate, setSelectedDate] = useState("Dec 20, 2025");
  const [selectedShow, setSelectedShow] = useState(movie.shows[3]);
  const [step, setStep] = useState(1); // 1: Show Selection, 2: Seats, 3: Snacks, 4: Payment

  const seatTotal = selectedSeats.reduce(
    (sum, seat) => sum + SEAT_TYPES[seat.type].price,
    0
  );
  const snackTotal = Object.entries(snackCart).reduce((sum, [id, qty]) => {
    const snack = SNACKS.find((s) => s.id === parseInt(id));
    return sum + (snack ? snack.price * qty : 0);
  }, 0);
  const convenienceFee = seatTotal * 0.1; // 10% convenience fee
  const gst = (seatTotal + snackTotal + convenienceFee) * 0.18; // 18% GST
  const totalAmount = seatTotal + snackTotal + convenienceFee + gst;

  const dates = [
    "Dec 19, 2025",
    "Dec 20, 2025",
    "Dec 21, 2025",
    "Dec 22, 2025",
    "Dec 23, 2025",
  ];

  const handleProceedToPayment = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    onBook();
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <button
          onClick={() => (step === 1 ? navigateTo("home") : setStep(step - 1))}
          className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-red-600 mb-6 font-bold"
        >
          <ArrowLeft size={20} />
          {step === 1 ? "BACK TO HOME" : "BACK"}
        </button>

        {/* Movie Info */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full md:w-48 h-72 object-cover rounded-2xl"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-black mb-2 text-black dark:text-white">
                {movie.title}
              </h1>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="fill-yellow-400 text-yellow-400" size={16} />
                  <span className="font-bold text-black dark:text-white">
                    {movie.rating}/5
                  </span>
                </div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {movie.genre}
                </span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {movie.duration}
                </span>
                <span className="px-3 py-1 bg-red-600 text-white text-xs rounded-full font-bold">
                  {movie.language}
                </span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                {movie.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-zinc-500">Cast:</span>
                  <span className="font-bold text-black dark:text-white ml-2">
                    {movie.cast}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">Director:</span>
                  <span className="font-bold text-black dark:text-white ml-2">
                    {movie.director}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            {[
              { num: 1, label: "Show" },
              { num: 2, label: "Seats" },
              { num: 3, label: "Snacks" },
              { num: 4, label: "Payment" },
            ].map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-black ${
                      step >= s.num
                        ? "bg-red-600 text-white"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {s.num}
                  </div>
                  <span className="text-xs font-bold mt-2 text-black dark:text-white">
                    {s.label}
                  </span>
                </div>
                {i < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      step > s.num
                        ? "bg-red-600"
                        : "bg-zinc-200 dark:bg-zinc-800"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Show Selection */}
            {step === 1 && (
              <div className="space-y-6">
                {/* Date Selection */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl">
                  <h2 className="text-2xl font-black mb-4 text-black dark:text-white flex items-center gap-2">
                    <Calendar className="text-red-600" />
                    Select Date
                  </h2>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {dates.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                          selectedDate === date
                            ? "bg-red-600 text-white scale-105"
                            : "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Show Selection */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl">
                  <h2 className="text-2xl font-black mb-4 text-black dark:text-white flex items-center gap-2">
                    <Clock className="text-red-600" />
                    Select Show Time
                  </h2>
                  <div className="space-y-4">
                    {movie.shows.map((show, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedShow(show)}
                        className={`w-full p-4 rounded-xl border-2 transition-all ${
                          selectedShow === show
                            ? "border-red-600 bg-red-50 dark:bg-red-900/20"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-red-600"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-left">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-2xl font-black text-black dark:text-white">
                                {show.time}
                              </span>
                              <span className="px-3 py-1 bg-zinc-800 text-white text-xs rounded-full font-bold">
                                {show.format}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                              <MapPin size={14} />
                              <span>
                                {show.theater} - {show.screen}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-zinc-500 mb-1">
                              Available
                            </div>
                            <div className="text-green-600 font-bold">
                              ●●●●○
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black text-lg transition-colors"
                >
                  SELECT SEATS
                </button>
              </div>
            )}

            {/* Step 2: Seat Selection */}
            {step === 2 && (
              <>
                <SeatSelector
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                />
                <button
                  onClick={() => setStep(3)}
                  disabled={selectedSeats.length === 0}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedSeats.length === 0
                    ? "SELECT AT LEAST ONE SEAT"
                    : "CONTINUE TO SNACKS"}
                </button>
              </>
            )}

            {/* Step 3: Snacks */}
            {step === 3 && (
              <>
                <SnackMenu snackCart={snackCart} setSnackCart={setSnackCart} />
                <button
                  onClick={() => setStep(4)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black text-lg transition-colors"
                >
                  PROCEED TO PAYMENT
                </button>
              </>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl">
                <h2 className="text-2xl font-black mb-6 text-black dark:text-white flex items-center gap-2">
                  <CreditCard className="text-red-600" />
                  Payment Options
                </h2>

                <div className="space-y-4 mb-6">
                  <button className="w-full p-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-red-600 transition-colors text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-black dark:text-white mb-1">
                          Credit/Debit Card
                        </div>
                        <div className="text-sm text-zinc-500">
                          Visa, Mastercard, Amex
                        </div>
                      </div>
                      <div className="text-2xl">💳</div>
                    </div>
                  </button>

                  <button className="w-full p-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-red-600 transition-colors text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-black dark:text-white mb-1">
                          UPI
                        </div>
                        <div className="text-sm text-zinc-500">
                          Google Pay, PhonePe, Paytm
                        </div>
                      </div>
                      <div className="text-2xl">📱</div>
                    </div>
                  </button>

                  <button className="w-full p-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-red-600 transition-colors text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-black dark:text-white mb-1">
                          Net Banking
                        </div>
                        <div className="text-sm text-zinc-500">
                          All major banks
                        </div>
                      </div>
                      <div className="text-2xl">🏦</div>
                    </div>
                  </button>

                  <button className="w-full p-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-red-600 transition-colors text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-black dark:text-white mb-1">
                          Wallet
                        </div>
                        <div className="text-sm text-zinc-500">
                          Paytm, Amazon Pay
                        </div>
                      </div>
                      <div className="text-2xl">👛</div>
                    </div>
                  </button>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white py-4 rounded-xl font-black text-lg transition-colors"
                >
                  PAY ₹{totalAmount.toFixed(2)}
                </button>
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl sticky top-24">
              <h3 className="text-xl font-black mb-4 text-black dark:text-white">
                Booking Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-sm text-zinc-500 mb-1">Movie</div>
                  <div className="font-bold text-black dark:text-white">
                    {movie.title}
                  </div>
                </div>

                {step >= 1 && (
                  <>
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">
                        Show Details
                      </div>
                      <div className="font-bold text-black dark:text-white">
                        {selectedDate}
                      </div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        {selectedShow.time} | {selectedShow.format}
                      </div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        {selectedShow.theater}
                      </div>
                    </div>
                  </>
                )}

                {selectedSeats.length > 0 && (
                  <div>
                    <div className="text-sm text-zinc-500 mb-1">
                      Seats ({selectedSeats.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map((seat) => (
                        <span
                          key={seat.id}
                          className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-xs font-bold text-black dark:text-white"
                        >
                          {seat.row}
                          {seat.seat + 1}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {Object.keys(snackCart).length > 0 && (
                  <div>
                    <div className="text-sm text-zinc-500 mb-2">
                      Food & Beverages
                    </div>
                    {Object.entries(snackCart).map(([id, qty]) => {
                      const snack = SNACKS.find((s) => s.id === parseInt(id));
                      return snack ? (
                        <div
                          key={id}
                          className="flex justify-between text-sm mb-1"
                        >
                          <span className="text-zinc-600 dark:text-zinc-400">
                            {snack.name} x{qty}
                          </span>
                          <span className="font-bold text-black dark:text-white">
                            ₹{snack.price * qty}
                          </span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Tickets
                  </span>
                  <span className="font-bold text-black dark:text-white">
                    ₹{seatTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Food & Beverages
                  </span>
                  <span className="font-bold text-black dark:text-white">
                    ₹{snackTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Convenience Fee
                  </span>
                  <span className="font-bold text-black dark:text-white">
                    ₹{convenienceFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    GST (18%)
                  </span>
                  <span className="font-bold text-black dark:text-white">
                    ₹{gst.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span className="font-black text-black dark:text-white">
                    Total
                  </span>
                  <span className="font-black text-red-600">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
