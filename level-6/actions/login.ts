"use server"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth";
import * as z from "zod";
import { getUserByEmail } from "@/data/users";
import { generateVerificationToken } from "@/lib/tokens";



export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password } = validatedFields.data;
  const existingUser =await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password){
    return { error: "Email does not exist!" }
  }
    if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
    existingUser.email,
  );
    return {
    success: "Confirmation email sent!" }
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
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    } else {
      // Handle other types of errors here
      console.error(error);
      return { error: "An unknown error occurred." };
    }
    
  }

 
};