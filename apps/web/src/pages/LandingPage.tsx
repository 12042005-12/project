import { HeroSection } from '../components/hero-section';
import { FeatureCards } from '../components/feature-cards';
import { Footer } from '../components/footer';
import { Navbar } from '../components/navbar';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.2),_transparent_35%),linear-gradient(135deg,_#020617,_#111827_55%,_#1f2937)] text-slate-100">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <HeroSection />
        <FeatureCards />
      </main>
      <Footer />
    </div>
  );
}
