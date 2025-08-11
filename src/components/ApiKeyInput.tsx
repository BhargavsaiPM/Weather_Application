import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Key, ExternalLink, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApiKeyInputProps {
    onApiKeyChange: (apiKey: string) => void;
    className?: string;
}

export const ApiKeyInput = ({ onApiKeyChange, className }: ApiKeyInputProps) => {
    const [apiKey, setApiKey] = useState("");
    const [showApiKey, setShowApiKey] = useState(false);

    useEffect(() => {
        // Load API key from localStorage on component mount, or use default
        const savedApiKey = localStorage.getItem("openweather_api_key");
        const defaultApiKey = "60a76a7a3beca3d73887d3e2bd28853f";

        if (savedApiKey) {
            setApiKey(savedApiKey);
            onApiKeyChange(savedApiKey);
        } else {
            // Auto-populate with the provided API key
            setApiKey(defaultApiKey);
            localStorage.setItem("openweather_api_key", defaultApiKey);
            onApiKeyChange(defaultApiKey);
        }
    }, [onApiKeyChange]);

    const handleApiKeySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (apiKey.trim()) {
            localStorage.setItem("openweather_api_key", apiKey.trim());
            onApiKeyChange(apiKey.trim());
        }
    };

    return (
        <Card className={cn("bg-card/60 backdrop-blur-sm border-primary/20", className)}>
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                    <Key className="h-5 w-5 text-primary" />
                    OpenWeatherMap API Key
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    Enter your API key to start fetching weather data.{" "}
                    <a
                        href="https://openweathermap.org/api"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                        Get API key
                        <ExternalLink className="h-3 w-3" />
                    </a>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleApiKeySubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="apiKey">API Key</Label>
                        <div className="relative">
                            <Input
                                id="apiKey"
                                type={showApiKey ? "text" : "password"}
                                placeholder="Enter your OpenWeatherMap API key"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="pr-10 bg-secondary/50 border-primary/20"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                                onClick={() => setShowApiKey(!showApiKey)}
                            >
                                {showApiKey ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        disabled={!apiKey.trim()}
                        className="w-full bg-sky-gradient hover:scale-105 transition-all duration-300"
                    >
                        Save API Key
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
