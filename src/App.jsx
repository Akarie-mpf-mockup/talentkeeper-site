import { useState, useEffect, useRef } from 'react';

/* ── SVG イラストコンポーネント ── */

function IllustChatbot() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="60" cy="60" r="56" fill="#1e293b" />
      <rect x="32" y="46" width="56" height="42" rx="14" fill="#f97316" />
      <rect x="38" y="24" width="44" height="30" rx="12" fill="#fdba74" />
      <line x1="60" y1="24" x2="60" y2="14" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="12" r="4" fill="#f59e0b" />
      <circle cx="49" cy="36" r="5" fill="white" />
      <circle cx="71" cy="36" r="5" fill="white" />
      <circle cx="50" cy="37" r="3" fill="#7c2d12" />
      <circle cx="72" cy="37" r="3" fill="#7c2d12" />
      <path d="M50 46 Q60 52 70 46" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="72" y="18" width="34" height="22" rx="8" fill="#f1f5f9" />
      <path d="M76 40 L70 46 L80 40Z" fill="#f1f5f9" />
      <circle cx="82" cy="29" r="2.5" fill="#f59e0b" />
      <circle cx="89" cy="29" r="2.5" fill="#f59e0b" />
      <circle cx="96" cy="29" r="2.5" fill="#f59e0b" />
      <circle cx="52" cy="62" r="5" fill="#fef3c7" />
      <circle cx="68" cy="62" r="5" fill="#fef3c7" />
      <rect x="18" y="52" width="16" height="8" rx="4" fill="#fdba74" />
      <rect x="86" y="52" width="16" height="8" rx="4" fill="#fdba74" />
    </svg>
  );
}

function IllustMonitor() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="60" cy="60" r="56" fill="#1e293b" />
      <circle cx="60" cy="30" r="14" fill="#fbbf24" />
      <path d="M46 28 Q50 16 60 18 Q70 16 74 28" fill="#92400e" />
      <circle cx="54" cy="29" r="2.5" fill="#3b1f0e" />
      <circle cx="66" cy="29" r="2.5" fill="#3b1f0e" />
      <path d="M55 36 Q60 40 65 36" stroke="#3b1f0e" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M44 60 Q44 50 60 48 Q76 50 76 60 L78 82 H42 Z" fill="#f59e0b" />
      <circle cx="84" cy="50" r="14" stroke="#b45309" strokeWidth="4" fill="#0f172a" />
      <line x1="94" y1="60" x2="104" y2="72" stroke="#b45309" strokeWidth="5" strokeLinecap="round" />
      <polyline points="76,55 80,50 84,53 88,46 92,49" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M56 72 C56 70 53 67 50 69 C47 71 47 75 50 78 L56 84 L62 78 C65 75 65 71 62 69 C59 67 56 70 56 72Z" fill="#f97316" />
    </svg>
  );
}

function IllustCounselor() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="60" cy="60" r="56" fill="#1e293b" />
      <circle cx="36" cy="32" r="12" fill="#fbbf24" />
      <path d="M24 58 Q24 48 36 46 Q48 48 48 58 L50 76 H22 Z" fill="#f59e0b" />
      <circle cx="32" cy="31" r="2" fill="#3b1f0e" />
      <circle cx="40" cy="31" r="2" fill="#3b1f0e" />
      <path d="M33 37 Q36 40 39 37" stroke="#3b1f0e" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="82" cy="32" r="12" fill="#fb923c" />
      <path d="M70 58 Q70 48 82 46 Q94 48 94 58 L96 76 H68 Z" fill="#fdba74" />
      <circle cx="78" cy="31" r="2" fill="#3b1f0e" />
      <circle cx="86" cy="31" r="2" fill="#3b1f0e" />
      <path d="M79 38 Q82 35 85 38" stroke="#3b1f0e" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <rect x="42" y="14" width="36" height="20" rx="8" fill="#f1f5f9" />
      <path d="M56 34 L52 40 L62 34Z" fill="#f1f5f9" />
      <path d="M54 21 C54 19.5 52 17.5 50 19 C48 20.5 48 23.5 50 25.5 L54 29 L58 25.5 C60 23.5 60 20.5 58 19 C56 17.5 54 19.5 54 21Z" fill="#f472b6" />
      <text x="63" y="27" fontSize="8" fill="#f59e0b" fontWeight="bold">♪</text>
      <path d="M48 78 Q60 68 70 78" stroke="#f97316" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="4 3" />
    </svg>
  );
}

/* ── タイプライター イントロ ── */
function IntroScreen({ onDone }) {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [showCursor1, setShowCursor1] = useState(true);
  const [showLine2, setShowLine2] = useState(false);
  const [showCursor2, setShowCursor2] = useState(false);
  const [fading, setFading] = useState(false);

  const text1 = '"大丈夫です"の裏で、転職サイトを開いていた。';
  const text2 = 'その声を、拾える仕組みがありますか？';

  useEffect(() => {
    let i = 0;
    const t1 = setInterval(() => {
      i++;
      setLine1(text1.slice(0, i));
      if (i >= text1.length) {
        clearInterval(t1);
        setShowCursor1(false);
        setTimeout(() => {
          setShowLine2(true);
          setShowCursor2(true);
          let j = 0;
          const t2 = setInterval(() => {
            j++;
            setLine2(text2.slice(0, j));
            if (j >= text2.length) {
              clearInterval(t2);
              setTimeout(() => {
                setShowCursor2(false);
                setTimeout(() => {
                  setFading(true);
                  setTimeout(onDone, 900);
                }, 300);
              }, 1400);
            }
          }, 80);
        }, 700);
      }
    }, 65);
    return () => clearInterval(t1);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#070d1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column',
      transition: 'opacity 0.9s ease',
      opacity: fading ? 0 : 1,
      pointerEvents: fading ? 'none' : 'all',
    }}>
      {/* 装飾ライン */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.15), transparent)', transform: 'translateY(-80px)' }} />
      <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '720px' }}>
        <p style={{
          fontSize: 'clamp(1.3rem, 3.5vw, 2.1rem)',
          fontWeight: 900,
          color: '#f1f5f9',
          letterSpacing: '0.06em',
          lineHeight: 1.9,
          fontFamily: "'Noto Sans JP', sans-serif",
          minHeight: '3rem',
        }}>
          {line1}
          {showCursor1 && <span className="intro-cursor">|</span>}
        </p>
        {showLine2 && (
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            fontWeight: 700,
            color: '#f59e0b',
            letterSpacing: '0.1em',
            marginTop: '1.8rem',
            fontFamily: "'Noto Sans JP', sans-serif",
            minHeight: '2rem',
          }}>
            {line2}
            {showCursor2 && <span className="intro-cursor">|</span>}
          </p>
        )}
      </div>
    </div>
  );
}

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

/* ── フェードイン ラッパー ── */
function Reveal({ children, delay = 0, from = 'bottom' }) {
  const [ref, inView] = useInView();
  const transforms = { bottom: 'translateY(40px)', left: 'translateX(-40px)', right: 'translateX(40px)' };
  return (
    <div ref={ref} style={{
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
  const [introDone, setIntroDone] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({ company: '', name: '', email: '', size: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | sent | error

  const navLinks = [["SERVICE", "#service"], ["HOW IT WORKS", "#how"], ["PRICING", "#pricing"], ["CONTACT", "#contact"]];

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
    bg:        "#111827",
    bgAlt:     "#0f172a",
    card:      "#1e293b",
    cardDark:  "#162032",
    nav:       "#070d1a",
    accent:    "#f59e0b",
    accentRed: "#ef4444",
    text:      "#f1f5f9",
    textMuted: "#94a3b8",
    textDim:   "#64748b",
    highlight: "#fbbf24",
    border:    "rgba(255,255,255,0.07)",
  };

  const features = [
    { num: "01", title: "入社後フォロー継続支援", text: "入社直後から定着まで、継続的な接点を設計。担当者任せになりがちなフォローを、仕組みとして回しやすくします。" },
    { num: "02", title: "離職予兆の早期把握", text: "大きな問題になる前の小さな違和感を拾い、早い段階で把握。手遅れになる前の対応につなげます。" },
    { num: "03", title: "エンゲージメント可視化", text: "入社者ごとの状態変化を見える化し、どこに支援が必要かを整理。現場と人事が同じ景色を見やすくします。" },
  ];

  const stages = [
    { num: "01", title: "小さな不満・違和感", desc: "「思っていたのと違う」という小さなモヤモヤが蓄積し始める段階。この時点での対応が最も効果的です。", color: "#f59e0b" },
    { num: "02", title: "孤立・相談機会の喪失", desc: "誰にも言えず一人で抱え込み、エンゲージメントが静かに、しかし確実に低下していく。", color: "#f97316" },
    { num: "03", title: "深刻化・転職検討", desc: "転職サイトへの登録や情報収集が始まり、離職の意思が固まっていく段階。", color: "#ef4444" },
    { num: "04", title: "組織崩壊・連鎖離職", desc: "エース級人材の離脱を機に組織全体の士気と生産性が急落する最終段階。", color: "#b91c1c" },
  ];

  const supports = [
    { Illust: IllustChatbot,  num: "01", title: "AIチャットボット", sub: "24時間 365日対応", desc: "いつでも吐き出せる場所をつくります。職場の悩みは夜や休日に増大するため、24時間体制で小さな声を受け止めます。" },
    { Illust: IllustMonitor,  num: "02", title: "事務局ウォッチ",   sub: "専門スタッフが継続監視", desc: "AIが集めた情報を専門スタッフが継続モニタリング。未解決の課題を早期に掬い上げ、必要に応じてエスカレーションします。" },
    { Illust: IllustCounselor,num: "03", title: "専門家相談",       sub: "産業カウンセラーが対応", desc: "中立の外部機関だからこそ話せる本音があります。産業カウンセラーや人事のプロが、深い悩みに丁寧に向き合います。" },
  ];

  const plans = [
    {
      name: "スタンダード", nameEn: "BASIC",
      price: "50,000",
      maxFollow: "30名まで",
      guideline: "毎月5名入社 × 6ヶ月フォロー",
      slots: "月最大 5枠",
      target: "中小企業・成長期スタートアップ",
    },
    {
      name: "プレミアム", nameEn: "PREMIUM",
      price: "100,000",
      maxFollow: "60名まで",
      guideline: "毎月10名入社 × 6ヶ月フォロー",
      slots: "月最大 10枠",
      target: "中堅企業・大規模採用企業",
      recommended: true,
    },
  ];

  const featureMatrix = [
    { label: "AIチャットボット（24h対応）",  basic: true,       premium: true       },
    { label: "事務局モニタリング",            basic: true,       premium: true       },
    { label: "月次レポート",                  basic: true,       premium: true       },
    { label: "最大同時フォロー人数",          basic: "30名",     premium: "60名"     },
    { label: "お悩み面談 相談枠",            basic: "月5枠",    premium: "月10枠"   },
    { label: "推奨企業規模",                  basic: "中小企業", premium: "中堅企業" },
  ];

  return (
    <>
      {!introDone && <IntroScreen onDone={() => setIntroDone(true)} />}

      <div style={{
        background: C.bg, color: C.text,
        opacity: introDone ? 1 : 0,
        transition: 'opacity 0.9s ease',
      }} className="min-h-screen">

        {/* ─── Navigation ─── */}
        <nav style={{ background: C.nav, borderBottom: `1px solid ${C.border}` }} className="sticky top-0 z-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
            {/* ロゴ */}
            <a href="#" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: C.accent }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
              </div>
              <span className="serif text-xl font-black tracking-wide text-white">TalentKeeper</span>
            </a>

            {/* PC ナビ */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map(([label, href]) => (
                <a key={label} href={href} className="text-xs font-bold tracking-[0.15em] transition"
                  style={{ color: C.textDim }}
                  onMouseOver={e => e.target.style.color = C.accent}
                  onMouseOut={e => e.target.style.color = C.textDim}>
                  {label}
                </a>
              ))}
            </div>

            {/* PC CTA */}
            <a href="#contact" className="hidden md:inline-flex rounded-full px-6 py-2.5 text-base font-bold text-white transition hover:opacity-80"
              style={{ background: C.accent }}>
              お問い合わせ
            </a>

            {/* モバイル ハンバーガー */}
            <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(o => !o)}
              aria-label="メニュー">
              <span className="block h-0.5 w-6 rounded transition-all"
                style={{ background: C.text, transform: mobileOpen ? 'translateY(8px) rotate(45deg)' : 'none' }} />
              <span className="block h-0.5 w-6 rounded transition-all"
                style={{ background: C.text, opacity: mobileOpen ? 0 : 1 }} />
              <span className="block h-0.5 w-6 rounded transition-all"
                style={{ background: C.text, transform: mobileOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>

          {/* モバイル ドロワー */}
          <div className="md:hidden overflow-hidden transition-all duration-300"
            style={{ maxHeight: mobileOpen ? '400px' : '0', borderTop: mobileOpen ? `1px solid ${C.border}` : 'none' }}>
            <div className="flex flex-col px-6 py-6 gap-2" style={{ background: C.nav }}>
              {navLinks.map(([label, href]) => (
                <a key={label} href={href}
                  className="rounded-xl px-4 py-3 text-sm font-black tracking-[0.12em] transition hover:opacity-80"
                  style={{ color: C.textMuted, background: "rgba(255,255,255,0.04)" }}
                  onClick={() => setMobileOpen(false)}>
                  {label}
                </a>
              ))}
              <a href="#contact"
                className="mt-2 rounded-full px-6 py-3 text-base font-black text-white text-center transition hover:opacity-80"
                style={{ background: C.accent }}
                onClick={() => setMobileOpen(false)}>
                無料でお問い合わせ
              </a>
            </div>
          </div>
        </nav>

        {/* ─── Hero ─── */}
        <section style={{ background: C.nav, position: 'relative', overflow: 'hidden' }}>
          {/* 動くオーブ背景 */}
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />

          <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-24 lg:px-12 lg:pb-32 lg:pt-32">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <Reveal>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold"
                    style={{ background: "rgba(245,158,11,0.12)", color: C.accent, border: `1px solid rgba(245,158,11,0.25)` }}>
                    <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: C.accent }} />
                    新入社員の定着支援サービス
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <h1 className="serif text-5xl font-black leading-snug text-white sm:text-6xl lg:text-[3.6rem]">
                    <span style={{ color: C.highlight }}>"大丈夫です"</span>の裏で、<br />
                    転職サイトを開いていた。
                  </h1>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-5 text-xl font-bold" style={{ color: C.textMuted }}>
                    辞める人は、必ず一度だけ助けを求めています。
                  </p>
                  <p className="mt-4 max-w-lg text-lg leading-9" style={{ color: C.textDim }}>
                    新入社員の60.6%が1年後も不安を抱え続ける現実。三層サポート体制と24時間対応で、離職リスクを初期段階で察知します。
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <a href="#contact"
                      className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:opacity-80"
                      style={{ background: C.accent }}>
                      無料でご相談する
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                    <a href="#service"
                      className="rounded-full border px-8 py-4 text-lg font-bold transition hover:opacity-80"
                      style={{ borderColor: C.border, color: C.textMuted }}>
                      サービスを見る
                    </a>
                  </div>
                </Reveal>
                <Reveal delay={0.4}>
                  <div className="mt-12 flex flex-wrap gap-8 border-t pt-8" style={{ borderColor: C.border }}>
                    {[["3週間〜", "最短導入期間"], ["24 / 365", "サポート対応"], ["3層", "サポート体制"]].map(([v, l]) => (
                      <div key={l}>
                        <div className="serif text-3xl font-black" style={{ color: C.highlight }}>{v}</div>
                        <div className="mt-0.5 text-sm font-bold" style={{ color: C.textDim }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* stat card */}
              <Reveal from="right" delay={0.2}>
                <div className="rounded-3xl p-8" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                  <p className="mb-6 text-sm font-black tracking-[0.2em] uppercase" style={{ color: C.accent }}>実態データ</p>
                  <div className="space-y-5">
                    {[
                      { label: "入社後1年で未解決の不安を抱える割合", value: "60.6%", bar: 61, color: "#ef4444" },
                      { label: "最も不安のピークを迎えるタイミング", value: "入社1ヶ月", bar: 80, color: C.highlight },
                      { label: "早期離職の採用コストロス倍率", value: "約3倍", bar: 75, color: "#f97316" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl p-5" style={{ background: C.cardDark }}>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-base" style={{ color: C.textMuted }}>{s.label}</span>
                          <span className="serif shrink-0 text-3xl font-black" style={{ color: s.color }}>{s.value}</span>
                        </div>
                        <div className="mt-3 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <div className="h-1.5 rounded-full" style={{ width: `${s.bar}%`, background: s.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* curve */}
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ display: "block", background: C.bg }}>
            <path d="M0 64 C360 0 1080 0 1440 64 L1440 0 L0 0 Z" fill={C.nav} />
          </svg>
        </section>

        {/* ─── Problem ─── */}
        <section style={{ background: C.bg }} className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.6fr]">
              <div>
                <Reveal>
                  <p className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: C.accentRed }}>01 — PROBLEM</p>
                  <h2 className="serif mt-4 text-4xl font-black leading-snug lg:text-5xl" style={{ color: C.text }}>
                    見逃される、<br />入社後の<br />小さなサイン
                  </h2>
                  <p className="mt-6 text-lg leading-9" style={{ color: C.textMuted }}>
                    入社直後の期待と現実のギャップが早期離職の主因。小さな不満が段階的に悪化し、最終的に組織崩壊やエース級人材の離脱に至るリスクがあります。
                  </p>
                  <div className="mt-8 inline-block rounded-full px-6 py-3 text-base font-bold text-white" style={{ background: C.accentRed }}>
                    早期ケアが定着率向上の鍵
                  </div>
                </Reveal>
              </div>
              <div className="space-y-4">
                {stages.map((s, i) => (
                  <Reveal key={s.num} delay={i * 0.1} from="right">
                    <div className="flex items-start gap-5 rounded-2xl p-6 transition hover:shadow-xl"
                      style={{ background: C.card, border: `1px solid ${C.border}` }}>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-black text-white"
                        style={{ background: s.color }}>
                        {s.num}
                      </div>
                      <div>
                        <div className="text-xl font-black" style={{ color: C.text }}>{s.title}</div>
                        <p className="mt-2 text-base leading-8" style={{ color: C.textMuted }}>{s.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Service ─── */}
        <section id="service" style={{ background: C.bgAlt }} className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <Reveal>
              <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: C.accent }}>02 — SERVICE</p>
                  <h2 className="serif mt-4 text-4xl font-black text-white lg:text-5xl">タレントキーパーとは</h2>
                </div>
                <p className="max-w-md text-base sm:text-right" style={{ color: C.textMuted }}>
                  継続的な接点を前提に設計された、新入社員の定着支援サービスです。
                </p>
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((f, i) => (
                <Reveal key={f.num} delay={i * 0.12}>
                  <div className="group h-full rounded-3xl p-8 transition hover:-translate-y-1 hover:shadow-2xl"
                    style={{ background: C.card, border: `1px solid ${C.border}` }}>
                    <span className="text-sm font-black tracking-[0.2em]" style={{ color: C.accent }}>{f.num}</span>
                    <h3 className="serif mt-4 text-2xl font-black text-white">{f.title}</h3>
                    <p className="mt-4 text-base leading-8" style={{ color: C.textMuted }}>{f.text}</p>
                    <div className="mt-6 h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-full"
                      style={{ background: C.accent }} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 3-layer support ─── */}
        <section id="how" style={{ background: C.bg }} className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <Reveal>
              <div className="mb-16">
                <p className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: C.accentRed }}>03 — HOW IT WORKS</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <h2 className="serif text-4xl font-black leading-snug lg:text-5xl" style={{ color: C.text }}>
                    三層サポート体制で<br />漏れなく支える
                  </h2>
                  <p className="max-w-sm text-base sm:text-right" style={{ color: C.textMuted }}>
                    AIと人のハイブリッドで、未解決の課題を早期発見します
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="space-y-8">
              {supports.map(({ Illust, num, title, sub, desc }, i) => (
                <Reveal key={num} from={i % 2 === 0 ? 'left' : 'right'} delay={0.1}>
                  <div className={`grid items-center gap-10 rounded-3xl p-8 lg:p-12 ${i % 2 === 0 ? "lg:grid-cols-[220px_1fr]" : "lg:grid-cols-[1fr_220px]"}`}
                    style={{ background: C.card, border: `1px solid ${C.border}` }}>
                    <div className={`flex justify-center ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                      <div className="h-44 w-44">
                        <Illust />
                      </div>
                    </div>
                    <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-black tracking-[0.2em]" style={{ color: C.accentRed }}>LAYER {num}</span>
                        <span className="rounded-full px-4 py-1 text-sm font-bold"
                          style={{ background: "rgba(239,68,68,0.12)", color: C.accentRed }}>
                          {sub}
                        </span>
                      </div>
                      <h3 className="serif text-3xl font-black" style={{ color: C.text }}>{title}</h3>
                      <p className="mt-4 text-lg leading-9" style={{ color: C.textMuted }}>{desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-8 flex items-start gap-5 rounded-2xl p-7"
                style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)" }}>
                <span className="text-4xl">🔒</span>
                <div>
                  <div className="text-lg font-black" style={{ color: "#38bdf8" }}>高度なセキュリティと中立性を保証</div>
                  <p className="mt-1 text-base leading-8" style={{ color: "#7dd3fc" }}>
                    高度なセキュリティとプライバシー保護を徹底。中立の外部事務局が公正な解決を支援するため、従業員が安心して本音を話せます。
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── Flow ─── */}
        <section style={{ background: C.bgAlt }} className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <Reveal>
              <p className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: C.accent }}>04 — IMPLEMENTATION</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="serif text-4xl font-black text-white lg:text-5xl">最短3週間で<br />導入完了</h2>
                <p className="max-w-sm text-base sm:text-right" style={{ color: C.textMuted }}>設計から改善まで伴走サポートします</p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "WEEK 1",   title: "設計・カスタマイズ", desc: "企業規模・ニーズに合わせたフォロー設計とKPI設定", color: "#0ea5e9" },
                { step: "WEEK 2",   title: "周知・準備",         desc: "従業員への案内、アカウント設定、既存制度との連携確認", color: "#a78bfa" },
                { step: "WEEK 3–4", title: "配信スタート",       desc: "定期フォロー開始。継続的な接点創出をスタートします", color: "#34d399" },
                { step: "MONTHLY",  title: "レポート＆改善",     desc: "ダッシュボードで状態を可視化しPDCAを回します", color: C.highlight },
              ].map((f, i) => (
                <Reveal key={f.step} delay={i * 0.1}>
                  <div className="relative rounded-2xl p-7 h-full" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                    {i < 3 && (
                      <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block" style={{ color: C.textDim }}>
                        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    )}
                    <div className="mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-black text-white" style={{ background: f.color }}>
                      {f.step}
                    </div>
                    <div className="serif text-xl font-black text-white">{f.title}</div>
                    <p className="mt-3 text-base leading-8" style={{ color: C.textMuted }}>{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── KPI ─── */}
        {/* ─── KPI ─── */}
        <section style={{ background: C.bg }} className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <Reveal>
              <h2 className="serif mb-12 text-center text-3xl font-black" style={{ color: C.text }}>数字で見る導入効果</h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: "90%+",    label: "継続利用率",              sub: "導入企業の実績値",          color: "#a78bfa" },
                { value: "40〜70%", label: "チャットボット利用率",     sub: "一般的なチャットは数%",     color: "#0ea5e9" },
                { value: "100万円+", label: "1名退職による損失額",     sub: "採用・教育・機会損失の合計", color: C.accentRed },
                { value: "86.8%",   label: "入社1ヶ月以内に不安を感じる", sub: "最大のクリティカル期間",  color: C.accent },
              ].map((k, i) => (
                <Reveal key={k.label} delay={i * 0.1}>
                  <div className="rounded-2xl p-8 text-center flex flex-col gap-2" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                    <div className="serif text-4xl font-black" style={{ color: k.color }}>{k.value}</div>
                    <div className="text-base font-black" style={{ color: C.text }}>{k.label}</div>
                    <div className="text-xs font-bold" style={{ color: C.textDim }}>{k.sub}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Case Studies ─── */}
        <section style={{ background: C.bgAlt }} className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <Reveal>
              <p className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: C.accent }}>CASE STUDIES</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="serif text-4xl font-black lg:text-5xl" style={{ color: C.text }}>
                  早期離職を防いだ<br />4社の選択
                </h2>
                <p className="max-w-sm text-base sm:text-right" style={{ color: C.textMuted }}>
                  実際の導入企業における、課題・取り組み・成果
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {[
                {
                  id: "CASE 01", company: "G社", industry: "介護施設（複数拠点）",
                  before: "新人が早期退職し採用コストが重荷に。離職の兆候が見えず、事後対応のみ。「平気そうに見えて実は不安はある」という本音が言えない環境。",
                  action: "チャット相談（約20分）で気軽に相談できる環境を提供。体力的負担や人間関係の違和感を早期キャッチ。",
                  result: "初年度離職率 3%改善",
                  resultSub: "1名あたり30万円のコスト削減",
                  color: "#34d399",
                },
                {
                  id: "CASE 02", company: "N社", industry: "小売業（店舗複数）",
                  before: "事業所内で退職まで完結し、本音が見えない。「退職希望」が実は「異動希望」だったことに気づけない状態。",
                  action: "第三者窓口による本音の収集。短期・中期・長期の段階的アクション計画を策定。",
                  result: "退職を未然に回避",
                  resultSub: "前向きな異動希望を実現",
                  color: "#60a5fa",
                },
                {
                  id: "CASE 03", company: "K社", industry: "医療・介護施設",
                  before: "現場の声が経営層に届かず判断が遅れる。ルール違反の常態化が不満の温床に。愚痴と重要な意見の区別がつかない。",
                  action: "正直な意見の収集と適切な取捨選択。現場運用のグレーゾーンを可視化し、ルール統一を実現。",
                  result: "機会ロス大幅減少",
                  resultSub: "経営判断のスピードが向上",
                  color: "#f59e0b",
                },
                {
                  id: "CASE 04", company: "S社", industry: "スタートアップ",
                  before: "限られた人員で新人フォローが困難。月20時間以上の残業が常態化し、「家族との時間を確保したい」という本音が言えない。",
                  action: "事業所外の相談窓口を設置。ハラスメント疑いを本社へエスカレーション。段階的な対応を実施。",
                  result: "「もっと頑張りたい」",
                  resultSub: "モチベーション向上・定着実現",
                  color: "#f472b6",
                },
              ].map((c, i) => (
                <Reveal key={c.id} delay={i * 0.1}>
                  <div className="rounded-3xl p-8 h-full flex flex-col gap-5"
                    style={{ background: C.card, border: `1px solid ${C.border}` }}>
                    {/* ヘッダー */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-black tracking-[0.2em]" style={{ color: C.textDim }}>{c.id}</span>
                        <h3 className="serif mt-1 text-2xl font-black" style={{ color: C.text }}>{c.company}</h3>
                        <span className="text-sm font-bold" style={{ color: C.textMuted }}>{c.industry}</span>
                      </div>
                      <div className="rounded-full px-4 py-1.5 text-xs font-black shrink-0"
                        style={{ background: `${c.color}18`, color: c.color, border: `1px solid ${c.color}40` }}>
                        導入事例
                      </div>
                    </div>

                    {/* Before */}
                    <div className="rounded-xl p-4" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                      <p className="text-xs font-black tracking-wide mb-2" style={{ color: "#f87171" }}>BEFORE — 導入前の課題</p>
                      <p className="text-sm leading-7" style={{ color: C.textMuted }}>{c.before}</p>
                    </div>

                    {/* Action */}
                    <div className="rounded-xl p-4" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
                      <p className="text-xs font-black tracking-wide mb-2" style={{ color: "#818cf8" }}>ACTION — 取り組み</p>
                      <p className="text-sm leading-7" style={{ color: C.textMuted }}>{c.action}</p>
                    </div>

                    {/* Result */}
                    <div className="mt-auto rounded-xl p-5 text-center"
                      style={{ background: `${c.color}12`, border: `1px solid ${c.color}30` }}>
                      <p className="serif text-2xl font-black" style={{ color: c.color }}>{c.result}</p>
                      <p className="mt-1 text-sm font-bold" style={{ color: C.textMuted }}>{c.resultSub}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section style={{ background: C.bg }} className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <Reveal>
              <p className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: C.accentRed }}>VOICE</p>
              <h2 className="serif mt-4 text-4xl font-black lg:text-5xl" style={{ color: C.text }}>
                導入した人たちの<br />リアルな声
              </h2>
            </Reveal>

            {/* 従業員の声 */}
            <div className="mt-14">
              <Reveal>
                <p className="text-sm font-black tracking-[0.15em] mb-6" style={{ color: C.textDim }}>
                  ── 従業員から
                </p>
              </Reveal>
              <div className="grid gap-5 md:grid-cols-3">
                {[
                  { text: "めっちゃこれいいです。チャットの形で話ができるので。自然と話せます", role: "IT カスタマーサクセス職" },
                  { text: "社内の人か、社外の人が選べるのがいいです。自分が悪いのか、環境が悪いのか、第三者に判断してもらいたい時があります", role: "不動産 営業職" },
                  { text: "このようなシステムを導入している、というだけで、会社が従業員を大切にしている思いを感じます。早期に辞めてしまった会社にも入れてほしかった…", role: "元 介護職" },
                ].map((v, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="rounded-2xl p-7 h-full flex flex-col gap-4"
                      style={{ background: C.card, border: `1px solid ${C.border}` }}>
                      <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                        <path d="M0 20V12.5C0 5.5 4 1.5 12 0L13.5 2.5C9.5 3.5 7.5 6 7.5 9.5H12V20H0ZM16 20V12.5C16 5.5 20 1.5 28 0L29.5 2.5C25.5 3.5 23.5 6 23.5 9.5H28V20H16Z"
                          fill={`${C.accent}40`} />
                      </svg>
                      <p className="text-base leading-8 flex-1" style={{ color: C.text }}>「{v.text}」</p>
                      <p className="text-sm font-black" style={{ color: C.textDim }}>— {v.role}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* 法人担当者の声 */}
            <div className="mt-14">
              <Reveal>
                <p className="text-sm font-black tracking-[0.15em] mb-6" style={{ color: C.textDim }}>
                  ── 導入企業 HR・経営担当から
                </p>
              </Reveal>
              <div className="grid gap-5 md:grid-cols-2">
                {[
                  { company: "G社", text: "1名の離職を防ぐだけでも採用コストは平均30万円ほどかかるため、大きな成果につながります。初年度には離職率を3%改善することができました。" },
                  { company: "K社", text: "正直な意見の中には愚痴のようなものも含まれますが、それらを適切に取捨選択しています。早期に判断できるようになり、機会ロスが大幅に減少しました。" },
                  { company: "N社", text: "これまで事業所内で完結してしまい、拾いきれていなかった従業員の生の声を収集できるようになりました。前向きな異動希望を叶えることも可能になりました。" },
                  { company: "S社", text: "面談したスタッフから『事業所以外で相談できる場があることで、もっと頑張りたい』との声があり、効果を実感しました。未来につながる仕組みの重要性を感じています。" },
                ].map((v, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="flex gap-5 rounded-2xl p-7"
                      style={{ background: C.card, border: `1px solid ${C.border}` }}>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                        style={{ background: C.accent }}>{v.company}</div>
                      <div>
                        <p className="text-base leading-8" style={{ color: C.textMuted }}>「{v.text}」</p>
                        <p className="mt-3 text-sm font-black" style={{ color: C.textDim }}>— {v.company} HR・経営担当</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Pricing ─── */}
        <section id="pricing" style={{ background: C.bgAlt }} className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">

            {/* ROI アンカー */}
            <Reveal>
              <div className="mb-14 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
                style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                <div className="text-4xl shrink-0">💡</div>
                <div>
                  <p className="text-base font-black" style={{ color: C.accent }}>
                    1名の早期離職コスト ＝ 約<span className="text-2xl">150万円</span>（採用費・教育費・引き継ぎコストの合計）
                  </p>
                  <p className="mt-1 text-base" style={{ color: C.textMuted }}>
                    月額5万円で、その損失を1件防ぐだけで <strong style={{ color: C.highlight }}>30倍のROI</strong>。
                    離職を「コスト」ではなく「投資対効果」で考える企業が選んでいます。
                  </p>
                </div>
              </div>
            </Reveal>

            {/* ヘッダー + トグル */}
            <Reveal>
              <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                <div>
                  <p className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: C.accentRed }}>05 — PRICING</p>
                  <h2 className="serif mt-4 text-4xl font-black lg:text-5xl" style={{ color: C.text }}>料金プラン</h2>
                  <p className="mt-3 text-base" style={{ color: C.textMuted }}>フォロー期間・対象人数に応じて柔軟にお見積りします</p>
                </div>
              </div>
            </Reveal>

            {/* プランカード 2枚 + カスタム誘導 */}
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr_auto] items-start mb-10">
              {/* 2プランカード */}
              {plans.map((plan, i) => (
                <Reveal key={plan.name} delay={i * 0.1}>
                  <div className="relative rounded-3xl p-8 h-full flex flex-col transition hover:-translate-y-1"
                    style={{
                      background: plan.recommended ? C.accent : C.card,
                      border: plan.recommended ? `2px solid ${C.accent}` : `1px solid ${C.border}`,
                      boxShadow: plan.recommended ? `0 24px 60px rgba(245,158,11,0.22)` : "none",
                    }}>
                    {plan.recommended && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-5 py-1 text-xs font-black text-white"
                        style={{ background: "#d97706" }}>
                        ★ いちばん選ばれています
                      </div>
                    )}
                    <div className="text-xs font-black tracking-[0.2em] mb-2"
                      style={{ color: plan.recommended ? "rgba(255,255,255,0.65)" : C.textDim }}>
                      {plan.nameEn}
                    </div>
                    <h3 className="serif text-2xl font-black text-white">{plan.name}</h3>

                    <div className="mt-5 flex items-end gap-1">
                      <span className="text-sm font-bold" style={{ color: plan.recommended ? "rgba(255,255,255,0.65)" : C.textDim }}>月額</span>
                      <span className="serif text-4xl font-black text-white">¥{plan.price}</span>
                      <span className="mb-1 text-sm font-bold" style={{ color: plan.recommended ? "rgba(255,255,255,0.65)" : C.textDim }}>（税別）</span>
                    </div>

                    <div className="my-5 h-px" style={{ background: plan.recommended ? "rgba(255,255,255,0.2)" : C.border }} />

                    <ul className="space-y-3 flex-1">
                      {[
                        ["最大同時フォロー", plan.maxFollow],
                        ["月の目安", plan.guideline],
                        ["お悩み面談", plan.slots],
                        ["推奨規模", plan.target],
                      ].map(([k, v]) => (
                        <li key={k} className="flex flex-col gap-0.5">
                          <span className="text-xs font-black tracking-wide"
                            style={{ color: plan.recommended ? "rgba(255,255,255,0.5)" : C.textDim }}>{k}</span>
                          <span className="text-sm font-bold"
                            style={{ color: plan.recommended ? "white" : C.text }}>{v}</span>
                        </li>
                      ))}
                    </ul>

                    <a href="#contact"
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-black transition hover:opacity-80"
                      style={{ background: plan.recommended ? "rgba(0,0,0,0.18)" : C.accent, color: "white" }}>
                      無料デモを予約する
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </div>
                </Reveal>
              ))}

              {/* カスタムプラン — カードにしない */}
              <Reveal delay={0.2}>
                <div className="rounded-3xl p-8 flex flex-col gap-4 lg:w-64"
                  style={{ border: `1px dashed ${C.border}`, background: "transparent" }}>
                  <p className="text-xs font-black tracking-[0.2em]" style={{ color: C.textDim }}>CUSTOM</p>
                  <p className="serif text-xl font-black" style={{ color: C.textMuted }}>規模・ニーズに<br />合わせて設計</p>
                  <p className="text-sm leading-7" style={{ color: C.textDim }}>
                    フォロー期間・対象人数・オプション構成など、実態に合わせてお見積りします。
                  </p>
                  <a href="#contact" className="text-sm font-black transition hover:opacity-70"
                    style={{ color: C.accent }}>
                    カスタムプランを相談する →
                  </a>
                </div>
              </Reveal>
            </div>

            {/* 機能比較テーブル（2プランのみ） */}
            <Reveal>
              <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
                <div className="grid grid-cols-3 text-sm font-black tracking-wide"
                  style={{ background: C.card }}>
                  <div className="p-4" style={{ color: C.textDim }}>プラン比較</div>
                  {plans.map((p) => (
                    <div key={p.nameEn} className="p-4 text-center"
                      style={{ color: p.recommended ? C.accent : C.textMuted }}>
                      {p.nameEn}
                    </div>
                  ))}
                </div>
                {featureMatrix.map((row, i) => (
                  <div key={row.label} className="grid grid-cols-3 text-sm"
                    style={{ background: i % 2 === 0 ? C.bgAlt : "rgba(30,41,59,0.4)", borderTop: `1px solid ${C.border}` }}>
                    <div className="p-4 font-semibold" style={{ color: C.textMuted }}>{row.label}</div>
                    {[row.basic, row.premium].map((val, j) => (
                      <div key={j} className="p-4 flex items-center justify-center">
                        {val === true ? (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#34d399" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        ) : val === false ? (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#374151" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <span className="rounded-full px-3 py-0.5 text-xs font-black"
                            style={{ background: "rgba(245,158,11,0.12)", color: C.accent }}>
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
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-bold" style={{ color: C.textDim }}>
                {["✓ 最低契約期間なし", "✓ 初月無料トライアルあり", "✓ クレジットカード不要", "✓ 即日ご対応"].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </Reveal>

          </div>
        </section>

        {/* ─── Contact ─── */}
        <section id="contact" style={{ background: C.nav, position: 'relative', overflow: 'hidden' }} className="py-24">
          <div className="hero-orb hero-orb-contact" />
          <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] items-start">

              {/* 左：見出し＋安心材料 */}
              <Reveal>
                <p className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: C.accent }}>06 — CONTACT</p>
                <h2 className="serif mt-5 text-4xl font-black text-white lg:text-5xl">
                  まずは、<br />無料でご相談を
                </h2>
                <p className="mt-6 text-lg leading-9" style={{ color: C.textMuted }}>
                  どのタイミングの離職・定着に課題があるのかを伺いながら、活用イメージを一緒に整理します。
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "返信は通常1〜2営業日以内",
                    "3ヶ月トライアルからでもOK",
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
                <div className="rounded-3xl p-8 lg:p-10" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                  {formStatus === 'sent' ? (
                    <div className="text-center py-10">
                      <div className="text-5xl mb-4">✅</div>
                      <h3 className="serif text-2xl font-black text-white">送信しました！</h3>
                      <p className="mt-3 text-base" style={{ color: C.textMuted }}>
                        1〜2営業日以内にご連絡いたします。
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        {/* 会社名 */}
                        <div>
                          <label className="block text-sm font-black mb-2" style={{ color: C.textMuted }}>
                            会社名 <span style={{ color: C.accentRed }}>*</span>
                          </label>
                          <input type="text" name="company" required value={formData.company} onChange={handleFormChange}
                            placeholder="株式会社〇〇"
                            className="w-full rounded-xl px-4 py-3 text-base outline-none transition"
                            style={{ background: C.bgAlt, border: `1px solid ${C.border}`, color: C.text }}
                            onFocus={e => e.target.style.borderColor = C.accent}
                            onBlur={e => e.target.style.borderColor = C.border} />
                        </div>
                        {/* お名前 */}
                        <div>
                          <label className="block text-sm font-black mb-2" style={{ color: C.textMuted }}>
                            お名前 <span style={{ color: C.accentRed }}>*</span>
                          </label>
                          <input type="text" name="name" required value={formData.name} onChange={handleFormChange}
                            placeholder="山田 太郎"
                            className="w-full rounded-xl px-4 py-3 text-base outline-none transition"
                            style={{ background: C.bgAlt, border: `1px solid ${C.border}`, color: C.text }}
                            onFocus={e => e.target.style.borderColor = C.accent}
                            onBlur={e => e.target.style.borderColor = C.border} />
                        </div>
                      </div>

                      {/* メールアドレス */}
                      <div>
                        <label className="block text-sm font-black mb-2" style={{ color: C.textMuted }}>
                          メールアドレス <span style={{ color: C.accentRed }}>*</span>
                        </label>
                        <input type="email" name="email" required value={formData.email} onChange={handleFormChange}
                          placeholder="taro@company.co.jp"
                          className="w-full rounded-xl px-4 py-3 text-base outline-none transition"
                          style={{ background: C.bgAlt, border: `1px solid ${C.border}`, color: C.text }}
                          onFocus={e => e.target.style.borderColor = C.accent}
                          onBlur={e => e.target.style.borderColor = C.border} />
                      </div>

                      {/* 従業員規模 */}
                      <div>
                        <label className="block text-sm font-black mb-2" style={{ color: C.textMuted }}>
                          年間採用人数（目安）
                        </label>
                        <select name="size" value={formData.size} onChange={handleFormChange}
                          className="w-full rounded-xl px-4 py-3 text-base outline-none transition"
                          style={{ background: C.bgAlt, border: `1px solid ${C.border}`, color: formData.size ? C.text : C.textDim }}>
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
                        <label className="block text-sm font-black mb-2" style={{ color: C.textMuted }}>
                          お問い合わせ内容
                        </label>
                        <textarea name="message" rows={4} value={formData.message} onChange={handleFormChange}
                          placeholder="課題や気になる点をご記入ください（任意）"
                          className="w-full rounded-xl px-4 py-3 text-base outline-none transition resize-none"
                          style={{ background: C.bgAlt, border: `1px solid ${C.border}`, color: C.text }}
                          onFocus={e => e.target.style.borderColor = C.accent}
                          onBlur={e => e.target.style.borderColor = C.border} />
                      </div>

                      {/* エラー */}
                      {formStatus === 'error' && (
                        <p className="text-sm font-bold" style={{ color: C.accentRed }}>
                          送信に失敗しました。時間をおいて再度お試しください。
                        </p>
                      )}

                      {/* 送信ボタン */}
                      <button type="submit" disabled={formStatus === 'sending'}
                        className="w-full rounded-full py-4 text-lg font-black text-white transition hover:opacity-80 disabled:opacity-50"
                        style={{ background: C.accent }}>
                        {formStatus === 'sending' ? '送信中...' : '無料で相談する →'}
                      </button>

                      <p className="text-center text-xs font-bold" style={{ color: C.textDim }}>
                        送信後、1〜2営業日以内にご返信します
                      </p>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: "#030712", borderTop: `1px solid ${C.border}` }} className="py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: C.accent }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                  </svg>
                </div>
                <span className="serif text-lg font-black text-white">TalentKeeper</span>
              </div>
              <div className="flex gap-8">
                {[["SERVICE", "#service"], ["HOW IT WORKS", "#how"], ["PRICING", "#pricing"]].map(([label, href]) => (
                  <a key={label} href={href} className="text-xs font-bold tracking-[0.1em]" style={{ color: C.textDim }}>{label}</a>
                ))}
                <a href="https://www.robottte.com/" target="_blank" rel="noopener noreferrer"
                  className="text-xs font-bold tracking-[0.1em]" style={{ color: C.textDim }}>運営会社</a>
              </div>
              <p className="text-sm font-bold" style={{ color: C.textDim }}>© 2025 TalentKeeper.</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
