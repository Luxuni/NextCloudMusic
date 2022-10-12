import { SearchBar, Skeleton } from 'antd-mobile'
import { AudioOutline, UnorderedListOutline } from 'antd-mobile-icons'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '../../../pages/_app'
import { getSearchDefault } from '../../services/search'

const MyHomeHead: NextPageWithLayout = () => {
  const router = useRouter()

  const { data, isLoading, isError } = getSearchDefault()
  if (isLoading) return <Skeleton animated style={{ height: '3rem', borderRadius: '1rem' }} />

  //when searchbarfocus focused ,go to search page
  const handleSearchBarFocus = () => {
    router.push('/search')
  }

  return (
    <>
      <div className="w-1/6 flex items-center justify-center">
        <UnorderedListOutline fontSize={28} />
      </div>
      <div className="w-4/6 flex flex-col justify-center">
        <SearchBar
          placeholder={data.data.showKeyword}
          style={{ '--border-radius': '100px', '--background': '#ffffff' }}
          onFocus={handleSearchBarFocus}
        />
      </div>
      <div className="w-1/6 flex items-center justify-center">
        <AudioOutline fontSize={28} />
      </div>
    </>
  )
}

export default MyHomeHead
