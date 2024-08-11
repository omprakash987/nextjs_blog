

import z from 'zod'

export const signupInput = z.object({
    username:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})



export const signinInput = z.object({
    username:z.string().email(),
    password:z.string().min(6),
})



export const createBlogInput  = z.object({
    title:z.string(),
    content:z.string(),
   
})



export const updateBlogInput  = z.object({
    title:z.string(),
    content:z.string(),
    id:z.number(),

})

export type CreateBlogInput = z.infer<typeof createBlogInput>
export type SigninInput = z.infer<typeof signinInput>
export type SignupInput = z.infer<typeof signupInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>

