export default function Footer() {
  return (
    <footer className="border-t border-gray-light-3 bg-offwhite">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-mid flex flex-wrap items-center justify-between gap-3">
        <div>
          Data and analysis from Smart Growth America / National Complete Streets Coalition.
        </div>
        <a
          href="https://www.smartgrowthamerica.org/signature-reports/dangerous-by-design/2026-dbd-rankings/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-info hover:underline"
        >
          Read the full Dangerous by Design 2026 report →
        </a>
      </div>
    </footer>
  );
}
