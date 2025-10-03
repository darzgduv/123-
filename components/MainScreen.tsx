
import React from 'react';
import { UploadedFile } from '../types.ts';
import ImageUploader from './ImageUploader.tsx';
import { ArrowDownIcon, SparklesIcon } from './icons.tsx';

interface MainScreenProps {
    uploadedFile: UploadedFile | null;
    setUploadedFile: (file: UploadedFile | null) => void;
    prompt: string;
    setPrompt: (prompt: string) => void;
    onGenerate: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({
    uploadedFile,
    setUploadedFile,
    prompt,
    setPrompt,
    onGenerate,
}) => {
    return (
        <div className="w-full flex flex-col items-center gap-6 animate-fade-in">
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 text-transparent bg-clip-text mb-2">
                    أضف الحياة إلى صورك
                </h2>
                <p className="text-slate-400 max-w-xl">
                    ارفع صورة، اكتب وصفًا للحركة، ودع الذكاء الاصطناعي ينشئ لك فيديو قصيرًا مذهلاً.
                </p>
            </div>

            <ImageUploader uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />

            {uploadedFile && (
                <div className="w-full flex flex-col items-center gap-6 animate-slide-up">
                    <ArrowDownIcon className="w-8 h-8 text-slate-500 animate-bounce" />

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="ابتسامة خفيفة، إيماءة بالرأس، تقريب درامي..."
                        className="w-full h-28 p-4 bg-slate-800 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-300 resize-none"
                        aria-label="اكتب وصفًا للرسوم المتحركة"
                    />

                    {prompt && (
                        <button
                            onClick={onGenerate}
                            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sky-500/20"
                        >
                            <SparklesIcon className="w-6 h-6" />
                            حوّل إلى رسوم متحركة الآن
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default MainScreen;
