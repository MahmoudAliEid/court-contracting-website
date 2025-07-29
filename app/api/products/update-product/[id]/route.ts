import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth";
import upload from "@/lib/upload";
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

  // Get id from params
  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: "Product id is required in params" }, { status: 400 });
  }


  // Parse FormData for update
  const formData = await request.formData();
  const updateFields: any = {
    title: formData.get("title")?.toString() || "",
    ar_title: formData.get("ar_title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    ar_description: formData.get("ar_description")?.toString() || "",
    category: formData.get("category")?.toString() || "",
    ar_category: formData.get("ar_category")?.toString() || "",
    status: formData.get("status")?.toString() || "",
    ar_status: formData.get("ar_status")?.toString() || "",
  };
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
    updateFields.images = uploadedImages.map((image: any) => image.secure_url);
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