import type { NextPage } from 'next'
import Counter from '../src/features/counter/Counter'
import { getBanner } from '../src/services/banner'
import styles from '../src/styles/Home.module.css'

const IndexPage: NextPage = () => {
  const { data, isLoading, isError } = getBanner({ type: 2 })
  console.log('🚀 ~ file: index.tsx ~ line 9 ~ data', data)
  if (isError) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Counter />
      </header>
    </div>
  )
}

export default IndexPage
