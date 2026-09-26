const modules = [
  { number: '01', icon: '▣', title: 'Keluhan', standard: 'SNOMED CT', description: 'Dari teks bebas Bahasa Indonesia menjadi keluhan SNOMED CT resmi dengan resolusi penuh terhadap adaptasi produksi.' },
  { number: '02', icon: '♧', title: 'Diagnosis', standard: 'ICD-10', description: 'Diagnosis dokter dipetakan otomatis ke kode ICD-10 diagnosis resmi.' },
  { number: '03', icon: '⌁', title: 'Tindakan', standard: 'ICD-9', description: 'Coding tindakan medis berdasarkan katalog tindakan SIRS.' },
  { number: '04', icon: '▧', title: 'Klaim', standard: 'IN-CBG', description: 'Arahkan kasus ke kelompok IN-CBG untuk klaim & biaya.' },
  { number: '05', icon: '✺', title: 'Mode cerdas', standard: '', description: 'Auto menggabungkan rule, ML, dan AI. Setiap hasil diberi metode & tingkat keyakinan.' },
  { number: '06', icon: '⌘', title: 'Standar FHIR', standard: '', description: 'Output bisa dalam format FHIR Condition (siap API interoperability).' },
]

const features = ['25 koding / hari', 'Semua modul', 'Via halaman demo']

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'register'>('landing')

  if (currentView === 'register') {
    return <HomeRegister onNavigate={(view) => setCurrentView(view)} />
  }

  return (
    <>
      <style>{`
        .landing-page { --red: #ed0a1a; --red-dark: #c90716; --ink: #292d35; --muted: #737780; --line: #f0cbd0; --paper: #fffafa; --soft: #fff2f4; min-height: 100vh; overflow: hidden; color: var(--ink); background: var(--paper); font-family: Inter, sans-serif; }
        .landing-page *, .landing-page *::before, .landing-page *::after { box-sizing: border-box; }
        .landing-page::before, .landing-page::after { position: absolute; z-index: 0; width: 210px; height: 210px; border-radius: 50%; background: #fff1f3; content: ''; pointer-events: none; }
        .landing-page::before { top: -56px; left: -100px; }
        .landing-page::after { top: 520px; right: -105px; }
        .site-header, .hero-section, .modules-section, .pricing-section { position: relative; z-index: 1; width: min(1180px, calc(100% - 40px)); margin-inline: auto; }
        .site-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 18px; margin-top: 16px; border: 1px solid #f0e1e3; border-radius: 40px; background: rgba(255,255,255,.92); box-shadow: 0 2px 10px rgba(40, 20, 25, .02); }
        .brand { color: var(--red); font-size: 1.05rem; font-weight: 900; letter-spacing: -.14em; text-decoration: none; }
        .brand span { display: inline-block; transform: scaleX(.88); }
        .brand span:last-child { color: var(--red-dark); }
        .menu-button { display: flex; flex-direction: column; gap: 3px; align-items: center; justify-content: center; width: 24px; height: 24px; padding: 0; border: 1px solid #ffc4ca; border-radius: 50%; background: #fff5f6; cursor: pointer; }
        .menu-button span { display: block; width: 11px; height: 1.5px; background: var(--red); }
        .hero-section { display: grid; justify-items: center; gap: 0; padding: 54px 0 76px; text-align: center; }
        .eyebrow, .section-label { display: inline-flex; align-items: center; justify-content: center; padding: 5px 9px; color: var(--red); border: 1px solid #ff7e89; border-radius: 20px; font-size: .58rem; font-weight: 800; letter-spacing: 0; text-transform: uppercase; }
        h1, h2, h3, p { margin-top: 0; }
        h1 { max-width: 780px; margin: 26px 0 26px; font-size: clamp(2.55rem, 7vw, 6.4rem); line-height: .98; letter-spacing: -.065em; }
        h1 em, h2 em { color: var(--red); font-style: normal; }
        .hero-copy { max-width: 620px; margin-bottom: 30px; color: var(--muted); font-size: .86rem; line-height: 1.65; }
        .hero-actions { display: flex; width: min(100%, 540px); flex-wrap: wrap; gap: 12px; justify-content: center; }
        .button { display: inline-flex; align-items: center; justify-content: center; gap: 12px; min-height: 42px; padding: 12px 22px; border: 1px solid var(--red); border-radius: 24px; font-size: .75rem; font-weight: 800; text-decoration: none; transition: transform .2s ease, background .2s ease; }
        .button:hover { transform: translateY(-2px); }
        .button-primary { width: 100%; color: #fff; background: var(--red); }
        .button-primary:hover { background: var(--red-dark); }
        .button-secondary { width: 100%; color: var(--red); background: #fff; }
        .modules-section, .pricing-section { padding: 52px 0 76px; border-top: 1px solid #f3e5e6; text-align: center; }
        h2 { max-width: 760px; margin: 24px auto 38px; font-size: clamp(2.2rem, 5vw, 4.5rem); line-height: 1.02; letter-spacing: -.06em; }
        .module-list { display: grid; gap: 12px; text-align: left; }
        .module-row { display: grid; grid-template-columns: 32px 1fr; gap: 12px; align-items: stretch; }
        .module-rail { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 18px 0; color: var(--red); }
        .module-rail::after { position: absolute; top: 0; bottom: 0; left: 50%; z-index: -1; width: 1px; background: #ffcbd0; content: ''; }
        .module-number { padding: 2px 3px; color: var(--red); background: var(--paper); border-radius: 8px; font-size: .52rem; font-weight: 800; }
        .module-icon { display: grid; width: 25px; height: 25px; place-items: center; color: #fff; background: var(--red); border-radius: 6px; font-size: .84rem; }
        .module-card { padding: 13px 12px; border: 1px solid #ffb9c0; border-radius: 14px; background: #fff; }
        .module-card h3 { margin-bottom: 7px; font-size: 1rem; }
        .module-card h3 span { color: var(--ink); font-weight: 800; }
        .module-card h3 strong { color: var(--ink); font-size: 1rem; letter-spacing: 0; }
        .module-card p { max-width: 650px; margin-bottom: 0; color: var(--muted); font-size: .65rem; line-height: 1.55; }
        .section-copy { max-width: 480px; margin-inline: auto; color: var(--muted); font-size: .8rem; }
        .plans { display: grid; gap: 22px; margin-top: 34px; text-align: left; }
        .plan-card { position: relative; display: flex; min-height: 300px; flex-direction: column; padding: 18px 14px 14px; border: 1px solid #ffb9c0; border-radius: 15px; background: #fff; }
        .plan-card h3 { margin-bottom: 2px; color: var(--red); font-size: 1.4rem; }
        .plan-price { margin-bottom: 14px; color: var(--ink); font-size: .9rem; }
        .plan-card ul { flex: 1; margin: 0 0 18px; padding: 10px 0 0 20px; border-top: 1px solid #f4d9dc; color: var(--muted); line-height: 1.9; font-size: .72rem; list-style: none; }
        .plan-card li::before { margin-left: -18px; margin-right: 10px; color: var(--red); content: '✓'; font-weight: 800; }
        .featured-plan { background: var(--soft); border-color: #ffb9c0; }
        .featured-plan .button-secondary { color: var(--red); border-color: var(--red); }
        .popular-tag { position: absolute; top: -9px; left: 50%; transform: translateX(-50%); padding: 3px 10px; color: var(--red); background: #ffe8eb; border-radius: 12px; font-size: .58rem; font-weight: 800; white-space: nowrap; }
        .whatsapp-button { position: fixed; right: 16px; bottom: 14px; z-index: 5; display: grid; width: 42px; height: 42px; place-items: center; color: #fff; background: #00bd58; border: 3px solid #fff; border-radius: 50%; font-size: 1.2rem; text-decoration: none; box-shadow: 0 3px 10px rgba(0, 100, 40, .25); }
        @media (min-width: 760px) {
          .site-header, .hero-section, .modules-section, .pricing-section { width: min(1180px, calc(100% - 96px)); }
          .site-header { padding: 16px 24px; }
          .hero-section { padding: 96px 0 120px; }
          .hero-copy { font-size: .95rem; }
          .hero-actions { width: min(100%, 540px); }
          .hero-actions .button { width: auto; flex: 1; }
          .module-list { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 24px; }
          .plans { grid-template-columns: repeat(2, minmax(0, 1fr)); max-width: 820px; margin-inline: auto; }
          .plan-card { padding: 24px; }
        }
        @media (min-width: 1100px) { .module-list { gap: 24px 44px; } .module-row { grid-template-columns: 36px 1fr; } .hero-section { padding-block: 130px 160px; } }
        @media (max-width: 480px) { .site-header, .hero-section, .modules-section, .pricing-section { width: min(100% - 28px, 1180px); } .hero-section { padding: 54px 0 76px; } .button { width: 100%; } }
      `}</style>
      <main className="landing-page">
        <header className="site-header">
          <a className="brand" href="#top" aria-label="SIRS.ID beranda"><span>U</span><span>M</span><span>M</span></a>
          <button className="menu-button" type="button" aria-label="Buka menu"><span /><span /><span /></button>
        </header>
        <section className="hero-section" id="top">
          <div className="eyebrow">Standar FHIR · SNOMED CT · ICD-10 · ICD-9 · IN-CBG</div>
          <h1>API koding klinis untuk <em>rumah sakit, klinik &amp; developer</em></h1>
          <p className="hero-copy">Ubah keluhan pasien menjadi kode medis standar secara otomatis. Memakai pipeline gabungan aturan, machine learning, dan AI langsung siap integrasi ke SIMRS Anda.</p>
          <div className="hero-actions"><a className="button button-primary" href="#pricing">Daftar API <span>→</span></a><a className="button button-secondary" href="#modules">Dokumentasi API</a></div>
        </section>
        <section className="modules-section" id="modules">
          <div className="section-label">FITUR</div>
          <h2><em>Satu API</em> untuk semua kebutuhan pengkodean klinis</h2>
          <div className="module-list">{modules.map((module) => <article className="module-row" key={module.number}><div className="module-rail"><span className="module-number">{module.number}</span><span className="module-icon" aria-hidden="true">{module.icon}</span></div><div className="module-card"><h3>{module.title}{module.standard && <><span> → </span><strong>{module.standard}</strong></>}</h3><p>{module.description}</p></div></article>)}</div>
        </section>
        <section className="pricing-section" id="pricing">
          <div className="section-label">INVESTASI TERBAIK</div>
          <h2>Pilihan Paket <em>SIRS.ID</em></h2>
          <p className="section-copy">Pilih paket yang paling sesuai dengan skala dan kebutuhan fasilitas kesehatan Anda.</p>
          <div className="plans">
            <article className="plan-card"><h3>Ujicoba</h3><strong className="plan-price">Gratis</strong><ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul><a className="button button-primary" href="https://wa.me/6280000000000">Ujicoba Gratis <span>→</span></a></article>
            <article className="plan-card featured-plan"><div className="popular-tag">★ Paling Ideal</div><h3>Starter</h3><strong className="plan-price">Minta penawaran</strong><ul>{['API key resmi', 'Kuota sesuai kebutuhan', 'Dokumentasi & dukungan'].map((feature) => <li key={feature}>{feature}</li>)}</ul><a className="button button-secondary" href="https://wa.me/6280000000000">Daftar Sekarang <span>→</span></a></article>
          </div>
        </section>
        <a className="whatsapp-button" href="https://wa.me/6280000000000" aria-label="Hubungi kami melalui WhatsApp">⌕</a>
      </main>
    </>
  )
}

export default App
