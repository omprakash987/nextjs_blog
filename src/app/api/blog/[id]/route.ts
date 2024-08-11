

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
const blogId = Number(id)
if(isNaN(blogId)){
    return NextResponse.json({
        message: 'Invalid blog ID'
    }, { status: 400 });
}

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!blog) {
            return NextResponse.json({
                message: 'Blog post not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            blog
        });
    } catch (e) {
        return NextResponse.json({
            message: 'Error while fetching blog post'
        }, { status: 500 });
    }
}
