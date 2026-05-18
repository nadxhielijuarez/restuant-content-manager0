import { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";
import { updateSession } from "@/utils/supabase/middleware";

export async function proxy(request: Request) {
  const nextRequest = new NextRequest(request);

  const supabaseResponse = await updateSession(nextRequest);
  const auth0Response = await auth0.middleware(nextRequest);

  supabaseResponse.cookies.getAll().forEach((cookie) => {
    auth0Response.cookies.set(cookie.name, cookie.value);
  });

  return auth0Response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
