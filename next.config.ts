import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ttb-fai-fah-2026-cac2",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
