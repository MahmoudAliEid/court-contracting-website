
import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
   
    // hash password here if needed
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });
    const token = signToken({ id: user.id, email: user.email });
    const response = NextResponse.json({ message: "User updated successfully" }, { status: 200 });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
}