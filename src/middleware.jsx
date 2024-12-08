import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const session = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

  const isPublic = ["/", "/login", "/signup"].includes(pathname);

  if (isPublic && session) {
    return NextResponse.redirect(
      new URL(`/${session.username}/dashboard`, req.url)
    );
  }

  if (!isPublic && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signup",
    "/login",
    "/:username/dashboard",
    "/:username/earnings",
  ],
};
