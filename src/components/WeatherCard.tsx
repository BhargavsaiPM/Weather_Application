import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, CloudSnow, Eye, Wind, Droplets, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherData {
    name: string;
    weather: Array<{
        main: string;
        description: string;
        icon: string;
    }>;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    wind?: {
        speed: number;
    };
    visibility?: number;
}

interface WeatherCardProps {
    weatherData: WeatherData;
    className?: string;
}

const getWeatherIcon = (iconCode: string, main: string) => {
    if (main.toLowerCase().includes('rain')) return CloudRain;
    if (main.toLowerCase().includes('snow')) return CloudSnow;
    if (main.toLowerCase().includes('cloud')) return Cloud;
    return Sun;
};

export const WeatherCard = ({ weatherData, className }: WeatherCardProps) => {
    const WeatherIcon = getWeatherIcon(weatherData.weather[0].icon, weatherData.weather[0].main);

    return (
        <Card className={cn("bg-card/80 backdrop-blur-sm border-primary/20 shadow-card-shadow animate-fade-in", className)}>
            <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                    <WeatherIcon className="h-8 w-8 text-primary animate-weather-float" />
                    {weatherData.name}
                </CardTitle>
                <Badge variant="secondary" className="mx-auto text-sm">
                    {weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}
                </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center">
                    <div className="text-6xl font-bold text-primary mb-2">
                        {Math.round(weatherData.main.temp)}°
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Feels like {Math.round(weatherData.main.feels_like)}°
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                        <Thermometer className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-sm text-muted-foreground">Feels Like</p>
                            <p className="font-semibold">{Math.round(weatherData.main.feels_like)}°</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                        <Droplets className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-sm text-muted-foreground">Humidity</p>
                            <p className="font-semibold">{weatherData.main.humidity}%</p>
                        </div>
                    </div>

                    {weatherData.wind && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                            <Wind className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Wind Speed</p>
                                <p className="font-semibold">{Math.round(weatherData.wind.speed)} m/s</p>
                            </div>
                        </div>
                    )}

                    {weatherData.visibility && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                            <Eye className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Visibility</p>
                                <p className="font-semibold">{(weatherData.visibility / 1000).toFixed(1)} km</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
