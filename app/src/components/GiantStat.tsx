interface GiantStatProps {
  value: string;
  caption: string;
  tone?: 'danger' | 'info' | 'dark';
  size?: 'lg' | 'md';
}

const toneText: Record<string, string> = {
  danger: 'text-danger-dark',
  info: 'text-info',
  dark: 'text-dark',
};

export default function GiantStat({ value, caption, tone = 'danger', size = 'lg' }: GiantStatProps) {
  return (
    <div>
      <div
        className={`font-black leading-none ${toneText[tone]} ${
          size === 'lg' ? 'text-5xl md:text-6xl' : 'text-4xl'
        }`}
      >
        {value}
      </div>
      <div className="mt-2 text-xs md:text-sm font-bold uppercase tracking-wide text-gray-mid">
        {caption}
      </div>
    </div>
  );
}
