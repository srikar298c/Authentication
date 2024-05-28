"use server"

import {DEFAULT_LOGIN_REDIRECT} from "@/app/api/auth/[...nextauth]/route";
import {signIn} from "@/auth";
import {LoginSchema} from "@/schemas"
import {AuthError} from "next-auth";
import * as  z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields =
        LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields!"}
    }
    
    const {email, password} = validatedFields.data;
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        //TODO
        if (error instanceof AuthError) {
            switch (error.type) {
                case "AccessDenied":
                    break;
                case "AdapterError":
                    break;
                    case "CallbackRouteError":
                        break;
                        case "ErrorPageLoop":
                            break;
                            case "EventError":
                    break;
                    case "InvalidCallbackUrl":
                        break;
                case "InvalidEndpoints":
                    break;
                    case "InvalidCheck":
                        break;
                case "JWTSessionError":
                    break;
                case "MissingAdapter":
                    break;
                case "MissingAdapterMethods":
                    break;
                    case "MissingAuthorize":
                        break;
                        case "MissingSecret":
                            break;
                            case "OAuthAccountNotLinked":
                                break;
                                case "OAuthCallbackError":
                                    break;
                case "OAuthProfileParseError":
                    break;
                    case "SessionTokenError":
                        break;
                        case "OAuthSignInError":
                            break;
                            case "EmailSignInError":
                                break;
                case "SignOutError":
                    break;
                case "UnknownAction":
                    break;
                    case "UnsupportedStrategy":
                        break;
                        case "InvalidProvider":
                            break;
                            case "UntrustedHost":
                                break;
                                case "Verification":
                                    break;
                                    case "MissingCSRF":
                                        break;
                                        case "AccountNotLinked":
                                            break;
                                            case "DuplicateConditionalUI":
                    break;
                case "MissingWebAuthnAutocomplete":
                    break;
                case "WebAuthnVerificationError":
                    break;
                    case "ExperimentalFeatureNotEnabled":
                        break;
                case "CredentialsSignin":
                    return {error: "Invalid credentials!"}
                    default:
                        return {
                            error: "Something went wrong!"
                        }
                    }
                    throw error;
                }
    }
    return {success: "Email sent"}
}