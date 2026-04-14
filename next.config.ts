import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Trim the default srcset ladder — OIP source images cap at 474px,
    // so generating 1920–3840px variants is wasted work.
    qualities: [75, 95],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384, 480],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "external-content.duckduckgo.com",
      },
    ],
  },
};

export default nextConfig;
