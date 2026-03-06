import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Tools } from "@/components/Tools";
import { Problem } from "@/components/Problem";
import { Risk } from "@/components/Risk";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Tools />
      <Problem />
      <Risk />
      <Footer />
    </main>
  );
}
