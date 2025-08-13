// get all categories
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.error();
  }
}

