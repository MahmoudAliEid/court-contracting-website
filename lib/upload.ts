
import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";

// Cloudinary config (move to a shared util if needed)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


interface UploadingParams {
    images: Buffer[];
}

const uploading = async ({ images }: UploadingParams) => {

interface CloudinaryUploadResult {
    secure_url?: string;
    [key: string]: any;
}

const uploadPromises: Promise<CloudinaryUploadResult>[] = images.map((image: Buffer, idx: number) => {
    return new Promise<CloudinaryUploadResult>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "court", public_id: `image_${idx + 1}` },
            (error: Error | undefined, result: CloudinaryUploadResult | undefined) => {
                if (error) reject(error);
                else resolve(result as CloudinaryUploadResult);
            }
        ).end(image);
    });
});

return Promise.all(uploadPromises);
}

export default uploading