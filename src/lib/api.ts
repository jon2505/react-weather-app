import type {
  GeocodingResponse,
  GeocodingResult,
  TemperatureUnit,
  WeatherApiResponse,
} from "@/types/weather";

const GEO_BASE = "https://geocoding-api.open-meteo.com/v1";
const WEATHER_BASE = "https://api.open-meteo.com/v1";

/**
 * Resolves a city name to a list of matching geographic locations.
 * Uses the Open-Meteo Geocoding API — no API key required.
 */
export async function geocodeCity(query: string): Promise<GeocodingResult[]> {
  const url = new URL(`${GEO_BASE}/search`);
  url.searchParams.set("name", query);
  url.searchParams.set("count", "5");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Geocoding failed: ${res.status} ${res.statusText}`);
  }

  const data: GeocodingResponse = await res.json();
  return data.results ?? [];
}

/**
 * Fetches a full 7-day weather forecast (current + hourly + daily) from
 * the Open-Meteo Forecast API — no API key required.
 */
export async function fetchWeather(
  lat: number,
  lon: number,
  unit: TemperatureUnit
): Promise<WeatherApiResponse> {
  const url = new URL(`${WEATHER_BASE}/forecast`);

  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "weather_code",
      "cloud_cover",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
    ].join(",")
  );
  url.searchParams.set(
    "hourly",
    ["temperature_2m", "weather_code", "precipitation_probability"].join(",")
  );
  url.searchParams.set(
    "daily",
    [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "precipitation_sum",
      "precipitation_probability_max",
    ].join(",")
  );
  url.searchParams.set("temperature_unit", unit);
  url.searchParams.set("wind_speed_unit", "kmh");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "7");

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Weather fetch failed: ${res.status} ${res.statusText}`);
  }

  const data: WeatherApiResponse = await res.json();
  return data;
}

/**
 * Uses the browser Geolocation API to get the user's current coordinates,
 * then fetches weather for that location.
 */
export function getBrowserCoords(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(new Error(err.message)),
      { timeout: 10_000 }
    );
  });
}
