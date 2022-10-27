import { NextComponentType } from 'next'
import { useMemo } from 'react'

export function HOC<P = any>(rule: (props: P) => P[keyof P]) {
  return function (Component: NextComponentType<{},{},P>) {
    return function renderWrapComponent(props: P extends JSX.IntrinsicAttributes? P : P & JSX.IntrinsicAttributes) {
      const dep = rule(props)
      const RenderElement = useMemo(() => <Component {...props} />, [dep])
      return RenderElement
    }
  }
}
