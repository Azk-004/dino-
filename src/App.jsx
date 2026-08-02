import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { ModeProvider } from "./context/ModeContext.jsx";
import { SmoothScroll, ScrollManager } from "./lib/smooth.jsx";
import ModeBackdrop from "./components/modes/ModeBackdrop.jsx";
import ModeWipe from "./components/modes/ModeWipe.jsx";
import ModeIntro from "./components/modes/ModeIntro.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SettingsPanel from "./components/SettingsPanel.jsx";
import DayNightOverlay from "./components/DayNightOverlay.jsx";
import Home from "./pages/Home.jsx";
import Lesson from "./pages/Lesson.jsx";
import Revision from "./pages/Revision.jsx";
import QuizPage from "./pages/QuizPage.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <ModeProvider>
        <ModeWipe />
        <ModeIntro />
        <ModeBackdrop />
        <SettingsProvider>
          <SmoothScroll>
            <HashRouter>
              <ScrollManager />
              <Navbar />
              <DayNightOverlay />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/lecon/:id" element={<Lesson />} />
                  <Route path="/revision" element={<Revision />} />
                  <Route path="/quiz" element={<QuizPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
              <SettingsPanel />
            </HashRouter>
          </SmoothScroll>
        </SettingsProvider>
      </ModeProvider>
    </ThemeProvider>
  );
}
