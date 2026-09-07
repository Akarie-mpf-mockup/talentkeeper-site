# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## 従業員の声・対応事例（SEO記事）

`content/voices/*.md` を単一の情報源として、LPのカードと記事ページの両方を生成します。

| 出力 | 生成物 |
|---|---|
| LPのVOICESセクション用データ | `src/data/voices.js`（自動生成・編集不可） |
| ハブ記事 | `dist/voices/index.html` → `/voices/` |
| 個別記事（5本） | `dist/voices/<slug>/index.html` → `/voices/<slug>/` |
| サイトマップ | `dist/sitemap.xml` |
| 商談トークスクリプト（非公開） | `docs/sales-talk-track.md` |

```bash
npm run voices   # LPカードデータ + 商談トークスクリプトのみ再生成
npm run build    # 上記 + vite build + 記事HTML + sitemap.xml
npm run preview  # 生成後のサイト全体（記事ページ含む）をローカル確認
```

### 記事を追加・修正するとき

1. `content/voices/` に `NN-<slug>.md` を追加（既存ファイルのフロントマターをコピーして書き換える）
2. `npm run build`

フロントマターの主なキー: `slug` `type`（`hub` / `case`）`caseNo` `category` `seoTitle` `h1`
`description` `keywords` `cardQuote`（LPカードの引用文）`cardSummary`（LPカードの要約）
`salesTalk`（商談トーク。記事HTMLには出力されません）

本文中の `:::cta ... :::` ブロックはCTAカードとして描画されます。

```
:::cta
title: 見出し
body: 補足文
primary: ボタン文言|/#contact
secondary: テキストリンク文言|/#how
:::
```

記事ページは `@media print` を持っているため、ブラウザの「PDFで保存」でそのまま商談資料として使えます
（ナビ・CTAボタン・関連記事は印刷時に非表示）。

### 注意

- 記事は開発サーバー（`npm run dev`）では配信されません（`dist` に生成するため）。
  表示確認は `npm run build` のあとにプレビューコマンドを実行してください。
- 記事docxにあった「公開設定・SEO実装メモ」「商談活用メモ」「編集・公開前の確認メモ」などの非公開情報は
  HTMLに出力していません。`docs/` 配下も含め、`dist` に入らないファイルはデプロイされません。
