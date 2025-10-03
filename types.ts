
export enum AppState {
    Welcome,
    Main,
    Loading,
    Result,
    Error,
}

export interface UploadedFile {
    file: File;
    previewUrl: string;
    base64: string;
}
