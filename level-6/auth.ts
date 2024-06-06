import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserRole } from "@prisma/client"; 
import authConfig from "@/auth.config";
import { getUserById } from "./data/users"; // Assuming this is the correct import path
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { db } from "./lib/db";

const prisma = new PrismaClient();

export const { auth,handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      });
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allowing Oauth provider without email verification
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id);
      //preventing sign in without verification
      if (!existingUser?.emailVerified) return false;

      if(existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if(!twoFactorConfirmation) return false;

        //Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: {id: twoFactorConfirmation.id}
        });
}
      return true;
    },
  async session({ token, session }) {
    if (token.sub && session.user) {
      session.user.id = token.sub;
    }
    if (token.role && session.user) {
      session.user.role = token.role;
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