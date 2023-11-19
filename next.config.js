/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
      'platform-lookaside.fbsbx.com',
      's3-media0.fl.yelpcdn.com',
    ]
  }
}

module.exports = nextConfig
