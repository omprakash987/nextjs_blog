import { updateBlogInput, createBlogInput } from "@/zod";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextResponse, NextRequest } from "next/server";



const client = new PrismaClient(); 

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    console.log(body);

    const validation= createBlogInput.safeParse(body);

    if (!validation.success) {
        return NextResponse.json({
            message: "Input is not correct"
        });
    }

    const token = req.headers.get('Authorization')?.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        return NextResponse.json({
            message: "JWT secret is not defined"
        }, { status: 401 });
    }
   if(!token){
    return NextResponse.json({
        message: "no token"
    }, { status: 401 });
   }
    

    try {
        const decodedToken = jwt.verify(token,jwtSecret); 
        if(typeof decodedToken !== 'string' && 'id' in decodedToken){

        
       
        const user = await client.user.findUnique({
            where:{
                id:decodedToken.id
            }
        })

        if(!user){
            return NextResponse.json({
                message: "User not found"
            }, { status: 404 });
        }

        
        const blog =await client.blog.create({
            data:{
                title:body.title,
                content:body.content,
                authorId:user.id,
            }
        })

        return NextResponse.json({
            message: "Blog created successfully",
            blog
        });
    }else{

        return NextResponse.json({
            message: "invalid token",
           
        },{status:401});

    }
        
    } catch (error) {
        return NextResponse.json({
            message:"Error createblog"
        },{status:500})
        
    }
}


