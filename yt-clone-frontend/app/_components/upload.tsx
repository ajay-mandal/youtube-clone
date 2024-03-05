'use client';

import { uploadVideo } from "@/firebase/functions";
import { toast } from "sonner"

export default function Upload() {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const file = e.target.files?.item(0);
        if(file){
            handleUpload(file);
        }
    }

    const handleUpload = async(file: File)=>{
        try{
            await uploadVideo(file);
            toast("Video Uploaded Successfully",{ position: "bottom-center", className:"max-w-fit"})
        }catch(error){
            toast(`Failed to upload file: ${error}`,{ position: "bottom-center", className:"max-w-fit"})
        }
    }

    return(
        <div className="flex flex-col items-center">
            <input id="upload" type="file" accept="video/*" className="hidden"
            onChange={handleFileChange}/>
            <label htmlFor="upload" className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                </svg>
            </label>
            <p className="flex items-center py-2 font-bold">Upload Video</p>
        </div >
    )
}