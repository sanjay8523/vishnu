// src/components/SnackMenu.js
import React from "react";
import { Plus, Minus, Popcorn } from "lucide-react";
import { SNACKS } from "../data/moviesData";

export default function SnackMenu({ snackCart, setSnackCart }) {
  const updateSnack = (id, change) => {
    const current = snackCart[id] || 0;
    const next = Math.max(0, current + change);
    if (next === 0) {
      const { [id]: _, ...rest } = snackCart;
      setSnackCart(rest);
    } else {
      setSnackCart({ ...snackCart, [id]: next });
    }
  };

  const categories = [...new Set(SNACKS.map((s) => s.category))];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Popcorn className="text-red-600" size={28} />
        <h2 className="text-2xl font-black text-black dark:text-white">
          Snacks & Beverages
        </h2>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-sm font-bold text-zinc-600 dark:text-zinc-400 mb-3 uppercase">
            {category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SNACKS.filter((s) => s.category === category).map((snack) => (
              <div
                key={snack.id}
                className="flex gap-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl hover:shadow-lg transition-all"
              >
                <img
                  src={snack.image}
                  alt={snack.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-black dark:text-white mb-1">
                    {snack.name}
                  </h4>
                  <p className="text-red-600 font-black text-lg mb-2">
                    ₹{snack.price}
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateSnack(snack.id, -1)}
                      disabled={!snackCart[snack.id]}
                      className="p-2 bg-white dark:bg-zinc-900 rounded-lg hover:bg-red-600 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-white dark:disabled:hover:bg-zinc-900 disabled:cursor-not-allowed"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold text-black dark:text-white">
                      {snackCart[snack.id] || 0}
                    </span>
                    <button
                      onClick={() => updateSnack(snack.id, 1)}
                      className="p-2 bg-white dark:bg-zinc-900 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Cart Summary */}
      {Object.keys(snackCart).length > 0 && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-500">
          <h4 className="font-bold text-red-800 dark:text-red-400 mb-3">
            Your Snack Cart
          </h4>
          <div className="space-y-2">
            {Object.entries(snackCart).map(([id, qty]) => {
              const snack = SNACKS.find((s) => s.id === parseInt(id));
              if (!snack) return null;
              return (
                <div key={id} className="flex justify-between text-sm">
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {snack.name} x {qty}
                  </span>
                  <span className="font-bold text-black dark:text-white">
                    ₹{snack.price * qty}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
