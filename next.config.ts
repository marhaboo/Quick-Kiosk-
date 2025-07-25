import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['45.153.68.77']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',                     
        destination: 'http://45.153.68.77:5001/api/:path*',  
      },
    ];
  }
};

export default nextConfig;
