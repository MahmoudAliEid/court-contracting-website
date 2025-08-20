
import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth";
import upload from "@/lib/upload";
import uploadingVideos from "@/lib/videosUpload";
import { Readable } from "stream";

export async function POST(request: Request) {
  try {
    // get token from cookies
    const cookieHeader = request.headers.get("cookie") || "";
    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token" }, { status: 401 });
    }
    const user = await authenticateUser(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // Parse FormData
    const formData = await request.formData();
    const title = formData.get("title")?.toString() || "";
    const ar_title = formData.get("ar_title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const ar_description = formData.get("ar_description")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const ar_category = formData.get("ar_category")?.toString() || "";
    const status = formData.get("status")?.toString() || "";
    const ar_status = formData.get("ar_status")?.toString() || "";

    // Images: collect all files
    const images: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("images")) {
        if (value instanceof File && value.size > 0) {
          images.push(value);
        }
      }
    }

    // Videos: collect all video files
    const videos: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("videos")) {
        if (value instanceof File && value.size > 0) {
          videos.push(value);
        }
      }
    }

    if (!title || !ar_title || !description || !ar_description || !category || !ar_category || !status || !ar_status) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Convert File objects to Buffers for upload
    const imageBuffers = await Promise.all(
      images.map(async (file) => Buffer.from(await file.arrayBuffer()))
    );
    let imagesUrls: string[] = [];
    if (imageBuffers.length > 0) {
      const uploadedImages = await upload({ images: imageBuffers });
      imagesUrls = uploadedImages.map((image: any) => image.secure_url);
    }

    // Convert Video File objects to Buffers for upload
    const videoBuffers = await Promise.all(
      videos.map(async (file) => Buffer.from(await file.arrayBuffer()))
    );
    let videosUrls: string[] = [];
    if (videoBuffers.length > 0) {
      const uploadedVideos = await uploadingVideos({ videos: videoBuffers });
      videosUrls = uploadedVideos.map((video: any) => video.secure_url);
    }

    const product = await prisma.product.create({
      data: {
        title,
        ar_title,
        description,
        ar_description,
        category,
        ar_category,
        status,
        ar_status,
        images: imagesUrls,
        videos: videosUrls,
      } as any,
    });
    return NextResponse.json({ message: "Product created successfully", product }, { status: 201 });
  } catch (err: any) {
    // Return the real error message for debugging
    return NextResponse.json({ error: err?.message || "Unknown error", stack: err?.stack }, { status: 500 });
  }
}