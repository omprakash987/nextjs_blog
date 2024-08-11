
 
import { PrismaClient } from "@prisma/client";
import { NextRequest,NextResponse } from "next/server";

import jwt from 'jsonwebtoken'
import { signinInput } from "@/zod";
 

export async function POST(req:NextRequest,res:NextResponse){
    const body = await req.json(); 
    const validation = signinInput.safeParse(body)
    if(!validation.success){
        return NextResponse.json({
            message:"input is not correct"
            
        })
    }
    const prisma = new PrismaClient(); 
    const jwtsecret = process.env.JWT_SECRET; 
    if(!jwtsecret){
        return NextResponse.json({
            message:"you dont have jwtsecret"

        },{status:500})
        
    }




    try{
        const user = await prisma.user.findFirst({
            where:{
                username:body.username,
                password:body.password,

            }

        })
        if(!user){
            return NextResponse.json({
                message:"user not found"

            })
        }

       
        
        const token = jwt.sign({ id: user.id }, jwtsecret, { expiresIn: '1h' });

console.log("token from signIn",token)


        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            token // Send token to frontend
        });
       
        response.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600;`);

        return response; 

    }
    catch(e){
        console.log("signin error ",e) ;
        return NextResponse.json({
            message:"signin failed"

        })
    }
}