import {httpsCallable } from "firebase/functions";
import { functions } from "./firebase";
import { Video } from "lucide-react";

const generateUploadUrl = httpsCallable(functions, "GenerateUploadUrl");
const getVideosFunction = httpsCallable(functions, "GetVideos");

export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: 'processing' | 'processed',
    title?: string,
    description?: string;
    thumbnail: string;
}

export async function uploadVideo(file:File) {
    const response: any = await generateUploadUrl({
        fileExtension: file.name.split('.').pop(),
        fileName: file.name.split('.')[0]
    });

    //Upload file via the signed URL

    const uploadResult = await fetch(response?.data?.url, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type
        },
        cache: 'no-cache'
    });
    return uploadResult;
}

export async function getVideos() {
    const res = await getVideosFunction();
    return res.data as Video[];
}
