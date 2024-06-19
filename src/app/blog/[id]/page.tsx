"use client"




import { Appbar } from "@/components/Appbar";
import { FullBlog } from "@/components/FullBlog";
import { BlogSkeleton } from "@/components/skeleton";
import { useBlog } from "@/hooks/useBlogs";
import { useParams } from "next/navigation";


export default function Blog(){
    const params = useParams(); 

    const { id } = params;
    const {loading,blog} = useBlog({
        id:id||""

    })
   
    if(loading || !blog){
        return  (
            <div>
                <Appbar/>
                <div className=" h-screen flex flex-col justify-center">
                    <div className=" flex justify-center">

                      <BlogSkeleton/>
                       

                    </div>


                </div>
            </div>
        )

    }
    return(
        <div>
            <FullBlog blog={blog}/>
        </div>
    )
}