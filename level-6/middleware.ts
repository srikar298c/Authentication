import { NextRequest, NextResponse } from 'next/server';
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from './routes';
import NextAuth from "next-auth"
import authConfig from "@/auth.config"
export default async function auth(request: NextRequest) {
  const { auth } = await NextAuth(authConfig);
  const { nextUrl } = request;
  const isLoggedIn = !!auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute || isPublicRoute || isLoggedIn) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
  }

  return NextResponse.redirect(new URL("/auth/login", nextUrl));
}