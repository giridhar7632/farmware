/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./env.js')

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CONVEX_URL.replace(
          /^https?:\/\//,
          '',
        ),
      },
    ],
  },
}

export default config
