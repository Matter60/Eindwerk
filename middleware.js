// Remove authMiddleware from the default export

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware;
export const config = {
  matcher: [], // Empty array means all routes are public
};
