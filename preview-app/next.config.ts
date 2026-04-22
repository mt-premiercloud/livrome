import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root so Turbopack doesn't walk up to
    // ~/package-lock.json. This directory is the root.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
