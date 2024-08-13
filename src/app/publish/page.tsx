"use client";

import { Appbar } from "@/components/Appbar";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

 



export default function Publish() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit =async()=>{
    const token = localStorage.getItem('token')
   
    if(!token){
     setError("no token"); 
    }
     console.log("token",token)

     try {
      const response = await axios.post("https://blog-mania-two.vercel.app/api/blog/createblog",{
title,content
      },
    {
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
    router.push(`/blog/${response.data.blog.id}`); 
    console.log("blog created",response.data.blog)
    
      
     } catch (error) {
      console.log(error)
      
     }
   
   
   }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            type="text"
            className="
                  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
          />

          <TextEditor
            onChange={(e) => {
              setContent(e.target.value);
            }}
            content={content}
          />

          <button
           onClick={handleSubmit}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
}

function TextEditor({
  onChange,
  content,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  content: string;
}) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4 ">
        <div className="flex items-center justify-between border">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              value={content}
              id="editor"
              rows={8}
              className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
