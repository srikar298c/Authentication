import GitHub from "next-auth/providers/github"
import bcrcypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./data/users"
 
export default { providers: [
    credentials({
        async authorize(credentials){
            const validatedFields = LoginSchema.safeParse(credentials);
            if(validatedFields.success){
                const {email, password}= validatedFields.data;
                const user = await getUserByEmail(email);
                if(!user || !user.password){
                    return null;
                }
                const passwordMatch = await bcrcypt.compare(
                    password,
                    user.password,
                )
                if(passwordMatch) return user;
            }
                 }
    })
] } satisfies NextAuthConfig