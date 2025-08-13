import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET() {
    try {
        const status = await prisma.status.findMany();
        return NextResponse.json(status);
    } catch (error) {
        console.error("Error fetching status:", error);
        return NextResponse.error();
    }
}