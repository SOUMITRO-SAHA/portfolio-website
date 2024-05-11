/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  i18n: {
    locales: ["en-US", "fr", "ar", "bn", "hi-IN", "it-IT", "ru-RU", "nl-NL"],
    defaultLocale: "en-US",
  },
  images: {
    domains: [
      "media.licdn.com",
      "udemy-certificate.s3.amazonaws.com",
      "cdn.hashnode.com",
    ],
  },
};

export default config;
