"use client"

import { ArrowLeft, Camera, Shield, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPage() {
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
                    <h1 className="text-xl font-bold">About</h1>
                </div>
            </header>

            <div className="pt-20 pb-8 px-4">
                <div className="container mx-auto max-w-md space-y-6">
                    {/* Hero */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-lg shadow-green-500/30">
                            <Camera className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            PurityScan
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Your trusted companion for Halal & Vegan food verification
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-green-600" />
                                    Lightning Fast
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                                Scan ingredient labels in seconds using advanced OCR technology. Get instant results without waiting.
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-green-600" />
                                    Privacy First
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                                All processing happens locally on your device. No data is sent to external servers. Your privacy is our priority.
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Heart className="w-5 h-5 text-green-600" />
                                    Community Driven
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                                Built for the Muslim and Vegan communities with love. Free to use, no hidden costs.
                            </CardContent>
                        </Card>
                    </div>

                    {/* How It Works */}
                    <Card>
                        <CardHeader>
                            <CardTitle>How It Works</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-green-600">
                                    1
                                </div>
                                <div>
                                    <strong>Scan the Label</strong>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Point your camera at the ingredients list on any food product
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-green-600">
                                    2
                                </div>
                                <div>
                                    <strong>Instant Analysis</strong>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Our OCR engine extracts text and checks against our database
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-green-600">
                                    3
                                </div>
                                <div>
                                    <strong>Get Results</strong>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        See color-coded results: Red (avoid), Yellow (doubtful), Green (safe)
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Disclaimer */}
                    <Card className="border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900/10">
                        <CardHeader>
                            <CardTitle className="text-yellow-800 dark:text-yellow-200">Important Note</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-yellow-700 dark:text-yellow-300">
                            PurityScan is a helpful tool but not a substitute for official Halal certification. Always verify with certified authorities when in doubt.
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
