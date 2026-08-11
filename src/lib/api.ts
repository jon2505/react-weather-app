import type { TemperatureUnit, WeatherApiResponse } from "@/types/weather";

const WEATHER_BASE = "https://api.open-meteo.com/v1";

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
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<WeatherApiResponse>;
}
