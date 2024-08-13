 
"use client"

 import axios from "axios";
 import { useState } from "react"
 import { ChangeEventHandler } from "react";
 import { useRouter } from "next/navigation";
 import Link from "next/link";
import { clearAllModuleContexts } from "next/dist/server/lib/render-server";

 
 export default function Signin(){
     const router = useRouter(); 
 
     const [username,setUsername] = useState("")
     const [password,setPassword] = useState("");
     const [error , setError] = useState<string|null>(null)

     const handleSubmit=async()=>{
        try{
            const response = await axios.post("https://blog-mania-two.vercel.app/api/user/signin",{
                username,password
            })
            if (response.data.success) {
               
                localStorage.setItem('token', response.data.token);
                
                router.push('/blogs'); 
            }  else {
                setError("Sign-in failed");
            }
        }
        catch (error) {
            console.error("Sign-in error:", error);
            setError("An error occurred during sign-in.");
        }
     }
     


 
    return (
     <div className="h-screen flex justify-center flex-col">
     <div className="flex justify-center">
     <div  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
             <div>
                 <div className="px-10">
                     <div className="text-3xl font-extrabold">
                         Sign in
                     </div>
                 </div>
                 <div className="pt-2">
                 
 
                     <LabelledInput onChange={(e) => {
                         setUsername(e.target.value);
                     }} label="Username" placeholder="Email" />
                     <LabelledInput onChange={(e) => {
                         setPassword(e.target.value)
                     }} label="Password" type={"password"} placeholder="passowrd" />
                     <button onClick={handleSubmit} className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign in
                      </button>

                      {error && <p>{error}</p> }
                      create account <Link href={'/signup'}>Signup</Link>
                 </div>
             </div>
         </div>
     </div>
 </div>
    )
     
 }
 
 function LabelledInput({label,placeholder,type,onChange}:LabelledInputType){
     return(
         <label className=" block mb-2 text-sm text-black font-semibold pt-4">
             <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
 
         </label>
     )
 }
 
 interface LabelledInputType {
     label: string;
     placeholder: string;
     type?: string;
     onChange: ChangeEventHandler<HTMLInputElement>
 }