import { Droplets, Wind, Eye, Thermometer, Sunrise, Sunset, Gauge } from "lucide-react";
import type { CurrentWeather, DailyWeather, GeocodingResult, TemperatureUnit } from "@/types/weather";
import { formatTemp, formatWindDirection, formatTime } from "@/lib/utils";
import WeatherIcon from "./WeatherIcon";
import { getWeatherDescriptor } from "@/lib/weatherCodes";

interface WeatherCardProps {
  current: CurrentWeather;
  daily: DailyWeather;
  location: GeocodingResult;
  unit: TemperatureUnit;
}

export default function WeatherCard({ current, daily, location, unit }: WeatherCardProps) {
  const descriptor = getWeatherDescriptor(current.weather_code, current.is_day);
  const sunrise = daily.sunrise[0] ? formatTime(daily.sunrise[0]) : "—";
  const sunset = daily.sunset[0] ? formatTime(daily.sunset[0]) : "—";

  const locationLabel = [location.name, location.admin1, location.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-4 border border-white/20 shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-white/70 text-sm font-medium uppercase tracking-widest">
            {location.country_code}
          </p>
          <h2 className="text-white text-3xl font-bold leading-tight">
            {location.name}
          </h2>
          {location.admin1 && (
            <p className="text-white/60 text-sm mt-0.5">{location.admin1}, {location.country}</p>
          )}
        </div>
        <WeatherIcon
          iconName={descriptor.iconName}
          className="text-white/90 shrink-0"
          size={56}
          strokeWidth={1.5}
        />
      </div>

      {/* Temperature */}
      <div className="flex items-end gap-3">
        <span className="text-white text-8xl font-thin leading-none">
          {formatTemp(current.temperature_2m, unit)}
        </span>
      </div>

      {/* Condition label + feels like */}
      <div className="flex items-center gap-3">
        <span className="text-white/90 text-lg font-medium">{descriptor.label}</span>
        <span className="text-white/60 text-sm">
          Sensación {formatTemp(current.apparent_temperature, unit)}
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        <StatItem
          icon={<Droplets size={16} />}
          label="Humedad"
          value={`${current.relative_humidity_2m}%`}
        />
        <StatItem
          icon={<Wind size={16} />}
          label="Viento"
          value={`${Math.round(current.wind_speed_10m)} km/h ${formatWindDirection(current.wind_direction_10m)}`}
        />
        <StatItem
          icon={<Gauge size={16} />}
          label="Ráfagas"
          value={`${Math.round(current.wind_gusts_10m)} km/h`}
        />
        <StatItem
          icon={<Eye size={16} />}
          label="Nubosidad"
          value={`${current.cloud_cover}%`}
        />
        <StatItem
          icon={<Thermometer size={16} />}
          label="Precipitación"
          value={`${current.precipitation} mm`}
        />
      </div>

      {/* Sunrise / Sunset */}
      <div className="flex gap-4 mt-1 pt-4 border-t border-white/20">
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <Sunrise size={16} className="text-amber-300" />
          <span>{sunrise}</span>
        </div>
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <Sunset size={16} className="text-orange-300" />
          <span>{sunset}</span>
        </div>
      </div>
    </div>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
      <span className="text-white/60">{icon}</span>
      <div>
        <p className="text-white/50 text-xs">{label}</p>
        <p className="text-white text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
