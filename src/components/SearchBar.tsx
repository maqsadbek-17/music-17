import { Search } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-white/30 group-focus-within:text-indigo-400 transition-colors" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="San’atkor, qo‘shiq yoki albomlarni izlang..."
          className="block w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/30 outline-none transition-all placeholder:text-white/20 text-lg text-white backdrop-blur-3xl"
          id="music-search-input"
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] uppercase tracking-[0.2em] text-white/30">Izlash</span>
        </div>
      </div>
    </motion.div>
  );
}
