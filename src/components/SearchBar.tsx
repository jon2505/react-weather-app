"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, MapPin, Loader2, X } from "lucide-react";
import type { GeocodingResult } from "@/types/weather";
import { geocodeCity } from "@/lib/api";

interface SearchBarProps {
  onLocationSelect: (location: GeocodingResult) => void;
  onGeolocate: () => void;
  isGeolocating: boolean;
  currentLocation: GeocodingResult | null;
}

export default function SearchBar({
  onLocationSelect,
  onGeolocate,
  isGeolocating,
  currentLocation,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    setIsSearching(true);
    try {
      const results = await geocodeCity(q);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    } catch {
      setSuggestions([]);
      setIsOpen(false);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query), 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, search]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(location: GeocodingResult) {
    onLocationSelect(location);
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
  }

  function handleClear() {
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <div className="flex gap-2">
        {/* Search input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            {isSearching ? (
              <Loader2 size={18} className="text-white/50 animate-spin" />
            ) : (
              <Search size={18} className="text-white/50" />
            )}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") handleClear();
              if (e.key === "Enter" && suggestions.length > 0) handleSelect(suggestions[0]);
            }}
            placeholder={
              currentLocation ? `${currentLocation.name}, ${currentLocation.country}` : "Buscar ciudad…"
            }
            className="w-full bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl
                       pl-10 pr-9 py-3 text-white placeholder-white/40 text-sm
                       focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40
                       transition-all duration-200"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-3 flex items-center text-white/40 hover:text-white/70 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Geolocate button */}
        <button
          onClick={onGeolocate}
          disabled={isGeolocating}
          title="Usar mi ubicación"
          className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl px-4
                     text-white/80 hover:bg-white/25 hover:text-white
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-white/40
                     transition-all duration-200 flex items-center gap-2"
        >
          {isGeolocating ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <MapPin size={18} />
          )}
          <span className="hidden sm:inline text-sm">Mi Ubicación</span>
        </button>
      </div>

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50
                        bg-slate-900/90 backdrop-blur-md border border-white/20
                        rounded-xl shadow-2xl overflow-hidden">
          {suggestions.map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleSelect(loc)}
              className="w-full text-left px-4 py-3 flex items-center gap-3
                         hover:bg-white/10 transition-colors border-b border-white/10 last:border-0"
            >
              <MapPin size={14} className="text-white/50 shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">{loc.name}</p>
                <p className="text-white/50 text-xs">
                  {[loc.admin1, loc.country].filter(Boolean).join(", ")}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
