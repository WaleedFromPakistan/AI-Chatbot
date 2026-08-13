import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // These use native bindings / dynamic requires and must run as real
  // Node.js modules rather than be bundled by webpack.
  serverExternalPackages: ["pdf-parse", "@langchain/community", "@xenova/transformers"],
};

export default nextConfig;
