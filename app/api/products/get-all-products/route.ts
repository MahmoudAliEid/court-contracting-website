import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
    const products = await prisma.product.findMany();
    return NextResponse.json({ products }, { status: 200 });
}
