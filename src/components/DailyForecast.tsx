import { Droplets } from "lucide-react";
import type { DailyWeather, TemperatureUnit } from "@/types/weather";
import { formatDayLabel, formatTempValue } from "@/lib/utils";
import WeatherIcon from "./WeatherIcon";
import { getWeatherDescriptor } from "@/lib/weatherCodes";

interface DailyForecastProps {
  daily: DailyWeather;
  unit: TemperatureUnit;
}

export default function DailyForecast({ daily, unit }: DailyForecastProps) {
  const unitSymbol = unit === "celsius" ? "°" : "°";

  // Find global min/max for relative bar widths
  const allMax = daily.temperature_2m_max;
  const allMin = daily.temperature_2m_min;
  const globalMin = Math.min(...allMin);
  const globalMax = Math.max(...allMax);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <h3 className="text-white/70 text-sm font-medium uppercase tracking-widest mb-4">
        Pronóstico 7 Días
      </h3>
      <div className="flex flex-col gap-2">
        {daily.time.map((date, i) => {
          const code = daily.weather_code[i];
          const tMax = daily.temperature_2m_max[i];
          const tMin = daily.temperature_2m_min[i];
          const precip = daily.precipitation_probability_max[i];
          const descriptor = getWeatherDescriptor(code, 1);

          // Position and width of the temp range bar
          const leftPct = ((tMin - globalMin) / (globalMax - globalMin)) * 100;
          const widthPct = ((tMax - tMin) / (globalMax - globalMin)) * 100;

          return (
            <div
              key={date}
              className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0 hover:bg-white/5 rounded-lg px-2 transition-colors"
            >
              {/* Day label */}
              <p className="text-white/90 text-sm font-medium w-16 shrink-0">
                {formatDayLabel(date)}
              </p>

              {/* Icon */}
              <WeatherIcon
                iconName={descriptor.iconName}
                size={20}
                strokeWidth={1.5}
                className="text-white/80 shrink-0"
              />

              {/* Condition */}
              <p className="text-white/60 text-xs hidden sm:block w-28 shrink-0 truncate">
                {descriptor.label}
              </p>

              {/* Precipitation */}
              {precip > 0 ? (
                <div className="flex items-center gap-1 text-blue-200 text-xs w-10 shrink-0">
                  <Droplets size={12} />
                  <span>{precip}%</span>
                </div>
              ) : (
                <div className="w-10 shrink-0" />
              )}

              {/* Min temp */}
              <p className="text-white/50 text-sm font-medium text-right w-10 shrink-0">
                {formatTempValue(tMin)}{unitSymbol}
              </p>

              {/* Temperature range bar */}
              <div className="flex-1 h-1.5 bg-white/10 rounded-full relative mx-2 hidden sm:block">
                <div
                  className="absolute top-0 h-full rounded-full bg-gradient-to-r from-blue-300 to-amber-300"
                  style={{
                    left: `${leftPct}%`,
                    width: `${Math.max(widthPct, 4)}%`,
                  }}
                />
              </div>

              {/* Max temp */}
              <p className="text-white text-sm font-semibold text-right w-10 shrink-0">
                {formatTempValue(tMax)}{unitSymbol}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
