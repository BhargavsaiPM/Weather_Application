import { useState } from "react";
import { WeatherSearch } from "@/components/WeatherSearch";
import { WeatherCard } from "@/components/WeatherCard";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { useWeather } from "@/hooks/useWeather";
import heroImage from "@/assets/weather-hero.jpg";
import { Cloud } from "lucide-react";

const Index = () => {
    const [apiKey, setApiKey] = useState("");
    const { weatherData, isLoading, fetchWeather } = useWeather();

    const handleSearch = (city: string) => {
        fetchWeather(city, apiKey);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative h-96">
                <img
                    src={heroImage}
                    alt="A beautiful weather-themed hero image showing a blue sky with white clouds, a bright sun, and rain droplets - perfect for a weather application background."
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" aria-hidden="true"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <div className="flex items-center gap-3 mb-4">
                        <Cloud className="h-12 w-12 text-primary animate-weather-float" />
                        <h1 className="text-5xl font-bold text-foreground">Weather App</h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Get real-time weather conditions for any city around the world
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* API Key Input */}
                {!apiKey && (
                    <div className="max-w-2xl mx-auto">
                        <ApiKeyInput onApiKeyChange={setApiKey} />
                    </div>
                )}

                {/* Weather Search */}
                {apiKey && (
                    <div className="max-w-md mx-auto">
                        <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
                    </div>
                )}

                {/* Weather Display */}
                {weatherData && (
                    <div className="max-w-lg mx-auto">
                        <WeatherCard weatherData={weatherData} />
                    </div>
                )}

                {/* Features Section */}
                <div className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Weather Features</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 rounded-lg bg-card/60 backdrop-blur-sm border border-primary/20">
                            <Cloud className="h-12 w-12 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
                            <p className="text-muted-foreground">Get up-to-date weather information from reliable sources</p>
                        </div>
                        <div className="text-center p-6 rounded-lg bg-card/60 backdrop-blur-sm border border-primary/20">
                            <Cloud className="h-12 w-12 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
                            <p className="text-muted-foreground">Search weather conditions for cities worldwide</p>
                        </div>
                        <div className="text-center p-6 rounded-lg bg-card/60 backdrop-blur-sm border border-primary/20">
                            <Cloud className="h-12 w-12 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Detailed Metrics</h3>
                            <p className="text-muted-foreground">View temperature, humidity, wind speed, and more</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
