/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['antd-mobile'])
module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return {
      fallback: [
        //接口请求 前缀带上/api-text/
        { source: `/api-text/:path*`, destination: `http://localhost:4000/:path*` },
      ],
    }
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
})
