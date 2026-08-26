export default function LandingPage() {
  const BASE = "/ttb-fai-fah-2026-cac2";

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ backgroundColor: "#080604", fontFamily: "'ttb', 'Helvetica Neue', sans-serif", overflow: "hidden" }}
    >
      {/* === BG: single group photo === */}
      <div className="absolute inset-0" aria-hidden>
        <img
          src={`${BASE}/images/ends/end_1.jpg`}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.3) saturate(0.55)", transform: "scale(1.04)" }}
        />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 90% at 15% 100%, rgba(242,101,34,0.28) 0%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 70% at 90% 5%, rgba(0,115,198,0.22) 0%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 60% at 50% 50%, rgba(8,6,4,0.2) 0%, rgba(8,6,4,0.68) 100%)" }} />
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 flex flex-col h-full w-full max-w-3xl mx-auto px-6 sm:px-10 py-7 sm:py-10">

        {/* TOP: TTB Foundation logo */}
        <header className="flex-none flex items-center justify-between">
          <img
            src={`${BASE}/logo-ttb.webp`}
            alt="TTB Foundation"
            style={{ height: "clamp(30px, 5vw, 44px)", width: "auto", filter: "brightness(0) invert(1)", opacity: 0.88 }}
          />
          <a
            href="https://ttbfoundation.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest"
            style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}
          >
            ttbfoundation.org ↗
          </a>
        </header>

        {/* MIDDLE */}
        <main className="flex-1 flex flex-col justify-center gap-5 sm:gap-7">

          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "#F26522", letterSpacing: "0.14em" }}
          >
            โครงการไฟ-ฟ้า · มูลนิธิทีทีบี · 2569
          </p>

          <div className="flex flex-col gap-1">
            <h1
              className="text-white"
              style={{
                fontFamily: "'Noto Serif Thai', serif",
                fontSize: "clamp(2.4rem, 8vw, 5.5rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              รุ่นพี่การเงิน
            </h1>
            <p
              style={{
                fontFamily: "'ttb', sans-serif",
                fontSize: "clamp(0.9rem, 2.4vw, 1.2rem)",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              โรงเรียนเตรียมอุดมพัฒนาการ ยานนาเวศ
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div style={{ width: "2rem", height: "1px", backgroundColor: "#F26522", opacity: 0.8 }} />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.12em", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
            >
              C.A.C.2 &nbsp;·&nbsp; 24–25 ส.ค. 2569
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={`${BASE}/gallery/`}
              className="inline-flex items-center gap-2 text-white font-medium transition-all active:scale-[0.96]"
              style={{
                backgroundColor: "#F26522",
                borderRadius: "6px",
                padding: "clamp(10px,2vw,14px) clamp(18px,3vw,28px)",
                fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                boxShadow: "0 0 24px rgba(242,101,34,0.3)",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
              ดูภาพกิจกรรม
            </a>
            <a
              href="https://ttbfoundation.org/th/about-us/about-fai-fah.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium transition-all active:scale-[0.96]"
              style={{
                color: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "6px",
                padding: "clamp(10px,2vw,14px) clamp(18px,3vw,28px)",
                fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
            >
              รู้จักโครงการไฟ-ฟ้า
            </a>
          </div>
        </main>

        {/* BOTTOM footer */}
        <footer className="flex-none flex items-end justify-between py-1">
          <img
            src={`${BASE}/logo-footer.svg`}
            alt="TTB Foundation"
            style={{ height: "clamp(22px, 3.5vw, 34px)", width: "auto", opacity: 0.75 }}
          />
          <div className="flex items-center gap-1.5">
            <span style={{ display: "block", width: "2rem", height: "2px", backgroundColor: "#F26522", borderRadius: "99px", opacity: 0.75 }} />
            <span style={{ display: "block", width: "0.5rem", height: "2px", backgroundColor: "rgba(255,255,255,0.12)", borderRadius: "99px" }} />
            <span style={{ display: "block", width: "2rem", height: "2px", backgroundColor: "#0073C6", borderRadius: "99px", opacity: 0.75 }} />
          </div>
        </footer>
      </div>
    </div>
  );
}
