const akashimaSupId = 'e2ijnvoy3'
const akashimaSupSlug = 'akashima-sup'

export const postPath = (id: string) =>
  `/${id === akashimaSupId ? akashimaSupSlug : id}`

export const postId = (slug: string) =>
  slug === akashimaSupSlug ? akashimaSupId : slug

export const articleBody = (body: string) =>
  body.replace(
    /(\bhref\s*=\s*["'])(?:https:\/\/gotoretto\.com)?\/e2ijnvoy3(?=\/?(?:[?#]|["']))\/?/gi,
    '$1/akashima-sup',
  )
