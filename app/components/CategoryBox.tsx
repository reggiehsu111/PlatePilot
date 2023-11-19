'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter()
  const params = useSearchParams()

  // With "useCallback", the function is only re-created if any of its dependencies change
  const handleSelect = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    // Add the 'category' query parameter
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    // Remove the 'page' query parameter
    delete updatedQuery.page

    // Deselect a category by clicking it again
    if (params?.get('category') == label) {
      delete updatedQuery.category
    }

    // Generate the new URL with the updated query parameters
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      { skipNull: true, skipEmptyString: true }
    )

    router.push(url)
  }, [label, params, router])

  return (
    <div
      onClick={handleSelect}
      className={`flex flex-col items-center justify-center gap-2 p-2 border-2 rounded-3xl w-24 h-18
      hover:text-[#FE2106] hover:border-[#FE2106] transition cursor-pointer
      ${selected ? 'border-[#FE2106]' : 'border-transparent'}
      ${selected ? 'text-[#FE2106]' : 'text-neutral-500'}
      ${selected ? 'bg-[#FE210615]' : 'bg-transparent'}
    `}
    >
      <Icon size={28} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
};

export default CategoryBox;
