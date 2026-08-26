import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TTB Fai-Fah — Coming Soon",
  description: "โครงการไฟ-ฟ้า มูลนิธิทีทีบี — เร็วๆ นี้",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className="h-full">
      <body
        className="h-full"
        style={{ fontFamily: "'ttb', 'Helvetica Neue', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
