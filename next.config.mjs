/** @type {import('next').NextConfig} */
const nextConfig = {
  // China build keeps critical images, fonts, audio, and video first-party.
  // Do not add remote image hosts here unless they are verified reachable from
  // mainland China and are genuinely required at runtime.
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
