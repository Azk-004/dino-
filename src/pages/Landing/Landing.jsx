import { lazy, Suspense, useState } from 'react';
import Navbar from '../../components/layout/Navbar.jsx';
import SplashScreen from '../../components/SplashScreen.jsx';
import Hero from './components/Hero.jsx';
import Presentation from './components/Presentation.jsx';
import AanidIntro from './components/AanidIntro.jsx';
import Features from './components/Features.jsx';
import Pricing from './components/Pricing.jsx';
import FormationProcess from './components/FormationProcess.jsx';
import Consultation from './components/Consultation.jsx';
import Audiences from './components/Audiences.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import Footer from '../../components/layout/Footer.jsx';

import ChapterHUD from '../../components/layout/ChapterHUD.jsx';
import { DownloadModalProvider } from '../../contexts/DownloadModalContext.jsx';
import { InscriptionModalProvider } from '../../contexts/InscriptionModalContext.jsx';
import { DayNightProvider, useDayNightMode } from '../../hooks/useDayNightMode.jsx';
import { useLenis } from '../../hooks/useLenis.js';

const BoulevardScene = lazy(() => import('../../three/BoulevardScene.jsx'));

const LoadingSkeleton = () => (
  <div className="fixed inset-0 z-0 flex items-center justify-center bg-night">
    <div className="relative h-24 w-24">
      <div className="absolute inset-0 animate-ping rounded-full border-2 border-primary/30"></div>
      <div className="absolute inset-2 animate-pulse rounded-full bg-primary/20 backdrop-blur-md"></div>
      <div className="absolute inset-4 animate-spin rounded-full border-b-2 border-t-2 border-primary-light"></div>
    </div>
  </div>
);

export default function Landing() {
  return (
    <DayNightProvider>
      <LandingContent />
    </DayNightProvider>
  );
}

function LandingContent() {
  useLenis();
  const { mode } = useDayNightMode();
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashComplete = () => {
    setSplashDone(true);
  };

  return (
    <DownloadModalProvider>
      <InscriptionModalProvider>          <div className={`relative min-h-dvh font-sans antialiased ${mode === 'day' ? 'bg-[#fdfaf2] text-ink' : 'bg-night text-cream'}`}>
            {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-secondary-dark focus:px-4 focus:py-2 focus:text-white"
          >
            Aller au contenu principal
          </a>

          <Suspense fallback={<LoadingSkeleton />}>
            <BoulevardScene className="boulevard-canvas" mode={mode} />
          </Suspense>

          <ChapterHUD />
          <Navbar />

          <main id="contenu" className="relative z-10">
            <Hero />
            <Presentation />
            <AanidIntro />
            <Features />
            <Pricing />
            <FormationProcess />
            <Consultation />
            <Audiences />
            <FinalCTA />
          </main>
          <Footer />
        </div>
      </InscriptionModalProvider>
    </DownloadModalProvider>
  );
}
