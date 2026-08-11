import type { HourlyWeather, TemperatureUnit } from "@/types/weather";
import { formatHour, formatTempValue, toPercent } from "@/lib/utils";
import WeatherIcon from "./WeatherIcon";
import { getWeatherDescriptor } from "@/lib/weatherCodes";

interface HourlyChartProps {
  hourly: HourlyWeather;
  unit: TemperatureUnit;
  /** index of the current hour so we can highlight it */
  currentHourIndex: number;
}

export default function HourlyChart({ hourly, unit, currentHourIndex }: HourlyChartProps) {
  // Show 24 hours starting from the current hour
  const start = currentHourIndex;
  const end = Math.min(start + 24, hourly.time.length);
  const slice = {
    time: hourly.time.slice(start, end),
    temperature_2m: hourly.temperature_2m.slice(start, end),
    weather_code: hourly.weather_code.slice(start, end),
    precipitation_probability: hourly.precipitation_probability.slice(start, end),
  };

  const temps = slice.temperature_2m;
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const unitSymbol = unit === "celsius" ? "°" : "°";

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <h3 className="text-white/70 text-sm font-medium uppercase tracking-widest mb-4">
        Pronóstico 24 Horas
      </h3>
      <div className="overflow-x-auto">
        <div className="flex gap-3 min-w-max pb-2">
          {slice.time.map((time, i) => {
            const temp = slice.temperature_2m[i];
            const code = slice.weather_code[i];
            const precip = slice.precipitation_probability[i];
            const heightPct = toPercent(temp, minTemp, maxTemp);
            const descriptor = getWeatherDescriptor(code, 1); // use day variant for icon only
            const isNow = i === 0;

            return (
              <div
                key={time}
                className={`flex flex-col items-center gap-2 min-w-[52px] ${
                  isNow ? "opacity-100" : "opacity-75 hover:opacity-100 transition-opacity"
                }`}
              >
                {/* Time label */}
                <p className={`text-xs font-medium whitespace-nowrap ${isNow ? "text-white font-bold" : "text-white/60"}`}>
                  {isNow ? "Ahora" : formatHour(time)}
                </p>

                {/* Icon */}
                <WeatherIcon
                  iconName={descriptor.iconName}
                  size={18}
                  strokeWidth={1.5}
                  className="text-white/80"
                />

                {/* Bar */}
                <div className="flex flex-col items-center justify-end h-20 w-full">
                  <div
                    className={`w-full rounded-full transition-all duration-500 ${
                      isNow ? "bg-white" : "bg-white/40"
                    }`}
                    style={{ height: `${Math.max(heightPct, 8)}%` }}
                  />
                </div>

                {/* Temperature */}
                <p className={`text-xs font-semibold ${isNow ? "text-white" : "text-white/80"}`}>
                  {formatTempValue(temp)}{unitSymbol}
                </p>

                {/* Precipitation probability */}
                {precip > 0 && (
                  <p className="text-xs text-blue-200 font-medium">{precip}%</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
