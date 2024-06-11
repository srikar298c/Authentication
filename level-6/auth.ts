import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserRole } from "@prisma/client"; 
import authConfig from "@/auth.config";
import { getUserById } from "./data/users"; // Assuming this is the correct import path
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { db } from "./lib/db";
import { getAccountByUserId } from "./data/account";

const prisma = new PrismaClient();

export const { auth,handlers, signIn, signOut,
  

} = NextAuth({
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
      if (!user || !user.id) return false;
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
      session.user.role = token.role as UserRole;
    }
    if (token.isTwoFactorEnabled && session.user) {
      session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
    }
    if(session.user){
      session.user.name = token.name;
      session.user.email= token.email as string;
      session.user.isOAuth = token.isOAuth as boolean;
    }

    return session;
  },
  async jwt({ token }) {
    if (!token.sub) return token;

    const existingUser = await getUserById(token.sub);

    if (!existingUser ) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

    token.isOAuth = !!existingAccount;  
    token.name = existingUser.name;
    token.email= existingUser.email;
    token.role = existingUser.role;
    token.isTwoFactorEnabled =existingUser.isTwoFactorEnabled;

    return token;
  }
},
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});