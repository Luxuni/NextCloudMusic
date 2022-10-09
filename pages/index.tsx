import type { NextPage } from 'next'
import Counter from '../src/features/counter/Counter'
import styles from '../src/styles/Home.module.css'

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Counter />
      </header>
    </div>
  )
}

export default IndexPage
