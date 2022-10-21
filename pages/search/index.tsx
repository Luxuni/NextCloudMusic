import NavLayout from '../../src/components/layout/nav-layout'
import HotSearch from '../../src/components/search/HotSearch'
import MySearchHead from '../../src/components/search/MySearchHead'
import SearchNav from '../../src/components/search/Nav'
import SearchList from '../../src/components/search/SearchList'
import { NextPageWithLayout } from '../_app'

const SearchPage: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col">
      <div className="sticky top-0 bg-gray-100 pb-4">
        {/* search box */}
        <div className="h-12">
          <MySearchHead />
        </div>
        {/* nav */}
        <div className="mt-4">
          <SearchNav />
        </div>
      </div>
      {/* hot search */}
      <div>
        <HotSearch />
      </div>
      {/* search list */}
      <div className="mt-4">
        <SearchList />
      </div>
    </div>
  )
}

SearchPage.getLayout = function getLayout(page) {
  return <NavLayout>{page}</NavLayout>
}

export default SearchPage
