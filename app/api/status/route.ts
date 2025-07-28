import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
    try {
        const status = await prisma.status.findMany();
        return NextResponse.json(status);
    } catch (error) {
        console.error("Error fetching status:", error);
        return NextResponse.error();
    }
}