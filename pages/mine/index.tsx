import React from 'react'
import NavLayout from '../../src/components/layout/nav-layout'
import { NextPageWithLayout } from '../_app'

const Mine: NextPageWithLayout<{ children: React.ReactNode }> = ({ children }) => {
  return <div>mine</div>
}

Mine.getLayout = function getLayout(page: React.ReactNode) {
  return <NavLayout>{page}</NavLayout>
}

export default Mine
