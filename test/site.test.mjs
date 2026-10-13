import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createMockCms } from './mock-cms.mjs'
let cms, astro
const base = 'http://127.0.0.1:4329'
before(async () => {
  cms = createMockCms().listen(0, '127.0.0.1')
  await once(cms, 'listening')
  astro = spawn(
    process.execPath,
    [
      'node_modules/astro/bin/astro.mjs',
      'dev',
      '--ignore-lock',
      '--host',
      '127.0.0.1',
      '--port',
      '4329',
    ],
    {
      env: {
        ...process.env,
        BASE_API_URL: `http://127.0.0.1:${cms.address().port}`,
        API_KEY: 'test-secret-key',
      },
      stdio: 'ignore',
      detached: true,
    },
  )
  for (let i = 0; i < 100; i++) {
    try {
      await fetch(base)
      return
    } catch {}
    await new Promise((r) => setTimeout(r, 200))
  }
  throw new Error('Astro failed to start')
})
after(async () => {
  if (astro) {
    process.kill(-astro.pid, 'SIGTERM')
    await once(astro, 'exit')
  }
  if (cms) await new Promise((r) => cms.close(r))
})
test('home, pagination and categories preserve existing URLs', async () => {
  for (const path of [
    '/',
    '/page/2',
    '/category/island',
    '/category/island/page/2',
  ]) {
    const r = await fetch(base + path)
    assert.equal(r.status, 200, path)
    const html = await r.text()
    assert.match(html, /島暮らし/)
    assert.doesNotMatch(html, /test-secret-key/)
  }
  const html = await (await fetch(base + '/category/island/page/2')).text()
  assert.match(html, /href="\/category\/island\/page\/3"/)
  assert.match(
    await (await fetch(base + '/category/empty')).text(),
    /記事はまだありません/,
  )
})
test('article renders CMS HTML, metadata and authors', async () => {
  const html = await (await fetch(base + '/post-1')).text()
  assert.match(html, /<h2>島の朝を歩く<\/h2>/)
  assert.match(html, /https:\/\/gotoretto.com\/post-1/)
  assert.match(html, /なんしー/)
  assert.match(await (await fetch(base + '/post-2')).text(), /madoka♡/)
})
test('publishing updates appears without a rebuild', async () => {
  await fetch(`http://127.0.0.1:${cms.address().port}/update`)
  for (const path of ['/', '/post-1', '/feed.xml'])
    assert.match(await (await fetch(base + path)).text(), /更新済み/)
})
test('invalid routes return 404 and upstream failure stays a server error', async () => {
  for (const path of [
    '/missing',
    '/page/0',
    '/page/2x',
    '/page/999',
    '/category/missing',
    '/category/island/page/999',
  ])
    assert.equal((await fetch(base + path)).status, 404, path)
  assert.equal((await fetch(base + '/upstream-error')).status, 500)
  assert.equal(
    (await fetch(base + '/page/1', { redirect: 'manual' })).status,
    301,
  )
})
test('RSS and sitemap include all pages beyond the CMS 100 item limit', async () => {
  const rss = await fetch(base + '/feed.xml')
  assert.equal(rss.status, 200)
  assert.match(await rss.text(), /<rss/)
  const sitemap = await (await fetch(base + '/sitemap.xml')).text()
  for (const path of ['/post-115', '/page/12', '/category/island/page/12'])
    assert.ok(sitemap.includes(`https://gotoretto.com${path}</loc>`), path)
})

test('Akashima SUP uses its new URL while preserving the CMS article', async () => {
  for (const suffix of ['', '?from=old']) {
    const redirect = await fetch(base + '/e2ijnvoy3' + suffix, {
      redirect: 'manual',
    })
    assert.equal(redirect.status, 301)
    assert.equal(redirect.headers.get('location'), '/akashima-sup' + suffix)
  }
  const response = await fetch(base + '/akashima-sup?from=test')
  assert.equal(response.status, 200)
  const html = await response.text()
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/gotoretto.com\/akashima-sup"/,
  )
  assert.match(
    html,
    /property="og:url" content="https:\/\/gotoretto.com\/akashima-sup"/,
  )
  assert.match(html, /<h1[^>]*>.*?赤島 SUP.*?<\/h1>/s)
  assert.match(html, /<h2>赤島の海<\/h2><p>SUPで島へ。<\/p>/)
  assert.match(
    html,
    /src="https:\/\/images.microcms-assets.io\/test\/body.jpg" alt="赤島"/,
  )
  assert.match(html, /test\/sup.jpg/)
  assert.match(html, /href="\/akashima-sup"/)
  assert.match(html, /href="\/akashima-sup\?from=body#sea"/)
  assert.match(html, /href="\/e2ijnvoy3-other"/)
  for (const path of ['/', '/category/island', '/feed.xml', '/sitemap.xml']) {
    const content = await (await fetch(base + path)).text()
    assert.match(content, /\/akashima-sup/)
    assert.doesNotMatch(content, /\/e2ijnvoy3(?:["<])/)
  }
  const other = await fetch(base + '/post-4', { redirect: 'manual' })
  assert.equal(other.status, 200)
  assert.match(await other.text(), /https:\/\/gotoretto.com\/post-4/)
})
