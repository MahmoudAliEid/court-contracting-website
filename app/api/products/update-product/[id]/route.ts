import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth";
import upload from "@/lib/upload";
import uploadingVideos from "@/lib/videosUpload";
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // get token from headers
const cookieHeader = request.headers.get("cookie") || request.headers.get("Cookie");
const token = cookieHeader
    ?.split(";")
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith("token="))
    ?.replace("token=", "");
if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
  const user = await authenticateUser(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get id from params (must await in Next.js App Router)
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Product id is required in params" }, { status: 400 });
  }


  // Parse FormData for update
  const formData = await request.formData();
  const updateFields: any = {};
  const fieldNames = [
    "title", "ar_title", "description", "ar_description",
    "category", "ar_category", "status", "ar_status"
  ];
  for (const name of fieldNames) {
    const value = formData.get(name);
    if (value && value.toString().trim() !== "") {
      updateFields[name] = value.toString();
    }
  }
  // Images: collect all files
  const images: File[] = [];
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("images")) {
      if (value instanceof File && value.size > 0) {
        images.push(value);
      }
    }
  }
  if (images.length > 0) {
    const imageBuffers = await Promise.all(
      images.map(async (file) => Buffer.from(await file.arrayBuffer()))
    );
    const uploadedImages = await upload({ images: imageBuffers });
    updateFields.images = uploadedImages;
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
  if (videos.length > 0) {
    const videoBuffers = await Promise.all(
      videos.map(async (file) => Buffer.from(await file.arrayBuffer()))
    );
    const uploadedVideos = await uploadingVideos({ videos: videoBuffers });
    updateFields.videos = uploadedVideos.map((video: any) => video.secure_url || video);
  }

  try {
    const product = await prisma.product.update({
      where: { id: id },
      data: updateFields,
    });
    return NextResponse.json({ message: "Product updated successfully", product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Product update failed", details: error }, { status: 500 });
  }
}