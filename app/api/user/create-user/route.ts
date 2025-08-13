import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import bcrypt from 'bcrypt';
import { prisma } from "@/prisma/client";

export async function POST(request: Request) {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }
    // hash password here if needed
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });
    const token = signToken({ id: user.id, email: user.email });

    // i want to return the token in the response and set it in the cookies
    const response = NextResponse.json({ message: "User created successfully" }, { status: 201 });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
}