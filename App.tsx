
import React, { useState, useCallback } from 'react';
import { AppState, UploadedFile } from './types.ts';
import { generateVideoFromImage } from './services/geminiService.ts';
import WelcomeScreen from './components/WelcomeScreen.tsx';
import MainScreen from './components/MainScreen.tsx';
import LoadingScreen from './components/LoadingScreen.tsx';
import ResultScreen from './components/ResultScreen.tsx';
import { FilmIcon } from './components/icons.tsx';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>(AppState.Welcome);
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string>('');

    const handleStartApp = () => {
        setAppState(AppState.Main);
    };

    const handleReset = useCallback(() => {
        setAppState(AppState.Main);
        setUploadedFile(null);
        setPrompt('');
        setGeneratedVideoUrl(null);
        setError(null);
        setStatusMessage('');
    }, []);

    const handleGenerate = useCallback(async () => {
        if (!uploadedFile || !prompt) return;

        setAppState(AppState.Loading);
        setError(null);

        try {
            const videoUrl = await generateVideoFromImage(
                uploadedFile.base64,
                uploadedFile.file.type,
                prompt,
                setStatusMessage
            );
            setGeneratedVideoUrl(videoUrl);
            setAppState(AppState.Result);
        } catch (err) {
            console.error("Video generation failed:", err);
            const errorMessage = err instanceof Error ? err.message : "حدث خطأ غير متوقع أثناء إنشاء الفيديو.";
            setError(errorMessage);
            setAppState(AppState.Error);
        }
    }, [uploadedFile, prompt]);

    const renderContent = () => {
        switch (appState) {
            case AppState.Welcome:
                return <WelcomeScreen onStart={handleStartApp} />;
            case AppState.Main:
                return (
                    <MainScreen
                        uploadedFile={uploadedFile}
                        setUploadedFile={setUploadedFile}
                        prompt={prompt}
                        setPrompt={setPrompt}
                        onGenerate={handleGenerate}
                    />
                );
            case AppState.Loading:
                return <LoadingScreen statusMessage={statusMessage} />;
            case AppState.Result:
                return (
                    generatedVideoUrl && (
                        <ResultScreen videoUrl={generatedVideoUrl} onReset={handleReset} />
                    )
                );
            case AppState.Error:
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">فشل إنشاء الفيديو</h2>
                        <p className="text-slate-300 bg-red-900/50 p-4 rounded-lg mb-6">{error}</p>
                        <button
                            onClick={handleReset}
                            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                        >
                            حاول مرة أخرى
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
            {appState !== AppState.Welcome && (
                <header className="absolute top-0 right-0 left-0 p-4 flex items-center justify-between text-slate-400 bg-slate-900/80 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-3">
                        <FilmIcon className="w-8 h-8 text-sky-400" />
                        <h1 className="text-2xl font-bold text-white">ESO</h1>
                    </div>
                    <p className="hidden md:block text-sm">صنع بفضل المؤسس والمسؤول محمد مال الله الصميدعي</p>
                </header>
            )}
            <main className="w-full max-w-2xl flex flex-col items-center justify-center flex-grow pt-16">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
