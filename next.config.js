/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    domains: ["swiperjs.com", "utfs.io", "s3.amazonaws.com", "*"],
  },
};

module.exports = nextConfig;
