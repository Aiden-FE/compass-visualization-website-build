// const fs = require('fs');
// const path = require('path');
//
// [
//   {
//     from: path.join(__dirname, 'node_modules/@compass-aiden/vwb-atomic-text/dist/vwb-atomic-text.umd.js'),
//     to: path.join(__dirname, 'public/3rd/vwb-atomic-text.umd.js'),
//   },
// ].forEach((item) => {
//   if (!fs.existsSync(path.dirname(item.to))) {
//     fs.mkdirSync(path.dirname(item.to), { recursive: true });
//   }
//   fs.copyFileSync(item.from, item.to);
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export', // 静态部署模式放开
  sassOptions: {
    additionalData: `
      @import "@compass-aiden/styles/dist/static/bem.scss";
      @import "@/assets/styles/variables.scss";
    `,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['tailwindui.com'],
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
