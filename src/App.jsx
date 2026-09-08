import { useState, useEffect, useRef } from 'react';
import { voices, voicesHubHref } from './data/voices';

/* ── スクロール表示フック ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── 写真（public/images に WebP 3サイズを生成済み） ── */
function Photo({ name, alt, className = '', sizes = '100vw', priority = false, style }) {
  const url = w => `/images/${name}-${w}.webp`;
  return (
    <img
      src={url(1000)}
      srcSet={`${url(600)} 600w, ${url(1000)} 1000w, ${url(1600)} 1600w`}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={style}
    />
  );
}

/* ── フェードイン ラッパー ── */
function Reveal({ children, delay = 0, from = 'bottom', className = '' }) {
  const [ref, inView] = useInView();
  const transforms = { bottom: 'translateY(40px)', left: 'translateX(-40px)', right: 'translateX(40px)' };
  return (
    <div ref={ref} className={className} style={{
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : (transforms[from] || transforms.bottom),
    }}>
      {children}
    </div>
  );
}

/* ── メインコンポーネント ── */
export default function TalentKeeperLandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [billing, setBilling] = useState('annual'); // 'annual' | 'monthly'
  const [formData, setFormData] = useState({ company: '', name: '', email: '', size: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | sent | error

  const navLinks = [["SERVICE", "#how"], ["VOICES", "#voices"], ["CASES", "#cases"], ["PRICING", "#pricing"], ["CONTACT", "#contact"]];

  const handleFormChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFormSubmit = async e => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      // Formspree: https://formspree.io でアカウント作成後、FORM_ID を差し替えてください
      const res = await fetch('https://formspree.io/f/xdapojqn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...formData, _subject: `【TalentKeeper】${formData.company} ${formData.name}様よりお問い合わせ` }),
      });
      setFormStatus(res.ok ? 'sent' : 'error');
    } catch {
      setFormStatus('error');
    }
  };

  const C = {
    // ライト（ナビ・ヒーロー）: ロゴ地色のクリーム
    nav:       "#fdf5e8",
    // ダーク（コンタクト・フッター・動画用）: ブランドネイビー系
    darkBg:    "#081a3c",
    darkCard:  "#0f2a5a",
    cardDark:  "#0b2351",
    text:      "#f7f2e8",
    textMuted: "#a9b7cf",
    textDim:   "#8496b3",
    border:    "rgba(253,245,232,0.12)",

    // ライト（コンテンツセクション）
    bg:        "#ffffff",
    bgAlt:     "#fdf5e8",   // クリーム
    card:      "#ffffff",
    lt:        "#101c33",
    ltMuted:   "#475569",
    ltDim:     "#8a93a5",
    ltBorder:  "rgba(11,35,81,0.12)",

    // ブランド（ロゴ実測値）: ネイビー #0b2351 / オレンジ #fe7b01 / クリーム #fdf5e8
    accent:    "#123566",   // ラベル・見出し下線・タグなど編集アクセント
    accentDeep:"#0b2351",   // ロゴのネイビー（バッジ・強い面）
    cta:       "#fe7b01",   // CTA ボタン専用（ロゴの扉のオレンジ）
    ctaLight:  "#ff9633",   // CTA hover / ホットな数字（月額料金の30倍など）
    accentRed: "#dc2626",   // フォーム必須 * とエラーのみ使用
  };

  const features = [
    { num: "01", title: "入社後フォロー継続支援", text: "入社直後から定着まで、継続的な接点を設計。担当者任せになりがちなフォローを、仕組みとして回しやすくします。" },
    { num: "02", title: "離職予兆の早期把握", text: "大きな問題になる前の小さな違和感を拾い、早い段階で把握。手遅れになる前の対応につなげます。" },
    { num: "03", title: "エンゲージメント可視化", text: "入社者ごとの状態変化を見える化し、どこに支援が必要かを整理。現場と人事が同じ景色を見やすくします。" },
  ];

  const supports = [
    { num: "01", title: "AIチャットボット", sub: "24時間 365日対応", photo: "support-1-reply",
      alt: "夜、スマートフォンでチャットの返信を読む従業員", desc: "いつでも吐き出せる場所をつくります。職場の悩みは夜や休日に増大するため、24時間体制で小さな声を受け止めます。" },
    { num: "02", title: "事務局ウォッチ",   sub: "専門スタッフが継続監視", photo: "support-2-night-office",
      alt: "夜の無人のオフィス", desc: "AIが集めた情報を専門スタッフが継続モニタリング。未解決の課題を早期に掬い上げ、必要に応じてエスカレーションします。" },
    { num: "03", title: "専門家相談",       sub: "産業カウンセラーが対応", photo: "support-3-leader",
      alt: "施設の廊下に立つ主任", desc: "中立の外部機関だからこそ話せる本音があります。産業カウンセラーや人事のプロが、深い悩みに丁寧に向き合います。" },
  ];

  const story = [
    { photo: "story-1-smile",       title: "「変わったことない？」「大丈夫です」",   text: "現場は忙しく、確認できる時間は限られています。本人も、心配をかけたくないと考えます。" },
    { photo: "story-2-smile-fades", title: "背を向けた瞬間、表情が変わる",           text: "言えなかった不安は、その場では見えません。小さな違和感が、少しずつ積み重なっていきます。" },
    { photo: "story-3-night",       title: "不安が大きくなるのは、夜",               text: "職場の悩みを考え込むのは、勤務が終わったあとや休日です。相談できる相手は、その時間にはいません。", night: true },
    { photo: "story-4-chat",        title: "24時間対応の窓口で、はじめて不安を言葉にする",     text: "上司でも人事でもない外部の窓口だから、書ける本音があります。AIチャットボットが夜でも受け止めます。", night: true },
    { photo: "story-5-relief",      title: "受け止められて、少し軽くなる",           text: "返ってくる反応があることで、抱えていた不安が整理されます。ここで止まる離職があります。", night: true },
    { photo: "story-6-morning",     title: "翌朝、事務局から共有が届く",             text: "専門スタッフが内容を確認し、秘匿性に配慮したうえで、会社側が動くべき論点として共有します。" },
    { photo: "story-7-again",       title: "声のかけ方が変わる",                     text: "何に困っているのかが分かっていれば、配置・教育ペース・勤務体制を早い段階で調整できます。" },
  ];

  const plans = [
    {
      name: "スタンダード", nameEn: "STANDARD",
      priceAnnual: "50,000", totalAnnual: "600,000",
      priceMonthly: "75,000",
      maxFollow: "30名まで",
      guideline: "毎月5名入社 × 6ヶ月フォロー",
      slots: "月最大 5枠",
      target: "中小企業・成長期スタートアップ",
    },
    {
      name: "プレミアム", nameEn: "PREMIUM",
      priceAnnual: "100,000", totalAnnual: "1,200,000",
      priceMonthly: "150,000",
      maxFollow: "60名まで",
      guideline: "毎月10名入社 × 6ヶ月フォロー",
      slots: "月最大 10枠",
      target: "中堅企業・大規模採用企業",
      recommended: true,
    },
    {
      name: "エンタープライズ", nameEn: "ENTERPRISE",
      maxFollow: "61名以上・上限なし",
      guideline: "規模・体制に応じて設計",
      slots: "カスタム（上限なし）",
      target: "大企業・多拠点展開企業",
      enterprise: true,
    },
  ];

  const featureMatrix = [
    { label: "AIチャットボット（24h対応）",  basic: true,       premium: true,       enterprise: "ご相談" },
    { label: "事務局モニタリング",            basic: true,       premium: true,       enterprise: "ご相談" },
    { label: "月次レポート",                  basic: true,       premium: true,       enterprise: "ご相談" },
    { label: "最大同時フォロー人数",          basic: "30名",     premium: "60名",     enterprise: "ご相談" },
    { label: "お悩み面談 相談枠",            basic: "月5枠",    premium: "月10枠",   enterprise: "ご相談" },
    { label: "専任担当者",                    basic: false,      premium: false,      enterprise: "ご相談" },
    { label: "推奨企業規模",                  basic: "中小企業", premium: "中堅企業", enterprise: "ご相談" },
  ];

  return (
      <div style={{ background: C.bg, color: C.lt }} className="min-h-screen">

        {/* ─── Navigation ─── */}
        <nav style={{ background: C.nav, borderBottom: `1px solid ${C.ltBorder}` }} className="sticky top-0 z-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
            {/* ロゴ */}
            <a href="#" className="flex items-center" onClick={() => setMobileOpen(false)} aria-label="TalentKeeper ホーム">
              <img src="/images/logo/tk-lockup.png" alt="TalentKeeper" width="900" height="269"
                className="h-9 w-auto lg:h-11" />
            </a>

            {/* PC ナビ */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map(([label, href]) => (
                <a key={label} href={href} className="text-xs font-medium tracking-[0.12em] transition"
                  style={{ color: C.textDim }}
                  onMouseOver={e => e.target.style.color = C.accent}
                  onMouseOut={e => e.target.style.color = C.textDim}>
                  {label}
                </a>
              ))}
            </div>

            {/* PC CTA */}
            <a href="#contact" className="hidden md:inline-flex rounded-full px-6 py-2.5 text-base font-bold text-white transition hover:opacity-80"
              style={{ background: C.cta }}>
              お問い合わせ
            </a>

            {/* モバイル ハンバーガー */}
            <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(o => !o)}
              aria-label="メニュー">
              <span className="block h-0.5 w-6 rounded transition-all"
                style={{ background: C.lt, transform: mobileOpen ? 'translateY(8px) rotate(45deg)' : 'none' }} />
              <span className="block h-0.5 w-6 rounded transition-all"
                style={{ background: C.lt, opacity: mobileOpen ? 0 : 1 }} />
              <span className="block h-0.5 w-6 rounded transition-all"
                style={{ background: C.lt, transform: mobileOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>

          {/* モバイル ドロワー */}
          <div className="md:hidden overflow-hidden transition-all duration-300"
            style={{ maxHeight: mobileOpen ? '400px' : '0', borderTop: mobileOpen ? `1px solid ${C.ltBorder}` : 'none' }}>
            <div className="flex flex-col px-6 py-6 gap-2" style={{ background: C.nav }}>
              {navLinks.map(([label, href]) => (
                <a key={label} href={href}
                  className="rounded-xl px-4 py-3 text-sm font-semibold tracking-[0.08em] transition hover:opacity-80"
                  style={{ color: C.ltMuted, background: "rgba(0,0,0,0.04)" }}
                  onClick={() => setMobileOpen(false)}>
                  {label}
                </a>
              ))}
              <a href="#contact"
                className="mt-2 rounded-full px-6 py-3 text-base font-bold text-white text-center transition hover:opacity-80"
                style={{ background: C.cta }}
                onClick={() => setMobileOpen(false)}>
                無料でお問い合わせ
              </a>
            </div>
          </div>
        </nav>

        {/* ─── Hero ─── */}
        <section style={{ background: C.nav, position: 'relative', overflow: 'hidden' }}>
          <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-24 lg:px-12 lg:pb-32 lg:pt-32">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <Reveal>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold"
                    style={{ background: "rgba(11,35,81,0.06)", color: C.accent, border: `1px solid rgba(11,35,81,0.18)` }}>
                    <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: C.accent }} />
                    新入社員の定着支援サービス
                  </div>
                  <p className="mb-5 text-sm font-bold" style={{ color: C.ltDim }}>
                    月5〜20名採用している中小・中堅企業の人事担当者・経営者へ
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h1 className="serif text-5xl font-bold leading-snug sm:text-6xl lg:text-[3.6rem]" style={{ color: C.lt }}>
                    仕組みで、<br />定着は<br />変わります。
                  </h1>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-5 text-xl font-bold" style={{ color: C.accent }}>
                    声を拾う仕組みがあれば、多くの離職は防げます。
                  </p>
                  <p className="mt-3 text-lg leading-9" style={{ color: C.ltMuted }}>
                    100人以上のヒアリングが、このサービスの土台です。
                  </p>
                  <p className="mt-4 max-w-lg text-lg leading-9" style={{ color: C.ltDim }}>
                    新入社員が定着する職場には、共通の仕組みがあります。三層サポート体制と24時間対応で、早期離職を未然に防ぎます。
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <a href="#contact"
                      className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:opacity-80"
                      style={{ background: C.cta }}>
                      無料デモを予約する
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                    <a href="#how"
                      className="rounded-full border px-8 py-4 text-lg font-bold transition hover:opacity-80"
                      style={{ borderColor: C.ltBorder, color: C.ltMuted }}>
                      サービスを見る
                    </a>
                  </div>
                </Reveal>
                <Reveal delay={0.4}>
                  <div className="mt-12 flex flex-wrap gap-8 border-t pt-8" style={{ borderColor: C.ltBorder }}>
                    {[["3週間〜", "最短導入期間"], ["24 / 365", "サポート対応"], ["3層", "サポート体制"], ["30×", "離職コスト／月額料金"]].map(([v, l]) => (
                      <div key={l}>
                        <div className="serif text-3xl font-bold" style={{ color: C.accent }}>{v}</div>
                        <div className="mt-0.5 text-sm font-bold" style={{ color: C.ltDim }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* ヒーロー写真 + 実態データ */}
              <Reveal from="right" delay={0.2}>
                <div className="relative">
                  <div className="overflow-hidden rounded-3xl" style={{ boxShadow: "0 30px 70px rgba(11,35,81,0.18)" }}>
                    <Photo name="hero-greeting" priority sizes="(min-width: 1024px) 46vw, 92vw"
                      alt="施設の廊下で、主任が新入社員に声をかけている様子"
                      className="block w-full object-cover"
                      style={{ aspectRatio: "4 / 3" }} />
                  </div>

                  <div className="relative mx-4 -mt-14 rounded-2xl p-6 lg:mx-8 lg:-mt-16 lg:p-7"
                    style={{ background: C.card, border: `1px solid ${C.ltBorder}`, boxShadow: "0 20px 50px rgba(11,35,81,0.14)" }}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-[11px] font-semibold tracking-[0.22em] uppercase" style={{ color: C.accent }}>実態データ</p>
                      <p className="text-[11px] font-semibold" style={{ color: C.ltDim }}>パーソル総合研究所 ほか</p>
                    </div>
                    <div className="mt-5 space-y-4">
                      {[
                        { label: "入社後1年で未解決の不安を抱える割合", value: "60.6", unit: "%" },
                        { label: "不安がピークを迎えるタイミング", value: "入社1", unit: "ヶ月" },
                        { label: "早期離職の採用コストロス倍率", value: "約3", unit: "倍" },
                      ].map((st, i) => (
                        <div key={st.label} className="flex items-baseline gap-4">
                          <span className="text-[11px] font-semibold tabular-nums" style={{ color: C.ltDim, minWidth: '1.4em' }}>0{i + 1}</span>
                          <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4">
                            <span className="flex items-baseline gap-1">
                              <span className="serif text-4xl font-bold leading-none" style={{ color: C.accentDeep }}>{st.value}</span>
                              <span className="serif text-base font-bold" style={{ color: C.accentDeep }}>{st.unit}</span>
                            </span>
                            <p className="text-[13px] leading-6" style={{ color: C.ltMuted }}>{st.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-right text-[11px]" style={{ color: C.ltDim }}>※写真はイメージです</p>
                </div>
              </Reveal>
            </div>
          </div>

        </section>


        {/* ─── STORY（素材の物語カットで、拾われるまでの流れを見せる） ─── */}
        <section id="story" style={{ background: C.bg }} className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <Reveal>
              <div className="mb-16 max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: C.accent }}>STORY</p>
                <h2 className="serif mt-4 text-4xl font-bold leading-snug lg:text-5xl" style={{ color: C.lt }}>
                  「大丈夫です」の裏側で、<br />起きていること
                </h2>
                <p className="mt-6 text-lg leading-9" style={{ color: C.ltMuted }}>
                  早期離職は、ある日突然決まるわけではありません。入社から定着までの間に、会社側から見えにくい時間があります。
                </p>
              </div>
            </Reveal>

            <div className="relative">
              {/* デスクトップの縦線 */}
              <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block"
                style={{ background: `linear-gradient(180deg, transparent, ${C.ltBorder} 8%, ${C.ltBorder} 92%, transparent)` }} />

              {story.map((st, i) => (
                <Reveal key={st.photo} delay={0.05} from={i % 2 === 0 ? 'right' : 'left'}>
                  <div className="relative grid items-center gap-8 py-8 lg:grid-cols-2 lg:gap-16 lg:py-10">
                    <div className={`overflow-hidden rounded-2xl ${i % 2 === 1 ? 'lg:order-2' : ''}`}
                      style={{ boxShadow: `0 18px 44px ${st.night ? 'rgba(8,26,60,0.28)' : 'rgba(11,35,81,0.14)'}` }}>
                      <Photo name={st.photo} alt={st.title} sizes="(min-width: 1024px) 46vw, 92vw"
                        className="block w-full object-cover transition duration-700 hover:scale-[1.02]"
                        style={{ aspectRatio: "16 / 10" }} />
                    </div>
                    <div className={i % 2 === 1 ? 'lg:pr-4' : 'lg:pl-4'}>
                      <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.16em]"
                        style={{ background: st.night ? C.accentDeep : "rgba(11,35,81,0.07)", color: st.night ? C.text : C.accent }}>
                        STEP {String(i + 1).padStart(2, '0')}
                        {st.night && <span style={{ color: C.ctaLight }}>夜</span>}
                      </span>
                      <h3 className="serif mt-4 text-2xl font-bold leading-snug lg:text-3xl" style={{ color: C.lt }}>{st.title}</h3>
                      <p className="mt-4 text-base leading-8" style={{ color: C.ltMuted }}>{st.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-12 flex flex-col items-start gap-6 rounded-2xl p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10"
                style={{ background: C.bgAlt, border: `1px solid ${C.ltBorder}` }}>
                <div>
                  <p className="serif text-2xl font-bold leading-snug" style={{ color: C.lt }}>
                    この流れを、担当者の頑張りではなく仕組みで回します。
                  </p>
                  <p className="mt-3 text-sm leading-7" style={{ color: C.ltMuted }}>
                    AIチャットボット・事務局ウォッチ・専門家相談の三層で、24時間365日、声を受け止めます。
                  </p>
                </div>
                <a href="#how" className="inline-flex shrink-0 items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold text-white transition hover:opacity-80"
                  style={{ background: C.cta }}>
                  サポート体制を見る
                  <span>→</span>
                </a>
              </div>
              <p className="mt-4 text-[11px]" style={{ color: C.ltDim }}>※写真はイメージです</p>
            </Reveal>
          </div>
        </section>


        {/* ─── 従業員の声（ハブ記事・個別記事への導線） ─── */}
        <section id="voices" style={{ background: C.bgAlt }} className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <Reveal>
              <div className="relative mb-12 overflow-hidden rounded-3xl">
                <Photo name="voices-newcomer" alt="施設の廊下に立つ入社まもない従業員"
                  sizes="(min-width: 1024px) 90vw, 100vw"
                  className="block w-full object-cover"
                  style={{ aspectRatio: "16 / 7" }} />
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(100deg, rgba(11,35,81,0.94) 0%, rgba(11,35,81,0.82) 42%, rgba(11,35,81,0.12) 100%)` }} />
                <div className="absolute inset-0 flex flex-col justify-center px-7 py-8 sm:px-12 lg:px-14">
                  <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: C.ctaLight }}>VOICES</p>
                  <h2 className="serif mt-4 max-w-2xl text-3xl font-bold leading-snug sm:text-4xl lg:text-5xl" style={{ color: C.text }}>
                    従業員から実際に<br />寄せられた声
                  </h2>
                  <p className="mt-5 max-w-md text-sm leading-7 sm:text-base sm:leading-8" style={{ color: "rgba(247,242,232,0.86)" }}>
                    あなたの会社では、こうした声を拾えていますか？<br className="hidden sm:block" />
                    いずれも退職の申し出より前に寄せられた相談です。
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {voices.map((v, i) => (
                <Reveal key={v.caseNo} delay={i * 0.06} className="h-full">
                  <a href={v.href} className="group flex h-full flex-col rounded-2xl p-7 transition hover:-translate-y-1"
                    style={{ background: C.card, border: `1px solid ${C.ltBorder}`, boxShadow: "0 1px 2px rgba(11,35,81,0.06)" }}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[11px] font-bold tracking-[0.18em] tabular-nums" style={{ color: C.accentDeep }}>{v.caseNo}</span>
                      <span className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: "rgba(11,35,81,0.07)", color: C.accent }}>{v.category}</span>
                    </div>
                    <p className="serif mt-5 text-xl font-bold leading-relaxed" style={{ color: C.lt }}>「{v.quote}」</p>
                    <p className="mt-4 flex-1 text-sm leading-7" style={{ color: C.ltMuted }}>{v.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.1em]" style={{ color: C.cta }}>
                      この事例を読む
                      <span className="transition group-hover:translate-x-1">→</span>
                    </span>
                  </a>
                </Reveal>
              ))}

              <Reveal delay={0.3} className="h-full">
                <a href={voicesHubHref} className="group flex h-full flex-col justify-center rounded-2xl p-7 transition hover:opacity-90"
                  style={{ background: C.accentDeep }}>
                  <p className="serif text-xl font-bold leading-relaxed" style={{ color: "#ffffff" }}>
                    5つの声を<br />まとめて読む
                  </p>
                  <p className="mt-4 text-sm leading-7" style={{ color: "rgba(255,255,255,0.72)" }}>
                    それぞれの相談内容と、企業側が検討した対応をまとめています。
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.1em]" style={{ color: C.ctaLight }}>
                    記事を読む
                    <span className="transition group-hover:translate-x-1">→</span>
                  </span>
                </a>
              </Reveal>
            </div>

            <p className="mt-6 text-[11px]" style={{ color: C.ltDim }}>
              ※事例は守秘義務のため匿名化しています。写真はイメージです。
            </p>
          </div>
        </section>


        {/* ─── 3-layer support ─── */}
        <section id="how" style={{ background: C.bg }} className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <Reveal>
              <div className="mb-16">
                <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: C.accent }}>HOW IT WORKS</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <h2 className="serif text-4xl font-bold leading-snug lg:text-5xl" style={{ color: C.lt }}>
                    三層サポート体制で<br />漏れなく支える
                  </h2>
                  <p className="max-w-sm text-base sm:text-right" style={{ color: C.ltMuted }}>
                    AIと人のハイブリッドで、未解決の課題を早期発見します
                  </p>
                </div>
              </div>
            </Reveal>

            <div>
              {supports.map(({ num, title, sub, desc, photo, alt }, i) => (
                <Reveal key={num} delay={i * 0.08}>
                  <div className="grid gap-8 border-t py-12 lg:grid-cols-[110px_1fr_320px] lg:gap-12 lg:py-14"
                    style={{ borderColor: C.ltBorder }}>
                    <div className="serif text-6xl font-bold leading-none tabular-nums lg:text-7xl" style={{ color: C.accentDeep }}>
                      {num}
                    </div>
                    <div>
                      <div className="text-xs font-semibold tracking-[0.16em]" style={{ color: C.cta }}>{sub}</div>
                      <h3 className="serif mt-3 text-3xl font-bold leading-tight lg:text-4xl" style={{ color: C.lt }}>{title}</h3>
                      <p className="mt-5 max-w-2xl text-base leading-8 lg:text-lg" style={{ color: C.ltMuted }}>{desc}</p>
                    </div>
                    <div className="overflow-hidden rounded-2xl" style={{ boxShadow: "0 14px 36px rgba(11,35,81,0.14)" }}>
                      <Photo name={photo} alt={alt} sizes="(min-width: 1024px) 320px, 92vw"
                        className="block w-full object-cover" style={{ aspectRatio: "16 / 11" }} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-6 flex items-start gap-5 rounded-xl p-7"
                style={{ background: C.bgAlt, border: `1px solid ${C.ltBorder}` }}>
                <svg className="h-7 w-7 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={C.accent} strokeWidth="1.6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <div>
                  <div className="text-lg font-bold" style={{ color: C.accent }}>高度なセキュリティと中立性を保証</div>
                  <p className="mt-1 text-base leading-8" style={{ color: C.ltMuted }}>
                    高度なセキュリティとプライバシー保護を徹底。中立の外部事務局が公正な解決を支援するため、従業員が安心して本音を話せます。
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>


        {/* ─── 動画（管理者向け93s / 従業員向け43s） ─── */}
        <section id="movie" style={{ background: C.darkBg }} className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <Reveal>
              <div className="mb-14 max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: C.ctaLight }}>MOVIE</p>
                <h2 className="serif mt-4 text-4xl font-bold leading-snug lg:text-5xl" style={{ color: C.text }}>
                  90秒で、全体像がわかります
                </h2>
                <p className="mt-5 text-base leading-8" style={{ color: C.textMuted }}>
                  導入を検討する方向けと、実際に使う従業員向けの2本をご用意しています。社内共有にもそのままお使いいただけます。
                </p>
              </div>
            </Reveal>

            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
              {[
                { file: "tk-admin-93s", label: "検討中の方へ", title: "タレントキーパー 管理者向け", time: "1分33秒", main: true },
                { file: "tk-staff-43s", label: "導入後の社内案内に", title: "スタッフサポート 従業員向け", time: "43秒" },
              ].map(v => (
                <Reveal key={v.file} delay={v.main ? 0 : 0.1}>
                  <div className="overflow-hidden rounded-2xl" style={{ background: C.cardDark, border: `1px solid ${C.border}` }}>
                    <video controls preload="none" playsInline className="block w-full"
                      poster={`/video/${v.file}-poster.jpg`} style={{ aspectRatio: "16 / 9", background: "#000" }}>
                      <source src={`/video/${v.file}.mp4`} type="video/mp4" />
                      お使いのブラウザは動画の再生に対応していません。
                    </video>
                    <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
                      <div>
                        <p className="text-[11px] font-semibold tracking-[0.16em]" style={{ color: C.ctaLight }}>{v.label}</p>
                        <p className="serif mt-1 text-lg font-bold" style={{ color: C.text }}>{v.title}</p>
                      </div>
                      <span className="text-xs font-semibold tabular-nums" style={{ color: C.textDim }}>{v.time}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>


        {/* ─── 競合比較 ─── */}
        <section style={{ background: C.bgAlt }} className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: C.accent }}>WHY US</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="serif text-4xl font-bold lg:text-5xl" style={{ color: C.lt }}>
                  他の手段と、<br />何が違うのか
                </h2>
                <p className="max-w-sm text-base sm:text-right" style={{ color: C.ltMuted }}>
                  夜間の不安もAIが受け止め、専門スタッフがフォローにつなげます
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 overflow-x-auto rounded-xl" style={{ border: `1px solid ${C.ltBorder}` }}>
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr style={{ background: C.bg }}>
                      <th className="p-5 text-left font-bold" style={{ color: C.ltDim, width: "24%" }}>手段</th>
                      {[
                        ["24時間受付", "夜間・休日の相談"],
                        ["本音が出やすい", "心理的安全性"],
                        ["個別対応", "一人ひとりに寄り添う"],
                        ["継続フォロー", "解決まで伴走"],
                      ].map(([label, sub]) => (
                        <th key={label} className="p-5 text-center font-bold" style={{ color: C.ltDim }}>
                          <div>{label}</div>
                          <div className="text-xs font-bold mt-0.5" style={{ color: C.ltDim }}>{sub}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "メンタル相談\n（産業医）",
                        vals: ["×", "×", "△", "△"],
                        note: "予約制・敷居が高く「今すぐ」の悩みに対応できない",
                        tk: false,
                      },
                      {
                        name: "内部通報\n（弁護士）",
                        vals: ["×", "×", "△", "×"],
                        note: "重大不正向け。日常の離職予兆には心理的ハードルが高すぎる",
                        tk: false,
                      },
                      {
                        name: "アンケート・\n適性検査",
                        vals: ["×", "△", "×", "△"],
                        note: "広く浅い定点観測。入社後のリアルタイム対応は不可",
                        tk: false,
                      },
                      {
                        name: "人事窓口・\n社員対応",
                        vals: ["△", "△", "△", "△"],
                        note: "評価者への遠慮で本音が出にくい。リソース限界もある",
                        tk: false,
                      },
                      {
                        name: "TalentKeeper®",
                        vals: ["◎", "◎", "◎", "◎"],
                        note: "AIが24時間相談を受付。専門スタッフが確認し、必要な対応につなげます",
                        tk: true,
                      },
                    ].map((row, i) => (
                      <tr key={i} style={{
                        background: row.tk ? C.accent : i % 2 === 0 ? C.card : C.bg,
                        borderTop: `1px solid ${row.tk ? "rgba(255,255,255,0.15)" : C.ltBorder}`,
                      }}>
                        <td className="p-5">
                          <div className="font-bold text-sm whitespace-pre-line"
                            style={{ color: row.tk ? "white" : C.lt }}>
                            {row.name}
                          </div>
                          <div className="mt-1 text-xs leading-5"
                            style={{ color: row.tk ? "rgba(255,255,255,0.75)" : C.ltDim }}>
                            {row.note}
                          </div>
                        </td>
                        {row.vals.map((v, j) => (
                          <td key={j} className="p-5 text-center">
                            <span className="text-lg font-bold" style={{
                              color: row.tk
                                ? "white"
                                : v === "◎" ? C.accent
                                : v === "○" ? C.accent
                                : v === "△" ? C.ltDim
                                : "#c4b5a0",
                            }}>
                              {v}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            {/* KEY TAKEAWAY */}
            <Reveal delay={0.15}>
              <div className="mt-8 rounded-xl p-6 flex items-start gap-4"
                style={{ background: "#f8fafc", border: `1px solid ${C.ltBorder}` }}>
                <div className="shrink-0 mt-1 w-0.5 h-12 rounded-full" style={{ background: C.accent }} />
                <p className="text-base leading-8" style={{ color: C.ltMuted }}>
                  <strong style={{ color: C.lt }}>AIチャットが24時間365日、従業員の相談を受け付けます。</strong>
                  専門スタッフが相談内容を確認し、必要に応じて専門家相談や企業側の対応につなげます。従業員の相談は7〜8割が営業時間外に発生します。
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── Case Studies ─── */}
        <section style={{ background: C.bg }} className="py-28" id="cases">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: C.accent }}>CASE STUDIES</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="serif text-4xl font-bold lg:text-5xl" style={{ color: C.lt }}>
                  早期離職を防いだ<br />4社の選択
                </h2>
                <p className="max-w-sm text-base sm:text-right" style={{ color: C.ltMuted }}>
                  実際の導入企業における、課題・取り組み・成果
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {[
                {
                  id: "CASE 01", company: "G社", industry: "介護施設（複数拠点）",
                  meta: "従業員 約80名 ／ 導入3ヶ月目",
                  before: "新人が早期退職し採用コストが重荷に。離職の兆候が見えず、事後対応のみ。「平気そうに見えて実は不安はある」という本音が言えない環境。",
                  action: "チャット相談（約20分）で気軽に相談できる環境を提供。体力的負担や人間関係の違和感を早期キャッチ。",
                  result: "初年度離職率 3%改善",
                  resultSub: "1名あたり30万円のコスト削減",
                },
                {
                  id: "CASE 02", company: "N社", industry: "小売業（店舗複数）",
                  meta: "従業員 約150名 ／ 導入2ヶ月目",
                  before: "事業所内で退職まで完結し、本音が見えない。「退職希望」が実は「異動希望」だったことに気づけない状態。",
                  action: "第三者窓口による本音の収集。短期・中期・長期の段階的アクション計画を策定。",
                  result: "退職を未然に回避",
                  resultSub: "前向きな異動希望を実現",
                },
                {
                  id: "CASE 03", company: "K社", industry: "医療・介護施設",
                  meta: "従業員 約120名 ／ 導入4ヶ月目",
                  before: "現場の声が経営層に届かず判断が遅れる。ルール違反の常態化が不満の温床に。愚痴と重要な意見の区別がつかない。",
                  action: "正直な意見の収集と適切な取捨選択。現場運用のグレーゾーンを可視化し、ルール統一を実現。",
                  result: "機会ロス大幅減少",
                  resultSub: "経営判断のスピードが向上",
                },
                {
                  id: "CASE 04", company: "S社", industry: "スタートアップ",
                  meta: "従業員 約30名 ／ 導入1ヶ月目",
                  before: "限られた人員で新人フォローが困難。月20時間以上の残業が常態化し、「家族との時間を確保したい」という本音が言えない。",
                  action: "事業所外の相談窓口を設置。ハラスメント疑いを本社へエスカレーション。段階的な対応を実施。",
                  result: "「もっと頑張りたい」",
                  resultSub: "モチベーション向上・定着実現",
                },
              ].map((c, i) => (
                <Reveal key={c.id} delay={i * 0.1}>
                  <div className="rounded-xl p-8 h-full flex flex-col"
                    style={{ background: C.card, border: `1px solid ${C.ltBorder}` }}>
                    {/* ヘッダー */}
                    <div className="pb-5 mb-5 border-b" style={{ borderColor: C.ltBorder }}>
                      <span className="text-xs font-semibold tracking-[0.22em]" style={{ color: C.ltDim }}>{c.id}</span>
                      <h3 className="serif mt-2 text-2xl font-bold" style={{ color: C.lt }}>{c.company}</h3>
                      <p className="mt-1 text-sm" style={{ color: C.ltMuted }}>{c.industry}</p>
                      <p className="mt-0.5 text-xs" style={{ color: C.ltDim }}>{c.meta}</p>
                    </div>

                    {/* Before */}
                    <div className="mb-5">
                      <p className="text-[10px] font-semibold tracking-[0.22em] mb-2" style={{ color: C.ltDim }}>BEFORE</p>
                      <p className="text-sm leading-7" style={{ color: C.ltMuted }}>{c.before}</p>
                    </div>

                    {/* Action */}
                    <div className="mb-6">
                      <p className="text-[10px] font-semibold tracking-[0.22em] mb-2" style={{ color: C.ltDim }}>ACTION</p>
                      <p className="text-sm leading-7" style={{ color: C.ltMuted }}>{c.action}</p>
                    </div>

                    {/* Result */}
                    <div className="mt-auto pt-5 border-t" style={{ borderColor: C.ltBorder }}>
                      <p className="text-[10px] font-semibold tracking-[0.22em] mb-2" style={{ color: C.accent }}>RESULT</p>
                      <p className="serif text-2xl font-bold" style={{ color: C.lt }}>{c.result}</p>
                      <p className="mt-1 text-sm" style={{ color: C.ltMuted }}>{c.resultSub}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* 声 — 3つだけ */}
            <Reveal delay={0.1}>
              <div className="mt-12 grid gap-4 md:grid-cols-3">
                {[
                  { text: "めっちゃこれいいです。チャットの形で話ができるので。自然と話せます", role: "IT カスタマーサクセス職" },
                  { text: "社内の人か、社外の人が選べるのがいいです。第三者に判断してもらいたい時があります", role: "不動産 営業職" },
                  { text: "このシステムを導入しているだけで、会社が従業員を大切にしている思いを感じます", role: "元 介護職" },
                ].map((v, i) => (
                  <div key={i} className="rounded-xl p-5 flex flex-col gap-3"
                    style={{ background: C.card, border: `1px solid ${C.ltBorder}` }}>
                    <p className="text-sm leading-7" style={{ color: C.ltMuted }}>「{v.text}」</p>
                    <p className="text-xs font-bold" style={{ color: C.ltDim }}>— {v.role}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── Pricing ─── */}
        <section id="pricing" style={{ background: C.bgAlt }} className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">

            {/* ROI アンカー */}
            <Reveal>
              <div className="mb-14 rounded-xl px-7 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                style={{ background: "#f8fafc", border: `1px solid ${C.ltBorder}` }}>
                <div className="shrink-0 self-stretch w-0.5 rounded-full hidden sm:block" style={{ background: C.accent }} />
                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: C.accent }}>COST COMPARISON</p>
                  <p className="mt-2 text-base font-bold leading-7" style={{ color: C.lt }}>
                    1名の早期離職コスト ＝ 約<span className="text-2xl">150万円</span><span className="text-sm font-medium" style={{ color: C.ltMuted }}>（採用費・教育費・引き継ぎコストの合計）</span>
                  </p>
                  <p className="mt-2 text-base leading-7" style={{ color: C.ltMuted }}>
                    1名の早期離職による約150万円の損失は、<strong style={{ color: C.cta }}>月額料金5万円の30倍</strong>に相当します。
                    スタンダードの年次契約は年間60万円（月額換算5万円・税別）。離職コストと利用料金を比較する際の目安です。
                  </p>
                </div>
              </div>
            </Reveal>

            {/* ヘッダー + トグル */}
            <Reveal>
              <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: C.accent }}>05 — PRICING</p>
                  <h2 className="serif mt-4 text-4xl font-bold lg:text-5xl" style={{ color: C.lt }}>料金プラン</h2>
                  <p className="mt-3 text-base" style={{ color: C.ltMuted }}>フォロー期間・対象人数に応じて柔軟にお見積りします</p>
                </div>

                {/* 契約期間トグル */}
                <div className="flex items-center gap-1 rounded-xl p-1.5 self-start sm:self-auto"
                  style={{ background: C.bgAlt, border: `1px solid ${C.ltBorder}` }}>
                  {[['annual', '年次契約', '33%OFF'], ['monthly', '月次契約', null]].map(([key, label, badge]) => (
                    <button key={key} onClick={() => setBilling(key)}
                      className="relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all"
                      style={{
                        background: billing === key ? C.accent : 'transparent',
                        color: billing === key ? 'white' : C.ltMuted,
                      }}>
                      {label}
                      {badge && (
                        <span className="rounded-full px-2 py-0.5 text-xs font-bold"
                          style={{
                            background: billing === key ? 'rgba(0,0,0,0.18)' : 'rgba(11,35,81,0.12)',
                            color: billing === key ? 'white' : C.accent,
                          }}>
                          {badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* プランカード 3枚 */}
            <div className="grid gap-6 lg:grid-cols-3 items-start mb-10">
              {plans.map((plan, i) => (
                <Reveal key={plan.name} delay={i * 0.1}>
                  {plan.enterprise ? (
                    /* Enterprise カード */
                    <div className="relative rounded-xl p-8 h-full flex flex-col transition hover:-translate-y-0.5"
                      style={{
                        background: "#f8fafc",
                        border: `1px solid ${C.ltBorder}`,
                      }}>
                      <div className="text-xs font-semibold tracking-[0.14em] mb-2" style={{ color: C.ltDim }}>
                        {plan.nameEn}
                      </div>
                      <h3 className="serif text-2xl font-bold" style={{ color: C.lt }}>{plan.name}</h3>

                      <div className="mt-5">
                        <p className="serif text-3xl font-bold" style={{ color: C.lt }}>ご相談</p>
                        <p className="mt-1 text-xs" style={{ color: C.ltMuted }}>
                          規模・要件に応じてお見積りします
                        </p>
                      </div>

                      <div className="my-5 h-px" style={{ background: C.ltBorder }} />

                      <ul className="space-y-3 flex-1">
                        {[
                          ["最大同時フォロー", plan.maxFollow],
                          ["月の目安", plan.guideline],
                          ["お悩み面談", plan.slots],
                          ["推奨規模", plan.target],
                        ].map(([k, v]) => (
                          <li key={k} className="flex flex-col gap-0.5">
                            <span className="text-xs font-semibold tracking-[0.08em]" style={{ color: C.ltDim }}>{k}</span>
                            <span className="text-sm font-medium" style={{ color: C.lt }}>{v}</span>
                          </li>
                        ))}
                      </ul>

                      <a href="#contact"
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold transition hover:opacity-80"
                        style={{ background: "transparent", color: C.lt, border: `1.5px solid ${C.lt}` }}>
                        内容を相談する
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </a>
                    </div>
                  ) : (
                    /* Standard / Premium カード */
                    <div className="relative rounded-xl p-8 h-full flex flex-col transition hover:-translate-y-0.5"
                      style={{
                        background: plan.recommended ? C.accent : C.card,
                        border: plan.recommended ? `1px solid ${C.accent}` : `1px solid ${C.ltBorder}`,
                        boxShadow: plan.recommended ? `0 12px 40px rgba(11,35,81,0.14)` : "none",
                      }}>
                      {plan.recommended && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-[10px] font-semibold tracking-[0.18em] text-white uppercase"
                          style={{ background: C.cta }}>
                          {billing === 'annual' ? 'Most Popular — 33% OFF' : 'Most Popular'}
                        </div>
                      )}
                      <div className="text-xs font-semibold tracking-[0.14em] mb-2"
                        style={{ color: plan.recommended ? "rgba(255,255,255,0.65)" : C.ltDim }}>
                        {plan.nameEn}
                      </div>
                      <h3 className="serif text-2xl font-bold" style={{ color: plan.recommended ? "white" : C.lt }}>{plan.name}</h3>

                      <div className="mt-5">
                        <div className="flex items-end gap-1">
                          <span className="text-sm font-bold" style={{ color: plan.recommended ? "rgba(255,255,255,0.65)" : C.ltDim }}>月額</span>
                          <span className="serif text-4xl font-bold" style={{ color: plan.recommended ? "white" : C.lt }}>
                            ¥{billing === 'annual' ? plan.priceAnnual : plan.priceMonthly}
                          </span>
                          <span className="mb-1 text-sm font-bold" style={{ color: plan.recommended ? "rgba(255,255,255,0.65)" : C.ltDim }}>（税別）</span>
                        </div>
                        {billing === 'annual' && (
                          <p className="mt-1 text-xs font-bold"
                            style={{ color: plan.recommended ? "rgba(255,255,255,0.6)" : C.ltDim }}>
                            年間 ¥{plan.totalAnnual}（一括払い）
                          </p>
                        )}
                        {billing === 'monthly' && (
                          <p className="mt-1 text-xs font-bold"
                            style={{ color: plan.recommended ? "rgba(255,255,255,0.6)" : C.ltDim }}>
                            年次契約なら ¥{plan.priceAnnual}/月（33%お得）
                          </p>
                        )}
                      </div>

                      <div className="my-5 h-px" style={{ background: plan.recommended ? "rgba(255,255,255,0.2)" : C.ltBorder }} />

                      <ul className="space-y-3 flex-1">
                        {[
                          ["最大同時フォロー", plan.maxFollow],
                          ["月の目安", plan.guideline],
                          ["お悩み面談", plan.slots],
                          ["推奨規模", plan.target],
                        ].map(([k, v]) => (
                          <li key={k} className="flex flex-col gap-0.5">
                            <span className="text-xs font-semibold tracking-[0.08em]"
                              style={{ color: plan.recommended ? "rgba(255,255,255,0.5)" : C.ltDim }}>{k}</span>
                            <span className="text-sm font-bold"
                              style={{ color: plan.recommended ? "white" : C.lt }}>{v}</span>
                          </li>
                        ))}
                      </ul>

                      <a href="#contact"
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold transition hover:opacity-80"
                        style={{ background: C.cta, color: "white" }}>
                        無料デモを予約する
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </a>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>

            {/* 機能比較テーブル（2プランのみ） */}
            <Reveal>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.ltBorder}` }}>
                <div className="grid grid-cols-4 text-sm font-semibold tracking-[0.08em]"
                  style={{ background: C.card }}>
                  <div className="p-4" style={{ color: C.ltDim }}>プラン比較</div>
                  {plans.map((p) => (
                    <div key={p.nameEn} className="p-4 text-center"
                      style={{ color: p.recommended ? C.accent : p.enterprise ? C.accent : C.ltMuted }}>
                      {p.nameEn}
                    </div>
                  ))}
                </div>
                {featureMatrix.map((row, i) => (
                  <div key={row.label} className="grid grid-cols-4 text-sm"
                    style={{ background: i % 2 === 0 ? C.bgAlt : C.card, borderTop: `1px solid ${C.ltBorder}` }}>
                    <div className="p-4 font-semibold" style={{ color: C.ltMuted }}>{row.label}</div>
                    {[row.basic, row.premium, row.enterprise].map((val, j) => (
                      <div key={j} className="p-4 flex items-center justify-center">
                        {val === true ? (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={C.accent} strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        ) : val === false ? (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#c4b5a0" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <span className="rounded-full px-3 py-0.5 text-xs font-bold"
                            style={{ background: "rgba(11,35,81,0.12)", color: C.accent }}>
                            {val}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>

            {/* 安心ワード */}
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-bold" style={{ color: C.ltDim }}>
                {[
                  billing === 'annual' ? "✓ 年次一括払い（33%お得）" : "✓ 月次契約・いつでも解約可",
                  "✓ 最大3ヶ月のトライアルあり",
                  "✓ クレジットカード不要",
                  "✓ 即日ご対応",
                ].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </Reveal>

          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ background: C.bg }} className="py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-12">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: C.accent }}>FAQ</p>
              <h2 className="serif mt-4 text-4xl font-bold lg:text-5xl" style={{ color: C.lt }}>よくある質問</h2>
            </Reveal>
            <div className="mt-12 space-y-4">
              {[
                {
                  q: "既存のSlack・社内チャットや面談制度と何が違いますか？",
                  a: "社内ツールや上司との面談では「言いにくい本音」が残ります。TalentKeeperは外部の中立的な第三者窓口として機能するため、従業員が社内では言えない不満・不安を吐き出せる環境をつくります。AIが24時間受け付け、専門スタッフがフォローする仕組みが差別化点です。",
                },
                {
                  q: "契約期間はどう選べばいいですか？",
                  a: "月次契約と年次契約の2種類からお選びいただけます。年次契約（一括払い）は月次契約より33%お得です（例：スタンダードプランは月次契約で月額75,000円、年次契約で月額換算50,000円・いずれも税別）。最大3ヶ月のトライアルをご用意しています。離職防止の効果は6〜12ヶ月で実感いただけることが多いため、年次契約でじっくり取り組まれる企業が多数です。",
                },
                {
                  q: "従業員の相談内容は会社に筒抜けになりますか？",
                  a: "相談内容の秘匿性に配慮し、会社には組織の傾向や改善すべき課題を共有します。個別の対応が必要な場合は、ご本人と共有範囲を確認したうえで、必要な担当者につなぎます。",
                },
                {
                  q: "導入までどれくらいかかりますか？",
                  a: "最短3週間で稼働できます。初回ヒアリング → 設定 → 従業員向け案内 → 運用開始のステップで進めます。ITシステムの大規模導入は不要で、スモールスタートが可能です。",
                },
                {
                  q: "効果が出なかった場合はどうなりますか？",
                  a: "効果が見込みにくい場合は、デモの段階で率直にお伝えしています。導入後も定期レポートで状況を共有し、活用が進んでいない場合は改善提案を行います。成果が出ない場合のリスクを最小化できるよう、トライアル期間を設けています。",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <details className="group rounded-xl overflow-hidden"
                    style={{ border: `1px solid ${C.ltBorder}`, background: C.card }}>
                    <summary className="flex items-center justify-between gap-4 px-7 py-5 cursor-pointer list-none font-bold text-base"
                      style={{ color: C.lt }}>
                      <span>Q. {item.q}</span>
                      <svg className="shrink-0 transition-transform group-open:rotate-45" width="20" height="20"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </summary>
                    <div className="px-7 pb-6 text-base leading-8" style={{ color: C.ltMuted }}>
                      {item.a}
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Contact ─── */}
        <section id="contact" style={{ background: C.darkBg, position: 'relative', overflow: 'hidden' }} className="py-24">
          <div className="hero-orb hero-orb-contact" />
          <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] items-start">

              {/* 左：見出し＋安心材料 */}
              <Reveal>
                <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: C.accent }}>06 — CONTACT</p>
                <h2 className="serif mt-5 text-4xl font-bold text-white lg:text-5xl">
                  まずは、<br />無料デモを予約する
                </h2>
                <p className="mt-6 text-lg leading-9" style={{ color: C.textMuted }}>
                  どのタイミングの離職・定着に課題があるのかを伺いながら、活用イメージを一緒に整理します。
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "返信は通常1〜2営業日以内",
                    "最大3ヶ月のトライアルをご用意",
                    "初期費用なし・クレジットカード不要",
                    "効果が見込みにくい場合は率直にお伝えします",
                  ].map(t => (
                    <li key={t} className="flex items-center gap-3 text-base font-semibold" style={{ color: C.textMuted }}>
                      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={C.accent} strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* 右：フォーム */}
              <Reveal from="right" delay={0.15}>
                <div className="rounded-xl p-8 lg:p-10" style={{ background: C.card, border: `1px solid ${C.ltBorder}`, boxShadow: "0 24px 60px rgba(8,26,60,0.28)" }}>
                  {formStatus === 'sent' ? (
                    <div className="text-center py-10">
                      <div className="mb-5 mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "rgba(11,35,81,0.08)" }}>
                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke={C.accent} strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </div>
                      <h3 className="serif text-2xl font-bold" style={{ color: C.lt }}>送信しました</h3>
                      <p className="mt-3 text-base" style={{ color: C.ltMuted }}>
                        1〜2営業日以内にご連絡いたします。
                      </p>
                    </div>
                  ) : (
                    <>
                    <div className="mb-6 flex items-center justify-between">
                      <p className="text-base font-bold" style={{ color: C.lt }}>お問い合わせフォーム</p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1"
                        style={{ background: "rgba(11,35,81,0.06)", color: C.accent }}>
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        約30秒で入力完了
                      </span>
                    </div>
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        {/* 会社名 */}
                        <div>
                          <label className="block text-sm font-semibold mb-2" style={{ color: C.textMuted }}>
                            会社名 <span style={{ color: C.accentRed }}>*</span>
                          </label>
                          <input type="text" name="company" required value={formData.company} onChange={handleFormChange}
                            placeholder="株式会社〇〇"
                            className="w-full rounded-xl px-4 py-3 text-base outline-none transition"
                            style={{ background: C.bgAlt, border: `1px solid ${C.ltBorder}`, color: C.lt }}
                            onFocus={e => e.target.style.borderColor = C.accent}
                            onBlur={e => e.target.style.borderColor = C.ltBorder} />
                        </div>
                        {/* お名前 */}
                        <div>
                          <label className="block text-sm font-semibold mb-2" style={{ color: C.textMuted }}>
                            お名前 <span style={{ color: C.accentRed }}>*</span>
                          </label>
                          <input type="text" name="name" required value={formData.name} onChange={handleFormChange}
                            placeholder="山田 太郎"
                            className="w-full rounded-xl px-4 py-3 text-base outline-none transition"
                            style={{ background: C.bgAlt, border: `1px solid ${C.ltBorder}`, color: C.lt }}
                            onFocus={e => e.target.style.borderColor = C.accent}
                            onBlur={e => e.target.style.borderColor = C.ltBorder} />
                        </div>
                      </div>

                      {/* メールアドレス */}
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: C.textMuted }}>
                          メールアドレス <span style={{ color: C.accentRed }}>*</span>
                        </label>
                        <input type="email" name="email" required value={formData.email} onChange={handleFormChange}
                          placeholder="taro@company.co.jp"
                          className="w-full rounded-xl px-4 py-3 text-base outline-none transition"
                          style={{ background: C.bgAlt, border: `1px solid ${C.ltBorder}`, color: C.lt }}
                          onFocus={e => e.target.style.borderColor = C.accent}
                          onBlur={e => e.target.style.borderColor = C.ltBorder} />
                      </div>

                      {/* 従業員規模 */}
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: C.textMuted }}>
                          年間採用人数（目安）
                        </label>
                        <select name="size" value={formData.size} onChange={handleFormChange}
                          className="w-full rounded-xl px-4 py-3 text-base outline-none transition"
                          style={{ background: C.bgAlt, border: `1px solid ${C.ltBorder}`, color: formData.size ? C.lt : C.ltDim }}>
                          <option value="">選択してください</option>
                          <option value="〜5名">〜5名</option>
                          <option value="6〜15名">6〜15名</option>
                          <option value="16〜30名">16〜30名</option>
                          <option value="31〜60名">31〜60名</option>
                          <option value="61名以上">61名以上</option>
                        </select>
                      </div>

                      {/* お問い合わせ内容 */}
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: C.textMuted }}>
                          お問い合わせ内容
                        </label>
                        <textarea name="message" rows={4} value={formData.message} onChange={handleFormChange}
                          placeholder="課題や気になる点をご記入ください（任意）"
                          className="w-full rounded-xl px-4 py-3 text-base outline-none transition resize-none"
                          style={{ background: C.bgAlt, border: `1px solid ${C.ltBorder}`, color: C.lt }}
                          onFocus={e => e.target.style.borderColor = C.accent}
                          onBlur={e => e.target.style.borderColor = C.ltBorder} />
                      </div>

                      {/* エラー */}
                      {formStatus === 'error' && (
                        <p className="text-sm font-bold" style={{ color: C.accentRed }}>
                          送信に失敗しました。時間をおいて再度お試しください。
                        </p>
                      )}

                      {/* 送信ボタン */}
                      <button type="submit" disabled={formStatus === 'sending'}
                        className="w-full rounded-full py-4 text-lg font-bold text-white transition hover:opacity-80 disabled:opacity-50"
                        style={{ background: C.cta }}>
                        {formStatus === 'sending' ? '送信中...' : '無料デモを予約する →'}
                      </button>

                      <p className="text-center text-xs font-bold" style={{ color: C.textDim }}>
                        送信後、1〜2営業日以内にご返信します
                      </p>
                    </form>
                    </>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: "#050f26", borderTop: `1px solid ${C.border}` }} className="py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex items-center gap-4">
                <img src="/images/logo/tk-symbol.png" alt="" width="512" height="512" aria-hidden="true"
                  className="h-11 w-11 rounded-xl" />
                <div>
                  <span className="serif text-lg font-bold" style={{ color: C.text }}>TalentKeeper<sup style={{ fontSize: "0.6em", letterSpacing: 0 }}>®</sup></span>
                  <p className="text-xs font-semibold tracking-[0.06em]" style={{ color: C.textDim }}>採用の、その先へ。</p>
                </div>
              </div>
              <div className="flex gap-8">
                {[["SERVICE", "#how"], ["VOICES", voicesHubHref], ["CASES", "#cases"], ["PRICING", "#pricing"]].map(([label, href]) => (
                  <a key={label} href={href} className="text-xs font-bold tracking-[0.08em]" style={{ color: C.textDim }}>{label}</a>
                ))}
                <a href="https://www.robottte.com/" target="_blank" rel="noopener noreferrer"
                  className="text-xs font-bold tracking-[0.08em]" style={{ color: C.textDim }}>運営会社</a>
              </div>
              <p className="text-sm font-bold" style={{ color: C.textDim }}>© 2025 TalentKeeper®.</p>
            </div>
            <div className="mt-8 border-t pt-6" style={{ borderColor: C.border }}>
              <p className="text-xs leading-6" style={{ color: C.textDim }}>
                ※1 パーソル総合研究所「新入社員の定着実態調査」より。各社事例は守秘義務のため社名を匿名化しています。
              </p>
            </div>
          </div>
        </footer>

      </div>
  );
}
