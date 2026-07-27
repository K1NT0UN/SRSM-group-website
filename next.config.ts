import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. Without this, Next detects a stray
  // package-lock.json in the home directory and may infer the wrong root,
  // which breaks output file tracing. Deletes nothing; just disambiguates.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
