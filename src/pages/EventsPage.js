// src/pages/EventsPage.js
import React, { useState } from "react";
import { Calendar, Filter } from "lucide-react";
import EventCard from "../components/EventCard";
import { EVENTS } from "../data/moviesData";

export default function EventsPage({ searchQuery }) {
  const [selectedType, setSelectedType] = useState("all");

  const types = ["all", ...new Set(EVENTS.map((e) => e.type))];

  const filteredEvents = EVENTS.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="text-purple-600" size={32} />
          <h1 className="text-3xl font-black text-black dark:text-white">
            All Events
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 mb-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="text-purple-600" size={20} />
            <h2 className="text-xl font-black text-black dark:text-white">
              Event Type
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  selectedType === type
                    ? "bg-purple-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-zinc-600 dark:text-zinc-400">
            Showing {filteredEvents.length}{" "}
            {filteredEvents.length === 1 ? "event" : "events"}
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <Calendar
              size={64}
              className="mx-auto text-zinc-300 dark:text-zinc-700 mb-4"
            />
            <h3 className="text-xl font-bold text-black dark:text-white mb-2">
              No Events Found
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onClick={() => {}} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
