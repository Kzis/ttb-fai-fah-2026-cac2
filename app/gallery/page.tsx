"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const BASE = "/ttb-fai-fah-2026-cac2";

const day1Images = Array.from({ length: 22 }, (_, i) => ({
  src: `${BASE}/images/events/day1_${i + 1}.jpg`,
  alt: `กิจกรรม Day 1 รูปที่ ${i + 1}`,
}));

const day2Images = Array.from({ length: 12 }, (_, i) => ({
  src: `${BASE}/images/events/day2_${i + 1}.jpg`,
  alt: `กิจกรรม Day 2 รูปที่ ${i + 1}`,
}));

const endsImages = Array.from({ length: 10 }, (_, i) => ({
  src: `${BASE}/images/ends/end_${i + 1}.jpg`,
  alt: `ภาพรวมจบกิจกรรม รูปที่ ${i + 1}`,
}));

type ImageItem = { src: string; alt: string };

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
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(10,8,6,0.95)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl leading-none transition-colors z-10"
        onClick={onClose}
        aria-label="ปิด"
      >
        ×
      </button>

      {/* Counter */}
      <div
        className="absolute top-5 left-6 text-xs tracking-widest uppercase"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {index + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        className="absolute left-4 text-white/40 hover:text-white transition-colors z-10 p-4"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="ก่อนหน้า"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative max-w-5xl w-full mx-16 max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[index].src}
          alt={images[index].alt}
          className="w-full h-full object-contain max-h-[85vh] rounded"
          style={{ userSelect: "none" }}
        />
      </div>

      {/* Next */}
      <button
        className="absolute right-4 text-white/40 hover:text-white transition-colors z-10 p-4"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="ถัดไป"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

function MasonryGrid({ images, onOpen }: { images: ImageItem[]; onOpen: (i: number) => void }) {
  const [visible, setVisible] = useState<boolean[]>(Array(images.length).fill(false));
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setVisible((prev) => { const next = [...prev]; next[idx] = true; return next; });
          }
        });
      },
      { threshold: 0.1 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [images.length]);

  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
      {images.map((img, i) => (
        <div
          key={img.src}
          ref={(el) => { refs.current[i] = el; }}
          data-idx={i}
          className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg transition-all duration-300"
          style={{
            opacity: visible[i] ? 1 : 0,
            transform: visible[i] ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 500ms ${i * 40}ms, transform 500ms ${i * 40}ms`,
            border: "1px solid var(--color-border)",
          }}
          onClick={() => onOpen(i)}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ backgroundColor: "rgba(242,101,34,0.15)" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturedGrid({ images, onOpen }: { images: ImageItem[]; onOpen: (i: number) => void }) {
  const [visible, setVisible] = useState<boolean[]>(Array(images.length).fill(false));
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setVisible((prev) => { const next = [...prev]; next[idx] = true; return next; });
          }
        });
      },
      { threshold: 0.1 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [images.length]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {images.map((img, i) => {
        const isFeatured = i === 0 || i === 5;
        return (
          <div
            key={img.src}
            ref={(el) => { refs.current[i] = el; }}
            data-idx={i}
            className={`cursor-pointer group relative overflow-hidden rounded-lg ${isFeatured ? "col-span-2 row-span-2" : ""}`}
            style={{
              aspectRatio: isFeatured ? "4/3" : "1",
              opacity: visible[i] ? 1 : 0,
              transform: visible[i] ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 500ms ${i * 60}ms, transform 500ms ${i * 60}ms`,
              border: "1px solid var(--color-border)",
            }}
            onClick={() => onOpen(i)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{ backgroundColor: "rgba(0,115,198,0.15)" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type Section = "events-day1" | "events-day2" | "ends";

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<{ section: Section; index: number } | null>(null);

  const getImages = (section: Section) => {
    if (section === "events-day1") return day1Images;
    if (section === "events-day2") return day2Images;
    return endsImages;
  };

  const openLightbox = (section: Section, index: number) => setLightbox({ section, index });
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => {
    if (!lightbox) return;
    const imgs = getImages(lightbox.section);
    setLightbox({ ...lightbox, index: (lightbox.index - 1 + imgs.length) % imgs.length });
  };
  const nextImage = () => {
    if (!lightbox) return;
    const imgs = getImages(lightbox.section);
    setLightbox({ ...lightbox, index: (lightbox.index + 1) % imgs.length });
  };

  return (
    <div style={{ backgroundColor: "var(--color-canvas)", minHeight: "100vh" }}>
      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={getImages(lightbox.section)}
          index={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      {/* Nav */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 backdrop-blur-md"
        style={{
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "rgba(250,250,249,0.92)",
        }}
      >
        <Link
          href={`${BASE}/`}
          className="flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M13 8H3M7 4l-4 4 4 4" />
          </svg>
          กลับหน้าหลัก
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--color-text-secondary)" }}>
            TTB Foundation
          </span>
          <span className="font-bold text-sm" style={{ color: "var(--color-fai)", fontFamily: "'ekachon', 'ttb', sans-serif" }}>ไฟ</span>
          <span style={{ color: "var(--color-border)" }}>—</span>
          <span className="font-bold text-sm" style={{ color: "var(--color-fah)", fontFamily: "'ekachon', 'ttb', sans-serif" }}>ฟ้า</span>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden" style={{ backgroundColor: "#0D0B09" }}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${BASE}/images/events/day1_1.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px) saturate(0.6)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(13,11,9,0.4) 0%, rgba(13,11,9,0.85) 100%)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 gap-5">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase"
            style={{
              backgroundColor: "rgba(242,101,34,0.2)",
              border: "1px solid rgba(242,101,34,0.4)",
              color: "#F9C9AD",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F26522" }} />
            บรรยากาศกิจกรรม 2026
          </span>
          <h1
            className="text-5xl sm:text-6xl font-bold text-white"
            style={{
              fontFamily: "'Noto Serif Thai', serif",
              letterSpacing: "-0.02em",
              lineHeight: "1.15",
            }}
          >
            ภาพบรรยากาศ
            <br />
            <span style={{ color: "#F26522" }}>ไฟ</span>
            <span className="text-white/40 mx-2">—</span>
            <span style={{ color: "#60B4FF" }}>ฟ้า</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "'ttb', sans-serif" }}>
            รวมภาพกิจกรรม การลงพื้นที่ และความประทับใจจากอาสาสมัครทีทีบี
          </p>
          {/* Stats */}
          <div className="flex items-center gap-8 mt-4">
            {[
              { label: "ภาพกิจกรรม Day 1", value: "22" },
              { label: "ภาพกิจกรรม Day 2", value: "12" },
              { label: "ภาพรวมจบกิจกรรม", value: "10" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "'ekachon', sans-serif" }}>{s.value}</span>
                <span className="text-xs text-white/40 tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Section Tabs anchor */}
      <div
        className="sticky top-[61px] z-30 flex gap-1 px-6 py-3 overflow-x-auto"
        style={{
          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {[
          { href: "#day1", label: "Day 1 — ลงสอน", color: "var(--color-fai)" },
          { href: "#day2", label: "Day 2 — กิจกรรม", color: "var(--color-fai)" },
          { href: "#ends", label: "ภาพรวมจบกิจกรรม", color: "var(--color-fah)" },
          { href: "#video", label: "วิดีโอบรรยากาศ", color: "var(--color-text-secondary)" },
        ].map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className="flex-none px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
            style={{
              color: tab.color,
              border: "1px solid var(--color-border)",
              backgroundColor: "transparent",
              fontFamily: "'ttb', sans-serif",
            }}
          >
            {tab.label}
          </a>
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col gap-20">
        {/* Day 1 */}
        <section id="day1">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "var(--color-fai)" }}
                />
                <span className="text-xs tracking-widest uppercase" style={{ color: "var(--color-fai)" }}>
                  24 สิงหาคม 2026
                </span>
              </div>
              <h2
                className="text-3xl font-bold"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "'Noto Serif Thai', serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Day 1 — ลงสอน
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {day1Images.length} ภาพ · กิจกรรมการเรียนการสอนกับเยาวชน
              </p>
            </div>
            <span
              className="hidden sm:block text-sm px-3 py-1 rounded-full"
              style={{ backgroundColor: "var(--color-fai-pale)", color: "var(--color-fai-hover)", fontFamily: "'ttb', sans-serif" }}
            >
              กิจกรรม
            </span>
          </div>
          <MasonryGrid images={day1Images} onOpen={(i) => openLightbox("events-day1", i)} />
        </section>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--color-border)" }} />

        {/* Day 2 */}
        <section id="day2">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "var(--color-fai)" }}
                />
                <span className="text-xs tracking-widest uppercase" style={{ color: "var(--color-fai)" }}>
                  25 สิงหาคม 2026
                </span>
              </div>
              <h2
                className="text-3xl font-bold"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "'Noto Serif Thai', serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Day 2 — กิจกรรม
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {day2Images.length} ภาพ · บรรยากาศกิจกรรมวันที่สอง
              </p>
            </div>
            <span
              className="hidden sm:block text-sm px-3 py-1 rounded-full"
              style={{ backgroundColor: "var(--color-fai-pale)", color: "var(--color-fai-hover)", fontFamily: "'ttb', sans-serif" }}
            >
              กิจกรรม
            </span>
          </div>
          <MasonryGrid images={day2Images} onOpen={(i) => openLightbox("events-day2", i)} />
        </section>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--color-border)" }} />

        {/* Ends — Featured */}
        <section id="ends">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "var(--color-fah)" }}
                />
                <span className="text-xs tracking-widest uppercase" style={{ color: "var(--color-fah)" }}>
                  ภาพรวม
                </span>
              </div>
              <h2
                className="text-3xl font-bold"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "'Noto Serif Thai', serif",
                  letterSpacing: "-0.02em",
                }}
              >
                ภาพรวมจบกิจกรรม
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {endsImages.length} ภาพ · ถ่ายร่วมกันตอนสิ้นสุดกิจกรรม
              </p>
            </div>
            <span
              className="hidden sm:block text-sm px-3 py-1 rounded-full"
              style={{ backgroundColor: "var(--color-fah-pale)", color: "var(--color-fah)", fontFamily: "'ttb', sans-serif" }}
            >
              ภาพรวม
            </span>
          </div>
          <FeaturedGrid images={endsImages} onOpen={(i) => openLightbox("ends", i)} />
        </section>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--color-border)" }} />

        {/* Video Placeholder */}
        <section id="video">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#9CA3AF" }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: "var(--color-text-secondary)" }}>
                  วิดีโอ
                </span>
              </div>
              <h2
                className="text-3xl font-bold"
                style={{
                  color: "var(--color-text-primary)",
                  fontFamily: "'Noto Serif Thai', serif",
                  letterSpacing: "-0.02em",
                }}
              >
                วิดีโอบรรยากาศ
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                กำลังเพิ่มวิดีโอบรรยากาศการร่วมกิจกรรม
              </p>
            </div>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="relative flex flex-col items-center justify-center rounded-xl gap-4"
                style={{
                  aspectRatio: "16/9",
                  backgroundColor: "var(--color-warm-neutral)",
                  border: "2px dashed var(--color-border)",
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#C4BDB5" }}>
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span className="text-xs" style={{ color: "#C4BDB5" }}>วิดีโอ {n} — เร็วๆ นี้</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-10"
        style={{
          borderTop: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <p className="text-xs" style={{ color: "#B8B0A6", fontFamily: "'ttb', sans-serif" }}>
          © 2026 มูลนิธิทีทีบี · ไฟ-ฟ้า · สงวนลิขสิทธิ์
        </p>
      </footer>
    </div>
  );
}
