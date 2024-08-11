/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://api.example.com/:path*',
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/api/:path*', // Matches all API routes
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*', // Allow all origins, change this to your specific origin as needed
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
