
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config (move to a shared util if needed)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Check if Cloudinary is properly configured
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Cloudinary environment variables are not properly configured');
}

interface CloudinaryUploadResult {
  secure_url?: string;
  public_id?: string;
  resource_type?: string;
  format?: string;
  duration?: number;
  [key: string]: any;
}

interface UploadingParams {
  videos: Buffer[];
}

const uploadingVideos = async ({ videos }: UploadingParams): Promise<CloudinaryUploadResult[]> => {
  if (!videos || videos.length === 0) {
    throw new Error('No videos provided for upload');
  }

  const uploadPromises: Promise<CloudinaryUploadResult>[] = videos.map((video: Buffer, idx: number) => {
    return new Promise<CloudinaryUploadResult>((resolve, reject) => {
      // Validate video buffer
      if (!video || video.length === 0) {
        reject(new Error(`Video ${idx + 1} is empty or invalid`));
        return;
      }

      // Check file size (e.g., max 100MB)
      const maxSize = 100 * 1024 * 1024; // 100MB in bytes
      if (video.length > maxSize) {
        reject(new Error(`Video ${idx + 1} exceeds maximum file size of 100MB`));
        return;
      }

      cloudinary.uploader.upload_stream(
        { 
          folder: "court/videos", 
          public_id: `video_${Date.now()}_${idx + 1}`,
          resource_type: "video", // Important: specify that this is a video
          format: "mp4", // Optional: convert to mp4 for better compatibility
          quality: "auto", // Auto-optimize quality
          transformation: [
            { quality: "auto:good" },
            { fetch_format: "auto" }
          ]
        },
        (error: Error | undefined, result: CloudinaryUploadResult | undefined) => {
          if (error) {
            console.error(`Error uploading video ${idx + 1}:`, error);
            reject(error);
          } else if (!result) {
            reject(new Error(`Upload failed for video ${idx + 1}: No result returned`));
          } else {
            console.log(`Successfully uploaded video ${idx + 1}:`, result.secure_url);
            resolve(result as CloudinaryUploadResult);
          }
        }
      ).end(video);
    });
  });

  try {
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error during video uploads:', error);
    throw error;
  }
};

export default uploadingVideos;