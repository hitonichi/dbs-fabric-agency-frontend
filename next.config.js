/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/orders',
        destination: '/orders/view',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
