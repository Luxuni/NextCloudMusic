import { SearchBar, Skeleton } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import { SearchBarRef } from 'antd-mobile/es/components/search-bar'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { NextPageWithLayout } from '../../../pages/_app'
import { getSearchDefault } from '../../services/search'

const MySearchHead: NextPageWithLayout = () => {
  const [value, setValue] = useState('')
  const SearchBarRef = useRef<SearchBarRef>(null)
  const router = useRouter()

  useEffect(() => {
    if (SearchBarRef.current) {
      SearchBarRef.current.focus()
    }
  }, [SearchBarRef])

  const { data, isLoading, isError } = getSearchDefault()
  if (isLoading) return <Skeleton animated style={{ height: '3rem', borderRadius: '1rem' }} />

  const handleSearchValueChange = (value: string) => {
    setValue(value)
  }

  const handleBackToHome = () => {
    router.push('/home')
  }

  return (
    <>
      <div className="w-1/6 flex items-center justify-center" onClick={handleBackToHome}>
        <LeftOutline fontSize={28} />
      </div>
      <div className="w-4/6 flex flex-col justify-center">
        <SearchBar
          ref={SearchBarRef}
          placeholder={data.data.showKeyword}
          style={{ '--border-radius': '100px', '--background': '#ffffff' }}
          value={value}
          onChange={handleSearchValueChange}
        />
      </div>
      <div className="w-1/6 flex items-center justify-center">
        <span className="text-xl">搜索</span>
      </div>
    </>
  )
}

export default MySearchHead
