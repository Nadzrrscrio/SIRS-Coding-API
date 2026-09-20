/**
 * TryOutHeader — Navigasi atas halaman Uji Coba.
 * Tombol kembali, nama brand, dan link ke Landing/Docs.
 */
export default function TryOutHeader() {
  return (
    <header className="tryout-header">
      <a className="tryout-header__back" href="/" aria-label="Kembali ke beranda">
        <span className="tryout-header__back-arrow" aria-hidden="true">←</span>
        <span>SIRS Coding API</span>
      </a>
      <nav className="tryout-header__nav" aria-label="Navigasi utama">
        <a className="tryout-header__nav-btn" href="/">Landing</a>
        <a className="tryout-header__nav-btn" href="/docs">Docs</a>
      </nav>
    </header>
  );
}
