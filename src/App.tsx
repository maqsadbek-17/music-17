import { useState, useEffect } from 'react';
import { Music, AlertCircle, Headphones, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Track, SearchResponse } from './types';
import SearchBar from './components/SearchBar';
import MusicCard from './components/MusicCard';
import Loader from './components/Loader';

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    const fetchMusic = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=24`);
        if (!response.ok) throw new Error('API request failed');
        
        const data: SearchResponse = await response.json();
        setResults(data.results);
        
        if (data.results.length === 0) {
          setError('No results found');
        }
      } catch (err) {
        setError('Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchMusic();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <div className="atmosphere-glow-1" />
      <div className="atmosphere-glow-2" />
      
      {/* Navigation */}
      <nav className="glass-nav relative z-20 flex items-center justify-between px-6 sm:px-10 py-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tighter uppercase italic">MelodyHub</span>
        </div>
        <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
          <a href="#" className="text-white">Discover</a>
          <a href="#" className="hover:text-white transition-colors">Browse</a>
          <a href="#" className="hover:text-white transition-colors">Library</a>
          <a href="#" className="hover:text-white transition-colors">Premium</a>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-white/10 flex items-center justify-center">
            <Music size={14} className="text-white/40" />
        </div>
      </nav>

      {/* Hero Header */}
      <motion.header 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="px-6 sm:px-10 py-12 flex flex-col items-center text-center"
      >
        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4">
          Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Rhythm.</span>
        </h1>
        <p className="text-white/40 text-sm sm:text-base max-w-lg mb-10 tracking-wide font-medium">
          Musiqa olamidagi eng so‘nggi taronalar va sevimli san’atkorlaringizni bir joyda qidiring.
        </p>
        <SearchBar value={query} onChange={setQuery} />
        {results.length > 0 && !isLoading && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="mt-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20"
          >
            "{query}" uchun {results.length} ta natija topildi
          </motion.p>
        )}
      </motion.header>

      {/* Main Results Container */}
      <main className="w-full max-w-7xl mx-auto flex-1 px-6 sm:px-10 pb-20">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mb-6">
                <AlertCircle className="w-10 h-10 text-indigo-500/40" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {error === 'No results found' ? 'Hech narsa topilmadi' : error}
              </h2>
              <p className="text-white/30 text-sm max-w-xs font-medium">
                Siz qidirayotgan musiqa bizning bazamizda yo‘q bo‘lishi mumkin. Iltimos, boshqa kalit so‘z bilan urinib ko‘ring.
              </p>
            </motion.div>
          ) : results.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              id="results-grid"
            >
              {results.map((track) => (
                <MusicCard key={track.trackId} track={track} />
              ))}
            </motion.div>
          ) : !query && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center opacity-10"
            >
              <Music size={160} strokeWidth={0.3} className="text-indigo-500" />
              <p className="mt-8 text-xs font-black tracking-[0.5em] uppercase">Pleylistingizni boshlang</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Playback Control Simulation/Footer */}
      <footer className="sticky bottom-0 z-30 h-24 bg-black/40 backdrop-blur-3xl border-t border-white/10 flex items-center px-6 sm:px-10 justify-between">
        <div className="flex items-center gap-4 w-1/3">
          <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
            <Music size={18} className="text-white/20" />
          </div>
          <div className="hidden sm:block">
            <h4 className="text-[13px] font-bold text-white tracking-tight leading-none mb-1">Musiqa tinglang</h4>
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">MelodyHub Player</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 w-1/3">
          <div className="flex items-center gap-6">
            <button className="text-white/20 hover:text-white transition-colors"><Music size={16} /></button>
            <button className="w-10 h-10 bg-white rounded-full text-black flex items-center justify-center hover:scale-110 transition-transform"><Play fill="currentColor" className="ml-1" size={18} /></button>
            <button className="text-white/20 hover:text-white transition-colors"><Headphones size={16} /></button>
          </div>
        </div>

        <div className="flex justify-end items-center gap-4 w-1/3">
           <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] hidden md:block">Ready to stream</p>
        </div>
      </footer>
    </div>
  );
}
