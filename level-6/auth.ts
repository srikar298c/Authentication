import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserRole } from "@prisma/client";
import authConfig from "@/auth.config";
import { getUserById } from "./data/users";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
    events:{
        async linkAccount({user}){
            await prisma.user.update({
                where : {id: user.id},
                data: {emailVerified:new Date()}
            })
        }
    },
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id);
    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }
    // },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
