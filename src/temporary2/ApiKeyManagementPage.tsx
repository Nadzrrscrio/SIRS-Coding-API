import { useMemo, useState, type FormEvent } from 'react';

type ApiKey = {
  id: number;
  name: string;
  organization: string;
  createdAt: string;
  token: string;
  revoked: boolean;
};

const initialKeys: ApiKey[] = [
  {
    id: 1,
    name: 'RS Sehat',
    organization: 'RS Sehat',
    createdAt: '2026-08-21',
    token: 'sk-sirs-81bd3662…',
    revoked: false,
  },
  {
    id: 2,
    name: 'rs-sehat-key',
    organization: 'RS Sehat',
    createdAt: '2026-08-21',
    token: 'sk-sirs-1d82638e…',
    revoked: false,
  },
];

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
.api-key-page{--red:#ed0a1a;--red-dark:#c90716;--ink:#292d35;--muted:#737780;--line:#f0cbd0;--paper:#fffafa;--soft:#fff2f4;min-height:100vh;background:var(--paper);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,sans-serif;padding:24px;position:relative;overflow:hidden}
.api-key-page *{box-sizing:border-box}.api-key-page button,.api-key-page input{font:inherit}.api-key-page button{cursor:pointer}
.api-key-page:before,.api-key-page:after{content:"";position:absolute;z-index:0;pointer-events:none;border-radius:50%;background:#fff0f2}.api-key-page:before{width:250px;height:250px;top:-150px;left:-100px}.api-key-page:after{width:220px;height:220px;right:-130px;top:430px}
.ak-wrap{max-width:1280px;margin:0 auto;position:relative;z-index:1}
.ak-header{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:14px 22px;background:rgba(255,255,255,.94);border:1px solid #f0e1e3;border-radius:999px;box-shadow:0 3px 14px #28141908}
.ak-brand{font-size:19px;font-weight:800;letter-spacing:-.05em;color:var(--red)}.ak-brand span{color:var(--ink);font-weight:600}
.ak-nav{display:flex;gap:8px;flex-wrap:wrap}.ak-nav button{border:1px solid #f0dadd;border-radius:999px;padding:9px 13px;background:#fff;color:#62636c;font-size:11px;font-weight:600}.ak-nav button:hover,.ak-nav button.active{background:var(--soft);border-color:#ffc5cb;color:var(--red)}
.ak-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;padding:42px 4px 24px}.ak-eyebrow{display:inline-flex;border:1px solid #ff9ba5;border-radius:999px;padding:6px 10px;color:var(--red);font-size:9px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.ak-heading h1{font-size:clamp(30px,4vw,43px);line-height:1.05;letter-spacing:-.06em;margin:14px 0 8px}.ak-heading h1 span{color:var(--red)}.ak-heading p{color:var(--muted);font-size:13px;line-height:1.65;margin:0}
.ak-admin-chip{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #f1dfe2;border-radius:15px;padding:10px 14px;white-space:nowrap}.ak-avatar{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:var(--soft);color:var(--red);font-size:11px;font-weight:800}.ak-admin-chip strong{display:block;font-size:12px}.ak-admin-chip small{display:block;color:#8b8c94;font-size:10px;margin-top:3px}
.ak-panel{background:#fff;border:1px solid #f1dfe2;border-radius:20px;padding:22px;box-shadow:0 8px 30px #39191f08}.ak-panel-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:20px}.ak-panel-head h2{font-size:21px;letter-spacing:-.04em;margin:0 0 6px}.ak-panel-head p{font-size:12px;color:#888892;margin:0}
.ak-primary,.ak-secondary{border-radius:999px;padding:11px 17px;font-size:11px;font-weight:700}.ak-primary{border:1px solid var(--red);background:var(--red);color:#fff;box-shadow:0 5px 12px #f20b201f}.ak-primary:hover{background:var(--red-dark)}.ak-secondary{border:1px solid #ffb7bf;background:#fff;color:var(--red)}
.ak-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:20px}.ak-stat{padding:15px;border:1px solid #f3e3e5;border-radius:14px;background:linear-gradient(140deg,#fff 55%,#fff7f8)}.ak-stat span{font-size:10px;color:#8b8790}.ak-stat strong{display:block;font-size:24px;letter-spacing:-.05em;margin:7px 0 3px}.ak-stat small{font-size:10px;color:var(--red)}
.ak-create{padding:17px;border:1px solid #f4dfe2;border-radius:15px;background:#fffafa;margin-bottom:18px}.ak-create-label{display:block;font-size:10px;font-weight:800;letter-spacing:.07em;color:var(--red);margin-bottom:11px;text-transform:uppercase}.ak-create-form{display:grid;grid-template-columns:minmax(180px,1fr) minmax(180px,1fr) auto;gap:10px}.ak-input{width:100%;min-width:0;border:1px solid #eee0e2;border-radius:11px;background:#fff;padding:12px 13px;color:#333640;font-size:12px;outline:none}.ak-input:focus{border-color:#ff8995;box-shadow:0 0 0 3px #fff0f2}.ak-input::placeholder{color:#aaa5ac}
.ak-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:13px}.ak-search{position:relative;flex:1;max-width:380px;min-width:200px}.ak-search span{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:#a5a2a7}.ak-search .ak-input{padding-left:36px}.ak-filter{display:flex;align-items:center;gap:8px;color:#8a858d;font-size:11px}.ak-filter select{border:1px solid #eee0e2;border-radius:10px;background:#fff;padding:10px 12px;color:#555762;font-size:11px}
.ak-table-wrap{width:100%;overflow-x:auto;border:1px solid #f3e7e9;border-radius:14px}.ak-table{width:100%;min-width:650px;border-collapse:collapse;text-align:left}.ak-table th{font-size:9px;letter-spacing:.08em;color:#9a969d;text-transform:uppercase;font-weight:800;padding:14px 15px;background:#fffafa;border-bottom:1px solid #f3e7e9;white-space:nowrap}.ak-table td{font-size:11px;padding:14px 15px;border-bottom:1px solid #f5edef;color:#66636d;white-space:nowrap}.ak-table tbody tr:last-child td{border-bottom:0}.ak-table tbody tr:hover{background:#fffafa}.ak-table td strong{color:var(--ink);font-size:12px}.ak-token{display:inline-flex;align-items:center;gap:6px;padding:6px 8px;border:1px solid #f0e3e5;border-radius:8px;background:#fffafa;color:#393740;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px}.ak-status{display:inline-flex;padding:5px 8px;border-radius:999px;font-size:9px;font-weight:700}.ak-status.active{background:#eaf9f0;color:#19834b}.ak-status.revoked{background:#f2f1f3;color:#85818a}.ak-actions{display:flex;gap:6px}.ak-row-btn{border:1px solid #f0e3e5;background:#fff;border-radius:8px;padding:7px 10px;color:#77737c;font-size:10px}.ak-row-btn:hover{border-color:#ffb7bf;color:var(--red)}.ak-row-btn.danger{color:#d73545}.ak-empty{text-align:center!important;padding:30px!important;color:#99949c!important}.ak-foot{display:flex;justify-content:space-between;gap:12px;align-items:center;padding-top:15px;color:#98949b;font-size:10px}.ak-foot b{color:var(--red)}
.ak-notice{font-size:11px;padding:11px 13px;background:#eaf9f0;color:#19834b;border-radius:10px;margin-bottom:14px}.ak-notice.warn{background:#fff5df;color:#9c6a0b}
@media(max-width:760px){.api-key-page{padding:13px}.ak-header{border-radius:18px;align-items:flex-start;flex-direction:column}.ak-nav{width:100%}.ak-nav button{flex:1}.ak-heading{padding:30px 2px 22px;align-items:flex-start;flex-direction:column}.ak-panel{padding:15px}.ak-stats{grid-template-columns:1fr}.ak-stat{padding:12px}.ak-stat strong{font-size:21px}.ak-create-form{grid-template-columns:1fr}.ak-toolbar{align-items:stretch}.ak-search{max-width:none}.ak-filter{justify-content:space-between}.ak-panel-head{align-items:flex-start}.ak-primary,.ak-secondary{padding:10px 12px}}
`;

export default function ApiKeyManagementPage() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'revoked'>('all');
  const [notice, setNotice] = useState('');

  const filteredKeys = useMemo(() => {
    const query = search.trim().toLowerCase();
    return keys.filter((key) => {
      const matchesSearch =
        !query ||
        key.name.toLowerCase().includes(query) ||
        key.organization.toLowerCase().includes(query) ||
        key.token.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && !key.revoked) ||
        (statusFilter === 'revoked' && key.revoked);
      return matchesSearch && matchesStatus;
    });
  }, [keys, search, statusFilter]);

  const activeCount = keys.filter((key) => !key.revoked).length;

  function createKey(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newKey: ApiKey = {
      id: Math.max(0, ...keys.map((key) => key.id)) + 1,
      name: trimmedName,
      organization: organization.trim() || '—',
      createdAt: new Date().toISOString().slice(0, 10),
      token: `sk-sirs-demo-${Math.random().toString(16).slice(2, 10)}…`,
      revoked: false,
    };

    setKeys((current) => [newKey, ...current]);
    setName('');
    setOrganization('');
    setNotice('API key demo berhasil dibuat. Token ini hanya simulasi frontend, bukan kredensial backend yang valid.');
  }

  function toggleKey(id: number) {
    const target = keys.find((key) => key.id === id);
    if (!target) return;
    const nextRevoked = !target.revoked;
    setKeys((current) =>
      current.map((key) => (key.id === id ? { ...key, revoked: nextRevoked } : key)),
    );
    setNotice(nextRevoked ? `API key "${target.name}" ditandai dicabut.` : `API key "${target.name}" diaktifkan kembali pada simulasi.`);
  }

  return (
    <div className="api-key-page">
      <style>{styles}</style>
      <div className="ak-wrap">
        <header className="ak-header">
          <div className="ak-brand">UMM <span>/ SIRS.ID</span></div>
          <nav className="ak-nav" aria-label="Navigasi utama">
            <button type="button">Simulasi</button>
            <button type="button">Dokumentasi</button>
            <button type="button">Redoc</button>
            <button type="button" className="active">Manajemen</button>
            <button type="button">Keluar ↗</button>
          </nav>
        </header>

        <section className="ak-heading">
          <div>
            <span className="ak-eyebrow">Ruang administrator · SIRS Coding API</span>
            <h1>Kelola <span>API key.</span></h1>
            <p>Atur kredensial integrasi rumah sakit dan pantau akses layanan SIRS Coding API.</p>
          </div>
          <div className="ak-admin-chip">
            <div className="ak-avatar">AD</div>
            <div><strong>Administrator</strong><small>admin · Admin</small></div>
          </div>
        </section>

        <main className="ak-panel">
          <div className="ak-panel-head">
            <div>
              <h2>API Key</h2>
              <p>Kelola kredensial yang digunakan untuk mengakses layanan.</p>
            </div>
          </div>

          {notice && <div className={`ak-notice ${notice.includes('dicabut') ? 'warn' : ''}`} role="status">{notice}</div>}

          <div className="ak-stats">
            <div className="ak-stat"><span>Total API key</span><strong>{String(keys.length).padStart(2, '0')}</strong><small>Seluruh kredensial</small></div>
            <div className="ak-stat"><span>API key aktif</span><strong>{String(activeCount).padStart(2, '0')}</strong><small>Siap digunakan</small></div>
            <div className="ak-stat"><span>API key dicabut</span><strong>{String(keys.length - activeCount).padStart(2, '0')}</strong><small>Nonaktif</small></div>
          </div>

          <section className="ak-create" aria-labelledby="ak-create-title">
            <span className="ak-create-label" id="ak-create-title">Buat API key</span>
            <form className="ak-create-form" onSubmit={createKey}>
              <input className="ak-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nama (RS A)" aria-label="Nama API key" required />
              <input className="ak-input" value={organization} onChange={(event) => setOrganization(event.target.value)} placeholder="Organisasi (opsional)" aria-label="Organisasi" />
              <button className="ak-primary" type="submit">Buat API key</button>
            </form>
          </section>

          <div className="ak-toolbar">
            <div className="ak-search"><span aria-hidden="true">⌕</span><input className="ak-input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari nama, organisasi, atau token..." aria-label="Cari API key" /></div>
            <label className="ak-filter">Status
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)} aria-label="Filter status">
                <option value="all">Semua status</option>
                <option value="active">Aktif</option>
                <option value="revoked">Dicabut</option>
              </select>
            </label>
          </div>

          <div className="ak-table-wrap">
            <table className="ak-table">
              <thead><tr><th>Nama</th><th>Organisasi</th><th>Dibuat</th><th>Kunci</th><th>Status</th><th>Aksi</th></tr></thead>
              <tbody>
                {filteredKeys.map((key) => (
                  <tr key={key.id}>
                    <td><strong>{key.name}</strong></td>
                    <td>{key.organization}</td>
                    <td>{key.createdAt}</td>
                    <td><span className="ak-token">{key.token}</span></td>
                    <td><span className={`ak-status ${key.revoked ? 'revoked' : 'active'}`}>{key.revoked ? 'Dicabut' : 'Aktif'}</span></td>
                    <td><div className="ak-actions"><button type="button" className={`ak-row-btn ${!key.revoked ? 'danger' : ''}`} onClick={() => toggleKey(key.id)}>{key.revoked ? 'Aktifkan' : 'Cabut'}</button></div></td>
                  </tr>
                ))}
                {filteredKeys.length === 0 && <tr><td className="ak-empty" colSpan={6}>Tidak ada API key yang cocok dengan pencarian.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="ak-foot"><span>Menampilkan <b>{filteredKeys.length}</b> dari {keys.length} API key</span><span>SIRS.ID <b>•</b> Admin Console</span></div>
        </main>
      </div>
    </div>
  );
}
