/**
 * content/voices/*.md → 静的HTML（dist/voices/）を生成する。
 *
 *   node scripts/build-articles.mjs --data-only   LP用のカードデータ（src/data/voices.js）のみ生成
 *   node scripts/build-articles.mjs               記事HTML + sitemap.xml を dist へ出力
 *
 * npm run build から呼ばれる（prebuild でデータ生成 → vite build → 記事生成）。
 */
import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content/voices');
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://www.talentkeeper.jp';
const SECTION_PATH = '/voices/';
const SECTION_TITLE = '従業員の声・対応事例';
const dataOnly = process.argv.includes('--data-only');

const md = new MarkdownIt({ html: true, linkify: false, typographer: false });

/* ── フロントマター（スカラー + 箇条書きリストのみ対応） ── */
function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) throw new Error('フロントマターがありません');
  const data = {};
  let listKey = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && listKey) {
      data[listKey].push(unquote(item[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    if (value === '') {
      listKey = key;
      data[key] = [];
    } else {
      listKey = null;
      data[key] = unquote(value);
    }
  }
  return { data, body: raw.slice(m[0].length) };
}
const unquote = s => s.trim().replace(/^["'](.*)["']$/, '$1');

/* ── :::cta ブロック ── */
function extractCtas(body) {
  const ctas = [];
  const replaced = body.replace(/^:::cta\r?\n([\s\S]*?)^:::\s*$/gm, (_, inner) => {
    const cta = {};
    for (const line of inner.split(/\r?\n/)) {
      const kv = line.match(/^([a-z]+):\s*(.*)$/);
      if (kv) cta[kv[1]] = kv[2].trim();
    }
    ctas.push(cta);
    return `\n@@CTA${ctas.length - 1}@@\n`;
  });
  return { body: replaced, ctas };
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function ctaHtml(cta) {
  const [pLabel, pHref] = (cta.primary || '').split('|');
  const [sLabel, sHref] = (cta.secondary || '').split('|');
  return `<aside class="cta">
      <p class="cta-title">${esc(cta.title || '')}</p>
      ${cta.body ? `<p class="cta-body">${esc(cta.body)}</p>` : ''}
      <div class="cta-actions">
        ${pLabel ? `<a class="btn-primary" href="${esc(pHref || '/#contact')}">${esc(pLabel)}</a>` : ''}
        ${sLabel ? `<a class="btn-secondary" href="${esc(sHref || '/#contact')}">${esc(sLabel)}</a>` : ''}
      </div>
    </aside>`;
}

/* ── ページテンプレート ── */
function template({ article, related, isHub, companyCase = false }) {
  const sectionPath = companyCase ? '/case/' : SECTION_PATH;
  const sectionTitle = companyCase ? '企業導入事例' : SECTION_TITLE;
  const sectionHome = companyCase ? '/#cases' : SECTION_PATH;
  const ogImage = companyCase ? 'home' : (article.slug || 'hub');
  const url = ORIGIN + (article.slug ? `${sectionPath}${article.slug}/` : sectionPath);
  const crumbs = [
    { name: 'HOME', url: `${ORIGIN}/` },
    { name: sectionTitle, url: ORIGIN + sectionHome },
    ...(isHub ? [] : [{ name: article.category || article.h1, url }]),
  ];
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.h1,
      description: article.description,
      image: `${ORIGIN}/images/og/${ogImage}.jpg`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      inLanguage: 'ja',
      isPartOf: { '@type': 'WebSite', name: 'TalentKeeper', url: `${ORIGIN}/` },
      publisher: { '@type': 'Organization', name: 'TalentKeeper' },
      ...(isHub ? {} : { about: article.category }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem', position: i + 1, name: c.name, item: c.url,
      })),
    },
  ];

  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(article.seoTitle)}</title>
<meta name="description" content="${esc(article.description)}" />
<meta name="keywords" content="${esc(article.keywords || '')}" />
<link rel="canonical" href="${url}" />
<link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon-32.png" />
<link rel="apple-touch-icon" href="/images/logo/apple-touch-icon.png" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="TalentKeeper" />
<meta property="og:title" content="${esc(article.seoTitle)}" />
<meta property="og:description" content="${esc(article.description)}" />
<meta property="og:url" content="${url}" />
<meta property="og:locale" content="ja_JP" />
<meta property="og:image" content="${ORIGIN}/images/og/${ogImage}.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="${ORIGIN}/images/og/${ogImage}.jpg" />
<meta name="theme-color" content="#0b2351" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Noto+Serif+JP:wght@500;700;900&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/voices/article.css" />
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
<header class="site-nav">
  <div class="nav-inner">
    <a class="logo" href="/" aria-label="TalentKeeper ホーム">
      <img src="/images/logo/tk-lockup.png" alt="TalentKeeper" width="900" height="269" />
    </a>
    <nav class="nav-links">
      <a href="/#how">SERVICE</a>
      <a href="${SECTION_PATH}">VOICES</a>
      <a href="/#cases">CASES</a>
      <a href="/#pricing">PRICING</a>
      <a class="nav-cta" href="/#contact">無料で相談する</a>
    </nav>
  </div>
</header>

<nav class="breadcrumb" aria-label="パンくずリスト">
  <div class="wrap">
    ${crumbs.map((c, i) => (i === crumbs.length - 1
      ? `<span aria-current="page">${esc(c.name)}</span>`
      : `<a href="${c.url.replace(ORIGIN, '') || '/'}">${esc(c.name)}</a><span class="sep">/</span>`)).join('\n    ')}
  </div>
</nav>

<main>
  <article>
    <header class="article-head wrap${companyCase ? ` company-article company-article--${esc(article.brand)}` : ''}">
      <p class="kicker">${esc(article.kicker || SECTION_TITLE)}</p>
      ${companyCase && article.logo ? `<div class="company-identity"><div class="company-logo"><img src="${esc(article.logo)}" alt="${esc(article.company)}のロゴ" width="${esc(article.logoWidth)}" height="${esc(article.logoHeight)}" decoding="async" /></div><div class="company-identity-text"><p>${esc(article.category)}</p><p>${esc(article.company)}</p></div></div>` : ''}
      ${article.caseNo ? `<p class="case-no">${esc(article.caseNo)}<span class="tag">${esc(article.category)}</span></p>` : ''}
      <h1>${esc(article.h1)}</h1>
    </header>
    ${article.photo ? `<figure class="eyecatch">
      <img src="/images/${article.photo}-1600.webp"
        srcset="/images/${article.photo}-600.webp 600w, /images/${article.photo}-1000.webp 1000w, /images/${article.photo}-1600.webp 1600w"
        sizes="(min-width: 860px) 800px, 100vw"
        alt="${esc(article.photoAlt || '')}" width="1600" height="893" decoding="async" />
      <figcaption>※写真はイメージです</figcaption>
    </figure>` : ''}
    <div class="article-body wrap">
${article.html}
    </div>
  </article>

  <section class="related wrap">
    <h2>${isHub ? '5つの事例を個別に読む' : '関連する事例'}</h2>
    <ul class="related-list">
      ${related.map(r => `<li>
        <a href="${sectionPath}${r.slug}/">
          <span class="related-tag">${esc(r.category)}</span>
          <span class="related-quote">${companyCase ? esc(r.cardQuote) : `「${esc(r.cardQuote)}」`}</span>
          <span class="related-summary">${esc(r.cardSummary)}</span>
        </a>
      </li>`).join('\n      ')}
      ${isHub ? '' : `<li class="related-hub"><a href="${sectionHome}">${companyCase ? '企業導入事例に戻る' : '5つの声をまとめて読む'}</a></li>`}
    </ul>
  </section>
</main>

<footer class="site-footer">
  <div class="wrap">
    <div class="footer-brand">
      <img src="/images/logo/tk-symbol.png" alt="" width="512" height="512" aria-hidden="true" />
      <div>
        <p class="footer-logo">TalentKeeper<sup>&reg;</sup></p>
        <p class="footer-text">採用の、その先へ。</p>
      </div>
    </div>
    <p class="footer-links"><a href="/">サービストップ</a><a href="/#pricing">料金</a><a href="/#contact">お問い合わせ</a></p>
    <p class="footer-copy">&copy; ${new Date().getFullYear()} TalentKeeper</p>
  </div>
</footer>
<p class="print-url">${url}</p>
</body>
</html>
`;
}

/* ── 共通CSS（LPのトーン: ネイビー + 橙CTA / Noto Sans JP・Noto Serif JP） ── */
const CSS = `:root{
  /* ロゴ実測値: ネイビー #0b2351 / オレンジ #fe7b01 / クリーム #fdf5e8 */
  --navy:#123566; --navy-deep:#0b2351; --cta:#fe7b01; --cta-light:#ff9633;
  --text:#101c33; --muted:#475569; --dim:#8a93a5;
  --bg:#ffffff; --bg-alt:#fdf5e8; --cream:#fdf5e8; --border:rgba(11,35,81,0.12); --dark:#081a3c;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--text);font-family:"Noto Sans JP",system-ui,sans-serif;font-size:16px;line-height:1.9;-webkit-font-smoothing:antialiased}
.wrap{width:100%;max-width:760px;margin:0 auto;padding:0 24px}
a{color:var(--navy)}
sup{font-size:.6em;letter-spacing:0}

.site-nav{position:sticky;top:0;z-index:50;background:var(--cream);border-bottom:1px solid var(--border)}
.nav-inner{max-width:1200px;margin:0 auto;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.logo{display:flex;align-items:center;text-decoration:none}
.logo img{display:block;height:40px;width:auto}
.logo-mark{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:9999px;background:var(--cta)}
.logo-text{font-family:"Noto Serif JP",serif;font-size:20px;font-weight:600;letter-spacing:.08em;color:var(--text)}
.nav-links{display:flex;align-items:center;gap:24px}
.nav-links a{font-size:12px;font-weight:500;letter-spacing:.12em;color:var(--muted);text-decoration:none}
.nav-links a:hover{color:var(--navy)}
.nav-cta{background:var(--cta);color:#fff!important;padding:10px 20px;border-radius:9999px;letter-spacing:.04em!important}
.nav-cta:hover{background:var(--cta-light)}
@media(max-width:767px){.nav-links a:not(.nav-cta){display:none}}

.breadcrumb{background:#fff;border-bottom:1px solid var(--border);font-size:12px;color:var(--dim)}
.breadcrumb .wrap{padding-top:12px;padding-bottom:12px}
.breadcrumb a{color:var(--muted);text-decoration:none}
.breadcrumb a:hover{color:var(--navy)}
.breadcrumb .sep{margin:0 8px;color:var(--dim)}

.article-head{padding:64px 24px 8px}
.company-article{--company-accent:#086a38;--company-tint:#f0f6f1}
.company-article--wellcare{--company-accent:#b41e30;--company-tint:#fbf2f2}
.company-identity{display:flex;align-items:center;gap:32px;margin:28px 0 32px;padding:28px 0;border-top:3px solid var(--company-accent);border-bottom:1px solid var(--border)}
.company-logo{display:flex;align-items:center;justify-content:center;flex:0 0 220px;height:140px;background:#fff}
.company-logo img{display:block;width:100%;height:100%;object-fit:contain}
.company-identity-text p{margin:8px 0;font-size:15px;font-weight:600;line-height:1.8}
.company-identity-text p:first-child{font-size:11px;letter-spacing:.08em;color:var(--company-accent)}
.company-article h1{padding:28px;background:var(--company-tint);border-radius:4px}
@media(max-width:600px){.company-identity{gap:20px;flex-direction:column;align-items:flex-start}.company-logo{flex-basis:auto;width:240px;max-width:100%;height:140px}.company-identity-text p{margin:4px 0}.company-article h1{padding:22px 18px}}
.kicker{margin:0;font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--navy)}
.case-no{margin:16px 0 0;font-size:12px;font-weight:700;letter-spacing:.18em;color:var(--navy-deep)}
.case-no .tag{display:inline-block;margin-left:12px;padding:4px 12px;border-radius:9999px;background:rgba(11,35,81,.08);font-size:11px;font-weight:600;letter-spacing:.06em}
.article-head h1{margin:20px 0 0;font-family:"Noto Serif JP",serif;font-size:clamp(26px,4vw,38px);font-weight:700;line-height:1.55;letter-spacing:.01em}

.eyecatch{margin:32px auto 0;max-width:1000px;padding:0 24px}
.eyecatch img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;box-shadow:0 18px 44px rgba(11,35,81,.14)}
.eyecatch figcaption{margin-top:8px;text-align:right;font-size:11px;color:var(--dim)}

.article-body{padding:32px 24px 24px}
.article-body>p:first-child{color:var(--muted)}
.article-body h2{margin:64px 0 20px;padding-left:16px;border-left:4px solid var(--navy);font-family:"Noto Serif JP",serif;font-size:clamp(21px,3vw,27px);font-weight:700;line-height:1.6}
.article-body h3{margin:48px 0 16px;font-family:"Noto Serif JP",serif;font-size:19px;font-weight:700;color:var(--navy-deep)}
.article-body p{margin:0 0 24px}
.article-body ul{margin:0 0 28px;padding:24px 28px;list-style:none;background:var(--cream);border:1px solid var(--border);border-radius:12px}
.article-body li{position:relative;padding-left:22px;margin:10px 0;color:var(--muted)}
.article-body li::before{content:"";position:absolute;left:0;top:.75em;width:8px;height:8px;border-radius:2px;background:var(--cta)}
.article-body a{font-weight:600;text-decoration:underline;text-underline-offset:3px;text-decoration-color:rgba(11,35,81,.35)}
.article-body a:hover{color:var(--cta)}
.article-body strong{font-weight:700;color:var(--text)}

.cta{margin:56px 0;padding:32px;border-radius:16px;background:linear-gradient(180deg,#fefaf3,var(--cream));border:1px solid rgba(11,35,81,.14)}
.cta-title{margin:0;font-family:"Noto Serif JP",serif;font-size:20px;font-weight:700;line-height:1.6;color:var(--navy-deep)}
.cta-body{margin:12px 0 0;font-size:14px;color:var(--muted)}
.cta-actions{display:flex;flex-wrap:wrap;align-items:center;gap:16px;margin-top:24px}
.btn-primary{display:inline-block;padding:14px 28px;border-radius:9999px;background:var(--cta);color:#fff;font-size:14px;font-weight:700;text-decoration:none}
.btn-primary:hover{background:var(--cta-light)}
.btn-secondary{font-size:13px;font-weight:600;color:var(--navy);text-decoration:underline;text-underline-offset:3px}

.related{padding:24px 24px 88px}
.related h2{margin:0 0 24px;font-family:"Noto Serif JP",serif;font-size:22px;font-weight:700}
.related-list{margin:0;padding:0;list-style:none;display:grid;gap:12px}
.related-list a{display:block;padding:20px 24px;border:1px solid var(--border);border-radius:12px;text-decoration:none;transition:border-color .2s,box-shadow .2s}
.related-list a:hover{border-color:rgba(11,35,81,.35);box-shadow:0 6px 20px rgba(15,23,42,.06)}
.related-tag{display:block;font-size:11px;font-weight:600;letter-spacing:.1em;color:var(--navy)}
.related-quote{display:block;margin-top:8px;font-family:"Noto Serif JP",serif;font-size:17px;font-weight:700;line-height:1.6;color:var(--text)}
.related-summary{display:block;margin-top:8px;font-size:13px;line-height:1.8;color:var(--muted)}
.related-hub a{background:var(--cream);font-size:14px;font-weight:700;color:var(--navy)}

.site-footer{background:var(--dark);color:#f7f2e8;padding:56px 0}
.footer-brand{display:flex;align-items:center;gap:16px}
.footer-brand img{display:block;width:44px;height:44px;border-radius:12px}
.footer-logo{margin:0;font-family:"Noto Serif JP",serif;font-size:18px;font-weight:600;letter-spacing:.08em}
.footer-text{margin:4px 0 0;font-size:12px;font-weight:600;letter-spacing:.06em;color:#a9b7cf}
.footer-links{margin:24px 0 0;display:flex;flex-wrap:wrap;gap:20px}
.footer-links a{font-size:13px;color:#cbd5e1;text-decoration:none}
.footer-links a:hover{color:#fff}
.footer-copy{margin:24px 0 0;font-size:11px;color:#64748b}
.print-url{display:none}

/* 商談資料としてPDF出力する用（ブラウザの「PDFで保存」） */
@media print{
  @page{margin:14mm}
  body{font-size:10.5pt;line-height:1.75}
  .site-nav,.breadcrumb,.related,.site-footer,.cta-actions,.eyecatch figcaption{display:none!important}
  .eyecatch{margin:0;padding:0}
  .eyecatch img{max-height:52mm;border-radius:4pt;box-shadow:none}
  .wrap{max-width:none;padding:0}
  .article-head{padding:0 0 8px}
  .article-head h1{font-size:18pt}
  .article-body h2{margin:20pt 0 8pt;font-size:13pt;break-after:avoid}
  .article-body h3{margin:14pt 0 6pt;font-size:12pt;break-after:avoid}
  .article-body p,.article-body li{color:#1f2937}
  .article-body ul{background:none;border:1px solid #d1d5db;padding:10pt 14pt}
  .cta{margin:14pt 0;padding:10pt 14pt;background:none;border:1px solid #d1d5db;break-inside:avoid}
  .print-url{display:block;margin-top:16pt;font-size:8pt;color:#6b7280}
  a{color:#111827;text-decoration:none}
}
`;

/* ── 読み込み ── */
function readArticles(directory) {
return fs.readdirSync(directory)
  .filter(f => f.endsWith('.md'))
  .sort()
  .map(file => {
    const raw = fs.readFileSync(path.join(directory, file), 'utf8');
    const { data, body } = parseFrontMatter(raw);
    const { body: stripped, ctas } = extractCtas(body);
    let html = md.render(stripped);
    ctas.forEach((cta, i) => {
      html = html.replace(new RegExp(`<p>@@CTA${i}@@</p>`), ctaHtml(cta));
    });
    return { ...data, file, html };
  });
}
const articles = readArticles(CONTENT_DIR);
const companyCases = readArticles(path.join(ROOT, 'content/case'))
  .sort((a, b) => Number(a.order) - Number(b.order));

const hub = articles.find(a => a.type === 'hub');
const cases = articles.filter(a => a.type === 'case').sort((a, b) => Number(a.order) - Number(b.order));
if (!hub) throw new Error('ハブ記事（type: hub）が見つかりません');

/* ── LP用カードデータ ── */
function writeData() {
  const cards = cases.map(c => ({
    caseNo: c.caseNo, category: c.category, quote: c.cardQuote,
    summary: c.cardSummary, href: `${SECTION_PATH}${c.slug}/`,
  }));
  const out = `// 自動生成ファイル - 編集しないでください。
// 生成元: content/voices/*.md ／ 生成コマンド: node scripts/build-articles.mjs --data-only
export const voicesHubHref = '${SECTION_PATH}';
export const voices = ${JSON.stringify(cards, null, 2)};
`;
  fs.mkdirSync(path.join(ROOT, 'src/data'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'src/data/voices.js'), out);
  const companyCards = companyCases.map(c => ({
    company: c.company, category: c.category, title: c.cardQuote,
    brand: c.brand, point: c.cardPoint,
    logo: c.logo, logoWidth: c.logoWidth, logoHeight: c.logoHeight,
    summary: c.cardSummary, href: `/case/${c.slug}/`,
  }));
  fs.writeFileSync(path.join(ROOT, 'src/data/companyCases.js'),
    `// 自動生成ファイル — 生成元: content/case/*.md\nexport const companyCases = ${JSON.stringify(companyCards, null, 2)};\n`);
  console.log(`[voices] src/data/voices.js を生成（${cards.length}件）`);

  // 商談用トークスクリプト（非公開・deployされない docs/ に出力）
  const talk = `# 商談トークスクリプト（社外非公開）

「こんなケースありませんか？」→ 近い事例を選ぶ → 「実はこういう事例があって…」の流れで使う想定。
各事例の詳細は記事URLをその場で開くか、記事ページをブラウザの「PDFで保存」で印刷して配布する。

> このファイルは content/voices/*.md の salesTalk から自動生成されます（編集しないでください）。
> 生成コマンド: npm run voices

${cases.map(c => `## ${c.caseNo}｜${c.category}

- 従業員の声：「${c.cardQuote}」
- 記事URL：${ORIGIN}${SECTION_PATH}${c.slug}/
${(c.salesTalk || []).map(t => `- ${t}`).join('\n')}
`).join('\n')}`;
  fs.mkdirSync(path.join(ROOT, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'docs/sales-talk-track.md'), talk);
  console.log('[voices] docs/sales-talk-track.md を生成');
}

/* ── 記事HTML + sitemap ── */
function writeHtml() {
  if (!fs.existsSync(DIST)) throw new Error('dist がありません。先に vite build を実行してください。');
  const outDir = path.join(DIST, 'voices');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'article.css'), CSS);

  const pages = [
    ...companyCases.map(c => ({
      article: c, related: companyCases.filter(o => o.slug !== c.slug),
      isHub: false, companyCase: true, dir: path.join(DIST, 'case', c.slug),
    })),
    { article: hub, related: cases, isHub: true, dir: outDir },
    ...cases.map(c => ({
      article: c,
      related: cases.filter(o => o.slug !== c.slug),
      isHub: false,
      dir: path.join(outDir, c.slug),
    })),
  ];
  for (const page of pages) {
    fs.mkdirSync(page.dir, { recursive: true });
    fs.writeFileSync(path.join(page.dir, 'index.html'), template(page));
    console.log(`[voices] ${path.relative(ROOT, path.join(page.dir, 'index.html'))}`);
  }

  const today = new Date().toISOString().slice(0, 10);
  const urls = [`${ORIGIN}/`, ORIGIN + SECTION_PATH, ...cases.map(c => `${ORIGIN}${SECTION_PATH}${c.slug}/`),
    ...companyCases.map(c => `${ORIGIN}/case/${c.slug}/`)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${u === `${ORIGIN}/` ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
  console.log(`[voices] dist/sitemap.xml を生成（${urls.length}URL）`);
}

writeData();
if (!dataOnly) writeHtml();
