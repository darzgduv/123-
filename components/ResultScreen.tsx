
import React, { useState } from 'react';

interface ResultScreenProps {
    videoUrl: string;
    onReset: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ videoUrl, onReset }) => {
    const [copyMessage, setCopyMessage] = useState<string>('مشاركة الرابط');

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = videoUrl;
        a.download = 'eso_video.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopyMessage('تم النسخ!');
            setTimeout(() => setCopyMessage('مشاركة الرابط'), 2000);
        });
    };

    return (
        <div className="w-full flex flex-col items-center gap-6 animate-fade-in">
            <h2 className="text-4xl font-bold text-white">الفيديو الخاص بك جاهز!</h2>
            
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-black shadow-2xl shadow-sky-900/50">
                <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={handleDownload}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                    تحميل
                </button>
                <button
                    onClick={handleShare}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                    {copyMessage}
                </button>
            </div>
            
            <button
                onClick={onReset}
                className="w-full mt-4 bg-transparent border-2 border-slate-600 hover:bg-slate-800 text-slate-300 font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
                إنشاء فيديو آخر
            </button>
        </div>
    );
};

export default ResultScreen;
