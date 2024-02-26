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
