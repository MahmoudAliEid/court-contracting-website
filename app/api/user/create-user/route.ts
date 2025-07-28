import { PrismaClient } from "@prisma/client";
// Use a singleton pattern for PrismaClient to avoid multiple instances in Next.js
let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient();
  }
  // @ts-ignore
  prisma = global.prisma;
}
import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import bcrypt from 'bcrypt';

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