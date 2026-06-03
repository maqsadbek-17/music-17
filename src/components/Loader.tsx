import { motion } from 'motion/react';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="flex gap-1 items-end h-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{
              height: [8, 32, 8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
            className="w-1.5 bg-indigo-500 rounded-full"
          />
        ))}
      </div>
      <p className="text-white/40 text-sm font-medium animate-pulse tracking-widest uppercase">Yuklanmoqda...</p>
    </div>
  );
}
