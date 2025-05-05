import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  api: {
    bodyParser: {
      sizeLimit: "10kb",
    },
  },
  images: {
    domains: ["ui-avatars.com"],
  },
  devIndicators: false,
};

export default nextConfig;
