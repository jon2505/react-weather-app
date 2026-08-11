import type { WeatherDescriptor } from "@/types/weather";

/**
 * Maps WMO Weather Interpretation Codes to display descriptors.
 * Full code list: https://open-meteo.com/en/docs#weathervariables
 *
 * Gradients use full Tailwind v4 utility strings so they are
 * statically analysable by the JIT engine (no dynamic concatenation).
 */
const weatherCodeMap: Record<number, WeatherDescriptor> = {
  // Clear sky
  0: {
    label: "Cielo Despejado",
    dayGradient: "from-sky-400 via-blue-400 to-blue-600",
    nightGradient: "from-indigo-900 via-blue-950 to-slate-900",
    iconName: "Sun",
  },
  // Mainly clear, partly cloudy, overcast
  1: {
    label: "Principalmente Despejado",
    dayGradient: "from-sky-400 via-blue-400 to-blue-600",
    nightGradient: "from-indigo-900 via-blue-950 to-slate-900",
    iconName: "Sun",
  },
  2: {
    label: "Parcialmente Nublado",
    dayGradient: "from-sky-300 via-slate-400 to-gray-500",
    nightGradient: "from-slate-700 via-gray-800 to-gray-900",
    iconName: "CloudSun",
  },
  3: {
    label: "Nublado",
    dayGradient: "from-slate-400 via-gray-500 to-gray-600",
    nightGradient: "from-slate-700 via-gray-800 to-gray-900",
    iconName: "Cloud",
  },
  // Fog
  45: {
    label: "Neblina",
    dayGradient: "from-gray-300 via-slate-400 to-gray-500",
    nightGradient: "from-gray-700 via-slate-800 to-gray-900",
    iconName: "CloudFog",
  },
  48: {
    label: "Neblina Helada",
    dayGradient: "from-gray-300 via-slate-400 to-gray-500",
    nightGradient: "from-gray-700 via-slate-800 to-gray-900",
    iconName: "CloudFog",
  },
  // Drizzle
  51: {
    label: "Llovizna Ligera",
    dayGradient: "from-blue-400 via-slate-500 to-blue-600",
    nightGradient: "from-blue-900 via-slate-800 to-slate-900",
    iconName: "CloudDrizzle",
  },
  53: {
    label: "Llovizna Moderada",
    dayGradient: "from-blue-400 via-slate-500 to-blue-600",
    nightGradient: "from-blue-900 via-slate-800 to-slate-900",
    iconName: "CloudDrizzle",
  },
  55: {
    label: "Llovizna Intensa",
    dayGradient: "from-blue-500 via-slate-600 to-blue-700",
    nightGradient: "from-blue-900 via-slate-900 to-slate-950",
    iconName: "CloudDrizzle",
  },
  // Freezing drizzle
  56: {
    label: "Llovizna Helada Ligera",
    dayGradient: "from-blue-300 via-sky-400 to-slate-500",
    nightGradient: "from-slate-700 via-blue-900 to-slate-900",
    iconName: "CloudSnow",
  },
  57: {
    label: "Llovizna Helada Intensa",
    dayGradient: "from-blue-300 via-sky-400 to-slate-500",
    nightGradient: "from-slate-700 via-blue-900 to-slate-900",
    iconName: "CloudSnow",
  },
  // Rain
  61: {
    label: "Lluvia Ligera",
    dayGradient: "from-blue-500 via-blue-600 to-slate-700",
    nightGradient: "from-blue-900 via-slate-800 to-slate-900",
    iconName: "CloudRain",
  },
  63: {
    label: "Lluvia Moderada",
    dayGradient: "from-blue-600 via-blue-700 to-slate-700",
    nightGradient: "from-blue-900 via-slate-900 to-slate-950",
    iconName: "CloudRain",
  },
  65: {
    label: "Lluvia Intensa",
    dayGradient: "from-blue-700 via-slate-700 to-gray-800",
    nightGradient: "from-blue-950 via-slate-900 to-gray-950",
    iconName: "CloudRain",
  },
  // Freezing rain
  66: {
    label: "Lluvia Helada Ligera",
    dayGradient: "from-sky-300 via-blue-400 to-slate-600",
    nightGradient: "from-slate-700 via-blue-900 to-gray-900",
    iconName: "CloudSnow",
  },
  67: {
    label: "Lluvia Helada Intensa",
    dayGradient: "from-sky-300 via-blue-400 to-slate-600",
    nightGradient: "from-slate-700 via-blue-900 to-gray-900",
    iconName: "CloudSnow",
  },
  // Snow
  71: {
    label: "Nevada Ligera",
    dayGradient: "from-blue-100 via-sky-200 to-slate-300",
    nightGradient: "from-slate-600 via-blue-800 to-blue-900",
    iconName: "Snowflake",
  },
  73: {
    label: "Nevada Moderada",
    dayGradient: "from-blue-100 via-sky-200 to-slate-300",
    nightGradient: "from-slate-600 via-blue-800 to-blue-900",
    iconName: "Snowflake",
  },
  75: {
    label: "Nevada Intensa",
    dayGradient: "from-sky-100 via-blue-200 to-slate-400",
    nightGradient: "from-slate-700 via-blue-900 to-blue-950",
    iconName: "Snowflake",
  },
  77: {
    label: "Granizo de Nieve",
    dayGradient: "from-blue-100 via-sky-200 to-slate-300",
    nightGradient: "from-slate-600 via-blue-800 to-blue-900",
    iconName: "Snowflake",
  },
  // Rain showers
  80: {
    label: "Chubascos Ligeros",
    dayGradient: "from-blue-400 via-blue-600 to-slate-700",
    nightGradient: "from-blue-900 via-slate-800 to-slate-900",
    iconName: "CloudRain",
  },
  81: {
    label: "Chubascos Moderados",
    dayGradient: "from-blue-500 via-blue-700 to-slate-700",
    nightGradient: "from-blue-900 via-slate-900 to-slate-950",
    iconName: "CloudRain",
  },
  82: {
    label: "Chubascos Violentos",
    dayGradient: "from-blue-700 via-slate-700 to-gray-800",
    nightGradient: "from-blue-950 via-gray-900 to-gray-950",
    iconName: "CloudRain",
  },
  // Snow showers
  85: {
    label: "Chubascos de Nieve Ligeros",
    dayGradient: "from-blue-100 via-sky-200 to-slate-300",
    nightGradient: "from-slate-600 via-blue-800 to-blue-900",
    iconName: "CloudSnow",
  },
  86: {
    label: "Chubascos de Nieve Intensos",
    dayGradient: "from-sky-100 via-blue-200 to-slate-400",
    nightGradient: "from-slate-700 via-blue-900 to-blue-950",
    iconName: "CloudSnow",
  },
  // Thunderstorm
  95: {
    label: "Tormenta Eléctrica",
    dayGradient: "from-gray-600 via-gray-700 to-zinc-900",
    nightGradient: "from-gray-900 via-zinc-900 to-zinc-950",
    iconName: "CloudLightning",
  },
  96: {
    label: "Tormenta con Granizo Ligero",
    dayGradient: "from-gray-700 via-gray-800 to-zinc-900",
    nightGradient: "from-gray-900 via-zinc-950 to-zinc-950",
    iconName: "CloudLightning",
  },
  99: {
    label: "Tormenta con Granizo Intenso",
    dayGradient: "from-gray-800 via-zinc-900 to-zinc-950",
    nightGradient: "from-gray-950 via-zinc-950 to-zinc-950",
    iconName: "CloudLightning",
  },
};

const fallback: WeatherDescriptor = {
  label: "Desconocido",
  dayGradient: "from-sky-400 via-blue-400 to-blue-600",
  nightGradient: "from-indigo-900 via-blue-950 to-slate-900",
  iconName: "Sun",
};

export function getWeatherDescriptor(
  code: number,
  isDay: 0 | 1
): WeatherDescriptor & { gradient: string } {
  const descriptor = weatherCodeMap[code] ?? fallback;
  return {
    ...descriptor,
    gradient: isDay ? descriptor.dayGradient : descriptor.nightGradient,
  };
}
