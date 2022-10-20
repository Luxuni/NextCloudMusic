import { Popup, SearchBar, Skeleton } from 'antd-mobile'
import { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { getSearchDefault } from '../../services/search'
import UserMessages from '../UserMessages'

const MyHomeHead: NextComponentType = () => {
  const router = useRouter()

  const [isHomePopupShow, setIsHomePopupShow] = React.useState(false)

  const { data, isLoading, isError } = getSearchDefault()
  if (isLoading) return <Skeleton animated style={{ height: '3rem', borderRadius: '1rem' }} />

  //when searchbarfocus focused ,go to search page
  const handleSearchBarFocus = () => {
    router.push('/search')
  }
  return (
    <>
      <Popup
        visible={isHomePopupShow}
        onMaskClick={() => {
          // close popup
          setIsHomePopupShow(false)
        }}
        position="left"
        bodyStyle={{ width: '80vw' }}>
        {/* userMessages */}
        <div className="p-4 h-full overflow-y-scroll">
          <UserMessages />
        </div>
      </Popup>
      <div
        className="w-1/6 flex items-center justify-center"
        onClick={() => {
          // show popup
          setIsHomePopupShow(true)
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
      </div>
      <div className="w-4/6 flex flex-col justify-center">
        <SearchBar
          placeholder={data.data.showKeyword}
          style={{ '--border-radius': '100px', '--background': '#ffffff' }}
          onFocus={handleSearchBarFocus}
        />
      </div>
      <div className="w-1/6 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
          <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
        </svg>
      </div>
    </>
  )
}

export default MyHomeHead
