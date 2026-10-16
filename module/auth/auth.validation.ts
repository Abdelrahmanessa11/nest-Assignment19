import z from "zod";

export const registerSchema=z.object({
    name:z.string().min(3).max(20),
    email:z.string().email(),
    password:z.string().min(6),
    confirmPassword:z.string().min(6),
    age:z.number().min(0)
})