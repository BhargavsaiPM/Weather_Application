import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

export const useWeather = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchWeather = async (city: string, apiKey?: string) => {
        if (!apiKey) {
            toast({
                title: "API Key Required",
                description: "Please provide your OpenWeatherMap API key to fetch weather data.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
            );

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("City not found. Please check the spelling and try again.");
                } else if (response.status === 401) {
                    throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
                } else {
                    throw new Error("Failed to fetch weather data. Please try again.");
                }
            }

            const data = await response.json();
            setWeatherData(data);
            toast({
                title: "Weather Updated",
                description: `Successfully fetched weather data for ${data.name}.`,
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
            setError(errorMessage);
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        weatherData,
        isLoading,
        error,
        fetchWeather,
    };
};