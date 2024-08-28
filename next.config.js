/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')();
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {

    },
}


module.exports = withNextIntl(nextConfig);
