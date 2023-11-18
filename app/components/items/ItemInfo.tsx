'use client'

import dynamic from 'next/dynamic'
import { IconType } from 'react-icons'

import { SafeUser } from '@/app/types'
import ItemCategory from './ItemCategory'
import ItemOwner from './ItemOwner'

interface ItemInfoProps {
  user: SafeUser
  currentUser?: SafeUser | null
  description: string
  category:
    | {
        icon: IconType
        label: string
        description: string
      }
    | undefined
}

const ItemInfo: React.FC<ItemInfoProps> = ({
  user,
  currentUser,
  description,
  category
}) => {
  const parseDescription = (description: string) => {
    const urlRegex = /https?:\/\/[^\s]+/g
    const urls = description.match(urlRegex) || [] // Fallback to an empty array
    return description
      .split(urlRegex)
      .reduce((prev: JSX.Element[], current: string, i: number) => {
        let url = urls[i - 1]
        let elements = [<span key={i * 2}>{current}</span>] // Even keys for text

        if (i !== 0) {
          elements.push(
            <a
              href={url}
              key={i * 2 + 1}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black"
            >
              {url}
            </a>
          ) // Odd keys for URLs
        }
        return prev.concat(elements)
      }, [])
  }

  return (
    <div className="col-span-7 flex flex-col gap-6">
      {/* Owner of the Item */}
      <ItemOwner
        user={user}
        currentUser={currentUser}
        onUpdateUser={() => {}}
      />

      {/* Category */}
      <hr className="border-[1px]" />
      {category && (
        <ItemCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      {/* Description */}
      <hr className="border-[1px]" />
      <div className="text-lg font-semibold">Description</div>
      {description ? (
        <>
          <div className="text-lg font-light text-neutral-500 whitespace-normal overflow-wrap break-words">
            {description.split('\n').map((line, index) => (
              <span key={index}>
                {parseDescription(line)}
                <br />
              </span>
            ))}
          </div>
        </>
      ) : (
        <div className="text-neutral-500">No Description</div>
      )}
    </div>
  )
}

export default ItemInfo
