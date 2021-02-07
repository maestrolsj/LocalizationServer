/* eslint-disable @typescript-eslint/no-var-requires */
const nextBuildId = require('next-build-id');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    distDir: 'build',
    images: {
        domains: ['assets.vercel.com', 's3.ap-northeast-2.amazonaws.com', '127.0.01:3000', '15.164.149.176:8443'],
    },
    env: {
        SAMPLE_KEY: 'sample-key',
    },
    reactStrictMode: true,
    generateBuildId: () => nextBuildId({ dir: __dirname }),
    webpack: (config, { webpack }) => {
        config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
        return config;
    },
});
