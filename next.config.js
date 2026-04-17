/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default config;
