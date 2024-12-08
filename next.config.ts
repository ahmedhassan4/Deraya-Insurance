import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["insurance.incodehub.com"],
  },
  async redirects() {
    return [
      {
        source: "/", // Source path (e.g., home page)
        destination: "/en/services", // The URL you want to redirect to
        permanent: false, // Set to `true` for a permanent 301 redirect
      },
    ];
  },
};

export default withNextIntl(nextConfig);
