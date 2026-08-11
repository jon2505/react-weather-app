/**
 * Static mock data — replaces live Open-Meteo API responses.
 *
 * Time strings are generated relative to today so that date labels
 * ("Hoy", weekday names) always render correctly regardless of when
 * the app is opened.
 *
 * TODO: Remove this file and restore api.ts calls in WeatherDashboard
 *       when live data is re-enabled.
 */

import type { GeocodingResult, WeatherApiResponse } from "@/types/weather";

// ─── Time helpers (local time, matching Open-Meteo format) ───────────────────

function localISODate(dayOffset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function localISOHour(hourOffset: number): string {
  const d = new Date();
  d.setHours(d.getHours() + hourOffset, 0, 0, 0);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  return `${y}-${m}-${day}T${h}:00`;
}

/** Generates "YYYY-MM-DDTHH:MM" for sunrise/sunset fixed at a given hour:min. */
function localISOFixed(dayOffset: number, hour: number, minute: number): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(hour).padStart(2, "0");
  const min = String(minute).padStart(2, "0");
  return `${y}-${m}-${day}T${h}:${min}`;
}

// ─── Hourly data (48 h from current hour) ────────────────────────────────────
// Simulates a typical Mexico City July day: cool nights, warm afternoons,
// afternoon showers. Hour 0 = current hour.

const HOURLY_TEMPS = [
  // First 24 h
  18, 17, 16, 15, 15, 14, 15, 17, 19, 20, 21, 22,
  22, 21, 20, 19, 18, 18, 17, 16, 16, 15, 15, 14,
  // Next 24 h
  14, 13, 13, 14, 15, 16, 18, 20, 21, 22, 22, 21,
  20, 19, 18, 17, 17, 16, 15, 15, 14, 14, 13, 13,
];

const HOURLY_CODES = [
  3,  3,  2,  1,  0,  0,  1,  2,  3,  3,  80, 63,
  61, 61, 3,  3,  2,  2,  1,  1,  0,  0,  0,  0,
  0,  0,  1,  1,  2,  2,  3,  3,  80, 63, 63, 80,
  61, 3,  3,  2,  2,  1,  1,  0,  0,  0,  0,  0,
];

const HOURLY_PRECIP = [
  0,  0,  0,  0,  0,  0,  0,  0,  10, 20, 50, 65,
  70, 60, 40, 25, 15, 5,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  5,  10, 20, 45, 65, 70, 60,
  50, 35, 20, 10, 5,  0,  0,  0,  0,  0,  0,  0,
];

// ─── Mock location ────────────────────────────────────────────────────────────

export const MOCK_LOCATION: GeocodingResult = {
  id: 3621849,
  name: "San José",
  latitude: 9.9281,
  longitude: -84.0907,
  country: "Costa Rica",
  country_code: "CR",
  admin1: "Provincia de San José",
  timezone: "America/Costa_Rica",
  population: 339395,
};

// ─── Mock weather response ────────────────────────────────────────────────────

const currentHour = new Date().getHours();
const isDay: 0 | 1 = currentHour >= 6 && currentHour < 20 ? 1 : 0;

export const MOCK_WEATHER: WeatherApiResponse = {
  latitude: 9.9281,
  longitude: -84.0907,
  timezone: "America/Costa_Rica",
  timezone_abbreviation: "CST",
  generationtime_ms: 0,
  current: {
    time: localISOHour(0),
    interval: 900,
    temperature_2m: 18,
    relative_humidity_2m: 72,
    apparent_temperature: 17,
    is_day: isDay,
    precipitation: 0,
    weather_code: 3,
    cloud_cover: 85,
    wind_speed_10m: 14,
    wind_direction_10m: 270,
    wind_gusts_10m: 22,
  },
  hourly: {
    time: Array.from({ length: 48 }, (_, i) => localISOHour(i)),
    temperature_2m: HOURLY_TEMPS,
    weather_code: HOURLY_CODES,
    precipitation_probability: HOURLY_PRECIP,
  },
  daily: {
    time: Array.from({ length: 7 }, (_, i) => localISODate(i)),
    weather_code:            [3,  63, 80, 2,  1,  0,  2 ],
    temperature_2m_max:      [22, 21, 20, 23, 24, 25, 22],
    temperature_2m_min:      [13, 14, 14, 13, 12, 13, 14],
    sunrise:  Array.from({ length: 7 }, (_, i) => localISOFixed(i, 6, 28)),
    sunset:   Array.from({ length: 7 }, (_, i) => localISOFixed(i, 20, 15)),
    precipitation_sum:             [0,   8.2, 5.1, 0,   0,   0,   1.2],
    precipitation_probability_max: [20,  70,  60,  15,  5,   0,   30 ],
  },
};
