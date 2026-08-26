"use client";

import { useState } from "react";
import data from "../../score/results.json";

const BASE = "/ttb-fai-fah-2026-cac2";

const FAI = "#F26522"; // ส้ม = post / เติบโต
const FAH = "#0073C6"; // ฟ้า = pre
const GREEN = "#16A34A";
const RED = "#DC2626";

const pct = (v: number) => `${Math.round(v * 100)}%`;
const pct1 = (v: number) => `${(v * 100).toFixed(1)}%`;

/* ─── small building blocks ─── */

function SectionHeading({ tag, color, title, sub }: { tag: string; color: string; title: string; sub?: string }) {
  return (
    <div className="px-1 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-xs tracking-widest uppercase" style={{ color, fontFamily: "'ttb', sans-serif" }}>
          {tag}
        </span>
      </div>
      <h2
        style={{
          color: "var(--color-text-primary)",
          fontFamily: "'Noto Serif Thai', serif",
          fontSize: "clamp(1.3rem, 4.5vw, 1.9rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      {sub && (
        <p className="text-sm mt-1.5" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 ${className}`}
      style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
    >
      {children}
    </div>
  );
}

function KpiCard({
  label,
  value,
  unit,
  sub,
  accent,
}: {
  label: string;
  value: string;
  unit?: string;
  sub?: string;
  accent: string;
}) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: accent }} />
        <span className="text-xs" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className="tabular-nums"
          style={{ color: "var(--color-text-primary)", fontFamily: "'Noto Serif Thai', serif", fontWeight: 700, fontSize: "clamp(1.7rem, 6vw, 2.3rem)", lineHeight: 1 }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>
            {unit}
          </span>
        )}
      </div>
      {sub && (
        <p className="text-xs mt-1.5" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>
          {sub}
        </p>
      )}
    </Card>
  );
}

/* horizontal pre/post comparison bar */
function CompareBar({ label, pre, post, note }: { label: string; pre: number; post: number; note?: boolean }) {
  return (
    <div className="py-2.5">
      <div className="flex items-baseline justify-between mb-1.5 gap-2">
        <span className="text-sm" style={{ color: "var(--color-text-primary)", fontFamily: "'ttb', sans-serif" }}>
          {label}
        </span>
        {note && (
          <span className="text-xs tabular-nums flex-none" style={{ color: post - pre >= 0 ? GREEN : RED, fontFamily: "'ttb', sans-serif" }}>
            {post - pre >= 0 ? "▲" : "▼"} {pct1(Math.abs(post - pre))}
          </span>
        )}
      </div>
      {/* pre */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] w-9 flex-none tabular-nums" style={{ color: FAH, fontFamily: "'ttb', sans-serif" }}>Pre</span>
        <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-warm-neutral)" }}>
          <div className="h-full rounded-full" style={{ width: pct(pre), backgroundColor: FAH, transition: "width .6s cubic-bezier(0.16,1,0.3,1)" }} />
        </div>
        <span className="text-[11px] w-10 flex-none text-right tabular-nums" style={{ color: FAH, fontFamily: "'ttb', sans-serif" }}>{pct(pre)}</span>
      </div>
      {/* post */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] w-9 flex-none tabular-nums" style={{ color: FAI, fontFamily: "'ttb', sans-serif" }}>Post</span>
        <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-warm-neutral)" }}>
          <div className="h-full rounded-full" style={{ width: pct(post), backgroundColor: FAI, transition: "width .6s cubic-bezier(0.16,1,0.3,1)" }} />
        </div>
        <span className="text-[11px] w-10 flex-none text-right tabular-nums" style={{ color: FAI, fontFamily: "'ttb', sans-serif" }}>{pct(post)}</span>
      </div>
    </div>
  );
}

/* legend chip */
function Legend() {
  return (
    <div className="flex items-center gap-4 mb-4 px-1">
      <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>
        <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: FAH }} /> ก่อนเรียน (Pre)
      </span>
      <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>
        <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: FAI }} /> หลังเรียน (Post)
      </span>
    </div>
  );
}

/* list of students who did only one of the two tests */
function StudentList({
  students,
  accent,
  scoreLabel,
}: {
  students: { name: string; nick: string; room: string; score: number }[];
  accent: string;
  scoreLabel: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {students.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5"
          style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <span
            className="w-9 h-9 flex-none rounded-full flex items-center justify-center text-xs font-bold tabular-nums"
            style={{ backgroundColor: accent + "1A", color: accent, fontFamily: "'ttb', sans-serif" }}
          >
            {s.score}
          </span>
          <div className="min-w-0">
            <p className="text-sm truncate" style={{ color: "var(--color-text-primary)", fontFamily: "'ttb', sans-serif" }}>
              {s.nick} <span style={{ color: "var(--color-text-secondary)" }}>· {s.room}</span>
            </p>
            <p className="text-[11px] truncate" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>
              {s.name} · {scoreLabel} {s.score}/25
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── page ─── */
export default function DashboardPage() {
  const { meta, summary, distribution, topics, items, comparison, byRoom, behaviour, preOnly, postOnly } = data;
  const [tab, setTab] = useState<"topic" | "item">("topic");

  const maxBand = Math.max(...distribution.pre, ...distribution.post);

  /* ── derived numbers for executive summary ── */
  const totalParticipants = summary.matched.n + preOnly.length + postOnly.length;
  const ppGain = (summary.post.pct - summary.pre.pct) * 100; // percentage-point gain
  const goodPre = distribution.pre[3] + distribution.pre[4];
  const goodPost = distribution.post[3] + distribution.post[4];
  const topTopics = [...topics].sort((a, b) => b.deltaPct - a.deltaPct).slice(0, 3);
  const topItems = [...items].sort((a, b) => b.deltaPct - a.deltaPct).slice(0, 3);
  const weakItems = [...items].sort((a, b) => a.postPct - b.postPct).slice(0, 3);
  const avg = (arr: { score: number }[]) => (arr.reduce((s, x) => s + x.score, 0) / (arr.length || 1));

  return (
    <div style={{ backgroundColor: "var(--color-canvas)", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <header className="relative overflow-hidden" style={{ backgroundColor: "#0A0806" }}>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 20% 0%, rgba(242,101,34,0.22), transparent 55%), radial-gradient(circle at 90% 30%, rgba(0,115,198,0.18), transparent 50%)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 pt-14 pb-10">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tracking-widest uppercase mb-5"
            style={{ backgroundColor: "rgba(242,101,34,0.18)", border: "1px solid rgba(242,101,34,0.35)", color: "#FBCBAB", fontFamily: "'ttb', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: FAI }} />
            ผลการเรียนรู้ · Pre / Post Test
          </span>
          <h1
            className="text-white mb-3"
            style={{ fontFamily: "'Noto Serif Thai', serif", fontSize: "clamp(1.7rem, 6vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            แดชบอร์ดผลการทดสอบ
          </h1>
          <p className="text-white/60" style={{ fontFamily: "'ttb', sans-serif", fontSize: "clamp(0.9rem, 3vw, 1.05rem)", lineHeight: 1.6 }}>
            {meta.project} · {meta.school}
          </p>
          <p className="text-white/35 text-sm mt-1" style={{ fontFamily: "'ttb', sans-serif" }}>
            คะแนนเต็ม {meta.maxScore} ข้อ · ข้อมูล ณ {meta.generated}
          </p>
        </div>
      </header>

      {/* ── Back link ── */}
      <div className="px-5 pt-6 pb-2 sm:px-8 max-w-3xl mx-auto">
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

      <main className="px-4 sm:px-8 pb-20 max-w-3xl mx-auto flex flex-col gap-14">
        {/* ── KPIs ── */}
        <section className="pt-4">
          <SectionHeading tag="ภาพรวม" color={FAI} title="สรุปผลการทดสอบ" sub={`ผู้ทำแบบทดสอบก่อนเรียน ${summary.pre.n} คน · หลังเรียน ${summary.post.n} คน · จับคู่ได้ ${summary.matched.n} คน`} />
          <div className="grid grid-cols-2 gap-3">
            <KpiCard label="คะแนนเฉลี่ยก่อนเรียน" value={summary.pre.mean.toFixed(1)} unit={`/ ${meta.maxScore}`} sub={`คิดเป็น ${pct(summary.pre.pct)} · SD ${summary.pre.sd}`} accent={FAH} />
            <KpiCard label="คะแนนเฉลี่ยหลังเรียน" value={summary.post.mean.toFixed(1)} unit={`/ ${meta.maxScore}`} sub={`คิดเป็น ${pct(summary.post.pct)} · SD ${summary.post.sd}`} accent={FAI} />
            <KpiCard label="คะแนนเพิ่มขึ้นเฉลี่ย" value={`+${summary.matched.meanDelta.toFixed(1)}`} unit="คะแนน" sub={`เติบโต ${pct(summary.matched.growthRate)} (กลุ่มจับคู่ ${summary.matched.n} คน)`} accent={GREEN} />
            <KpiCard label="ผู้เรียนที่พัฒนาขึ้น" value={pct(summary.matched.improvedPct)} sub={`${summary.matched.improved} คนดีขึ้น · ${summary.matched.declined} คนลดลง`} accent={GREEN} />
          </div>
          <div className="mt-3">
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs mb-1" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>ค่าสถิติเพิ่มเติม (กลุ่มจับคู่)</p>
                  <p className="text-sm" style={{ color: "var(--color-text-primary)", fontFamily: "'ttb', sans-serif" }}>
                    Normalized Gain เฉลี่ย <b style={{ color: FAI }}>{pct(summary.matched.meanNormGain)}</b>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs mb-1" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>ช่วงคะแนน</p>
                  <p className="text-sm tabular-nums" style={{ color: "var(--color-text-primary)", fontFamily: "'ttb', sans-serif" }}>
                    Pre {summary.pre.min}–{summary.pre.max} · Post {summary.post.min}–{summary.post.max}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <div style={{ borderTop: "1px solid var(--color-border)" }} />

        {/* ── Distribution ── */}
        <section>
          <SectionHeading tag="การกระจายคะแนน" color={FAH} title="ระดับคะแนนของผู้เรียน" sub="เปรียบเทียบจำนวนผู้เรียนในแต่ละช่วงคะแนน ก่อน/หลังเรียน" />
          <Card>
            <Legend />
            <div className="flex flex-col gap-4">
              {distribution.bands.map((band, i) => (
                <div key={band}>
                  <p className="text-xs mb-1.5" style={{ color: "var(--color-text-primary)", fontFamily: "'ttb', sans-serif" }}>{band}</p>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-5 rounded-md overflow-hidden flex items-center" style={{ backgroundColor: "var(--color-warm-neutral)" }}>
                      <div className="h-full rounded-md flex items-center justify-end pr-2" style={{ width: `${(distribution.pre[i] / maxBand) * 100}%`, minWidth: distribution.pre[i] ? "1.5rem" : 0, backgroundColor: FAH, transition: "width .6s cubic-bezier(0.16,1,0.3,1)" }}>
                        <span className="text-[10px] text-white tabular-nums font-medium">{distribution.pre[i]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-5 rounded-md overflow-hidden flex items-center" style={{ backgroundColor: "var(--color-warm-neutral)" }}>
                      <div className="h-full rounded-md flex items-center justify-end pr-2" style={{ width: `${(distribution.post[i] / maxBand) * 100}%`, minWidth: distribution.post[i] ? "1.5rem" : 0, backgroundColor: FAI, transition: "width .6s cubic-bezier(0.16,1,0.3,1)" }}>
                        <span className="text-[10px] text-white tabular-nums font-medium">{distribution.post[i]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4 pt-3" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif", borderTop: "1px solid var(--color-border)" }}>
              หลังเรียนผู้ที่ได้คะแนนระดับ “ดี–ดีมาก” (15–25) เพิ่มจาก {distribution.pre[3] + distribution.pre[4]} เป็น {distribution.post[3] + distribution.post[4]} คน
            </p>
          </Card>
        </section>

        <div style={{ borderTop: "1px solid var(--color-border)" }} />

        {/* ── Topic / Item analysis (tabbed) ── */}
        <section>
          <SectionHeading tag="วิเคราะห์รายข้อ" color={FAI} title="ความรู้แยกตามหัวข้อ" sub="สัดส่วนผู้ตอบถูก ก่อน/หลังเรียน" />
          <div className="flex gap-2 mb-4">
            {[
              { k: "topic", label: "ตามหัวข้อ" },
              { k: "item", label: "รายข้อ (25 ข้อ)" },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setTab(t.k as "topic" | "item")}
                className="px-4 py-2 rounded-full text-sm transition-all active:scale-[0.97]"
                style={{
                  fontFamily: "'ttb', sans-serif",
                  backgroundColor: tab === t.k ? FAI : "var(--color-surface)",
                  color: tab === t.k ? "#fff" : "var(--color-text-secondary)",
                  border: `1px solid ${tab === t.k ? FAI : "var(--color-border)"}`,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <Card>
            <Legend />
            {tab === "topic" ? (
              <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
                {topics.map((t) => (
                  <CompareBar key={t.topic} label={t.topic} pre={t.prePct} post={t.postPct} note />
                ))}
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
                {items.map((it) => (
                  <CompareBar key={it.q} label={`${it.q}. ${it.short}`} pre={it.prePct} post={it.postPct} note />
                ))}
              </div>
            )}
          </Card>
        </section>

        <div style={{ borderTop: "1px solid var(--color-border)" }} />

        {/* ── By room ── */}
        <section>
          <SectionHeading tag="แยกตามห้อง" color={FAH} title="เปรียบเทียบรายห้องเรียน" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {byRoom.map((r) => (
              <Card key={r.room}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "'Noto Serif Thai', serif" }}>{r.room}</h3>
                  <span className="text-xs px-2 py-1 rounded-full tabular-nums" style={{ backgroundColor: "var(--color-fai-pale)", color: FAI, fontFamily: "'ttb', sans-serif" }}>
                    +{r.meanDelta.toFixed(1)} คะแนน
                  </span>
                </div>
                <CompareBar label="คะแนนเฉลี่ย" pre={r.meanPre / meta.maxScore} post={r.meanPost / meta.maxScore} />
                <p className="text-xs mt-2 tabular-nums" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>
                  Pre {r.meanPre} ({r.nPre} คน) · Post {r.meanPost} ({r.nPost} คน) · จับคู่ {r.nMatched} คน
                </p>
              </Card>
            ))}
          </div>
        </section>

        <div style={{ borderTop: "1px solid var(--color-border)" }} />

        {/* ── Matched student comparison ── */}
        <section>
          <SectionHeading tag="รายบุคคล" color={FAI} title="พัฒนาการรายคน (กลุ่มจับคู่)" sub={`เรียงตามคะแนนที่เพิ่มขึ้น · ทั้งหมด ${comparison.length} คน`} />
          <Card className="!p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ fontFamily: "'ttb', sans-serif", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "var(--color-warm-neutral)" }}>
                    <th className="text-left px-3 py-2.5 font-medium" style={{ color: "var(--color-text-secondary)" }}>ชื่อเล่น</th>
                    <th className="text-left px-2 py-2.5 font-medium" style={{ color: "var(--color-text-secondary)" }}>ห้อง</th>
                    <th className="text-center px-2 py-2.5 font-medium" style={{ color: FAH }}>Pre</th>
                    <th className="text-center px-2 py-2.5 font-medium" style={{ color: FAI }}>Post</th>
                    <th className="text-center px-3 py-2.5 font-medium" style={{ color: "var(--color-text-secondary)" }}>เปลี่ยน</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((c, i) => (
                    <tr key={i} style={{ borderTop: "1px solid var(--color-border)" }}>
                      <td className="px-3 py-2.5" style={{ color: "var(--color-text-primary)" }}>
                        {c.nick}
                        <span className="block text-[11px] truncate max-w-[9rem]" style={{ color: "var(--color-text-secondary)" }}>{c.name}</span>
                      </td>
                      <td className="px-2 py-2.5 whitespace-nowrap" style={{ color: "var(--color-text-secondary)" }}>{c.room}</td>
                      <td className="px-2 py-2.5 text-center tabular-nums" style={{ color: FAH }}>{c.pre}</td>
                      <td className="px-2 py-2.5 text-center tabular-nums" style={{ color: FAI }}>{c.post}</td>
                      <td className="px-3 py-2.5 text-center tabular-nums font-medium" style={{ color: c.delta > 0 ? GREEN : c.delta < 0 ? RED : "var(--color-text-secondary)" }}>
                        {c.delta > 0 ? `+${c.delta}` : c.delta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        <div style={{ borderTop: "1px solid var(--color-border)" }} />

        {/* ── Incomplete participants ── */}
        <section>
          <SectionHeading
            tag="ทำไม่ครบทั้งสองครั้ง"
            color={FAH}
            title="ผู้เข้าร่วมที่ทำแบบทดสอบไม่ครบ"
            sub="รายชื่อนี้ทำแบบทดสอบเพียงครั้งเดียว จึงไม่ถูกนำไปคำนวณคะแนนพัฒนาการแบบจับคู่ แต่ยังเป็นส่วนหนึ่งของโครงการ"
          />
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: FAH }} />
                <h3 className="text-sm font-medium" style={{ color: "var(--color-text-primary)", fontFamily: "'ttb', sans-serif" }}>
                  ทำเฉพาะก่อนเรียน (Pre) · {preOnly.length} คน
                </h3>
                <span className="text-xs" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>
                  — ขาดแบบทดสอบหลังเรียน
                </span>
              </div>
              <StudentList students={preOnly} accent={FAH} scoreLabel="Pre" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: FAI }} />
                <h3 className="text-sm font-medium" style={{ color: "var(--color-text-primary)", fontFamily: "'ttb', sans-serif" }}>
                  ทำเฉพาะหลังเรียน (Post) · {postOnly.length} คน
                </h3>
                <span className="text-xs" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>
                  — ขาดแบบทดสอบก่อนเรียน
                </span>
              </div>
              <StudentList students={postOnly} accent={FAI} scoreLabel="Post" />
            </div>
          </div>
        </section>

        <div style={{ borderTop: "1px solid var(--color-border)" }} />

        {/* ── Behaviour survey ── */}
        <section>
          <SectionHeading tag="พฤติกรรมการเงิน" color={FAH} title="ผลสำรวจพฤติกรรม" sub="สัดส่วนการตอบแต่ละตัวเลือก ก่อน/หลังเรียน" />
          <div className="flex flex-col gap-3">
            {behaviour.map((b, bi) => (
              <Card key={bi}>
                <h3 className="text-sm font-medium mb-3" style={{ color: "var(--color-text-primary)", fontFamily: "'ttb', sans-serif" }}>{b.question}</h3>
                <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
                  {b.options.map((o, oi) => (
                    <CompareBar key={oi} label={o.label} pre={o.prePct} post={o.postPct} />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <div style={{ borderTop: "1px solid var(--color-border)" }} />

        {/* ── Executive Summary ── */}
        <section>
          <SectionHeading tag="บทสรุปผู้บริหาร" color={FAI} title="สรุปผลลัพธ์โครงการ" sub="ภาพรวมความสำเร็จของโครงการรุ่นพี่การเงิน" />

          {/* headline gradient card */}
          <div
            className="rounded-2xl p-5 sm:p-7 mb-4 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0A0806 0%, #2A1608 100%)" }}
          >
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 85% 20%, rgba(242,101,34,0.28), transparent 55%)" }} />
            <div className="relative z-10">
              <p className="text-white/70 text-sm mb-4" style={{ fontFamily: "'ttb', sans-serif", lineHeight: 1.7 }}>
                หลังเข้าร่วมโครงการ ผู้เรียนกลุ่มที่ทำแบบทดสอบครบทั้งสองครั้ง ({summary.matched.n} คน) มีความรู้ทางการเงินเพิ่มขึ้นอย่างชัดเจน
                คะแนนเฉลี่ยเพิ่มขึ้น <b className="text-white">+{summary.matched.meanDelta.toFixed(1)} คะแนน</b> คิดเป็นการเติบโต{" "}
                <b style={{ color: "#FBCBAB" }}>{pct(summary.matched.growthRate)}</b> และมีผู้เรียนพัฒนาขึ้นถึง{" "}
                <b style={{ color: "#FBCBAB" }}>{pct(summary.matched.improvedPct)}</b>
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: `${Math.round(summary.pre.pct * 100)}%`, l: "ก่อนเรียน", c: "#7FB3E0" },
                  { v: `${Math.round(summary.post.pct * 100)}%`, l: "หลังเรียน", c: "#F7A26B" },
                  { v: `+${ppGain.toFixed(0)}`, l: "จุด (pp) ที่เพิ่ม", c: "#6EE7A8" },
                ].map((x) => (
                  <div key={x.l} className="text-center">
                    <p className="tabular-nums" style={{ color: x.c, fontFamily: "'Noto Serif Thai', serif", fontWeight: 700, fontSize: "clamp(1.5rem,6vw,2rem)", lineHeight: 1 }}>{x.v}</p>
                    <p className="text-white/50 text-xs mt-1" style={{ fontFamily: "'ttb', sans-serif" }}>{x.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* highlight bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card>
              <p className="text-xs mb-2 tracking-widest uppercase" style={{ color: FAI, fontFamily: "'ttb', sans-serif" }}>การมีส่วนร่วม</p>
              <ul className="flex flex-col gap-2 text-sm" style={{ color: "var(--color-text-primary)", fontFamily: "'ttb', sans-serif", lineHeight: 1.6 }}>
                <li>• มีผู้เข้าร่วมทำแบบทดสอบรวม <b>{totalParticipants} คน</b> (ก่อนเรียน {summary.pre.n} · หลังเรียน {summary.post.n})</li>
                <li>• จับคู่วัดพัฒนาการได้ <b>{summary.matched.n} คน</b></li>
                <li>• ทำเฉพาะก่อนเรียน {preOnly.length} คน · ทำเฉพาะหลังเรียน {postOnly.length} คน</li>
              </ul>
            </Card>
            <Card>
              <p className="text-xs mb-2 tracking-widest uppercase" style={{ color: GREEN, fontFamily: "'ttb', sans-serif" }}>ยกระดับคุณภาพ</p>
              <ul className="flex flex-col gap-2 text-sm" style={{ color: "var(--color-text-primary)", fontFamily: "'ttb', sans-serif", lineHeight: 1.6 }}>
                <li>• ผู้ได้คะแนนระดับ “ดี–ดีมาก” เพิ่มจาก <b>{goodPre}</b> เป็น <b>{goodPost} คน</b></li>
                <li>• คะแนนเฉลี่ยหลังเรียนของผู้ทำเฉพาะ Post สูงถึง <b>{avg(postOnly).toFixed(1)}/25</b></li>
                <li>• Normalized Gain เฉลี่ย <b>{pct(summary.matched.meanNormGain)}</b></li>
              </ul>
            </Card>
            <Card>
              <p className="text-xs mb-2 tracking-widest uppercase" style={{ color: FAH, fontFamily: "'ttb', sans-serif" }}>หัวข้อที่พัฒนาเด่นชัด</p>
              <ul className="flex flex-col gap-2 text-sm" style={{ color: "var(--color-text-primary)", fontFamily: "'ttb', sans-serif", lineHeight: 1.6 }}>
                {topTopics.map((t) => (
                  <li key={t.topic}>• {t.topic} <b style={{ color: GREEN }}>+{Math.round(t.deltaPct * 100)} จุด</b></li>
                ))}
              </ul>
              <p className="text-[11px] mt-2" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>
                ข้อที่พัฒนามากสุด: {topItems.map((it) => `ข้อ ${it.q}`).join(", ")}
              </p>
            </Card>
            <Card>
              <p className="text-xs mb-2 tracking-widest uppercase" style={{ color: RED, fontFamily: "'ttb', sans-serif" }}>ยังควรเสริมต่อ</p>
              <ul className="flex flex-col gap-2 text-sm" style={{ color: "var(--color-text-primary)", fontFamily: "'ttb', sans-serif", lineHeight: 1.6 }}>
                {weakItems.map((it) => (
                  <li key={it.q}>• ข้อ {it.q} {it.short} <b style={{ color: RED }}>({pct(it.postPct)})</b></li>
                ))}
              </ul>
              <p className="text-[11px] mt-2" style={{ color: "var(--color-text-secondary)", fontFamily: "'ttb', sans-serif" }}>
                หัวข้อที่ยังตอบถูกน้อยหลังเรียน ควรเน้นย้ำในครั้งถัดไป
              </p>
            </Card>
          </div>

          <div className="mt-4">
            <Card>
              <p className="text-sm" style={{ color: "var(--color-text-primary)", fontFamily: "'ttb', sans-serif", lineHeight: 1.7 }}>
                <b style={{ color: FAI }}>สรุป:</b> โครงการช่วยยกระดับความรู้และความมั่นใจทางการเงินของผู้เรียนได้จริง
                โดยเฉพาะเรื่องการคำนวณดอกเบี้ย การวางแผนธุรกิจ และการแยกแยะสินทรัพย์/หนี้สิน
                ทั้งนี้แนะนำให้ติดตามผู้ที่ทำแบบทดสอบไม่ครบ เพื่อให้ได้ข้อมูลพัฒนาการที่สมบูรณ์ยิ่งขึ้นในครั้งต่อไป
              </p>
            </Card>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="text-center py-10 px-5" style={{ borderTop: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
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
