import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TTB Fai-Fah — C.A.C.2",
  description: "โครงการไฟ-ฟ้า มูลนิธิทีทีบี — รุ่นพี่การเงิน C.A.C.2",
  icons: {
    icon: "/ttb-fai-fah-2026-cac2/logo-footer.svg",
  },
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
