// src/components/SeatSelector.js
import React from "react";
import { SEAT_TYPES } from "../data/moviesData";

export default function SeatSelector({ selectedSeats, setSelectedSeats }) {
  const toggleSeat = (tier, row, seat) => {
    const id = `${tier}-${row}-${seat}`;
    if (selectedSeats.find((s) => s.id === id)) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== id));
    } else {
      setSelectedSeats([...selectedSeats, { id, type: tier, row, seat }]);
    }
  };

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl">
      <h2 className="text-2xl font-black mb-6 text-black dark:text-white">
        Select Your Seats
      </h2>

      {/* Screen */}
      <div className="mb-8">
        <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 h-2 rounded-t-full mb-2"></div>
        <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
          SCREEN THIS WAY
        </p>
      </div>

      {/* Seat Types Legend */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
        {Object.entries(SEAT_TYPES).map(([key, type]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${type.color}`}></div>
            <span className="text-xs font-medium text-black dark:text-white">
              {type.name} - ₹{type.price}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500"></div>
          <span className="text-xs font-medium text-black dark:text-white">
            Selected
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-zinc-300 dark:bg-zinc-700"></div>
          <span className="text-xs font-medium text-black dark:text-white">
            Sold
          </span>
        </div>
      </div>

      {/* Luxury Seats */}
      <div className="mb-6">
        <h3 className="text-sm font-bold mb-3 text-amber-600">
          LUXURY RECLINER - ₹800
        </h3>
        <div className="space-y-2">
          {rows.slice(0, 2).map((row) => (
            <div key={row} className="flex items-center gap-2">
              <span className="w-6 text-xs font-bold text-zinc-500">{row}</span>
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 8 }).map((_, i) => {
                  const isSelected = selectedSeats.find(
                    (s) => s.id === `luxury-${row}-${i}`
                  );
                  const isSold = Math.random() > 0.8; // Simulate sold seats
                  return (
                    <button
                      key={i}
                      onClick={() => !isSold && toggleSeat("luxury", row, i)}
                      disabled={isSold}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-green-500 scale-110 text-white"
                          : isSold
                          ? "bg-zinc-300 dark:bg-zinc-700 cursor-not-allowed"
                          : `${SEAT_TYPES.luxury.color} hover:scale-110 text-white`
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Seats */}
      <div className="mb-6">
        <h3 className="text-sm font-bold mb-3 text-blue-600">
          EXECUTIVE - ₹450
        </h3>
        <div className="space-y-2">
          {rows.slice(2, 6).map((row) => (
            <div key={row} className="flex items-center gap-2">
              <span className="w-6 text-xs font-bold text-zinc-500">{row}</span>
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 12 }).map((_, i) => {
                  const isSelected = selectedSeats.find(
                    (s) => s.id === `executive-${row}-${i}`
                  );
                  const isSold = Math.random() > 0.7;
                  return (
                    <button
                      key={i}
                      onClick={() => !isSold && toggleSeat("executive", row, i)}
                      disabled={isSold}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-green-500 scale-110 text-white"
                          : isSold
                          ? "bg-zinc-300 dark:bg-zinc-700 cursor-not-allowed"
                          : `${SEAT_TYPES.executive.color} hover:scale-110 text-white`
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Club Seats */}
      <div>
        <h3 className="text-sm font-bold mb-3 text-zinc-600">CLUB - ₹250</h3>
        <div className="space-y-2">
          {rows.slice(6, 10).map((row) => (
            <div key={row} className="flex items-center gap-2">
              <span className="w-6 text-xs font-bold text-zinc-500">{row}</span>
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 14 }).map((_, i) => {
                  const isSelected = selectedSeats.find(
                    (s) => s.id === `club-${row}-${i}`
                  );
                  const isSold = Math.random() > 0.6;
                  return (
                    <button
                      key={i}
                      onClick={() => !isSold && toggleSeat("club", row, i)}
                      disabled={isSold}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-green-500 scale-110 text-white"
                          : isSold
                          ? "bg-zinc-300 dark:bg-zinc-700 cursor-not-allowed"
                          : `${SEAT_TYPES.club.color} hover:scale-110 text-white`
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-500">
          <h4 className="font-bold text-green-800 dark:text-green-400 mb-2">
            Selected Seats ({selectedSeats.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <span
                key={seat.id}
                className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold"
              >
                {seat.row}
                {seat.seat + 1}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
