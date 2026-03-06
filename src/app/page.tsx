import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Risk } from "@/components/Risk";
import { Tools } from "@/components/Tools";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Problem />
      <Tools />
      <Risk />
      <Footer />
    </main>
  );
}
