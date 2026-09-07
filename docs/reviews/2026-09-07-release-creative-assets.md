# リリース判定レポート — SEO記事6本＋クリエイティブ素材の全面適用

- 日付: 2026-09-07
- 対象リポジトリ: `Akarie-mpf-mockup/talentkeeper-site`（React 19 + Vite 8 / GitHub Pages）
- 対象コミット: `7da2b93`（SEO記事＋VOICES）, `8386822`（写真・ロゴ・動画・配色）
- 判定基準: `/root/project/hrm_project/.claude/skills/release.md`
- 成果物種別: 🔨 **実装あり**（`src/`・`index.html`・`scripts/`・`content/`・`public/` を変更）

> **順序に関する明示**: 本判定はユーザーの指示により push・デプロイ**後**に実施した事後検証である。
> release.md の想定順序（判定 → リリース）とは逆であり、GO は「公開済みの状態を維持してよい」の意味。

---

## 影響範囲（Q1・Q2）

| 変更 | 影響先 | 確認方法・結果 |
|---|---|---|
| ブランドカラーの全面変更 | LP 全セクション・記事6本 | `C` オブジェクト／CSS変数の一元管理。PC・モバイルの実画面スクショで全セクション確認 |
| ナビ・フッターのリンク整理 | LP 内アンカー、記事→LP 導線 | `#service`（存在しないID）を `#how` に修正、`VOICES`/`CASES` 追加。全アンカーの実在を確認 |
| 記事6本の新規URL | サイト構造・sitemap | `/voices/` 配下6URL、`sitemap.xml` 7URL |
| 画像・動画の追加 | 転送量・初期表示 | WebP 3サイズ（計1.6MB）＋動画6.1MB。動画は `preload="none"`、画像は `loading="lazy"`（ヒーローのみ eager） |
| favicon の差し替え | ブラウザタブ・ホーム画面 | `/favicon.svg` 参照を廃し PNG 2種へ。旧ファイルは残置（参照なし） |

- 既存の Formspree お問い合わせフォーム（`https://formspree.io/f/xdapojqn`）には**変更なし**。
  送信経路・宛先・項目はいずれも未変更。
- サーバサイド・DB・マイグレーション・外部API連携は**存在しない**（静的サイト）。

## テスト（Q2）

- 本リポジトリに**テストスイートは存在しない**（新規に整備していない）。
- 実施した検証:
  - `npm run build` 成功（vite build → 記事HTML → sitemap 生成）
  - `npx eslint src scripts` → 既存の未使用変数 1 件のみ（`features` / 変更前から存在）
  - 参照アセットの実在検査（12写真×3サイズ・ロゴ・OG・動画・ポスターの全件）
  - 本番実機: 11 URL が HTTP 200（LP・記事6本・OG・動画・sitemap・favicon）
  - 本番実画面のスクリーンショット（PC 1440px / モバイル 414px）
  - 非公開情報（docx の「商談活用メモ」「編集・公開前の確認メモ」等）が
    `dist/` に出力されていないことを grep で確認

## 主要フローへの影響（Q3・Q4）

- コンバージョン導線（`#contact` フォーム送信）: 変更なし・実物のフォームは表示確認済み。
- 外部連携: なし（YouTube 等の外部埋め込みを**意図的に採用していない**＝自己ホスト）。

## 本番で確認すべき項目（Q5）

1. 動画2本の再生（PC/スマホ、モバイル回線での初回再生の待ち時間）
2. Formspree からの受信（1件テスト送信）
3. Search Console: `sitemap.xml` 送信と `/voices/` 6URL のインデックス状況
4. OG画像の反映（X/Facebook のデバッガでキャッシュ更新）

## ロールバック（Q6・Q8〜Q12）

- 手順: `git revert 8386822`（必要なら `7da2b93` も）→ `git push origin main`
  → GitHub Actions が自動で再デプロイ（前回2回の所要は約30〜60秒）。
- DBマイグレーションなし＝**不可逆な変更はゼロ**。データ不整合の余地なし。
- 段階リリース: GitHub Pages のため Blue-Green・カナリアは不可（全量切替のみ）。
- 切り戻し判断基準: ①LP が表示されない ②動画・画像が 404 ③フォーム送信不能
  のいずれかが発生した場合は即 revert。

## 価値完結（GO条件4）

- 記事はユーザー（人事担当者）が単体で読める状態で公開済み。
- LP → ハブ記事 → 個別記事の導線が実在:
  `src/App.jsx:321`（VOICESカード `v.href`）→ `/voices/<slug>/` → 記事内 CTA → `/#contact`。
- 商談利用も完結: 記事ページの `@media print` で1事例=配布資料、
  トークは `docs/sales-talk-track.md`（非公開・デプロイ対象外）。

## CI（GO条件5）

- 照合した head sha: `8386822`（`gh run list` の対象 run `34129920512`）
- 結果: **success**（Deploy to GitHub Pages）。前コミット `7da2b93` の run `34125224168` も success。
- 注意（未対応）: Actions のアノテーションで
  「Node.js 20 is deprecated（actions/checkout@v4 等が Node 24 で強制実行）」の警告あり。
  ビルドは成功しているが、将来的に actions のバージョン更新が必要。

---

## 判定: 🟢 GO（公開状態を維持）

根拠:
1. 影響範囲を特定済み（上表）。不可逆な変更ゼロ。
2. 本番実機で全 URL 200・実画面確認済み。デプロイ2回とも success（head 照合済み）。
3. ロールバックは revert 1コマンドで完結。
4. 価値完結（記事が読める・商談で使える・LPから到達できる）。

## 残課題（NO-GO ではないが未了）

- テスト基盤が無く、回帰は毎回スクリーンショットの目視に依存している。
  記事生成の単体テスト（frontmatter 欠落・CTA 未解決の検出）は費用対効果が高い。
- `src/App.jsx` の未使用 `features` 配列（変更前から存在）。
- `public/favicon.svg`・`src/assets/{hero,react,vite}.*` が未参照のまま残置。
- GitHub Actions の Node 20 非推奨警告。
- 素材のうち `NO_unknown_*` 2点は未使用（ボツカットと判断）。使用可否はユーザー確認待ち。
