/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
    swcMinify: true,
    images: {
        domains: ['images.unsplash.com'],
    },
};

module.exports = nextConfig

