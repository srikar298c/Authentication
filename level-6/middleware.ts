import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "./routes"
// export {auth as default} from "@/auth"
 const { auth } = NextAuth(authConfig)

export default auth((req) => {
 const { nextUrl } = req
  const isLoggedIn = !!req.auth
  console.log(isLoggedIn)
   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
   const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
   const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null
  }
  if(isAuthRoute){
  if (isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url))
  }}

  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl))
  }

  return null
})
export const config = {
  matcher: ['/((?!._\\.[\\w]+$|_next).*)',
     '/', 
     '/(api|trpc)(.*)'],
}