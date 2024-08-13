 
import { useEffect, useState } from "react"
import axios from "axios"


export interface Blog{
    "content":string; 
    "title":string;
    "id":string;
    "author":{
        "name":string

    }
}
export const useBlog = ({id}:{id:string})=>{
    const [loading,setLoding] = useState(true)
    const [blog,setBlog] = useState<Blog>()


    useEffect(()=>{
        axios.get(`https://blog-mania-two.vercel.app/api/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")

            }

        }).then(response=>{
            setBlog(response.data.blog)
            setLoding(false)

        })

    },[id])
    return {
        loading,
        blog

    }


}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`https://blog-mania-two.vercel.app/api/blog/getblog`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}