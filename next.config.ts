import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSite = repository.endsWith(".github.io");
const hasCustomDomain = process.env.CUSTOM_DOMAIN === "true";
const basePath = process.env.GITHUB_ACTIONS === "true" && !isUserSite && !hasCustomDomain
  ? `/${repository}`
  : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
