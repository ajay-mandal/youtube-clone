"use client";

import { useSearchParams } from "next/navigation";

export default function Watch() {
    const videoSrc = useSearchParams().get("v");
    const videoPrefix = process.env.NEXT_PUBLIC_VIDEO_PREFIX || "";
    const videoFilename = videoSrc ? videoSrc.split("/").pop() : "";

    return (
        <div className="px-8">
            <h1 className="font-bold text-2xl">Watch Page</h1>
            <div className="py-5">
                <video controls src={videoPrefix + videoSrc} width="70%" height="60%" />
                <p className="font-bold py-4">{videoFilename?.split("-")[2]}</p>
            </div>
        </div>
    );
}
