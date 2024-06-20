

import {updateBlogInput, createBlogInput } from "@/zod";
import { PrismaClient } from "@prisma/client";
import { verify } from "crypto";
 import jwt from 'jsonwebtoken'

import { NextResponse,NextRequest } from "next/server";


export async function POST(req:NextRequest,res:NextResponse){
    const body = await req.json(); 
    console.log(body); 
    


    const {success} = createBlogInput.safeParse(body); 
    const jwtsecret = process.env.JWT_SECRET; 
   if(!jwtsecret){
    return NextResponse.json({
        message:"jwt secret is not available"

    },{status:500})
    
   }

    if(!success){
        return NextResponse.json({
            message:"input is not correct"
        })
    }
    const authHeader = req.headers.get("authorization") || "";
    let user;

    try {
        user = jwt.verify(authHeader, jwtsecret);

    } catch (e) {
        return NextResponse.json({
            message: "You are not logged in"
        }, { status: 401 });
    }

    if (!user || !user.id) {
        return NextResponse.json({
            message: "You are not logged in"
        }, { status: 401 });
    }

    const prisma = new PrismaClient();
    const authorId = user.id;

    if(!authorId){
        return NextResponse.json({
            message:"authorid is not created"
            
        })
    }

    try{
        const blog = await prisma.blog.create({
            data:{
                title:body.title,
                content:body.content,
                authorId:authorId

            }
        })
        return NextResponse.json({
            id:blog.id
           })
    }
    catch(e){
        console.log("error from create blog",e)
return NextResponse.json({
    message:"blog is not created"

},{status:411})

    }
  

}