import { Play, Pause, Music } from "lucide-react";
import { motion } from "motion/react";
import React, { useState, useRef, useEffect } from "react";
import { Track } from "../types";

interface MusicCardProps {
  track: Track;
}

const MusicCard: React.FC<MusicCardProps> = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Pause all other potentially playing audios
        document.querySelectorAll("audio").forEach((audio) => {
          if (audio !== audioRef.current) audio.pause();
        });
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-[color:var(--panel)] border border-[color:var(--border)] rounded-[2.5rem] p-4 transition-all hover:bg-[color:var(--panel-2)] overflow-hidden flex flex-col h-full shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
      id={`track-${track.trackId}`}
    >
      <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-5">
        <img
          src={track.artworkUrl100.replace("100x100", "600x600")}
          alt={track.trackName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center duration-300 backdrop-blur-[2px]">
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-all active:scale-90 duration-300"
            id={`play-button-${track.trackId}`}
          >
            {isPlaying ? (
              <Pause fill="currentColor" size={24} />
            ) : (
              <Play fill="currentColor" size={24} className="ml-1" />
            )}
          </button>
        </div>
        {isPlaying && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-500 rounded-full text-[9px] font-bold uppercase tracking-widest animate-pulse shadow-lg shadow-indigo-500/50">
            Playing
          </div>
        )}
      </div>

      <div className="px-2 pb-2 flex-1 flex flex-col">
        <h3 className="font-bold text-[color:var(--text)] text-base leading-tight line-clamp-1 mb-1 transition-colors group-hover:text-indigo-400">
          {track.trackName}
        </h3>
        <p className="text-[color:var(--muted)] text-[13px] font-medium line-clamp-1 mb-4">
          {track.artistName}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
          <span className="flex items-center gap-1.5 py-1 px-2.5 bg-[color:var(--panel-2)] rounded-full text-[10px] text-[color:var(--muted)] uppercase font-bold tracking-wider border border-[color:var(--border)]">
            <Music size={10} className="text-indigo-500" />{" "}
            {track.primaryGenreName}
          </span>
        </div>
      </div>

      <audio ref={audioRef} src={track.previewUrl} />
    </motion.div>
  );
};

export default MusicCard;
