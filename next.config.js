/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["files.stripe.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
