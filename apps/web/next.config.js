/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverExternalPackages: ["@prisma/client"]
    }
  };
  
  export default nextConfig;
  