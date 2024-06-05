"use server"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth";
import * as z from "zod";
import { getUserByEmail } from "@/data/users";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";



export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password, code } = validatedFields.data;
  const existingUser =await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password){
    return { error: "Email does not exist!" }
  }
    if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
    existingUser.email,
  );
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  )
    return {
    success: "Confirmation email sent!" }
    }

    if(existingUser.isTwoFactorEnabled && existingUser.email){
      if(code){
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        )
        if(!twoFactorToken) return {error: "Invalid Code!"}

        if (twoFactorToken.token !== code) {
          return { error: "Invalid code!" };
        }
          const hasExpired = new Date(twoFactorToken.expires) < new Date();
          if(hasExpired){
          return { error:"Code expired!" };
          }
          await db.twoFactorToken.delete({
          where: { id: twoFactorToken.id }
          })
          
      } else{
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token
      )
      return{twoFactor: true}
    }
    }

  try {
    // Sign in the user
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });

    // If the signIn is successful, return the success message
    return { success: "Logged in successfully!" }
  } 
  catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    } 
    
  }

 
};