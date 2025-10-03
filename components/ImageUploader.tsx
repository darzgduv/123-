
import React, { useCallback, useState } from 'react';
import { UploadedFile } from '../types.ts';
import { UploadIcon } from './icons.tsx';

interface ImageUploaderProps {
    uploadedFile: UploadedFile | null;
    setUploadedFile: (file: UploadedFile | null) => void;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            // Strip the "data:mime/type;base64," part
            resolve(result.substring(result.indexOf(',') + 1));
        };
        reader.onerror = (error) => reject(error);
    });
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ uploadedFile, setUploadedFile }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = useCallback(async (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const base64 = await fileToBase64(file);
            setUploadedFile({
                file: file,
                previewUrl: URL.createObjectURL(file),
                base64: base64,
            });
        }
    }, [setUploadedFile]);

    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, [handleFile]);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div
            className={`w-full p-4 border-2 border-dashed rounded-xl transition-colors duration-300 ${isDragging ? 'border-sky-500 bg-sky-900/50' : 'border-slate-700 bg-slate-800'}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <label htmlFor="file-upload" className="cursor-pointer">
                {uploadedFile ? (
                    <div className="w-full aspect-video rounded-lg overflow-hidden relative">
                         <img src={uploadedFile.previewUrl} alt="معاينة" className="w-full h-full object-contain" />
                         <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                             <p className="text-white font-bold">تغيير الصورة</p>
                         </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                        <UploadIcon className="w-12 h-12 mb-4" />
                        <p className="font-semibold">اسحب وأفلت صورة هنا، أو انقر للرفع</p>
                        <p className="text-sm">PNG, JPG, WEBP</p>
                    </div>
                )}
            </label>
            <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={onFileChange} />
        </div>
    );
};

export default ImageUploader;
