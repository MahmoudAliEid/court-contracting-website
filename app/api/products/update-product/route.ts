import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth";
import upload from "@/lib/upload";
export async function PUT(request: Request) {
    // get token from headers
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await authenticateUser(token);
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get id from search params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Product id is required in search params" }, { status: 400 });
    }

    const updateFields = await request.json();

    // Handle images if provided
    let imagesUrls = undefined;
    if (updateFields.images && Array.isArray(updateFields.images)) {
        const imageBuffers = updateFields.images.map((image: string) => Buffer.from(image, 'base64'));
        const uploadedImages = await upload({ images: imageBuffers });
        imagesUrls = uploadedImages.map((image: any) => image.secure_url);
        updateFields.images = imagesUrls;
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