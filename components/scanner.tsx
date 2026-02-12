"use client"

import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { createWorker } from "tesseract.js";
import { Camera, X, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import ingredientsData from "@/data/ingredients.json";

interface ScanResult {
    status: "safe" | "warning" | "danger";
    flaggedIngredients: Array<{
        name: string;
        reason: string;
        severity: string;
    }>;
    scannedText: string;
}

export default function Scanner({ onClose }: { onClose: () => void }) {
    const webcamRef = useRef<Webcam>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);
    const [showResult, setShowResult] = useState(false);

    const analyzeIngredients = (text: string): ScanResult => {
        const lowerText = text.toLowerCase();
        const flaggedIngredients: ScanResult["flaggedIngredients"] = [];

        // Check red flags
        for (const ingredient of ingredientsData.red_flags) {
            for (const name of ingredient.names) {
                if (lowerText.includes(name.toLowerCase())) {
                    flaggedIngredients.push({
                        name: name,
                        reason: ingredient.reason,
                        severity: ingredient.severity,
                    });
                    break;
                }
            }
        }

        // Check yellow flags
        for (const ingredient of ingredientsData.yellow_flags) {
            for (const name of ingredient.names) {
                if (lowerText.includes(name.toLowerCase())) {
                    flaggedIngredients.push({
                        name: name,
                        reason: ingredient.reason,
                        severity: ingredient.severity,
                    });
                    break;
                }
            }
        }

        // Determine status
        let status: ScanResult["status"] = "safe";
        if (flaggedIngredients.some(i => ingredientsData.red_flags.some(r => r.names.includes(i.name)))) {
            status = "danger";
        } else if (flaggedIngredients.length > 0) {
            status = "warning";
        }

        return {
            status,
            flaggedIngredients,
            scannedText: text,
        };
    };

    const processImage = async (imageSrc: string) => {
        setIsScanning(true);
        try {
            const worker = await createWorker("eng");
            const { data: { text } } = await worker.recognize(imageSrc);
            await worker.terminate();

            const result = analyzeIngredients(text);
            setResult(result);
            setShowResult(true);
        } catch (error) {
            console.error("OCR Error:", error);
            alert("Failed to scan image. Please try again.");
        } finally {
            setIsScanning(false);
        }
    };

    const capture = useCallback(async () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            await processImage(imageSrc);
        }
    }, [webcamRef]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const imageSrc = e.target?.result as string;
                await processImage(imageSrc);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black z-50">
                {/* Camera View */}
                <div className="relative w-full h-full">
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            facingMode: "environment",
                            width: 1920,
                            height: 1080,
                        }}
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay Guide */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="border-4 border-white/50 rounded-2xl w-[80%] h-[60%] shadow-lg">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                                Position ingredients list here
                            </div>
                        </div>
                    </div>

                    {/* Top Controls */}
                    <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
                        <Button
                            onClick={onClose}
                            variant="secondary"
                            size="icon"
                            className="bg-black/50 hover:bg-black/70 text-white border-0"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                        <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                            PurityScan
                        </div>
                        <div className="w-10" /> {/* Spacer */}
                    </div>

                    {/* Bottom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 flex items-center justify-center gap-6">
                        {/* Upload Button */}
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <div className="w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-colors">
                                <Upload className="w-6 h-6 text-white" />
                            </div>
                        </label>

                        {/* Capture Button */}
                        <Button
                            onClick={capture}
                            disabled={isScanning}
                            className="w-20 h-20 rounded-full bg-white hover:bg-gray-100 text-gray-900 shadow-lg disabled:opacity-50"
                        >
                            {isScanning ? (
                                <Loader2 className="w-8 h-8 animate-spin" />
                            ) : (
                                <Camera className="w-8 h-8" />
                            )}
                        </Button>

                        <div className="w-14" /> {/* Spacer for symmetry */}
                    </div>
                </div>
            </div>

            {/* Results Drawer */}
            <Drawer open={showResult} onOpenChange={setShowResult}>
                <DrawerContent className="max-h-[85vh]">
                    <DrawerHeader>
                        <DrawerTitle className="flex items-center gap-2">
                            {result?.status === "safe" && (
                                <>
                                    <span className="text-3xl">🟢</span>
                                    <span className="text-green-600">No Red Flags Found</span>
                                </>
                            )}
                            {result?.status === "warning" && (
                                <>
                                    <span className="text-3xl">🟡</span>
                                    <span className="text-yellow-600">Doubtful Ingredients</span>
                                </>
                            )}
                            {result?.status === "danger" && (
                                <>
                                    <span className="text-3xl">🔴</span>
                                    <span className="text-red-600">Avoid This Product</span>
                                </>
                            )}
                        </DrawerTitle>
                        <DrawerDescription>
                            {result?.status === "safe" &&
                                "No flagged ingredients detected. Note: This is not a Halal certification."}
                            {result?.status === "warning" &&
                                "Some ingredients need verification. Check the source."}
                            {result?.status === "danger" &&
                                "This product contains ingredients that are not compliant."}
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="px-4 pb-8 overflow-y-auto">
                        {result && result.flaggedIngredients.length > 0 && (
                            <div className="space-y-3 mb-6">
                                <h3 className="font-semibold">Flagged Ingredients:</h3>
                                {result.flaggedIngredients.map((ingredient, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-xl border-2 ${result.status === "danger"
                                                ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/10"
                                                : "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/10"
                                            }`}
                                    >
                                        <div className="font-semibold capitalize">{ingredient.name}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {ingredient.reason}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {result?.scannedText && (
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Scanned Text:</h3>
                                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm max-h-40 overflow-y-auto">
                                    {result.scannedText}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 mt-6">
                            <Button
                                onClick={() => {
                                    setShowResult(false);
                                    setResult(null);
                                }}
                                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            >
                                Scan Another
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowResult(false);
                                    setResult(null);
                                    onClose();
                                }}
                                variant="outline"
                                className="flex-1"
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}
