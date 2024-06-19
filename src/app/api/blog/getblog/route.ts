import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(){

    const prisma = new PrismaClient(); 
    const blogs = await prisma.blog.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    })
    return NextResponse.json({
        blogs
    })
}

