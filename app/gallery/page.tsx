"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const BASE = "/ttb-fai-fah-2026-cac2";

const eventImages = [
  ...Array.from({ length: 22 }, (_, i) => ({
    src: `${BASE}/images/events/day1_${i + 1}.jpg`,
    alt: `บรรยากาศกิจกรรม รูปที่ ${i + 1}`,
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    src: `${BASE}/images/events/day2_${i + 1}.jpg`,
    alt: `บรรยากาศกิจกรรม รูปที่ ${i + 23}`,
  })),
];

const endsImages = Array.from({ length: 10 }, (_, i) => ({
  src: `${BASE}/images/ends/end_${i + 1}.jpg`,
  alt: `ภาพรวมจบกิจกรรม รูปที่ ${i + 1}`,
}));

const allImages = [...eventImages, ...endsImages];

type ImageItem = { src: string; alt: string };

/* ─── Lightbox ─── */
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: ImageItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  /* swipe support */
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? onNext() : onPrev();
    touchStart.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: "rgba(8,6,4,0.97)" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 flex-none">
        <span className="text-xs tabular-nums" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'ttb', sans-serif" }}>
          {index + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
          aria-label="ปิด"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 2l12 12M14 2L2 14" />
          </svg>
        </button>
      </div>

      {/* Image */}
      <div className="flex-1 flex items-center justify-center px-4 min-h-0">
        <img
          src={images[index].src}
          alt={images[index].alt}
          className="max-w-full max-h-full object-contain rounded-lg"
          style={{ userSelect: "none", WebkitUserSelect: "none" }}
          draggable={false}
        />
      </div>

      {/* Bottom nav arrows (mobile-friendly) */}
      <div className="flex items-center justify-between px-5 py-5 flex-none">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontFamily: "'ttb', sans-serif" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3L5 8l5 5" />
          </svg>
          ก่อนหน้า
        </button>
        {/* Swipe hint */}
        <span className="text-xs hidden sm:block" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'ttb', sans-serif" }}>
          กด ← → หรือปัดเพื่อเปลี่ยนรูป
        </span>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontFamily: "'ttb', sans-serif" }}
        >
          ถัดไป
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Masonry Grid ─── */
function MasonryGrid({ images, onOpen }: { images: ImageItem[]; onOpen: (i: number) => void }) {
  const [visible, setVisible] = useState<boolean[]>(Array(images.length).fill(false));
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setVisible((prev) => { const n = [...prev]; n[idx] = true; return n; });
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [images.length]);

  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3">
      {images.map((img, i) => (
        <div
          key={img.src}
          ref={(el) => { refs.current[i] = el; }}
          data-idx={i}
          className="break-inside-avoid mb-2 sm:mb-3 cursor-pointer group relative overflow-hidden rounded-xl"
          style={{
            opacity: visible[i] ? 1 : 0,
            transform: visible[i] ? "translateY(0) scale(1)" : "translateY(14px) scale(0.98)",
            transition: `opacity 450ms ${Math.min(i % 8, 6) * 50}ms cubic-bezier(0.16,1,0.3,1), transform 450ms ${Math.min(i % 8, 6) * 50}ms cubic-bezier(0.16,1,0.3,1)`,
          }}
          onClick={() => onOpen(i)}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] group-active:scale-[0.98]"
            loading="lazy"
          />
          {/* Tap overlay */}
          <div
            className="absolute inset-0 opacity-0 group-active:opacity-100 sm:group-hover:opacity-100 transition-opacity duration-200"
            style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
          />
        </div>
      ))}
    </div>
  );
}

/* ─── Featured Ends Grid ─── */
function EndsGrid({ images, onOpen }: { images: ImageItem[]; onOpen: (i: number) => void }) {
  const [visible, setVisible] = useState<boolean[]>(Array(images.length).fill(false));
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setVisible((prev) => { const n = [...prev]; n[idx] = true; return n; });
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [images.length]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
      {images.map((img, i) => {
        const isBig = i === 0;
        return (
          <div
            key={img.src}
            ref={(el) => { refs.current[i] = el; }}
            data-idx={i}
            className={`cursor-pointer group relative overflow-hidden rounded-xl ${isBig ? "col-span-2 sm:col-span-2" : ""}`}
            style={{
              aspectRatio: isBig ? "16/9" : "1",
              opacity: visible[i] ? 1 : 0,
              transform: visible[i] ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 500ms ${i * 55}ms cubic-bezier(0.16,1,0.3,1), transform 500ms ${i * 55}ms cubic-bezier(0.16,1,0.3,1)`,
            }}
            onClick={() => onOpen(i)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04] group-active:scale-[0.98]"
              loading="lazy"
            />
            <div
              className="absolute inset-0 opacity-0 group-active:opacity-100 sm:group-hover:opacity-100 transition-opacity duration-200"
              style={{ backgroundColor: "rgba(0,0,0,0.12)" }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ─── Page ─── */
type LB = { images: ImageItem[]; index: number } | null;

export default function GalleryPage() {
  const [lb, setLb] = useState<LB>(null);

  const open = useCallback((images: ImageItem[], index: number) => setLb({ images, index }), []);
  const close = useCallback(() => setLb(null), []);
  const prev = useCallback(() => {
    setLb((l) => l ? { ...l, index: (l.index - 1 + l.images.length) % l.images.length } : null);
  }, []);
  const next = useCallback(() => {
    setLb((l) => l ? { ...l, index: (l.index + 1) % l.images.length } : null);
  }, []);

  return (
    <div style={{ backgroundColor: "var(--color-canvas)", minHeight: "100vh" }}>
      {lb && <Lightbox images={lb.images} index={lb.index} onClose={close} onPrev={prev} onNext={next} />}

      {/* ── Hero ── */}
      <header className="relative overflow-hidden" style={{ backgroundColor: "#0A0806", height: "clamp(320px, 55vw, 520px)", display: "flex", alignItems: "flex-end" }}>
        {/* Background collage */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0.5 opacity-40">
          {[eventImages[0], eventImages[4], eventImages[8], endsImages[0], eventImages[15], endsImages[4]].map((img, i) => (
            <div key={i} className="overflow-hidden">
              <img src={img.src} alt="" className="w-full h-full object-cover" style={{ filter: "saturate(0.7)" }} />
            </div>
          ))}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.2) 0%, rgba(10,8,6,0.98) 90%)" }} />

        {/* Text */}
        <div className="relative z-10 w-full px-5 pb-8 pt-16 sm:px-8 sm:pb-12">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tracking-widest uppercase"
                style={{ backgroundColor: "rgba(242,101,34,0.2)", border: "1px solid rgba(242,101,34,0.35)", color: "#FBCBAB", fontFamily: "'ttb', sans-serif" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F26522" }} />
                ไฟ-ฟ้า · มูลนิธิทีทีบี
              </span>
            </div>

            <h1
              className="text-white mb-3"
              style={{
                fontFamily: "'Noto Serif Thai', serif",
                fontSize: "clamp(1.75rem, 6vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              รุ่นพี่การเงิน
            </h1>
            <p
              className="text-white/60 mb-1"
              style={{ fontFamily: "'ttb', sans-serif", fontSize: "clamp(0.9rem, 3vw, 1.1rem)", lineHeight: 1.6 }}
            >
              สอนที่โรงเรียนเตรียมอุดม พัฒนาการ ยานนาเวศ
            </p>
            <p
              className="text-white/35 text-sm"
              style={{ fontFamily: "'ttb', sans-serif" }}
            >
              24–25 สิงหาคม 2569
            </p>

            {/* Scroll hint */}
            <div className="mt-8 flex items-center gap-2 text-white/30 animate-bounce" style={{ width: "fit-content" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v10M4 9l4 4 4-4" />
              </svg>
              <span className="text-xs" style={{ fontFamily: "'ttb', sans-serif" }}>เลื่อนดูภาพ</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Back link ── */}
      <div className="px-5 pt-6 pb-2 sm:px-8">
        <a
          href={`${BASE}/`}
          className="inline-flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 8H3M7 4l-4 4 4 4" />
          </svg>
          กลับหน้าหลัก
        </a>
      </div>

      <main className="px-3 sm:px-5 pb-20 max-w-5xl mx-auto flex flex-col gap-14">

        {/* ── Section: บรรยากาศกิจกรรม ── */}
        <section id="events" className="pt-6">
          <div className="px-2 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--color-fai)" }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--color-fai)", fontFamily: "'ttb', sans-serif" }}>
                24–25 สิงหาคม 2569
              </span>
            </div>
            <h2
              style={{
                color: "var(--color-text-primary)",
                fontFamily: "'Noto Serif Thai', serif",
                fontSize: "clamp(1.4rem, 4.5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              บรรยากาศกิจกรรม
            </h2>
          </div>
          <MasonryGrid images={eventImages} onOpen={(i) => open(eventImages, i)} />
        </section>

        {/* ── Divider ── */}
        <div style={{ borderTop: "1px solid var(--color-border)" }} />

        {/* ── Section: ภาพรวมจบกิจกรรม ── */}
        <section id="ends">
          <div className="px-2 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--color-fah)" }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--color-fah)", fontFamily: "'ttb', sans-serif" }}>
                ภาพรวม
              </span>
            </div>
            <h2
              style={{
                color: "var(--color-text-primary)",
                fontFamily: "'Noto Serif Thai', serif",
                fontSize: "clamp(1.4rem, 4.5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              ถ่ายภาพร่วมกัน
            </h2>
          </div>
          <EndsGrid images={endsImages} onOpen={(i) => open(endsImages, i)} />
        </section>

        {/* ── Divider ── */}
        <div style={{ borderTop: "1px solid var(--color-border)" }} />

        {/* ── Section: วิดีโอ ── */}
        <section id="video">
          <div className="px-2 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--color-fai)" }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--color-fai)", fontFamily: "'ttb', sans-serif" }}>
                วิดีโอ
              </span>
            </div>
            <h2
              style={{
                color: "var(--color-text-primary)",
                fontFamily: "'Noto Serif Thai', serif",
                fontSize: "clamp(1.4rem, 4.5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              วิดีโอบรรยากาศ
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { src: `${BASE}/video/game_picture.mp4`, title: "บรรยากาศกิจกรรม" },
              { src: `${BASE}/video/game_tiktok.mp4`, title: "Highlight กิจกรรม" },
            ].map((v) => (
              <div
                key={v.src}
                className="overflow-hidden rounded-2xl"
                style={{ border: "1px solid var(--color-border)" }}
              >
                <video
                  src={v.src}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full block"
                  style={{ backgroundColor: "#0A0806", maxHeight: "70vw" }}
                />
                <div className="px-4 py-3" style={{ backgroundColor: "var(--color-surface)" }}>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)", fontFamily: "'ttb', sans-serif" }}>{v.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>รุ่นพี่การเงิน · 2569</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        className="text-center py-10 px-5"
        style={{ borderTop: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="font-bold text-base" style={{ color: "var(--color-fai)", fontFamily: "'ekachon', 'ttb', sans-serif" }}>ไฟ</span>
          <span style={{ color: "var(--color-border)" }}>—</span>
          <span className="font-bold text-base" style={{ color: "var(--color-fah)", fontFamily: "'ekachon', 'ttb', sans-serif" }}>ฟ้า</span>
        </div>
        <p className="text-xs" style={{ color: "#B8B0A6", fontFamily: "'ttb', sans-serif" }}>
          © 2569 มูลนิธิทีทีบี · โครงการไฟ-ฟ้า
        </p>
      </footer>
    </div>
  );
}

