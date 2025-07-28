// npx prisma migrate dev --name init 
// npx prisma studio

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { signToken } from "@/lib/auth";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();    

// GET /api/user
export async function GET(request: Request) {
    try {
        const {email, password} = await request.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }
        // Authenticate user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if (!user.password) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }
        // Generate token
        const token = signToken({ id: user.id, email: user.email });
        // Set token in cookies
        const response = NextResponse.json({ message: "User authenticated successfully" }, { status: 200 });
        response.cookies.set("token", token, { httpOnly: true });
        return response;

       
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

