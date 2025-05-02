'use client';

// Components
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import StatsSection from '../components/landing/StatsSection';
import FaqSection from '../components/landing/FaqSection';
import FeaturesShowcase from '../components/landing/FeaturesShowcase';
import ParallaxDivider from '../components/landing/ParallaxDivider';
import CallToAction from '../components/landing/CallToAction';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <FaqSection />
        <FeaturesShowcase />
        <ParallaxDivider />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
