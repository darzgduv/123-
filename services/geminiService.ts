
import { GoogleGenAI } from "@google/genai";

// Fix: Use process.env.API_KEY as per the guidelines.
// The API key is assumed to be available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const loadingMessages = [
    "جاري تجهيز مولدات الذكاء الاصطناعي...",
    "جاري تحليل بكسلات صورتك...",
    "جاري تصميم الحركة...",
    "قد يستغرق هذا بضع دقائق، الأشياء الجيدة تأتي لمن ينتظر!",
    "جاري عرض إطارات الفيديو، واحدًا تلو الآخر...",
    "جاري إضافة اللمسات السحرية الأخيرة...",
    "لقد أوشكنا على الانتهاء، جاري تحضير الفيديو الخاص بك..."
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateVideoFromImage = async (
    imageBase64: string,
    mimeType: string,
    prompt: string,
    updateStatus: (message: string) => void
): Promise<string> => {
    try {
        let messageIndex = 0;
        const intervalId = setInterval(() => {
            updateStatus(loadingMessages[messageIndex]);
            messageIndex = (messageIndex + 1) % loadingMessages.length;
        }, 8000);
        updateStatus(loadingMessages[0]);

        let operation = await ai.models.generateVideos({
            model: 'veo-2.0-generate-001',
            prompt: prompt,
            image: {
                imageBytes: imageBase64,
                mimeType: mimeType,
            },
            config: {
                numberOfVideos: 1
            }
        });

        while (!operation.done) {
            await sleep(10000); // Poll every 10 seconds
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }
        
        clearInterval(intervalId);

        if (operation.error) {
            throw new Error(operation.error.message || "فشل إنشاء الفيديو في Gemini.");
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

        if (!downloadLink) {
            throw new Error("لم يتم العثور على رابط تنزيل الفيديو في استجابة Gemini.");
        }

        updateStatus("جاري تحميل الفيديو...");
        
        // Fix: Use process.env.API_KEY for fetching the video as required.
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY!}`);

        if (!response.ok) {
            throw new Error(`فشل تحميل الفيديو. الحالة: ${response.status}`);
        }
        
        const videoBlob = await response.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        
        return videoUrl;

    } catch (error) {
        console.error("Error in generateVideoFromImage:", error);
        if (error instanceof Error) {
            throw error;
        }
        // Fix: Robustly convert the 'unknown' error type to a string to avoid type errors.
        throw new Error(String(error ?? '') || "An unknown error occurred during video generation.");
    }
};