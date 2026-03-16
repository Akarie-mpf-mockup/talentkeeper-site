export default function TalentKeeperLandingPage() {
  const features = [
    {
      title: "入社後フォロー継続支援",
      text: "入社直後から定着まで、継続的な接点を設計。担当者任せになりがちなフォローを、仕組みとして回しやすくします。",
    },
    {
      title: "離職予兆の早期把握",
      text: "大きな問題になる前の小さな違和感を拾い、早い段階で把握。手遅れになる前の対応につなげます。",
    },
    {
      title: "エンゲージメント可視化",
      text: "入社者ごとの状態変化を見える化し、どこに支援が必要かを整理。現場と人事が同じ景色を見やすくします。",
    },
  ];

  const flow = [
    "入社後の定期フォローを設計",
    "チャットや対話で小さな違和感を収集",
    "状態変化を整理して見える化",
    "必要なタイミングで企業側のフォローへ接続",
  ];

  const scenes = [
    "入社1週間〜3か月の初期定着フォロー",
    "現場配属後の不安や人間関係の違和感把握",
    "既存の面談・相談窓口では拾いにくい本音の把握",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur">
                Talent Keeper
              </div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                入社後の定着を、
                <br />
                継続的に支える。
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                入社後フォローを継続的にサポートし、離職予兆を早期に把握します。スタッフが自律的に定着できる環境づくりを、企業と一緒に考えていきます。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                >
                  お問い合わせ
                </a>
                <a
                  href="#overview"
                  className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  サービスを見る
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">入社後フォロー継続支援</span>
                <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">離職予兆の早期把握</span>
                <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">エンゲージメント可視化</span>
              </div>
            </div>

            <div className="lg:pl-8">
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/60">
                <div className="rounded-[24px] bg-slate-950 p-6 text-white">
                  <p className="text-sm text-slate-300">定着支援イメージ</p>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-emerald-300">STEP 01</p>
                      <p className="mt-1 text-base font-semibold">入社後の継続フォロー</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">定期的な接点をつくり、初期の不安や違和感をため込ませにくくします。</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-emerald-300">STEP 02</p>
                      <p className="mt-1 text-base font-semibold">変化の兆しを把握</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">表面化しづらいサインを拾い、状態の変化を早めに捉えます。</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-emerald-300">STEP 03</p>
                      <p className="mt-1 text-base font-semibold">必要な支援につなぐ</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">人事・現場と連携しながら、定着に向けた次の一手を考えやすくします。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="overview" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-emerald-600">OVERVIEW</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            タレントキーパーとは
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            入社後のスタッフに対して、継続的なフォロー機会をつくり、状態変化や離職の予兆を早めに把握するための支援サービスです。単発のアンケートや一度きりの面談ではなく、継続的な接点を前提に設計します。
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 ring-1 ring-emerald-100" />
              <h3 className="mt-5 text-xl font-semibold text-slate-950">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-emerald-600">HOW IT WORKS</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              継続フォローから、
              離職予兆の把握へ
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-600">
              重要なのは、退職が決まってから気づくことではなく、その前の小さな違和感に気づける状態をつくることです。タレントキーパーは、そのための接点設計と可視化を支援します。
            </p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-5">
              {flow.map((item, index) => (
                <div key={item} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div className="pt-1 text-sm leading-7 text-slate-700">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-300/20">
            <p className="text-sm font-semibold tracking-[0.18em] text-emerald-300">USE CASE</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              こんな場面で活用できます
            </h2>
            <div className="mt-8 space-y-4">
              {scenes.map((scene) => (
                <div key={scene} className="rounded-2xl bg-white/10 px-5 py-4 text-sm leading-7 text-slate-200">
                  {scene}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-emerald-600">MESSAGE</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              定着は、
              気合いではなく仕組みで支える。
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-600">
              現場が忙しいほど、入社者の小さなサインは見落とされやすくなります。だからこそ、継続的に状態を見ていく仕組みが必要です。タレントキーパーは、企業ごとの運用に合わせて、無理のない定着支援の形を一緒に考えます。
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="rounded-[36px] bg-gradient-to-r from-slate-950 to-slate-800 px-8 py-10 text-white shadow-2xl">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold tracking-[0.18em] text-emerald-300">CONTACT</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  タレントキーパーについて
                  ご相談ください
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  まずは、どのタイミングの離職や定着に課題があるのか、どのようなフォロー体制にしたいのかを伺いながら、活用イメージを一緒に整理します。
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <button className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5">
                  お問い合わせする
                </button>
                <button className="rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  資料請求
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
