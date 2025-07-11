import {z} from 'zod'

export const messageSchema = z.object({
  content: z.string().min(1,{message: 'Content must be atleast 1 character'}).max(6,{message: 'Content must be less than 300 characters'})
})