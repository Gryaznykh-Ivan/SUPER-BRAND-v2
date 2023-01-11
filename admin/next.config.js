/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [200, 300, 600, 800, 1000, 2048],
    imageSizes: []
  }
}

module.exports = nextConfig