import { Ellipsis } from 'antd-mobile'
import { NextComponentType } from 'next'

type SearchSuggestProps = {
  data: { keyword: string }
  onClick: (keyword: string) => void
  className?: string
}

const SearchSuggestItem: NextComponentType<{}, {}, SearchSuggestProps> = (props) => {
  return (
    <div
      className={'h-12 w-full flex ' + props.className}
      onClick={(e) => {
        e.stopPropagation()
        props.onClick(props.data.keyword)
      }}>
      {/* search icon */}
      <div className="w-1/6 h-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      {/* suggest item */}
      <div className="w-5/6 h-full flex items-center text-lg">
        <Ellipsis content={props.data.keyword} />
      </div>
    </div>
  )
}

export default SearchSuggestItem
