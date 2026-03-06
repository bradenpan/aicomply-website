import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
      <body className={`${inter.className} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17998193382"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17998193382');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
