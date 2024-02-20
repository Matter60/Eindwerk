import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    /^\/$/, // Matches "/"
    /^\/game\/[^\/]+$/, // Matches "/game/[slug]" where [slug] can be any non-empty string
    /^\/search$/, // Matches "/search"
    /^\/genre\/[^\/]+$/, // Matches "/genre/[genre_id]" where [genre_id] can be any non-empty string
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
