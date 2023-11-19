'use client'

import Pagination from '@mui/material/Pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import qs from 'query-string'
import SoldButton from './sold/SoldButton'

export const ITEMS_PER_PAGE = 60

export interface PaginationParams {
  totalItemsCount: number
  isHomeUrl: boolean
}

const CustomPagination: React.FC<PaginationParams> = ({
  totalItemsCount,
  isHomeUrl
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const [page, setPage] = useState(Number(params?.get('page') || 1))

  useEffect(() => {
    // Update the page state when the URL changes
    const updatedPage = Number(params?.get('page') || 1)
    setPage(updatedPage)
  }, [params])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)

    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      page: value
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      { skipNull: true, skipEmptyString: true }
    )

    router.push(url)
  }

  let maxPage = Math.ceil(totalItemsCount / ITEMS_PER_PAGE)

  return (
    <div>
      <div className="flex items-center justify-center p-6">
        {maxPage != 1 && (
          <Pagination
            count={maxPage}
            boundaryCount={3}
            page={page}
            onChange={handleChange}
            color="primary"
            size="large"
          />
        )}
      </div>
    </div>
  )
}

export default CustomPagination
