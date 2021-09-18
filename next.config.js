// module.exports = {
// }

const withPlugins = require("next-compose-plugins");

const nextConfig = {
  reactStrictMode: true,
  // webpack: (config, isServer) => {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ["@svgr/webpack"],
  //   });

  //   return config;
  // },
};

module.exports = withPlugins([], nextConfig);
