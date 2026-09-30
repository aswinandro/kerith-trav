import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // The PhonePe backend only sends CORS headers for kerithtravel.com, so the
    // browser calls our own origin and Next proxies the request server-side.
    return [
      {
        source: "/api/phonepe/:path*",
        destination: "https://phonepe-backend-njty.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
