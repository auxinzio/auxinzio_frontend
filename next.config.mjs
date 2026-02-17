/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "instructorless-colouristic-judith.ngrok-free.dev",
        // hostname: "tqflfdhd-5000.inc1.devtunnels.ms",
      },
    ],
  },
};

export default nextConfig;
