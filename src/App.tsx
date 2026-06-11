import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Globe2,
  Headphones,
  Layers3,
  MessageSquareQuote,
  Moon,
  Music,
  Play,
  Radio,
  Shield,
  Sparkles,
  Sun,
} from "lucide-react";
import { Track, SearchResponse } from "./types";
import Loader from "./components/Loader";
import MusicCard from "./components/MusicCard";
import SearchBar from "./components/SearchBar";

const services = [
  {
    title: "Curated soundscapes",
    text: "Xiva ruhini aks ettuvchi, zamonaviy va hissiy playlistlar orqali yangi tovushlar toping.",
    icon: Sparkles,
  },
  {
    title: "Artist-first discovery",
    text: "Yangi ijrochilar, live setlar va premium audio kontentlar uchun maxsus qidiruv va tavsiyalar.",
    icon: Radio,
  },
  {
    title: "Fast, reliable playback",
    text: "Tez yuklanadigan, toza interfeys va light/dark rejimlar bilan har qanday qurilmada ajoyib tajriba.",
    icon: Shield,
  },
];

const metrics = [
  { value: "24K+", label: "Musiqa treklarini o‘rganish" },
  { value: "98%", label: "Yuqori sifatli audio uzatish" },
  { value: "12", label: "Premium mood va stildagi kolleksiyalar" },
];

const testimonials = [
  {
    name: "Nodira",
    role: "Brand designer",
    quote:
      "Khiva Music dizayni shunchalik silliq va professionalki, brauzerimizdagi har bir sahifa xuddi premium ilova kabi his qoldiradi.",
  },
  {
    name: "Jamol",
    role: "Music curator",
    quote:
      "Qidirish, tavsiyalar va kontent tartibi juda qulay. Xiva madaniyatidan ilhomlangan atmosfera juda yaxshi ishlaydi.",
  },
];

const faqs = [
  {
    q: "Khiva Music nima uchun maxsus?",
    a: "Bu platforma zamonaviy musiqa kashfiyoti, premium dizayn va UX bilan Xiva madaniyati ruhini birlashtiradi.",
  },
  {
    q: "Sayt mobil qurilmada ham yaxshi ishlaydi?",
    a: "Ha, barcha sectionlar responsive qilib loyihalangan. Mobilda ham hero, karta va qidiruv tajribasi optimallashtirilgan.",
  },
  {
    q: "Qidiruv natijalari real audio preview bilan ishlaydi?",
    a: "Ha. Siz tanlagan treklar uchun preview bo‘limi ham qo‘llab-quvvatlanadi, shuning uchun sayt o‘ziga xos musiqa platformasi sifatida ishlaydi.",
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("khiva-theme") as
      | "dark"
      | "light"
      | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("khiva-theme", theme);
  }, [theme]);

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
        const response = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=18`,
        );
        if (!response.ok) throw new Error("API request failed");

        const data: SearchResponse = await response.json();
        setResults(data.results);

        if (data.results.length === 0) {
          setError("No results found");
        }
      } catch (err) {
        setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchMusic, 500);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <nav className="top-nav shell-card">
        <a
          href="#home"
          className="brand-wrap"
          aria-label="Khiva Music bosh sahifa"
        >
          <div className="brand-mark">
            <Headphones size={18} />
          </div>
          <div>
            <p className="brand-label">Khiva Music</p>
            <span className="brand-sub">Premium audio & discovery</span>
          </div>
        </a>

        <div className="nav-links">
          <a href="#discover">Kashf etish</a>
          <a href="#services">Xizmatlar</a>
          <a href="#stories">Statistika</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="theme-toggle"
            aria-label="Mavzuni o‘zgartirish"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href="#contact" className="primary-button">
            Boshlash
          </a>
        </div>
      </nav>

      <main id="home" className="content-shell">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-grid"
        >
          <article className="shell-card hero-copy">
            <p className="eyebrow">
              Xiva madaniyatidan ilhomlangan premium musiqa platformasi
            </p>
            <h1>
              Khiva Music bilan <span>har bir sekundni</span> tinglashga tayyor
              bo‘ling.
            </h1>
            <p className="lede">
              Zamonaviy dizayn, silliq navigatsiya va sezgir audio kashfiyoti
              bilan ijodkorlar, mixlar va yangi ohanglarni bir joyga jamlaymiz.
            </p>

            <div className="cta-row">
              <a href="#discover" className="primary-button">
                Taraqqiyotni boshlang <ArrowRight size={16} />
              </a>
              <a href="#services" className="ghost-button">
                Xizmatlar
              </a>
            </div>

            <ul className="chip-row" aria-label="Asosiy xususiyatlar">
              <li>Live sessions</li>
              <li>Curated playlists</li>
              <li>AI-driven discovery</li>
              <li>Responsive UX</li>
            </ul>

            <div className="search-panel">
              <SearchBar value={query} onChange={setQuery} />
              <p className="support-copy">
                Qidiruv maydoniga san’atkor, qo‘shiq yoki kayfiyat yozing — real
                previewlar bilan natijalar chiqadi.
              </p>
            </div>
          </article>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="hero-side"
          >
            <article className="shell-card showcase-card">
              <div className="mini-label">Bugun musiqasi</div>
              <h2>
                O‘zingizga mos, zamonaviy va chuqur his qilinadigan audio
                muhiti.
              </h2>
              <p>
                Dark va light rejimlarda ishlaydigan premium kadrlar,
                glasmorphism ta’siri va kuchli tipografiya bilan foydalanuvchi
                tajribasini maxsus darajaga ko‘taramiz.
              </p>
            </article>

            <article className="shell-card stats-card">
              {metrics.map((item) => (
                <div key={item.label} className="stat-item">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </article>

            <article className="shell-card quick-note">
              <div className="quick-note-icon">
                <Layers3 size={18} />
              </div>
              <div>
                <h3>Yangi muhit</h3>
                <p>
                  Xiva madaniyatining nozik ranglari, soft shadows va premium
                  whitespace bilan yaratilgan interfeys.
                </p>
              </div>
            </article>
          </motion.aside>
        </motion.section>

        <section className="feature-grid" id="services">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="shell-card feature-card"
              >
                <div className="feature-icon">
                  <Icon size={18} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            );
          })}
        </section>

        <section className="content-grid" id="discover">
          <article className="shell-card discovery-card">
            <div className="section-heading">
              <p className="eyebrow">Qidiruv natijalari</p>
              <h2>Musical discovery rivojlanmoqda</h2>
              <p>
                Qidiruv maydonidagi kalit so‘zni o‘zgartirsangiz, real-time
                natijalar yangilanadi.
              </p>
            </div>

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
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="empty-state"
                >
                  <div className="empty-icon">
                    <Music size={22} />
                  </div>
                  <h3>
                    {error === "No results found"
                      ? "Hech narsa topilmadi"
                      : error}
                  </h3>
                  <p>Qidiruv so‘zingizni o‘zgartirib yana urinib ko‘ring.</p>
                </motion.div>
              ) : results.length > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="result-grid"
                >
                  {results.map((track) => (
                    <MusicCard key={track.trackId} track={track} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="empty-state"
                >
                  <div className="empty-icon">
                    <Headphones size={22} />
                  </div>
                  <h3>Qidiruvni boshlang</h3>
                  <p>
                    Khiva Music orqali mahoratli va zamonaviy audio kashfiyotini
                    boshlang.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>

          <aside className="side-stack">
            <article className="shell-card side-card">
              <p className="mini-label">Nega aynan biz?</p>
              <h3>Premium, minimalist va user-centric tajriba</h3>
              <ul className="check-list">
                <li>Glassmorphism, soft shadows va gradient aksentlar</li>
                <li>SEO, accessibility va performance optimizatsiyasi</li>
                <li>Desktop, tablet va mobile uchun to‘liq responsiv</li>
              </ul>
            </article>

            <article className="shell-card side-card accent-card">
              <div className="feature-icon">
                <Globe2 size={18} />
              </div>
              <h3>O‘zbek tilida, xalqaro darajada</h3>
              <p>
                Matnlar, CTA va ruhiy atmosfera O‘zbek tilida bo‘lib, xalqaro
                premium standartlarga mos keladi.
              </p>
            </article>
          </aside>
        </section>

        <section className="story-grid" id="stories">
          <article className="shell-card story-card">
            <p className="eyebrow">Sifat va tezlik</p>
            <h2>Performance va tajriba yuqori darajada.</h2>
            <p>
              Saytning barcha bloklari bo‘yicha whitespace, interaktiv
              elementlar va micro-interactions optimallashtirilgan. Lighthouse
              natijalarini oshirish uchun semantic HTML, optimizatsiya qilingan
              assetlar va responsiv layout qo‘llanadi.
            </p>
          </article>
          <article className="shell-card quote-card">
            <MessageSquareQuote className="quote-icon" size={20} />
            <p>
              “Khiva Music — zamonaviy musiqa platformasi uchun premium dizayn,
              real-time kashfiyot va ko‘rishdan zavqlanish.”
            </p>
          </article>
        </section>

        <section className="testimonials-grid">
          {testimonials.map((item) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="shell-card testimonial-card"
            >
              <p>“{item.quote}”</p>
              <div>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </motion.article>
          ))}
        </section>

        <section className="faq-grid" id="faq">
          <article className="shell-card faq-card">
            <p className="eyebrow">FAQ</p>
            <h2>Tez-tez so‘raladigan savollar</h2>
            <p>
              Interface, musiqani qidirish va dizayn nuqtalariga oid eng muhim
              savollarni shu yerda javoblaymiz.
            </p>
          </article>
          <article className="shell-card faq-list">
            {faqs.map((item, index) => (
              <div key={item.q} className="faq-item">
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{item.q}</span>
                  <strong>{openFaq === index ? "−" : "+"}</strong>
                </button>
                {openFaq === index && <p className="faq-answer">{item.a}</p>}
              </div>
            ))}
          </article>
        </section>

        <section className="cta-card shell-card" id="contact">
          <div>
            <p className="eyebrow">Biz bilan bog‘laning</p>
            <h2>Premium musiqa tajribasini hozir boshlang.</h2>
            <p>
              Khiva Music brandiga mos lahzalar, playlistlar va zamonaviy
              marketing kontentini yaratishda yordam beramiz.
            </p>
          </div>
          <a href="mailto:hello@khivamusic.com" className="primary-button">
            hello@khivamusic.com
          </a>
        </section>
      </main>

      <footer className="footer shell-card">
        <div>
          <p className="brand-label">Khiva Music</p>
          <span className="brand-sub">
            Premium audio, modern UX va Xiva ruhidagi dizayn.
          </span>
        </div>
        <p>© 2026 Khiva Music. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}
