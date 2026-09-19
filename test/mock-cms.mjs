import { createServer } from 'node:http'
export function createMockCms() {
  let revision = '初版'
  const categories = [
    { id: 'island', name: '島暮らし' },
    { id: 'food', name: 'おいしいもの' },
    { id: 'empty', name: '空のカテゴリー' },
  ]
  const posts = Array.from({ length: 115 }, (_, i) => ({
    id: `post-${i + 1}`,
    title: `${i === 0 ? revision + '：' : ''}福江島で見つけた、海のある日々 ${i + 1}`,
    description:
      '海辺を歩いて、おいしいものを見つけて。五島で暮らす日々の小さな記録です。',
    body: '<h2>島の朝を歩く</h2><p>透きとおる海と、ゆっくり流れる島の時間。今日は海辺を歩いてきました。</p><h3>寄り道も楽しみのひとつ</h3><p>旅の途中にひと息。<a href="https://prigela.com">ジェラートのお店</a>もおすすめです。</p><ul><li>海辺を散歩する</li><li>島のおいしいものを探す</li></ul>',
    createdAt: '2021-06-01T00:00:00Z',
    publishedAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z',
    categories: i < 112 ? [categories[0]] : [categories[1]],
    author: i % 2 ? ['madoka'] : ['nancy'],
  }))
  const server = createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost')
    res.setHeader('Content-Type', 'application/json')
    if (url.pathname === '/update') {
      revision = '更新済み'
      res.end('{}')
      return
    }
    if (req.headers['x-microcms-api-key'] !== 'test-secret-key') {
      res.writeHead(403)
      res.end('{}')
      return
    }
    posts[0].title = `${revision}：福江島で見つけた、海のある日々 1`
    if (url.pathname === '/blogs/upstream-error') {
      res.writeHead(503)
      res.end('{}')
      return
    }
    if (url.pathname.startsWith('/blogs/')) {
      const post = posts.find((p) => p.id === url.pathname.split('/').pop())
      res.writeHead(post ? 200 : 404)
      res.end(JSON.stringify(post || {}))
      return
    }
    let items = url.pathname === '/categories' ? categories : posts
    const category = url.searchParams.get('filters')?.split('[contains]')[1]
    if (category)
      items = items.filter((p) => p.categories?.some((c) => c.id === category))
    const offset = Number(url.searchParams.get('offset') || 0),
      limit = Number(url.searchParams.get('limit') || 10)
    res.end(
      JSON.stringify({
        contents: items.slice(offset, offset + limit),
        totalCount: items.length,
        offset,
        limit,
      }),
    )
  })
  return server
}
if (process.argv[1] === new URL(import.meta.url).pathname)
  createMockCms().listen(4322, '127.0.0.1', () =>
    console.log('Mock CMS on 4322'),
  )
