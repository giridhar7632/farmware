// src/middleware.ts
import { authMiddleware } from '@descope/nextjs-sdk/server'

export default authMiddleware({
  projectId: process.env.DESCOPE_PROJECT_ID,
  redirectUrl: '/login',
  publicRoutes: ['/login', '/terms', '/policy'],
})

export const config = {
  matcher: ['/app'],
}
