'use client';

import Image from 'next/image'

import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter();

  return (
    <a href='/'>
      <Image
          alt='logo'
          src= '/images/platepilot-logo.png'
          className='block cursor-pointer p-3'
          height='65'
          width='260'
        />
    </a>
  )
}

export default Logo
