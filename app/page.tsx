export default function ComingSoonPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "var(--color-canvas)" }}
    >
      {/* Ambient warm glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 0%, rgba(242,101,34,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full gap-10">
        {/* Badge */}
        <span
          className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
          style={{
            backgroundColor: "var(--color-fai-pale)",
            color: "var(--color-fai-hover)",
            border: "1px solid #F9C9AD",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-fai)" }}
          />
          เร็วๆ นี้
        </span>

        {/* Logo / Title */}
        <div className="animate-fade-up delay-100 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span
              className="text-5xl font-bold"
              style={{ color: "var(--color-fai)", letterSpacing: "-0.02em" }}
            >
              ไฟ
            </span>
            <span style={{ color: "var(--color-border)", fontSize: "2.5rem", lineHeight: 1 }}>—</span>
            <span
              className="text-5xl font-bold"
              style={{ color: "var(--color-fah)", letterSpacing: "-0.02em" }}
            >
              ฟ้า
            </span>
          </div>
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--color-text-secondary)" }}
          >
            TTB Foundation · 2026
          </p>
        </div>

        {/* Divider */}
        <div
          className="animate-fade-up delay-200 w-12 h-px"
          style={{ backgroundColor: "var(--color-border)" }}
        />

        {/* Headline */}
        <div className="animate-fade-up delay-200 flex flex-col gap-4">
          <h1
            className="text-5xl font-semibold"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "'Instrument Serif', 'Newsreader', serif",
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
            }}
          >
            กำลังเตรียมบางอย่าง
            <br />
            ที่ดีให้คุณ
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            โครงการไฟ-ฟ้า มูลนิธิทีทีบี พื้นที่แห่งการ &ldquo;ให้&rdquo;
            <br />
            เพื่อจุดประกายเยาวชนและชุมชนสู่ความยั่งยืน
          </p>
        </div>

        {/* CTA */}
        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center gap-3">
          <a
            href="https://ttbfoundation.org/th/about-us/about-fai-fah.php"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-colors active:scale-[0.98]"
            style={{
              backgroundColor: "var(--color-fai)",
              borderRadius: "6px",
            }}
          >
            รู้จักโครงการไฟ-ฟ้า
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a
            href="https://ttbfoundation.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-sm font-medium transition-colors"
            style={{
              color: "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "6px",
              backgroundColor: "var(--color-surface)",
            }}
          >
            มูลนิธิทีทีบี
          </a>
        </div>

        {/* Footer */}
        <p
          className="animate-fade-up delay-400 text-xs"
          style={{ color: "#B8B0A6" }}
        >
          © 2026 มูลนิธิทีทีบี · สงวนลิขสิทธิ์
        </p>
      </div>
    </main>
  );
}
