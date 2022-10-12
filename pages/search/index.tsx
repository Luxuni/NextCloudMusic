import HotSearch from '../../src/components/search/HotSearch'
import MySearchHead from '../../src/components/search/MySearchHead'
import SearchNav from '../../src/components/search/Nav'
import { NextPageWithLayout } from '../_app'

const SearchPage: NextPageWithLayout = () => {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* search box */}
      <div className="h-12 flex">
        <MySearchHead />
      </div>
      {/* nav */}
      <div className="mt-4">
        <SearchNav />
      </div>
      {/* hot search */}
      <div className="mt-4">
        <HotSearch />
      </div>
    </div>
  )
}

export default SearchPage
