import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, publicRoutes } from "./routes"
import {auth } from "@/auth"

//const { auth } = NextAuth(authConfig)

// export default auth((req) => {
//   const { nextUrl } = req
//   const isLoggedIn = !!req.auth
//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

//   if (isApiAuthRoute) {
//     return null
//   }

//   if (isLoggedIn) {
//     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url))
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     return Response.redirect(new URL("/auth/login", nextUrl))
//   }

//   return null
// })
export default auth ((req)=>{
  console.log("Route: ",req.nextUrl)
})
export const config = {
  matcher: ['/((?!._\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}