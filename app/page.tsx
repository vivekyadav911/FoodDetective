"use client"

import { useState } from "react";
import { Camera, Settings, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Scanner from "@/components/scanner";

export default function Home() {
    const [showScanner, setShowScanner] = useState(false);

    return (
        <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <Camera className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            PurityScan
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/about">
                            <Button variant="ghost" size="icon">
                                <Info className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/settings">
                            <Button variant="ghost" size="icon">
                                <Settings className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-20 pb-8 px-4">
                {!showScanner ? (
                    <div className="container mx-auto max-w-md">
                        {/* Hero Section */}
                        <div className="text-center mb-8 mt-12">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-lg shadow-green-500/30">
                                <Camera className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                Scan Food Labels
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                Instantly detect non-compliant ingredients for Halal & Vegan diets
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-4 mb-8">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">🔴</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Red Flags</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Instant alerts for pork, gelatin, alcohol, and more
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">🟡</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Doubtful Items</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Warnings for ingredients that need verification
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">🟢</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">No Red Flags</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Clear indication when no flagged ingredients found
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Button
                            onClick={() => setShowScanner(true)}
                            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/30"
                        >
                            <Camera className="w-5 h-5 mr-2" />
                            Start Scanning
                        </Button>

                        {/* Privacy Note */}
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                            🔒 Privacy-first • Works offline • No login required
                        </p>
                    </div>
                ) : (
                    <Scanner onClose={() => setShowScanner(false)} />
                )}
            </div>
        </main>
    );
}
