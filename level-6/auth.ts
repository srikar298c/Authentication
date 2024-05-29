import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "@/auth.config"
import { db } from "./lib/db"
const prisma = new PrismaClient()
export const { auth, handlers, signIn, signOut } = NextAuth({
   callbacks:{
    async session({token, session}){
        if(token.sub && session.user){
            session.user.id = token.sub;
        }
        return session;
    },
   async jwt({token}) {
    return token;
   }
   },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
    providers: [],
})