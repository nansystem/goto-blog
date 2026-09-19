# 五島しまあそび

五島列島・福江島の日常ブログ。Astro + microCMS + Vercel で動作します。

## 開発

Node.js 24 LTS と npm を使用します。

```sh
npm ci
cp .env.example .env.local
# .env.local に microCMS の接続情報を設定
npm run dev
```

`http://localhost:4321` を開きます。`BASE_API_URL` は既存の microCMS API のベースURL（`https://サービス名.microcms.io/api/v1`）、`API_KEY` は `blogs` と `categories` の読み取り権限があるキーです。認証情報はサーバー側のみで使用し、Gitや公開JavaScriptには含めません。

## ブログを更新する

microCMS の `blogs` で記事を編集し、「公開」または「更新」します。ページを開くたびにサーバーが公開済みの記事を取得するため、記事・カテゴリーの追加や更新にGitのpush、ビルド、Deploy Hookは不要です。下書きは公開されません。

既存のフィールド（`title`、`description`、`body`、`thumbnail`、`categories`、`author`）と記事IDを引き続き使用します。本文は信頼されたCMS編集者が作成するリッチテキストHTMLとして表示します。

記事のURL `/{記事ID}`、カテゴリー `/category/{カテゴリーID}`、ページ送り `/page/2`・`/category/{カテゴリーID}/page/2` を維持しています。`/feed.xml` は最新10件、`/sitemap.xml` は全公開記事・カテゴリー・一覧ページを返します。

CMSの設定漏れや認証・通信障害はサーバーエラーとして扱います。記事が存在しない場合だけ404を返し、障害時に空のブログを正常なページとして配信しません。

## 検証

```sh
npm run lint
npm run check
npm test
npm run build
npm audit
```

テストはローカルの模擬CMSとAstroを起動し、記事一覧、カテゴリー、ページ送り、記事本文・メタデータ、再ビルドなしの更新反映、404、上流障害、RSS、100件を超えるサイトマップ取得をHTTPで確認します。実際のCMSの認証情報は不要です。ポート4329を使用します。

CIでは同じ検証とVercel向けのビルドを行います。ビルド自体はCMSへのアクセスを必要としません。

## Vercel

既存プロジェクトに `BASE_API_URL` と `API_KEY` を設定します。Previewでも確認する場合はPreview環境にも設定します。`vercel.json` が旧Nuxt設定に優先し、Astro・`npm ci`・`npm run build`・`dist` を指定します。Node.jsは24.xを使用します。

Git連携によるデプロイ後は `/`、既存の記事URL、`/category/sup`、`/feed.xml`、`/sitemap.xml` を確認してください。サーバー描画はVercel Functionsで実行するため、`dist`だけを静的ホスティングへアップロードする構成ではありません。

## 依存関係

Astroと各ツールは移行時点の最新安定版を使用しています。TypeScriptのみ、`@astrojs/check` の対応範囲に合わせて6系の最新版を使用します（7系はpeer dependency未対応）。

Vercelの間接依存 `path-to-regexp` は、ReDoS修正済みの互換バージョン6.3.0へoverrideしています。上流で修正されたらoverrideを削除できます。
