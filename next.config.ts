import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      ...[
        "https://www.sifmax.com",
        "http://localhost:3000",
        "https://lh3.googleusercontent.com",
      ].map((item) => {
        const url = new URL(item);

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(":", "") as "http" | "https",
        };
      }),
    ],
  },
};

export default nextConfig;
