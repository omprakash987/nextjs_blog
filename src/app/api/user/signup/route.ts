import { PrismaClient } from "@prisma/client";

import { NextResponse,NextRequest } from "next/server";

import jwt from 'jsonwebtoken'
import {signupInput } from "@/zod";


const client = new PrismaClient(); 




export async function POST(req:NextRequest,res:NextResponse) {
    const body =await req.json(); 
    const {success} = signupInput.safeParse(body)
    if(!success){
        return NextResponse.json({
            message:"input is not correct"

        },{status:411})
    }


    const jwtsecret = process.env.JWT_SECRET; 
    if(!jwtsecret){
        return NextResponse.json({
            message:"you dont have jwtsecret"

        },{status:500})
        
    }



    try{
    const user = await client.user.create({
            data:{
                name:body.name,
                username:body.username,
                password:body.password
            }
        })
        
       const token = jwt.sign({
        id:user.id
       },jwtsecret)
       



       return NextResponse.json({
        token
       })
        
        }
        catch(e){
           console.log("error you are getting is :",e); 

            return NextResponse.json({
                message:"user not created"
                
            },{status:400})
    }
}
