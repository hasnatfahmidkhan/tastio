import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Utensils,
  Pizza,
  Coffee,
  IceCream,
  Soup,
  Sandwich,
} from "lucide-react";

// খাবারের আইকন লিস্ট
const icons = [Pizza, Coffee, Utensils, IceCream, Sandwich, Soup];

const PreLoader = ({ fullScreen = false }) => {
  const [index, setIndex] = useState(0);

  // আইকন চেঞ্জ করার লজিক
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, 1000); // প্রতি ১.২ সেকেন্ডে আইকন চেঞ্জ হবে
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = icons[index];

  return (
    <div
      className={`flex flex-col justify-center items-center ${"fixed inset-0 h-screen w-full bg-base-100/80 backdrop-blur-md z-50"}`}
    >
      <div className="relative flex justify-center items-center">
        {/* --- 1. Outer Rotating Ring (Dashed) --- */}
        <motion.div
          className="absolute w-24 h-24 rounded-full border-2 border-dashed border-primary/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* --- 2. Orbiting Dot (Fast) --- */}
        <motion.div
          className="absolute w-24 h-24"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-3 h-3 bg-warning rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-lg shadow-warning/50"></div>
        </motion.div>

        {/* --- 3. The Ripple/Pulse Background --- */}
        <motion.div
          className="absolute w-16 h-16 bg-primary/10 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* --- 4. Morphing Food Icons (Centerpiece) --- */}
        <div className="relative z-10 text-primary">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 10, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentIcon size={40} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* --- Text --- */}
      <motion.p
        className="mt-10 font-bold text-sm tracking-widest text-gray-400 uppercase"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Finding Flavors...
      </motion.p>
    </div>
  );
};

export default PreLoader;
