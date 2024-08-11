



import {updateBlogInput } from "@/zod";
import { PrismaClient } from "@prisma/client";
 

import { NextResponse,NextRequest } from "next/server";


const prisma = new PrismaClient(); 

export async function PUT(req:NextRequest,res:NextResponse){
    const body = await req.json(); 
    console.log(body); 


    const validation = updateBlogInput.safeParse(body)

    if(!validation.success){
        return NextResponse.json({
            message:"input is not correct"
        })
    }
     try{
        
      
       const blog = await prisma.blog.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
       })
       return NextResponse.json({
        id:blog.id

       })
    }
    catch(e){
        console.log("error from update blog",e)
return NextResponse.json({
    message:"blog is not updated"

},{status:411})

    }
  

}