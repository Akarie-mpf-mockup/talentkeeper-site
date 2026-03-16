/* ── SVG イラストコンポーネント ── */

function IllustChatbot() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* 背景円 */}
      <circle cx="60" cy="60" r="56" fill="#fff3e0" />
      {/* ロボット本体 */}
      <rect x="32" y="46" width="56" height="42" rx="14" fill="#fb923c" />
      {/* ロボット頭 */}
      <rect x="38" y="24" width="44" height="30" rx="12" fill="#fdba74" />
      {/* アンテナ */}
      <line x1="60" y1="24" x2="60" y2="14" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="12" r="4" fill="#f97316" />
      {/* 目 */}
      <circle cx="49" cy="36" r="5" fill="white" />
      <circle cx="71" cy="36" r="5" fill="white" />
      <circle cx="50" cy="37" r="3" fill="#7c2d12" />
      <circle cx="72" cy="37" r="3" fill="#7c2d12" />
      {/* 口 */}
      <path d="M50 46 Q60 52 70 46" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* チャットバブル */}
      <rect x="72" y="18" width="34" height="22" rx="8" fill="white" />
      <path d="M76 40 L70 46 L80 40Z" fill="white" />
      <circle cx="82" cy="29" r="2.5" fill="#fb923c" />
      <circle cx="89" cy="29" r="2.5" fill="#fb923c" />
      <circle cx="96" cy="29" r="2.5" fill="#fb923c" />
      {/* 体のボタン */}
      <circle cx="52" cy="62" r="5" fill="#fef3c7" />
      <circle cx="68" cy="62" r="5" fill="#fef3c7" />
      {/* 腕 */}
      <rect x="18" y="52" width="16" height="8" rx="4" fill="#fdba74" />
      <rect x="86" y="52" width="16" height="8" rx="4" fill="#fdba74" />
    </svg>
  );
}

function IllustMonitor() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* 背景円 */}
      <circle cx="60" cy="60" r="56" fill="#fef3c7" />
      {/* 人物 */}
      <circle cx="60" cy="30" r="14" fill="#fbbf24" />
      {/* 髪 */}
      <path d="M46 28 Q50 16 60 18 Q70 16 74 28" fill="#92400e" />
      {/* 顔パーツ */}
      <circle cx="54" cy="29" r="2.5" fill="#3b1f0e" />
      <circle cx="66" cy="29" r="2.5" fill="#3b1f0e" />
      <path d="M55 36 Q60 40 65 36" stroke="#3b1f0e" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* 体 */}
      <path d="M44 60 Q44 50 60 48 Q76 50 76 60 L78 82 H42 Z" fill="#f59e0b" />
      {/* 虫眼鏡 */}
      <circle cx="84" cy="50" r="14" stroke="#b45309" strokeWidth="4" fill="#fef9c3" />
      <line x1="94" y1="60" x2="104" y2="72" stroke="#b45309" strokeWidth="5" strokeLinecap="round" />
      {/* 虫眼鏡の中のグラフ */}
      <polyline points="76,55 80,50 84,53 88,46 92,49" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* ハート */}
      <path d="M56 72 C56 70 53 67 50 69 C47 71 47 75 50 78 L56 84 L62 78 C65 75 65 71 62 69 C59 67 56 70 56 72Z" fill="#fb923c" />
    </svg>
  );
}

function IllustCounselor() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* 背景円 */}
      <circle cx="60" cy="60" r="56" fill="#fce7f3" />
      {/* 左の人（相談員）*/}
      <circle cx="36" cy="32" r="12" fill="#fbbf24" />
      <path d="M24 58 Q24 48 36 46 Q48 48 48 58 L50 76 H22 Z" fill="#f59e0b" />
      <circle cx="32" cy="31" r="2" fill="#3b1f0e" />
      <circle cx="40" cy="31" r="2" fill="#3b1f0e" />
      <path d="M33 37 Q36 40 39 37" stroke="#3b1f0e" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* 右の人（社員）*/}
      <circle cx="82" cy="32" r="12" fill="#fb923c" />
      <path d="M70 58 Q70 48 82 46 Q94 48 94 58 L96 76 H68 Z" fill="#fdba74" />
      <circle cx="78" cy="31" r="2" fill="#3b1f0e" />
      <circle cx="86" cy="31" r="2" fill="#3b1f0e" />
      {/* 悩み顔（右） */}
      <path d="M79 38 Q82 35 85 38" stroke="#3b1f0e" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* 吹き出し（左→右） */}
      <rect x="42" y="14" width="36" height="20" rx="8" fill="white" />
      <path d="M56 34 L52 40 L62 34Z" fill="white" />
      {/* ハート */}
      <path d="M54 21 C54 19.5 52 17.5 50 19 C48 20.5 48 23.5 50 25.5 L54 29 L58 25.5 C60 23.5 60 20.5 58 19 C56 17.5 54 19.5 54 21Z" fill="#f472b6" />
      <text x="63" y="27" fontSize="8" fill="#f97316" fontWeight="bold">♪</text>
      {/* 絆のライン */}
      <path d="M48 78 Q60 68 70 78" stroke="#f97316" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="4 3" />
    </svg>
  );
}

/* ── メインコンポーネント ── */
export default function TalentKeeperLandingPage() {
  // 暖色パレット
  const C = {
    bg:       "#fdf6ee",   // 温かみのあるクリーム
    bgAlt:    "#fff9f3",   // 薄いアイボリー
    dark:     "#2c1810",   // 濃い温かブラウン
    darkMid:  "#3d2010",   // 中間ブラウン
    accent:   "#d97706",   // アンバー
    accentRed:"#c2410c",   // 燃えるオレンジ
    warm1:    "#fef3c7",   // 薄いアンバー
    warm2:    "#fff7ed",   // 薄いオレンジ
    muted:    "#92400e",   // 落ち着いたブラウン
    text:     "#3b1f0e",   // 本文ブラウン
  };

  const features = [
    { num: "01", title: "入社後フォロー継続支援", text: "入社直後から定着まで、継続的な接点を設計。担当者任せになりがちなフォローを、仕組みとして回しやすくします。" },
    { num: "02", title: "離職予兆の早期把握", text: "大きな問題になる前の小さな違和感を拾い、早い段階で把握。手遅れになる前の対応につなげます。" },
    { num: "03", title: "エンゲージメント可視化", text: "入社者ごとの状態変化を見える化し、どこに支援が必要かを整理。現場と人事が同じ景色を見やすくします。" },
  ];

  const stages = [
    { num: "01", title: "小さな不満・違和感", desc: "「思っていたのと違う」という小さなモヤモヤが蓄積し始める段階。この時点での対応が最も効果的です。", bg: "#fef3c7", numBg: "#fbbf24" },
    { num: "02", title: "孤立・相談機会の喪失", desc: "誰にも言えず一人で抱え込み、エンゲージメントが静かに、しかし確実に低下していく。", bg: "#fff7ed", numBg: "#fb923c" },
    { num: "03", title: "深刻化・転職検討", desc: "転職サイトへの登録や情報収集が始まり、離職の意思が固まっていく段階。", bg: "#fef2f2", numBg: "#ef4444" },
    { num: "04", title: "組織崩壊・連鎖離職", desc: "エース級人材の離脱を機に組織全体の士気と生産性が急落する最終段階。", bg: "#fdf2f2", numBg: "#c2410c" },
  ];

  const supports = [
    { Illust: IllustChatbot,  num: "01", title: "AIチャットボット", sub: "24時間 365日対応", desc: "いつでも吐き出せる場所をつくります。職場の悩みは夜や休日に増大するため、24時間体制で小さな声を受け止めます。" },
    { Illust: IllustMonitor,  num: "02", title: "事務局ウォッチ",   sub: "専門スタッフが継続監視", desc: "AIが集めた情報を専門スタッフが継続モニタリング。未解決の課題を早期に掬い上げ、必要に応じてエスカレーションします。" },
    { Illust: IllustCounselor,num: "03", title: "専門家相談",       sub: "産業カウンセラーが対応", desc: "中立の外部機関だからこそ話せる本音があります。産業カウンセラーや人事のプロが、深い悩みに丁寧に向き合います。" },
  ];

  const plans = [
    {
      name: "スタンダード", nameEn: "Standard", price: "50,000", note: "30名まで対応",
      features: ["AIチャットボット", "事務局モニタリング", "月次レポート", "メールサポート"],
    },
    {
      name: "プレミアム", nameEn: "Premium", price: "100,000", note: "60名まで対応",
      features: ["スタンダードの全機能", "専門家相談（月2回）", "週次レポート＋ダッシュボード", "カスタマイズ対応", "優先サポート"],
      recommended: true,
    },
    {
      name: "エンタープライズ", nameEn: "Enterprise", price: "要相談", note: "200名以上",
      features: ["プレミアムの全機能", "専門家相談（無制限）", "システム連携・API対応", "職種別・部門別カスタマイズ", "専任担当者アサイン"],
    },
  ];

  return (
    <div style={{ background: C.bg, color: C.text }} className="min-h-screen">

      {/* ─── Navigation ─── */}
      <nav style={{ background: C.dark }} className="sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: C.accent }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
              </svg>
            </div>
            <span className="serif text-xl font-black tracking-wide text-white">TalentKeeper</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {[["SERVICE", "#service"], ["HOW IT WORKS", "#how"], ["PRICING", "#pricing"], ["CONTACT", "#contact"]].map(([label, href]) => (
              <a key={label} href={href} className="text-xs font-bold tracking-[0.15em] transition"
                style={{ color: "#d4a96a" }} onMouseOver={e => e.target.style.color = "white"} onMouseOut={e => e.target.style.color = "#d4a96a"}>
                {label}
              </a>
            ))}
          </div>
          <a href="#contact" className="rounded-full px-6 py-2.5 text-base font-bold text-white transition hover:opacity-80"
            style={{ background: C.accent }}>
            お問い合わせ
          </a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section style={{ background: C.dark }} className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `radial-gradient(ellipse at 75% 40%, ${C.accent} 0%, transparent 55%)` }} />
        <div className="absolute bottom-0 left-0 right-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(ellipse at 30% 100%, #fb923c 0%, transparent 50%)` }} />

        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-24 lg:px-12 lg:pb-32 lg:pt-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold"
                style={{ background: "#4a2c1a", color: C.accent }}>
                <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: C.accent }} />
                新入社員の定着支援サービス
              </div>
              <h1 className="serif text-5xl font-black leading-snug text-white sm:text-6xl lg:text-[3.6rem]">
                入社後の<br />
                <span style={{ color: "#fbbf24" }}>小さな不安</span>を、<br />
                組織崩壊になる前に。
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-9" style={{ color: "#d4b896" }}>
                新入社員の60.6%が1年後も不安を抱え続ける現実。三層サポート体制と24時間対応で、離職リスクを初期段階で察知します。
              </p>
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
                  className="rounded-full border-2 px-8 py-4 text-lg font-bold transition hover:opacity-80"
                  style={{ borderColor: "#5a3a20", color: "#d4b896" }}>
                  サービスを見る
                </a>
              </div>

              {/* mini stats */}
              <div className="mt-12 flex flex-wrap gap-8 border-t pt-8" style={{ borderColor: "#4a2c1a" }}>
                {[["3週間〜", "最短導入期間"], ["24 / 365", "サポート対応"], ["3層", "サポート体制"]].map(([v, l]) => (
                  <div key={l}>
                    <div className="serif text-3xl font-black" style={{ color: "#fbbf24" }}>{v}</div>
                    <div className="mt-0.5 text-sm font-bold" style={{ color: "#a07050" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* stat card */}
            <div>
              <div className="rounded-3xl p-8" style={{ background: "#3d2010" }}>
                <p className="mb-6 text-sm font-black tracking-[0.2em] uppercase" style={{ color: C.accent }}>実態データ</p>
                <div className="space-y-5">
                  {[
                    { label: "入社後1年で未解決の不安を抱える割合", value: "60.6%", bar: 61, color: "#ef4444" },
                    { label: "最も不安のピークを迎えるタイミング", value: "入社1ヶ月", bar: 80, color: "#fbbf24" },
                    { label: "早期離職の採用コストロス倍率", value: "約3倍", bar: 75, color: "#fb923c" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl p-5" style={{ background: "#4a2c1a" }}>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-base" style={{ color: "#c49a6c" }}>{s.label}</span>
                        <span className="serif shrink-0 text-3xl font-black" style={{ color: s.color }}>{s.value}</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full" style={{ background: "#5a3a20" }}>
                        <div className="h-2 rounded-full" style={{ width: `${s.bar}%`, background: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* curve */}
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ display: "block", background: C.bg }}>
          <path d="M0 64 C360 0 1080 0 1440 64 L1440 0 L0 0 Z" fill={C.dark} />
        </svg>
      </section>

      {/* ─── Problem ─── */}
      <section style={{ background: C.bg }} className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <p className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: C.accentRed }}>01 — PROBLEM</p>
              <h2 className="serif mt-4 text-4xl font-black leading-snug lg:text-5xl" style={{ color: C.dark }}>
                見逃される、<br />入社後の<br />小さなサイン
              </h2>
              <p className="mt-6 text-lg leading-9" style={{ color: "#6b3a1f" }}>
                入社直後の期待と現実のギャップが早期離職の主因。小さな不満が段階的に悪化し、最終的に組織崩壊やエース級人材の離脱に至るリスクがあります。
              </p>
              <div className="mt-8 inline-block rounded-full px-6 py-3 text-base font-bold text-white" style={{ background: C.accentRed }}>
                早期ケアが定着率向上の鍵
              </div>
            </div>
            <div className="space-y-4">
              {stages.map((s) => (
                <div key={s.num} className="flex items-start gap-5 rounded-2xl border-2 p-6 transition hover:shadow-lg"
                  style={{ background: s.bg, borderColor: "transparent" }}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-black text-white"
                    style={{ background: s.numBg }}>
                    {s.num}
                  </div>
                  <div>
                    <div className="text-xl font-black" style={{ color: C.dark }}>{s.title}</div>
                    <p className="mt-2 text-base leading-8" style={{ color: "#6b3a1f" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Service ─── */}
      <section id="service" style={{ background: C.dark }} className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: C.accent }}>02 — SERVICE</p>
              <h2 className="serif mt-4 text-4xl font-black text-white lg:text-5xl">タレントキーパーとは</h2>
            </div>
            <p className="max-w-md text-base sm:text-right" style={{ color: "#c49a6c" }}>
              継続的な接点を前提に設計された、新入社員の定着支援サービスです。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.num} className="group rounded-3xl p-8 transition hover:-translate-y-1 hover:shadow-2xl"
                style={{ background: "#3d2010" }}>
                <span className="text-sm font-black tracking-[0.2em]" style={{ color: C.accent }}>{f.num}</span>
                <h3 className="serif mt-4 text-2xl font-black text-white">{f.title}</h3>
                <p className="mt-4 text-base leading-8" style={{ color: "#c49a6c" }}>{f.text}</p>
                <div className="mt-6 h-1 w-10 rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ background: C.accent }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3-layer support ─── */}
      <section id="how" style={{ background: C.bgAlt }} className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: C.accentRed }}>03 — HOW IT WORKS</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="serif text-4xl font-black leading-snug lg:text-5xl" style={{ color: C.dark }}>
                三層サポート体制で<br />漏れなく支える
              </h2>
              <p className="max-w-sm text-base sm:text-right" style={{ color: "#6b3a1f" }}>
                AIと人のハイブリッドで、未解決の課題を早期発見します
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {supports.map(({ Illust, num, title, sub, desc }, i) => (
              <div key={num}
                className={`grid items-center gap-10 rounded-3xl p-8 lg:p-12 ${i % 2 === 0 ? "lg:grid-cols-[220px_1fr]" : "lg:grid-cols-[1fr_220px]"}`}
                style={{ background: "#ffffff", boxShadow: "0 4px 32px rgba(60,30,10,0.07)" }}>
                {/* イラスト */}
                <div className={`flex justify-center ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <div className="h-44 w-44">
                    <Illust />
                  </div>
                </div>
                {/* テキスト */}
                <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-black tracking-[0.2em]" style={{ color: C.accentRed }}>LAYER {num}</span>
                    <span className="rounded-full px-4 py-1 text-sm font-bold"
                      style={{ background: "#fff3e0", color: C.accentRed }}>
                      {sub}
                    </span>
                  </div>
                  <h3 className="serif text-3xl font-black" style={{ color: C.dark }}>{title}</h3>
                  <p className="mt-4 text-lg leading-9" style={{ color: "#6b3a1f" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* security */}
          <div className="mt-8 flex items-start gap-5 rounded-2xl p-7"
            style={{ background: "#e0f2fe", border: "2px solid #bae6fd" }}>
            <span className="text-4xl">🔒</span>
            <div>
              <div className="text-lg font-black" style={{ color: "#0369a1" }}>高度なセキュリティと中立性を保証</div>
              <p className="mt-1 text-base leading-8" style={{ color: "#0284c7" }}>
                高度なセキュリティとプライバシー保護を徹底。中立の外部事務局が公正な解決を支援するため、従業員が安心して本音を話せます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Flow ─── */}
      <section style={{ background: C.dark }} className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: C.accent }}>04 — IMPLEMENTATION</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="serif text-4xl font-black text-white lg:text-5xl">最短3週間で<br />導入完了</h2>
            <p className="max-w-sm text-base sm:text-right" style={{ color: "#c49a6c" }}>設計から改善まで伴走サポートします</p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "WEEK 1",   title: "設計・カスタマイズ", desc: "企業規模・ニーズに合わせたフォロー設計とKPI設定", color: "#0ea5e9" },
              { step: "WEEK 2",   title: "周知・準備",         desc: "従業員への案内、アカウント設定、既存制度との連携確認", color: "#a78bfa" },
              { step: "WEEK 3–4", title: "配信スタート",       desc: "定期フォロー開始。継続的な接点創出をスタートします", color: "#34d399" },
              { step: "MONTHLY",  title: "レポート＆改善",     desc: "ダッシュボードで状態を可視化しPDCAを回します", color: "#fbbf24" },
            ].map((f, i) => (
              <div key={f.step} className="relative rounded-2xl p-7" style={{ background: "#3d2010" }}>
                {i < 3 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block" style={{ color: "#5a3a20" }}>
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                )}
                <div className="mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-black text-white" style={{ background: f.color }}>
                  {f.step}
                </div>
                <div className="serif text-xl font-black text-white">{f.title}</div>
                <p className="mt-3 text-base leading-8" style={{ color: "#c49a6c" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KPI ─── */}
      <section style={{ background: C.bg }} className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 className="serif mb-12 text-center text-3xl font-black" style={{ color: C.dark }}>効果測定で組織の健康状態を可視化</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "💬", value: "85%+", label: "エンゲージメント率",   color: "#0ea5e9" },
              { icon: "🔄", value: "90%+", label: "継続利用率",           color: "#a78bfa" },
              { icon: "📉", value: "30%↓", label: "早期離職率の改善",     color: C.accentRed },
              { icon: "⚡", value: "24h",   label: "サポート対応時間",     color: C.accent },
            ].map((k) => (
              <div key={k.label} className="rounded-2xl p-8 text-center" style={{ background: "#ffffff", boxShadow: "0 2px 20px rgba(60,30,10,0.06)" }}>
                <div className="text-5xl">{k.icon}</div>
                <div className="serif mt-4 text-4xl font-black" style={{ color: k.color }}>{k.value}</div>
                <div className="mt-2 text-base font-bold" style={{ color: "#6b3a1f" }}>{k.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" style={{ background: C.bgAlt }} className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14">
            <p className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: C.accentRed }}>05 — PRICING</p>
            <h2 className="serif mt-4 text-4xl font-black lg:text-5xl" style={{ color: C.dark }}>料金プラン</h2>
            <p className="mt-3 text-lg" style={{ color: "#6b3a1f" }}>対象人数や期間に応じて柔軟に調整可能。トライアル・段階的導入もご相談ください。</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name}
                className="relative rounded-3xl p-9 transition hover:-translate-y-1"
                style={{
                  background: plan.recommended ? C.dark : "#ffffff",
                  boxShadow: plan.recommended ? "0 20px 60px rgba(60,30,10,0.3)" : "0 4px 20px rgba(60,30,10,0.06)"
                }}>
                {plan.recommended && (
                  <div className="absolute right-6 top-6 rounded-full px-4 py-1 text-sm font-black text-white" style={{ background: C.accent }}>
                    おすすめ
                  </div>
                )}
                <div className="text-sm font-black tracking-[0.2em] uppercase" style={{ color: plan.recommended ? C.accent : "#a07050" }}>
                  {plan.nameEn}
                </div>
                <h3 className="serif mt-1 text-2xl font-black" style={{ color: plan.recommended ? "white" : C.dark }}>
                  {plan.name}
                </h3>
                <div className="mt-5 flex items-end gap-1">
                  {plan.price !== "要相談" ? (
                    <>
                      <span className="text-base font-bold" style={{ color: plan.recommended ? "#c49a6c" : "#a07050" }}>月額</span>
                      <span className="serif text-5xl font-black" style={{ color: plan.recommended ? "white" : C.dark }}>¥{plan.price}</span>
                    </>
                  ) : (
                    <span className="serif text-4xl font-black" style={{ color: plan.recommended ? "white" : C.dark }}>要相談</span>
                  )}
                </div>
                <div className="mt-1 text-base font-bold" style={{ color: plan.recommended ? C.accent : "#a07050" }}>{plan.note}</div>
                <div className="my-6 h-px" style={{ background: plan.recommended ? "#4a2c1a" : "#f0e8dc" }} />
                <ul className="space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-base font-semibold"
                      style={{ color: plan.recommended ? "#d4b896" : "#3b1f0e" }}>
                      <svg className="mt-0.5 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24"
                        stroke={plan.recommended ? C.accent : "#16a34a"} strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact"
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-black text-white transition hover:opacity-80"
                  style={{ background: plan.recommended ? C.accent : C.dark }}>
                  このプランで相談する
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" style={{ background: C.dark }} className="py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
          <p className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: C.accent }}>06 — CONTACT</p>
          <h2 className="serif mt-5 text-5xl font-black text-white lg:text-6xl">
            まずは、<br />無料でご相談ください
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-xl leading-9" style={{ color: "#c49a6c" }}>
            どのタイミングの離職・定着に課題があるのかを伺いながら、活用イメージを一緒に整理します。
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <button
              className="inline-flex items-center gap-3 rounded-full px-10 py-5 text-lg font-black text-white shadow-xl transition hover:opacity-80"
              style={{ background: C.accent }}>
              お問い合わせする
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <button
              className="rounded-full border-2 px-10 py-5 text-lg font-black transition hover:opacity-80"
              style={{ borderColor: "#5a3a20", color: "#d4b896" }}>
              資料請求
            </button>
          </div>
          <p className="mt-7 text-base font-bold" style={{ color: "#7a4a2a" }}>
            ご返信は通常1〜2営業日以内 ／ トライアル・段階的導入もお気軽にご相談ください
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1e0e08" }} className="py-12">
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
                <a key={label} href={href} className="text-xs font-bold tracking-[0.1em]" style={{ color: "#7a4a2a" }}>{label}</a>
              ))}
            </div>
            <p className="text-sm font-bold" style={{ color: "#5a3a20" }}>© 2025 TalentKeeper.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
