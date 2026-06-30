import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [62, 64, 68, 72, 75],
  },
};

export default nextConfig;
