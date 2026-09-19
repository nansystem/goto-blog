import { getAllPosts, getCategories, PAGE_SIZE } from '../lib/cms'
const escapeXml = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (c) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;',
      })[c]!,
  )
export async function GET() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getCategories(),
  ])
  const paths = ['/', ...posts.map((p) => `/${p.id}`)]
  for (let page = 2; page <= Math.ceil(posts.length / PAGE_SIZE); page++)
    paths.push(`/page/${page}`)
  for (const category of categories) {
    paths.push(`/category/${category.id}`)
    const count = posts.filter((p) =>
      p.categories?.some((c) => c.id === category.id),
    ).length
    for (let page = 2; page <= Math.ceil(count / PAGE_SIZE); page++)
      paths.push(`/category/${category.id}/page/${page}`)
  }
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${escapeXml(new URL(path, 'https://gotoretto.com').href)}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  )
}
