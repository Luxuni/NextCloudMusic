import { SearchBar, Skeleton } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import { SearchBarRef } from 'antd-mobile/es/components/search-bar'
import { useRouter } from 'next/router'
import { createRef, Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from 'react'
import { NextPageWithLayout } from '../../../pages/_app'
import { getSearchDefault } from '../../services/search'

type MySearchHeadProps = {
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  setIsFocus: Dispatch<SetStateAction<boolean>>
}

const MySearchHead: NextPageWithLayout<MySearchHeadProps> = (props) => {
  const SearchBarRef = createRef<SearchBarRef>()
  const router = useRouter()

  useLayoutEffect(() => {
    if (SearchBarRef.current) {
      SearchBarRef.current.focus()
    }
  }, [SearchBarRef.current])

  const { data, isLoading, isError } = getSearchDefault()
  if (isLoading) return <Skeleton animated style={{ height: '3rem', borderRadius: '1rem' }} />

  const handleSearchValueChange = (value: string) => {
    props.setSearchValue(value)
  }

  const handleBackToHome = () => {
    router.back()
  }
  return (
    <div className="h-full w-full flex">
      <div className="w-1/6 flex items-center justify-center" onClick={handleBackToHome}>
        <LeftOutline fontSize={18} />
      </div>
      <div className="w-4/6 flex flex-col justify-center">
        <SearchBar
          ref={SearchBarRef}
          placeholder={data.data.showKeyword}
          style={{ '--border-radius': '100px', '--background': '#ffffff' }}
          value={props.searchValue}
          onChange={handleSearchValueChange}
          onFocus={() => props.setIsFocus(true)}
          onBlur={() => {
            setTimeout(() => {
              props.setIsFocus(false)
            })
          }}
        />
      </div>
      <div className="w-1/6 flex items-center justify-center">
        <span className="text-lg">搜索</span>
      </div>
    </div>
  )
}

export default MySearchHead
