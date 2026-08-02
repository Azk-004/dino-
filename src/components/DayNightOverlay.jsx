import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext.jsx";

export default function DayNightOverlay() {
  const { transitioning, theme } = useTheme();

  return (
    <AnimatePresence>
      {transitioning && (
        <motion.div
          key={`${theme}-${Date.now()}`}
          className="sunrise-overlay"
          initial={{ opacity: 0, scaleY: 0.2 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.15, ease: [0.32, 0.72, 0.35, 1] }}
          style={{ transformOrigin: "center" }}
        />
      )}
    </AnimatePresence>
  );
}
