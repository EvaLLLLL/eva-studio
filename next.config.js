/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // ssr and displayName are configured by default

    // Currently, only the ssr and displayName transforms have been implemented. These two transforms are the main requirement for using styled-components in Next.js.
    styledComponents: true,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
