/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Every page in this app is statically generated at build time. Nothing here
  // touches a database or a request-time API, so Vercel serves it all from the
  // CDN and you never pay per request.
  //
  // If you want a hard guarantee of that (and the ability to host on any dumb
  // static host — Cloudflare Pages, S3, Netlify), uncomment the line below.
  // Everything in this repo is already compatible with it.
  // output: 'export',

  // Trailing slashes off => one canonical URL shape, no redirect hops.
  trailingSlash: false,

  // We ship no remote images and no next/image optimization, which keeps the
  // build free of any per-request image transform cost.
  images: { unoptimized: true },

  poweredByHeader: false,
};

export default nextConfig;
