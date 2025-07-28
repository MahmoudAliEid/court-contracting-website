import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth";
import upload from "@/lib/upload";

export async function POST(request: Request) {
    // get token from cookies
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
   if (!token) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }
   const user = await authenticateUser(token);
   if (!user) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }
   const { title, ar_title, description, ar_description, category, ar_category, status, ar_status, images } = await request.json();
  
    if (!title || !ar_title || !description || !ar_description || !category || !ar_category || !status || !ar_status) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });}
   

    const imageBuffers = images.map((image: string) => Buffer.from(image, 'base64'));
    const uploadedImages = await upload({ images: imageBuffers });
    const imagesUrls = uploadedImages.map((image: any) => image.secure_url);
    const product = await prisma.product.create({ data: { title, ar_title, description, ar_description, category, ar_category, status, ar_status, images: imagesUrls } });
    return NextResponse.json({ message: "Product created successfully", product }, { status: 201 });


}