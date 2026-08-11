// ─── Geocoding API (/v1/search) ─────────────────────────────────────────────

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
  timezone: string;
  population?: number;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
  generationtime_ms: number;
}

// ─── Weather Forecast API (/v1/forecast) ────────────────────────────────────

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: 0 | 1;
  precipitation: number;
  weather_code: number;
  cloud_cover: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation_probability: number[];
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  generationtime_ms: number;
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
}

// ─── App State ───────────────────────────────────────────────────────────────

export type TemperatureUnit = "celsius" | "fahrenheit";

export interface WeatherState {
  data: WeatherApiResponse | null;
  location: GeocodingResult | null;
  unit: TemperatureUnit;
  loading: boolean;
  error: string | null;
}

// ─── WMO Code Descriptor ─────────────────────────────────────────────────────

export interface WeatherDescriptor {
  label: string;
  dayGradient: string;
  nightGradient: string;
  iconName: string;
}
