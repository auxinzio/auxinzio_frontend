/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        // hostname: "instructorless-colouristic-judith.ngrok-free.dev",
        // hostname: "tqflfdhd-5000.inc1.devtunnels.ms",
        hostname : "15.235.192.119"
      },
    ],
  },
};

export default nextConfig;
