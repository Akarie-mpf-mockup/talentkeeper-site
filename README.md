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

---

## 企業導入事例

企業導入事例は `content/case/*.md` で管理します。`npm run build` により、
トップページ用の `src/data/companyCases.js`、詳細記事 `/case/<slug>/`、サイトマップを生成します。
カードデータは自動生成のため直接編集しません。記事は既存のVOICES記事と同じCSSを使用します。
掲載内容と検証範囲は `docs/reviews/company-cases-release.md` を参照してください。

## クリエイティブ素材（写真・ロゴ・動画）

`public/images/` `public/video/` の生成物はすべて `scripts/build-assets.py` の出力で、
リポジトリにコミットしてあります。**CI では実行しません**（素材の原本はローカルにのみあるため）。

```bash
python3 scripts/build-assets.py            # 写真WebP・ロゴ・OG画像を再生成
python3 scripts/build-assets.py --video    # 動画の再エンコードも行う（数分かかる）
TK_ASSETS="/path/to/素材" python3 scripts/build-assets.py   # 素材の場所を変える場合
```

| 生成物 | 内容 |
|---|---|
| `public/images/<名前>-{600,1000,1600}.webp` | 写真12点（`Photo` コンポーネントが srcset で出し分け） |
| `public/images/logo/tk-lockup.png` | ヘッダー用ロゴ（地色は `#fdf5e8` でナビ背景と一致させている） |
| `public/images/logo/tk-symbol.png` / `favicon-32.png` / `apple-touch-icon.png` | シンボル・ファビコン |
| `public/images/og/<slug>.jpg` | OG画像 1200×630（写真＋ネイビーの覆い＋ロゴ＋H1を自動合成） |
| `public/video/tk-{admin-93s,staff-43s}.mp4` + `-poster.jpg` | 動画（H.264 CRF30・720p）とポスター |

写真の割り当ては `scripts/build-assets.py` の `PHOTOS`（出力名 → 素材ファイル名）を参照。
1枚1用途で重複させていません。`NO_` で始まる素材（ボツカット）は使っていません。

### ブランドカラー（ロゴ実測値）

| 用途 | 値 |
|---|---|
| ネイビー | `#0b2351`（ラベル等の少し明るい派生色 `#123566`） |
| オレンジ（CTA） | `#fe7b01`（hover `#ff9633`） |
| クリーム（ナビ・交互セクション背景） | `#fdf5e8` |
| ダーク（動画・お問い合わせ・フッター） | `#081a3c` |

LP側は `src/App.jsx` の `C` オブジェクト、記事側は `scripts/build-articles.mjs` の CSS 変数
（`--navy` `--cta` `--cream` など）で一元管理しています。

### 掲載上の注意

- 人物写真はイメージ写真です。ヒーロー・STORY・VOICES・記事アイキャッチに「※写真はイメージです」を表示しています。
- VOICESは匿名化しているため、特定の事例と特定の人物写真が結びついて見えないよう、
  記事アイキャッチは事例の登場人物ではなく状況を示すカットを割り当てています。

企業事例の確認では、`npx playwright test tests/company-cases.spec.mjs` で
カード→記事→一覧の操作、PC・スマートフォン表示、既存記事のサイトマップ維持を検証します。
ロゴは提供原本の色・縦横比を保ち、ブランドごとのアクセントをカードと記事冒頭で揃えます。
見出しの改行は句読点を変えずに行い、PCと狭い画面の両方で確認してください。
