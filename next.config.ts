import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. Without this, Next detects a stray
  // package-lock.json in the home directory and may infer the wrong root,
  // which breaks output file tracing. Deletes nothing; just disambiguates.
  turbopack: {
    root: __dirname,
  },
  // The legacy green Nisarga page (/projects/nisarga) has been retired — the
  // cinematic homepage is now the Nisarga experience. Redirect the old URL so
  // any existing links (e.g. from the NRI campaign) land on the new page
  // instead of a 404. Temporary (307) in case the route is ever reused.
  async redirects() {
    return [
      { source: "/projects/nisarga", destination: "/", permanent: false },
    ]
  },
};

export default nextConfig;
