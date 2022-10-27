import { NextComponentType } from 'next'
import { useMemo } from 'react'

export function HOC(rule: (props: any) => any) {
  return function (Component: NextComponentType) {
    return function renderWrapComponent(props: any) {
      const dep = rule(props)
      const RenderElement = useMemo(() => <Component {...props} />, [dep])
      return RenderElement
    }
  }
}
