/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Double asterisk is a wildcard
      },
      {
        protocol: 'http', // Also allow http if needed for local testing
        hostname: '**',
      },
    ],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'storage.googleapis.com',
  //       port: '',
  //       pathname: '/procounsellor-71824.firebasestorage.app/**',
  //     },
  //   ],
  // },

}

module.exports = nextConfig;
