/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/account",
        destination: "/account/profile",
        permanent: true,
      },
      {
        source: "/checkout",
        destination: "/checkout/carts",
        permanent: true,
      },
      // {
      //   source: "/category/:slug",
      //   destination: "/category/:slug?page=1",
      //   permanent: true,
      // },
      // {
      //   source: "/stationery-gifts/:slug",
      //   destination: "/stationery-gifts/:slug?page=1",
      //   permanent: true,
      // },
    ];
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn.waterstones.com",
      "m.media-amazon.com",
      "ideal-basketball-1910828f89.media.strapiapp.com",
    ],
  },
};

module.exports = nextConfig;
