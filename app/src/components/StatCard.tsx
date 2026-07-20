interface StatCardProps {
  value: string;
  label: string;
  tone?: 'danger' | 'info' | 'accent';
  children?: React.ReactNode;
}

const toneStyles: Record<string, { bg: string; text: string }> = {
  danger: { bg: 'bg-danger-tint', text: 'text-danger-dark' },
  info: { bg: 'bg-info-tint', text: 'text-info' },
  accent: { bg: 'bg-accent-tint', text: 'text-dark' },
};

export default function StatCard({ value, label, tone = 'danger', children }: StatCardProps) {
  const styles = toneStyles[tone];
  return (
    <div className={`rounded-xl p-5 ${styles.bg}`}>
      <div className={`text-3xl md:text-4xl font-black ${styles.text}`}>{value}</div>
      <div className="mt-1 text-xs font-bold uppercase tracking-wide text-gray-mid-2">{label}</div>
      {children && <div className="mt-2 text-sm text-gray-dark-2">{children}</div>}
    </div>
  );
}
