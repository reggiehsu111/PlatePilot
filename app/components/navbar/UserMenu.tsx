'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from '../navbar/MenuItem'
import { useCallback, useState, useRef, useEffect } from 'react'
import useSellModal from '@/app/hooks/useSellModal'
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from '@/app/types'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'


interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const sellModal = useSellModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const toggleOpen = useCallback(() => { 
    setIsOpen((value) => !value)
  }, []);

  const onSell = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // open the item modal
    sellModal.onOpen();
  }, [currentUser, loginModal, sellModal]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        (!toggleButtonRef.current || !toggleButtonRef.current.contains(event.target as Node))
      ) {
        setIsOpen(false);
      }
    }


    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])


  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {currentUser && (
          <div className="flex items-center justify-between">
            <div className="hidden md:block lg:text-base text-sm font-semibold text-[#00274C]">
              Go EAT!
            </div>
            <div className="hidden md:block md:text-base text-sm font-bold ml-2 text-[#00274C]">
              {currentUser.name}
            </div>
          </div>
        )}

        <div
          ref={toggleButtonRef}
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-spacing-0 border-[2px] flex flex-row items-center gap-3 rounded-2xl cursor-pointer hover:shadow-md transition"
        >
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
          <AiOutlineMenu />
        </div>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="Saved"
                  onClick={() => router.push('/saved')}
                />
                <MenuItem
                  label="Logout"
                  onClick={() =>
                    signOut({ callbackUrl: `${window.location.origin}/` })
                  }
                />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
