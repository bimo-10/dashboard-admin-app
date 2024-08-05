/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["assets.aceternity.com", "utfs.io"],
    // remotePatterns: [
    //   {
    //     hostname: "assets.aceternity.com",
    //   },
    // ],
  },
};

export default config;
