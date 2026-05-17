import { useState, useEffect, useRef } from 'react';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [billing, setBilling] = useState('annual'); // 'annual' | 'monthly'
  const [formData, setFormData] = useState({ company: '', name: '', email: '', size: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | sent | error

  const navLinks = [["SERVICE", "#how"], ["HOW IT WORKS", "#how"], ["PRICING", "#pricing"], ["CONTACT", "#contact"]];

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
    // ライト（ナビ・ヒーロー）
    nav:       "#ffffff",
    // ダーク（コンタクト・フッター用）
    darkBg:    "#0b1220",
    darkCard:  "#1e293b",
    cardDark:  "#0f172a",
    text:      "#f1f5f9",
    textMuted: "#94a3b8",
    textDim:   "#64748b",
    border:    "rgba(255,255,255,0.08)",

    // ライト（コンテンツセクション）
    bg:        "#ffffff",
    bgAlt:     "#f8fafc",
    card:      "#ffffff",
    lt:        "#0f172a",
    ltMuted:   "#475569",
    ltDim:     "#94a3b8",
    ltBorder:  "rgba(15,23,42,0.08)",

    // ブランド: ネイビー基調 + 橙CTA
    accent:    "#1e3a8a",   // ラベル・見出し下線・タグなど編集アクセント
    accentDeep:"#172554",   // 強いネイビー（バッジ等）
    cta:       "#d97706",   // CTA ボタン専用
    ctaLight:  "#f59e0b",   // CTA hover / ホットな数字（30倍ROIなど）
    accentRed: "#dc2626",   // フォーム必須 * とエラーのみ使用
  };

  const features = [
    { num: "01", title: "入社後フォロー継続支援", text: "入社直後から定着まで、継続的な接点を設計。担当者任せになりがちなフォローを、仕組みとして回しやすくします。" },
    { num: "02", title: "離職予兆の早期把握", text: "大きな問題になる前の小さな違和感を拾い、早い段階で把握。手遅れになる前の対応につなげます。" },
    { num: "03", title: "エンゲージメント可視化", text: "入社者ごとの状態変化を見える化し、どこに支援が必要かを整理。現場と人事が同じ景色を見やすくします。" },
  ];

  const supports = [
    { num: "01", title: "AIチャットボット", sub: "24時間 365日対応", desc: "いつでも吐き出せる場所をつくります。職場の悩みは夜や休日に増大するため、24時間体制で小さな声を受け止めます。" },
    { num: "02", title: "事務局ウォッチ",   sub: "専門スタッフが継続監視", desc: "AIが集めた情報を専門スタッフが継続モニタリング。未解決の課題を早期に掬い上げ、必要に応じてエスカレーションします。" },
    { num: "03", title: "専門家相談",       sub: "産業カウンセラーが対応", desc: "中立の外部機関だからこそ話せる本音があります。産業カウンセラーや人事のプロが、深い悩みに丁寧に向き合います。" },
  ];

  const plans = [
    {
      name: "スタンダード", nameEn: "BASIC",
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
            <a href="#" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: C.cta }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
              </div>
              <span className="serif text-xl font-semibold tracking-[0.08em]" style={{ color: C.lt }}>TalentKeeper<sup style={{ fontSize: "0.6em", letterSpacing: 0 }}>®</sup></span>
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
                    style={{ background: "rgba(30,58,138,0.06)", color: C.accent, border: `1px solid rgba(30,58,138,0.18)` }}>
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
                    {[["3週間〜", "最短導入期間"], ["24 / 365", "サポート対応"], ["3層", "サポート体制"], ["30×", "ROI試算"]].map(([v, l]) => (
                      <div key={l}>
                        <div className="serif text-3xl font-bold" style={{ color: C.accent }}>{v}</div>
                        <div className="mt-0.5 text-sm font-bold" style={{ color: C.ltDim }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* stat card */}
              <Reveal from="right" delay={0.2}>
                <div className="border-l pl-8 py-2" style={{ borderColor: C.ltBorder }}>
                  <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: C.accent }}>実態データ</p>
                  <p className="mt-3 text-sm" style={{ color: C.ltDim }}>パーソル総合研究所 ほか</p>

                  <div className="mt-8 space-y-7">
                    {[
                      { label: "入社後1年で未解決の不安を抱える割合", value: "60.6", unit: "%" },
                      { label: "最も不安のピークを迎えるタイミング", value: "入社1", unit: "ヶ月" },
                      { label: "早期離職の採用コストロス倍率", value: "約3", unit: "倍" },
                    ].map((s, i) => (
                      <div key={s.label} className="flex items-baseline gap-5">
                        <span className="font-semibold text-xs tabular-nums" style={{ color: C.ltDim, minWidth: '1.5em' }}>0{i + 1}</span>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-1">
                            <span className="serif text-5xl font-bold leading-none" style={{ color: C.lt }}>{s.value}</span>
                            <span className="serif text-xl font-bold" style={{ color: C.lt }}>{s.unit}</span>
                          </div>
                          <p className="mt-2 text-sm leading-6" style={{ color: C.ltMuted }}>{s.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
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
              {supports.map(({ num, title, sub, desc }, i) => (
                <Reveal key={num} delay={i * 0.08}>
                  <div className="grid gap-8 py-12 lg:py-14 lg:grid-cols-[140px_1fr_auto] lg:gap-12 items-baseline border-t"
                    style={{ borderColor: C.ltBorder }}>
                    <div className="serif text-6xl lg:text-7xl font-bold leading-none tabular-nums" style={{ color: C.lt }}>
                      {num}
                    </div>
                    <div>
                      <h3 className="serif text-3xl lg:text-4xl font-bold leading-tight" style={{ color: C.lt }}>{title}</h3>
                      <p className="mt-5 text-base lg:text-lg leading-8 max-w-2xl" style={{ color: C.ltMuted }}>{desc}</p>
                    </div>
                    <div className="text-xs font-semibold tracking-[0.16em] uppercase whitespace-nowrap lg:text-right lg:pt-2"
                      style={{ color: C.accent }}>
                      {sub}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-6 flex items-start gap-5 rounded-xl p-7"
                style={{ background: "#f8fafc", border: `1px solid ${C.ltBorder}` }}>
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
                  従業員の「孤独な夜」に寄り添えるのは、24時間有人対応だけです
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
                        ["24h即応", "緊急・夜間の対応"],
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
                        note: "営業時間外（7〜8割）も有人即応。専門家＋人事で解決まで伴走",
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
                  <strong style={{ color: C.lt }}>AI任せではなく、専任スタッフが常時対応。</strong>
                  従業員の相談は7〜8割が営業時間外に発生します。その瞬間に寄り添える仕組みが、定着率を変えます。
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
                  <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: C.accent }}>ROI</p>
                  <p className="mt-2 text-base font-bold leading-7" style={{ color: C.lt }}>
                    1名の早期離職コスト ＝ 約<span className="text-2xl">150万円</span><span className="text-sm font-medium" style={{ color: C.ltMuted }}>（採用費・教育費・引き継ぎコストの合計）</span>
                  </p>
                  <p className="mt-2 text-base leading-7" style={{ color: C.ltMuted }}>
                    月額5万円〜。その損失を1件防ぐだけで <strong style={{ color: C.cta }}>30倍のROI</strong>。
                    離職を「コスト」ではなく「投資対効果」で考える企業が選んでいます。
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
                            background: billing === key ? 'rgba(0,0,0,0.18)' : 'rgba(30,58,138,0.12)',
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
                    /* Basic / Premium カード */
                    <div className="relative rounded-xl p-8 h-full flex flex-col transition hover:-translate-y-0.5"
                      style={{
                        background: plan.recommended ? C.accent : C.card,
                        border: plan.recommended ? `1px solid ${C.accent}` : `1px solid ${C.ltBorder}`,
                        boxShadow: plan.recommended ? `0 12px 40px rgba(15,23,42,0.12)` : "none",
                      }}>
                      {plan.recommended && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-[10px] font-semibold tracking-[0.18em] text-white uppercase"
                          style={{ background: C.cta }}>
                          {billing === 'annual' ? 'Most Popular — 20% OFF' : 'Most Popular'}
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
                            style={{ background: "rgba(30,58,138,0.12)", color: C.accent }}>
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
                  "✓ 初月無料トライアルあり",
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
                  a: "月次契約と年次契約の2種類からお選びいただけます。年次契約（一括払い）は月次契約より33%お得です（例：Basicプランなら月次¥75,000→年次¥50,000）。初月無料トライアル終了後にどちらかを選んでいただく流れです。離職防止の効果は6〜12ヶ月で実感いただけることが多いため、年次契約でじっくり取り組まれる企業が多数です。",
                },
                {
                  q: "従業員の相談内容は会社に筒抜けになりますか？",
                  a: "なりません。個人を特定できる情報は厳しく管理し、会社には集計・傾向レポートのみを共有します。「会社に知られるかも」という恐怖があると従業員が使わなくなるため、中立性と守秘義務の担保を最優先にしています。",
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
                <div className="rounded-xl p-8 lg:p-10" style={{ background: C.card, border: `1px solid ${C.ltBorder}`, boxShadow: "0 24px 60px rgba(15,23,42,0.25)" }}>
                  {formStatus === 'sent' ? (
                    <div className="text-center py-10">
                      <div className="mb-5 mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "rgba(30,58,138,0.08)" }}>
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
                        style={{ background: "rgba(30,58,138,0.06)", color: C.accent }}>
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
        <footer style={{ background: "#030712", borderTop: `1px solid ${C.border}` }} className="py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: C.cta }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                  </svg>
                </div>
                <span className="serif text-lg font-bold text-white">TalentKeeper<sup style={{ fontSize: "0.6em", letterSpacing: 0 }}>®</sup></span>
              </div>
              <div className="flex gap-8">
                {[["SERVICE", "#service"], ["HOW IT WORKS", "#how"], ["PRICING", "#pricing"]].map(([label, href]) => (
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
