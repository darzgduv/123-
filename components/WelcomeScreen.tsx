
import React from 'react';

interface WelcomeScreenProps {
    onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-lg border border-slate-700 animate-fade-in">
            <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 mb-4">
                ESO
            </h1>
            <p className="text-slate-300 mb-8">
                صنع بفضل المؤسس والمسؤول محمد مال الله الصميدعي
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
                <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
                >
                    متابعة على انستغرام
                </a>
                <button
                    onClick={onStart}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                    الاستمرار في التطبيق
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;
