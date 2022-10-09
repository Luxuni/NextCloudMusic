function Post({ post }: { post: { id: number; title: string; content: string } }) {
  return (
    <div>
      <div>{post.id}</div>
      <div>{post.title}</div>
      <div>{post.content}</div>
    </div>
  )
}

const createParams: () => Promise<
  [
    {
      params: { id: number }
    },
  ]
> = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          params: { id: 1 },
        },
      ])
    }, 1000)
  })
}
export async function getStaticPaths() {
  const res = await createParams()
  const posts = res
  const paths = posts.map((post) => ({
    params: { id: post.params.id.toString() },
  }))
  return { paths, fallback: true }
}
const createContent: () => Promise<{ id: number; title: string; content: string }> = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: 'Hello Next.js',
        content: 'This is the blog post content.',
      })
    }, 1000)
  })
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await createContent()
  const post = res
  return { props: { post } }
}

export default Post
