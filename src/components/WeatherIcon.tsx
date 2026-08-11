import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Snowflake,
  LucideProps,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Snowflake,
};

interface WeatherIconProps extends LucideProps {
  iconName: string;
}

export default function WeatherIcon({ iconName, ...props }: WeatherIconProps) {
  const Icon = iconMap[iconName] ?? Sun;
  return <Icon {...props} />;
}
