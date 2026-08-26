export default function LandingPage() {
  const BASE = "/ttb-fai-fah-2026-cac2";

  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: "#0A0806", fontFamily: "'ttb', 'Helvetica Neue', sans-serif" }}
    >
      {/* Background collage — blurred */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-px pointer-events-none" aria-hidden>
        {[1,4,8,15,20,22].map((n) => (
          <div key={n} className="overflow-hidden">
            <img
              src={`${BASE}/images/events/day1_${n}.jpg`}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "saturate(0.5) brightness(0.35)", transform: "scale(1.05)" }}
            />
          </div>
        ))}
      </div>

      {/* Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(242,101,34,0.18) 0%, rgba(10,8,6,0.7) 45%, rgba(0,115,198,0.14) 100%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-5 sm:px-10 lg:px-16 py-6 sm:py-8 max-w-5xl mx-auto w-full">

        {/* Top bar */}
        <header className="flex items-center justify-between flex-none">
          <div className="flex items-center gap-3">
            <span
              className="font-bold"
              style={{ color: "#F26522", fontFamily: "'ekachon', 'ttb', sans-serif", fontSize: "clamp(1.1rem, 3vw, 1.4rem)" }}
            >
              ไฟ
            </span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "1.1rem" }}>—</span>
            <span
              className="font-bold"
              style={{ color: "#60B4FF", fontFamily: "'ekachon', 'ttb', sans-serif", fontSize: "clamp(1.1rem, 3vw, 1.4rem)" }}
            >
              ฟ้า
            </span>
            <span
              className="hidden sm:block text-xs tracking-widest uppercase ml-2"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              มลนิิทีทีบี
            </span>
          </div>
          <a
            href="https://ttbfoundation.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            ttbfoundation.org
          </a>
        </header>

        {/* Main content — fills remaining space */}
        <main className="flex-1 flex flex-col justify-center gap-4 sm:gap-6 py-4">

          {/* Badge */}
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tracking-widest uppercase"
              style={{
                backgroundColor: "rgba(242,101,34,0.15)",
                border: "1px solid rgba(242,101,34,0.4)",
                color: "#FBCBAB",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F26522" }} />
              ครงการไฟ-ฟ้า 2569
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tracking-widest uppercase"
              style={{
                backgroundColor: "rgba(0,115,198,0.15)",
                border: "1px solid rgba(0,115,198,0.35)",
                color: "#93D0FF",
              }}
            >
              C.A.C.2
            </span>
          </div>

          {/* Headline */}
          <div>
            <h1
              className="text-white"
              style={{
                fontFamily: "'Noto Serif Thai', serif",
                fontSize: "clamp(2rem, 6.5vw, 4.5rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              รุ่นพี่การเงิน
            </h1>
            <h2
              className="mt-2"
              style={{
                fontFamily: "'ttb', sans-serif",
                fontSize: "clamp(0.95rem, 2.5vw, 1.35rem)",
                color: "rgba(255,255,255,0.55)",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              สอนที่รงเรียนเตรียมอุดมพันาการ ยานนาเวศ
            </h2>
          </div>

          {/* Divider */}
          <div style={{ width: "3rem", height: "1px", backgroundColor: "rgba(255,255,255,0.12)" }} />

          {/* Description */}
          <p
            style={{
              fontFamily: "'ttb', sans-serif",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7,
              maxWidth: "32rem",
            }}
          >
            กิจกรรมอาสาสมัครครงการไฟ-ฟ้า มลนิิทีทีบี
            <br className="hidden sm:block" />
            24–25 สิงหาคม 2569
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={`${BASE}/gallery/`}
              className="inline-flex items-center gap-2 px-5 py-3 font-medium text-white transition-all active:scale-[0.97]"
              style={{
                backgroundColor: "#F26522",
                borderRadius: "8px",
                fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
              ดภาพกิจกรรม
            </a>
            <a
              href="https://ttbfoundation.org/th/about-us/about-fai-fah.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 font-medium transition-all active:scale-[0.97]"
              style={{
                color: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.05)",
                fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
              }}
            >
              ร้จักครงการไฟ-ฟ้า
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </main>

        {/* Bottom bar */}
        <footer className="flex-none flex items-end justify-between pb-1">
          {/* Date */}
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            24–25 ส.ค. 2569
          </p>
          {/* Divider marks */}
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-px" style={{ backgroundColor: "#F26522", opacity: 0.5 }} />
            <span className="w-1.5 h-px" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
            <span className="w-6 h-px" style={{ backgroundColor: "#0073C6", opacity: 0.5 }} />
          </div>
        </footer>
      </div>
    </div>
  );
}
