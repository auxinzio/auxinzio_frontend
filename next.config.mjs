/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "15.235.192.119",
        unoptimized: true,
      },
    ],
  },
};

export default nextConfig;
