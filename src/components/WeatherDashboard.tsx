"use client";

// TODO: Conectar lib/api.ts (fetchWeather, geocodeCity, getBrowserCoords) durante el taller.

import { useState, useCallback, useEffect } from "react";
import { Thermometer, AlertCircle } from "lucide-react";
import type { WeatherState, GeocodingResult, TemperatureUnit } from "@/types/weather";
import { getWeatherDescriptor } from "@/lib/weatherCodes";
import { MOCK_LOCATION } from "@/lib/mockData";
import { fetchWeather } from "@/lib/api";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import HourlyChart from "./HourlyChart";
import DailyForecast from "./DailyForecast";

export default function WeatherDashboard() {
  const [state, setState] = useState<WeatherState>({
    data: null,
    location: null,
    unit: "celsius",
    loading: true,
    error: null,
  });
  const [isGeolocating, setIsGeolocating] = useState(false);

  const loadWeather = useCallback(
    async (lat: number, lon: number, location: GeocodingResult, unit: TemperatureUnit) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const data = await fetchWeather(lat, lon, unit);
        setState({ data, location, unit, loading: false, error: null });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : "Error al obtener los datos del clima.",
        }));
      }
    },
    []
  );

  useEffect(() => {
    loadWeather(
      MOCK_LOCATION.latitude,
      MOCK_LOCATION.longitude,
      MOCK_LOCATION,
      "celsius"
    );
  }, [loadWeather]);

  function handleLocationSelect(location: GeocodingResult) {
    loadWeather(location.latitude, location.longitude, location, state.unit);
  }

  async function handleGeolocate() {
    setIsGeolocating(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await loadWeather(
      MOCK_LOCATION.latitude,
      MOCK_LOCATION.longitude,
      MOCK_LOCATION,
      state.unit
    );
    setIsGeolocating(false);
  }

  function handleUnitToggle() {
    const newUnit: TemperatureUnit = state.unit === "celsius" ? "fahrenheit" : "celsius";
    setState((prev) => ({ ...prev, unit: newUnit }));
    if (state.location) {
      loadWeather(
        state.location.latitude,
        state.location.longitude,
        state.location,
        newUnit
      );
    }
  }

  const gradient =
    state.data && state.location
      ? getWeatherDescriptor(state.data.current.weather_code, state.data.current.is_day).gradient
      : "from-sky-400 via-blue-500 to-blue-700";

  const currentHourIndex = (() => {
    if (!state.data) return 0;
    const now = new Date();
    const currentHour = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:00`;
    const idx = state.data.hourly.time.findIndex((t) => t >= currentHour);
    return idx >= 0 ? idx : 0;
  })();

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${gradient} transition-all duration-700`}
    >
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Top bar */}
        <div className="flex items-center gap-4 flex-wrap">
          <SearchBar
            onLocationSelect={handleLocationSelect}
            onGeolocate={handleGeolocate}
            isGeolocating={isGeolocating}
            currentLocation={state.location}
          />
          <button
            onClick={handleUnitToggle}
            title="Cambiar unidad de temperatura"
            className="ml-auto flex items-center gap-2 bg-white/15 backdrop-blur-sm
                       border border-white/25 rounded-xl px-4 py-3 text-white text-sm font-semibold
                       hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/40
                       transition-all duration-200 shrink-0"
          >
            <Thermometer size={16} />
            {state.unit === "celsius" ? "°C" : "°F"}
          </button>
        </div>

        {/* Error state */}
        {state.error && (
          <div className="bg-red-500/20 border border-red-400/40 backdrop-blur-sm rounded-2xl
                          p-4 flex items-center gap-3 text-white">
            <AlertCircle size={20} className="text-red-300 shrink-0" />
            <p className="text-sm">{state.error}</p>
          </div>
        )}

        {/* Loading skeleton */}
        {state.loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            <div className="bg-white/10 rounded-2xl h-80" />
            <div className="bg-white/10 rounded-2xl h-80" />
            <div className="bg-white/10 rounded-2xl h-48 md:col-span-2" />
          </div>
        )}

        {/* Main content */}
        {!state.loading && state.data && state.location && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WeatherCard
                current={state.data.current}
                daily={state.data.daily}
                location={state.location}
                unit={state.unit}
              />
              <HourlyChart
                hourly={state.data.hourly}
                unit={state.unit}
                currentHourIndex={currentHourIndex}
              />
            </div>
            <DailyForecast daily={state.data.daily} unit={state.unit} />
          </>
        )}

        {/* Attribution */}
        <p className="text-center text-white/30 text-xs mt-4">
          Datos del clima proporcionados por{" "}
          <a
            href="https://open-meteo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/60 transition-colors"
          >
            Open-Meteo
          </a>
        </p>
      </div>
    </div>
  );
}
