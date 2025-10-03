
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
    statusMessage: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ statusMessage }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in">
            <div className="w-16 h-16 border-4 border-t-sky-500 border-slate-700 rounded-full animate-spin mb-6"></div>
            <h2 className="text-3xl font-bold text-white mb-4">
                جاري إنشاء الفيديو الخاص بك...
            </h2>
            <p className="text-slate-400 min-h-[2.5rem] text-lg transition-opacity duration-500">{statusMessage}</p>
        </div>
    );
};

export default LoadingScreen;
