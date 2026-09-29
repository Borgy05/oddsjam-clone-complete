import { motion, useReducedMotion } from "framer-motion";
import { Smartphone } from "lucide-react";

export function RotatePrompt() {
  const reduced = useReducedMotion();
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-[#0a0a0d] text-center">
      <motion.div
        animate={reduced ? { rotate: 90 } : { rotate: [0, 90, 90, 0] }}
        transition={
          reduced
            ? { duration: 0 }
            : { repeat: Infinity, duration: 2.4, times: [0, 0.35, 0.75, 1], ease: "easeInOut" }
        }
        className="text-icon"
      >
        <Smartphone size={56} />
      </motion.div>
      <div>
        <p className="text-lg font-semibold text-white">Rotate your device</p>
        <p className="mt-1 text-sm text-icon/70">KeyLoop plays in landscape.</p>
      </div>
    </div>
  );
}
