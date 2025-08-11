import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherSearchProps {
    onSearch: (city: string) => void;
    isLoading?: boolean;
    className?: string;
}

export const WeatherSearch = ({ onSearch, isLoading = false, className }: WeatherSearchProps) => {
    const [city, setCity] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
            <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="pl-10 h-12 bg-secondary/50 border-primary/20 text-lg placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                    disabled={isLoading}
                />
            </div>
            <Button
                type="submit"
                disabled={!city.trim() || isLoading}
                className="w-full h-12 bg-sky-gradient hover:scale-105 transition-all duration-300 shadow-weather-glow text-lg font-medium"
            >
                <Search className="mr-2 h-5 w-5" />
                {isLoading ? "Searching..." : "Get Weather"}
            </Button>
        </form>
    );
};
