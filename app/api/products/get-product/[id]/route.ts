import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json( product , { status: 200 });

}
