/** @type {import('next').NextConfig} */
import path from 'path'

const __dirname = new URL('.', import.meta.url).pathname

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images7.alphacoders.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.pokemondb.net',
        port: '',
      },
    ],
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './'),
    }
    return config
  },
}

export default nextConfig
