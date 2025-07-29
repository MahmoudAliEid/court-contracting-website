//handle delete 

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  if (!id) {
    return NextResponse.json({ error: "Product id is required in params" }, { status: 400 });
  }
  try {
    const product = await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}