import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
     domains: [
      "images.unsplash.com",
      "upload.wikimedia.org",
      "www.google.com",
      "www.microsoft.com",
      "www.apple.com",
      "www.amazon.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons/**",
      },
    ],
  },
};

export default nextConfig;