import { useState } from 'react'
import './App.css'
import HomeRegister from './auth/register'

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
    <main className="landing-page">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="SIRS.ID beranda"><span>U</span><span>M</span><span>M</span></a>
        <button className="menu-button" type="button" aria-label="Buka menu"><span /><span /><span /></button>
      </header>
      <section className="hero-section" id="top">
        <div className="eyebrow">Standar FHIR · SNOMED CT · ICD-10 · ICD-9 · IN-CBG</div>
        <h1>API koding klinis untuk <em>rumah sakit, klinik &amp; developer</em></h1>
        <p className="hero-copy">Ubah keluhan pasien menjadi kode medis standar secara otomatis. Memakai pipeline gabungan aturan, machine learning, dan AI langsung siap integrasi ke SIMRS Anda.</p>
        <div className="hero-actions">
          <a
            className="button button-primary"
            href="#register"
            onClick={(e) => {
              e.preventDefault()
              setCurrentView('register')
            }}
          >
            Daftar API <span>→</span>
          </a>
          <a className="button button-secondary" href="#modules">Dokumentasi API</a>
        </div>
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
          <article className="plan-card featured-plan"><div className="popular-tag">★ Paling Ideal</div><h3>Starter</h3><strong className="plan-price">Minta penawaran</strong><ul>{['API key resmi', 'Kuota sesuai kebutuhan', 'Dokumentasi & dukungan'].map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <a
              className="button button-secondary"
              href="#register"
              onClick={(e) => {
                e.preventDefault()
                setCurrentView('register')
              }}
            >
              Daftar Sekarang <span>→</span>
            </a>
          </article>
        </div>
      </section>
      <a className="whatsapp-button" href="https://wa.me/6280000000000" aria-label="Hubungi kami melalui WhatsApp">⌕</a>
    </main>
  )
}

export default App
