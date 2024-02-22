// src/middleware.ts
import { authMiddleware } from '@descope/nextjs-sdk/server'

export default authMiddleware({
  projectId: process.env.DESCOPE_PROJECT_ID,
  redirectUrl: '/login',
  publicRoutes: ['/login', '/terms', '/policy'],
})

export const config = {
  matcher: ['/app', '/login'],
  runtime: 'experimental-edge', // for Edge API Routes only
  unstable_allowDynamic: [
    '/node_modules/lodash.get/index.js', // allows the lodash.get module
  ],
}