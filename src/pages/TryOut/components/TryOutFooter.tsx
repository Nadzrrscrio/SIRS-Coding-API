/**
 * TryOutFooter — Footer halaman Uji Coba.
 * Keterangan metode koding dan link Daftar akun / Dokumentasi API.
 */
export default function TryOutFooter() {
  return (
    <footer className="tryout-footer">
      <p className="tryout-footer__text">
        Hasil dikodekan menggunakan kombinasi aturan klinis, model Machine
        Learning, dan AI generatif untuk akurasi terbaik.
      </p>
      <nav className="tryout-footer__links" aria-label="Tautan footer">
        <a className="tryout-footer__link" href="/">
          Daftar akun →
        </a>
        <a className="tryout-footer__link" href="/docs">
          Dokumentasi API →
        </a>
      </nav>
    </footer>
  );
}
