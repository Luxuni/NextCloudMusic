import { NextComponentType } from 'next'

const Menu: NextComponentType<
  {},
  {},
  { contentMap: Map<string, (children?: JSX.Element, message?: JSX.Element) => JSX.Element>; title?: string }
> = (props) => {
  return (
    <ul className="menu  bg-gray-300 w-full rounded-box shadow-xl">
      {props.title && (
        <div className="h-9 ml-4 mr-4 mt-2 text-gray-500 border-b-[1px] border-gray-400 flex items-center">
          {props.title}
        </div>
      )}
      {Array.from(props.contentMap).map(([key, value]) => (
        <li key={key}>
          {value(
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>,
          )}
        </li>
      ))}
    </ul>
  )
}

export default Menu
