import { useMemoizedFn } from 'ahooks'
import { useState } from 'react'
import NavLayout from '../../src/components/layout/nav-layout'
import HotSearch from '../../src/components/search/HotSearch'
import MySearchHead from '../../src/components/search/MySearchHead'
import SearchNav from '../../src/components/search/Nav'
import SearchList from '../../src/components/search/SearchList'
import SearchResult from '../../src/components/search/SearchResult'
import SearchSuggest from '../../src/components/search/SearchSuggest'
import { NextPageWithLayout } from '../_app'

const SearchPage: NextPageWithLayout = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isFocus, setIsFocus] = useState(false)

  const decideShowPage = () => {
    if (searchValue === '') {
      return 1
    } else if (searchValue !== '' && isFocus) {
      return 2
    } else if (searchValue !== '' && !isFocus) {
      return 3
    }
  }
  const CallBackDecideShowPage = useMemoizedFn(decideShowPage)

  const handleClickSearchSuggest = (keyword: string) => {
    console.log(keyword)
    setSearchValue(keyword)
  }
  return (
    <div className="flex flex-col">
      <div className="sticky top-0 bg-gray-100 pb-4">
        {/* search box */}
        <div className="h-12 shadow-xl">
          <MySearchHead searchValue={searchValue} setSearchValue={setSearchValue} setIsFocus={setIsFocus} />
        </div>
        {CallBackDecideShowPage() === 1 && (
          <div className="mt-4">
            <SearchNav />
          </div>
        )}
        {/* nav */}
      </div>
      {/* hot search */}
      {CallBackDecideShowPage() === 1 && (
        <>
          <div>
            <HotSearch />
          </div>
          {/* search list */}
          <div className="mt-4">
            <SearchList />
          </div>
        </>
      )}
      {/* search message */}
      {CallBackDecideShowPage() === 2 && <SearchSuggest searchValue={searchValue} onClick={handleClickSearchSuggest} />}
      {/* search result */}
      {CallBackDecideShowPage() === 3 && <SearchResult searchValue={searchValue} />}
    </div>
  )
}

SearchPage.getLayout = function getLayout(page) {
  return <NavLayout>{page}</NavLayout>
}

export default SearchPage
