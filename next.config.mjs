/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Para exportar como un sitio estático
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Importante para exportaciones estáticas
  },
}

export default nextConfig;

