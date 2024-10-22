import { NextRequest, NextResponse } from "next/server";
import { LocalStorageUtils } from "./_utils/localStorage.util";
import { ACCESS_TOKEN_STORAGE_KEY } from "./_constants/keys.constants";

const publicRoutes = ["/home", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = !publicRoutes.includes(path);
  const isLogged = localStorage.get(ACCESS_TOKEN_STORAGE_KEY);

  console.log(isLogged)

  if (isProtectedRoute && !isLogged) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
