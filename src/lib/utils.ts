import type { TemperatureUnit } from "@/types/weather";

export function formatTemp(value: number, unit: TemperatureUnit): string {
  const symbol = unit === "celsius" ? "°C" : "°F";
  return `${Math.round(value)}${symbol}`;
}

export function formatTempValue(value: number): number {
  return Math.round(value);
}

/**
 * Formats an ISO datetime string to a short time label in the user's locale.
 * Open-Meteo returns times like "2024-07-18T14:00".
 */
export function formatHour(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit", hour12: true });
}

/**
 * Formats an ISO date string ("2024-07-18") to a short weekday + date.
 */
export function formatDay(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("es", { weekday: "short", month: "short", day: "numeric" });
}

/**
 * Returns "Today" if the ISO date matches today's local date, otherwise formatDay.
 */
export function formatDayLabel(isoDate: string): string {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return isoDate === todayStr ? "Hoy" : formatDay(isoDate);
}

/**
 * Formats a wind direction in degrees to a compass label (N, NE, E, …).
 */
export function formatWindDirection(degrees: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  const index = Math.round(degrees / 45) % 8;
  return dirs[index];
}

/**
 * Formats an ISO datetime string to a short time ("6:30 AM").
 */
export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("es", { hour: "numeric", minute: "2-digit", hour12: true });
}

/**
 * Clamps a number between 0 and 100 for use as a percentage height.
 */
export function toPercent(value: number, min: number, max: number): number {
  if (max === min) return 50;
  return Math.round(((value - min) / (max - min)) * 100);
}
