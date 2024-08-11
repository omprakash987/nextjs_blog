"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useRouter } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";



export default function AuroraBackgroundDemo() {
  const router = useRouter(); 


  const HandleOnclick = async() => {
    
   
   const token = localStorage.getItem('token'); 
    console.log("token", token);
    if (token) {
      router.push('/blogs');
    } else {
      router.push('/signup');
    }
  };


  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Welcome to the Blog-Mania
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Create and Read exciting Blogs
        </div>
        <button onClick={HandleOnclick} className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Get Started
        </button>
      </motion.div>
    </AuroraBackground>
  );
}
