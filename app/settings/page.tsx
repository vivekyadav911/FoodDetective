"use client"

import { useState } from "react";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type DietMode = "halal" | "vegan" | "both";

export default function SettingsPage() {
    const [dietMode, setDietMode] = useState<DietMode>("both");
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold">Settings</h1>
                </div>
            </header>

            <div className="pt-20 pb-8 px-4">
                <div className="container mx-auto max-w-md space-y-6">
                    {/* Diet Mode */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Diet Mode</CardTitle>
                            <CardDescription>
                                Choose which dietary restrictions to check for
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <button
                                onClick={() => setDietMode("halal")}
                                className={`w-full p-4 rounded-xl border-2 transition-all ${dietMode === "halal"
                                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                        : "border-gray-200 dark:border-gray-700"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-left">
                                        <div className="font-semibold">Halal Only</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Check for Haram ingredients
                                        </div>
                                    </div>
                                    {dietMode === "halal" && (
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                    )}
                                </div>
                            </button>

                            <button
                                onClick={() => setDietMode("vegan")}
                                className={`w-full p-4 rounded-xl border-2 transition-all ${dietMode === "vegan"
                                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                        : "border-gray-200 dark:border-gray-700"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-left">
                                        <div className="font-semibold">Vegan Only</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Check for animal products
                                        </div>
                                    </div>
                                    {dietMode === "vegan" && (
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                    )}
                                </div>
                            </button>

                            <button
                                onClick={() => setDietMode("both")}
                                className={`w-full p-4 rounded-xl border-2 transition-all ${dietMode === "both"
                                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                        : "border-gray-200 dark:border-gray-700"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-left">
                                        <div className="font-semibold">Both (Recommended)</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Check for all restrictions
                                        </div>
                                    </div>
                                    {dietMode === "both" && (
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                    )}
                                </div>
                            </button>
                        </CardContent>
                    </Card>

                    {/* Appearance */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>
                                Customize the app appearance
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <button
                                onClick={toggleDarkMode}
                                className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    {darkMode ? (
                                        <Moon className="w-5 h-5" />
                                    ) : (
                                        <Sun className="w-5 h-5" />
                                    )}
                                    <div className="text-left">
                                        <div className="font-semibold">
                                            {darkMode ? "Dark Mode" : "Light Mode"}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Toggle theme
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </CardContent>
                    </Card>

                    {/* About */}
                    <Card>
                        <CardHeader>
                            <CardTitle>About PurityScan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <p>
                                <strong>Version:</strong> 1.0.0
                            </p>
                            <p>
                                <strong>Privacy:</strong> All scanning happens locally on your device. No data is sent to external servers.
                            </p>
                            <p className="pt-2">
                                Made with ❤️ for the Muslim and Vegan communities
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
