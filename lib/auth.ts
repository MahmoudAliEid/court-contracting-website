
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export function signToken(payload: object) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2w" });
}

export function verifyToken(token: string) {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}


export async function authenticateUser(token: string) {
  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return user;
}