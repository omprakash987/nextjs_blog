import { updateBlogInput, createBlogInput } from "@/zod";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    console.log(body);

    const { success } = createBlogInput.safeParse(body);

    if (!success) {
        return NextResponse.json({
            message: "Input is not correct"
        });
    }

    const authHeader = req.headers.get("authorization") || "";
    let user: string | JwtPayload;

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return NextResponse.json({
            message: "JWT secret is not defined"
        }, { status: 500 });
    }

    try {
        user = jwt.verify(authHeader, jwtSecret);
    } catch (e) {
        return NextResponse.json({
            message: "You are not logged in"
        }, { status: 401 });
    }

    if (!isJwtPayload(user) || !user.id) {
        return NextResponse.json({
            message: "You are not logged in"
        }, { status: 401 });
    }

    const prisma = new PrismaClient();
    const authorId = user.id as string;

    if (!authorId) {
        return NextResponse.json({
            message: "Author ID is not created"
        });
    }

    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            }
        });
        return NextResponse.json({
            id: blog.id
        });
    } catch (e) {
        console.log("Error from create blog", e);
        return NextResponse.json({
            message: "Blog is not created"
        }, { status: 411 });
    }
}

// Type guard to check if the value is a JwtPayload
function isJwtPayload(value: string | JwtPayload): value is JwtPayload {
    return (value as JwtPayload).id !== undefined;
}
