/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['antd-mobile'])
{
  experimental: {
    appDir: true
  }
}
module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://lu-music.vercel.app/:path*',
      },
    ]
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
  // images: {
  //   domains: ['p1.music.126.net'],
  // },
})
