
 
import { PrismaClient } from "@prisma/client";
import { sign } from "crypto";
import { NextRequest,NextResponse } from "next/server";

import jwt from 'jsonwebtoken'
import { signinInput } from "@/zod";




export async function POST(req:NextRequest,res:NextResponse){
    const body = await req.json(); 
    const {success} = signinInput.safeParse(body)
    if(!success){
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

        const token =  jwt.sign({
            id:user.id
        },jwtsecret)

        return NextResponse.json({
            token
        })

    }
    catch(e){
        console.log("signin error ",e) ;
        return NextResponse.json({
            message:"signin failed"

        })
    }
}