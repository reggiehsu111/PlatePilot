# PlatePilot
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yi-cheng-liu/mtsa-marketplace)

This is a [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) website aimed at enhancing the user experience for MTSA's second-hand marketplace on Facebook. Since every seller have to post a PowerPoint for selling the items. Here are some of the issues I focused on improving:

1. The need to open a PowerPoint presentation to view items.
2. Lack of categorization for items.
3. Items that have been sold but are still listed due to outdated information.


## Table of Contents
- [Motivation](#motivation)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Demo](#demo)
- [License](#license)
- [Contact Information](#contact-information)
- [Acknowledgments](#acknowledgments)

## Motivation
MTSA Marketplace is a platform for buying and selling items within the MTSA (Michigan Taiwanese Student Association) community. This project aims to simplify the process of trading second-hand goods by providing a user-friendly interface equipped with search and reserve functionalities.

## Features
- 🛏️ Item Listing, add items, edit, and delete items
- 🔍 Dynamic Search and filter items by category
- ⚠️ Real-time Notifications
- 🔖 Saved Page for favorite items
- 📦 Order Page for monitoring reservations
- 🧑🏼 Update personal info and manage item listings and reservations
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
   git clone https://github.com/yi-cheng-liu/mtsa-marketplace.git
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
   DATABASE_URL=
   NEXTAUTH_SECRET="NEXTAUTH_SECRET"
   GITHUB_ID=
   GITHUB_SECRET=
   GOOGLE_ID=
   GOOGLE_SECRET=
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
   ```
5. Setup Prisma
   ```bash
   npx prisma db push
   ```
4. Run the development server
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 with your browser to see the webstite.


## Demo
#### Home Page
![home page](/public/images/page_intro/1_home_page.png)
#### Add an Item
| Select Category          | Enter Details            | Upload picture            
:-------------------------:|:------------------------:|:-------------------------:
![Category](/public/images/page_intro/2_category.png) |  ![Enter details](/public/images/page_intro/2_title.png) | ![Upload Picture](/public/images/page_intro/2_pic.png) 

#### Item Page
| Item Page                | Confirm reservation      
:-------------------------:|:------------------------:
![Item Page  ](/public/images/page_intro/3_item_page.jpg) |  ![Confirm reservation](/public/images/page_intro/3_confirm_reservation.png) 
#### Order Page & Saved Page
| Order Page               | Saved Page      
:-------------------------:|:------------------------:
![Order Page](/public/images/page_intro/5_order_page.png) |  ![Saved Page ](/public/images/page_intro/4_save_page.png) 
#### Profile Page
| Profile Page             | Reserved Items     
:-------------------------:|:------------------------:
![Profile Page](/public/images/page_intro/5_profile.png) |  ![Saved Page ](/public/images/page_intro/5_reserved_item.png) 
## License
[MIT](https://github.com/yi-cheng-liu/mtsa-marketplace/blob/main/LICENSE) © Yi-Cheng Liu
## Contact Information
For more information or contributions, you can reach us at:
Yi-Cheng Liu, Email: whsjerryliu@gmail.com or liuyiche@umich.edu
## Acknowledgments
This project has been an incredible learning journey in React and great code organization. Huge thanks to Antonio who is the creator of the [Airbnb clone](https://www.youtube.com/watch?v=c_-b_isI4vg&ab_channel=CodeWithAntonio) on Youtube. The insights and skills I gained from his course served as the foundation for this project. Also, thanks to the MTSA community for providing me the opportunity to build this project.


