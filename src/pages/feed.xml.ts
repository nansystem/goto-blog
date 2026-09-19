import rss from '@astrojs/rss'
import { getPosts, publishedDate } from '../lib/cms'
export async function GET() {
  const posts = await getPosts()
  return rss({
    title: '五島しまあそび',
    description: '五島列島福江島の日常ブログです。',
    site: 'https://gotoretto.com',
    items: posts.contents.map((post) => ({
      title: post.title,
      description: post.description || '',
      link: `/${post.id}`,
      pubDate: new Date(publishedDate(post)),
    })),
    customData: '<language>ja</language>',
  })
}
