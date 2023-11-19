![platepilot-nextjs-banner](/public/images/platepilot.png)

# PlatePilot

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yi-cheng-liu/mtsa-marketplace)

This is a [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) website aimed at enhancing the user experience for restaurant review websites like yelp.

## Table of Contents

- [Motivation](#motivation)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Demo](#demo)
- [License](#license)
- [Contact Information](#contact-information)
- [Acknowledgments](#acknowledgments)

## Motivation

## Features

##### Core

- Nextjs with TypeScript for server-rendered React applications
- [Prisma](https://www.prisma.io/) for database access, migrations, and ORM
- [Axios](https://axios-http.com/) for making HTTP requests
- [MongoDB](https://www.mongodb.com/) to store user, item, and reservation data
- [Cloudinary CDN](https://cloudinary.com/) to store images

##### Authentication

- [NextAuth.js](https://next-auth.js.org/) for client-side social login (Google and Github)
- [bcrypt](https://www.npmjs.com/package/bcrypt) for hashing passowrd before storing

##### Performance & Utilities

- [next/font](https://nextjs.org/docs/app/api-reference/components/font) for font optimization
- [next/navigation](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works) for in-memory client-side cache and patrial rendering
- [next/image](https://nextjs.org/docs/basic-features/image-optimization) for automatic image optimization
- [zustand](https://www.npmjs.com/package/zustand) for login/logout state management

##### UI/UX

- [mui UI](https://mui.com/) for date-time components
- [React Hot Toast](https://react-hot-toast.com/) for toasts and notifications

##### Analytics

- [vercel/analytics](https://www.npmjs.com/package/@vercel/analytics) for application analytics

## Installation and Setup

1. Clone the repository
   ```bash
   git clone git@github.com:reggiehsu111/PlatePilot.git
   ```
2. Navigate to the project directory
   ```bash
   cd mtsa-marketplace
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Setup .env
   ```bash
   OPENAI_API_KEY=
   DATABASE_URL=
   NEXTAUTH_SECRET="NEXTAUTH_SECRET"
   GITHUB_ID=
   GITHUB_SECRET=
   GOOGLE_ID=
   GOOGLE_SECRET=
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
   NEXT_PUBLIC_GMAPS_API_KEY=
   ```
5. Setup Prisma
   ```bash
   npx prisma db push
   ```
6. Run the development server
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 with your browser to see the webstite.

## Demo

## License

[MIT](https://github.com/yi-cheng-liu/mtsa-marketplace/blob/main/LICENSE) © Yi-Cheng Liu

## Contact Information

For more information or contributions, you can reach us at:
Yi-Cheng Liu, Email: whsjerryliu@gmail.com or liuyiche@umich.edu

## Acknowledgments
