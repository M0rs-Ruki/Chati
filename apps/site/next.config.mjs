/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chati.ai',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

export default nextConfig
