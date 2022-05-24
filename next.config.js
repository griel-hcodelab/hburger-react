/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    MERCADOPAGO_KEY: process.env.MERCADO_PAGO_PUBLIC_KEY,
  },
  images: {
    domains: [process.env.API_URL],
  },
}

module.exports = nextConfig
