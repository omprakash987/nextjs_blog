/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;







module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://api.example.com/:path*',
          },
        ]
      },
  };