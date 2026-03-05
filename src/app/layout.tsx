import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIComply - Illinois AI Hiring Law Compliance",
  description:
    "Free compliance assessment for Illinois HB 3773. Check if your hiring tools trigger AI disclosure requirements.",
  openGraph: {
    title: "AIComply - Is Your Company Compliant with Illinois's AI Hiring Law?",
    description:
      "If you use Indeed, LinkedIn, Greenhouse, or any AI-powered hiring tool in Illinois, you may be required to provide written disclosures. Free 2-minute compliance check.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
