/**
 * QuotaBadge — Menampilkan sisa kuota harian.
 * TODO: Ganti dengan data dari GET /api/v1/trial/quota saat backend terhubung.
 */

interface QuotaBadgeProps {
  remaining: number;
  total: number;
}

export default function QuotaBadge({ remaining, total }: QuotaBadgeProps) {
  return (
    <div className="tryout-quota">
      <span className="tryout-quota__badge" aria-label={`Kuota tersisa: ${remaining} dari ${total}`}>
        Kuota: {remaining}/{total} tersisa
      </span>
    </div>
  );
}
