import { NextPageWithLayout } from '../_app'
import { useRouter } from 'next/router'
import { getPlaylistDetail } from '../../src/services/playlist'

const ShowPlaylistPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data, isLoading, isError } = getPlaylistDetail({ id })
  if (isLoading) return <div>loading...</div>
  console.log(data)

  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}

export default ShowPlaylistPage
