/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    deviceSizes: [200, 300, 600, 800, 1000, 2048],
    imageSizes: []
  }
}

module.exports = nextConfig
