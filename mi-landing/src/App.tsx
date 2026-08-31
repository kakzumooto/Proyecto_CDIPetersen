import { useState, useEffect } from "react";

// ── Types ─────────────────────────────────────────
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

// ── Data ──────────────────────────────────────────
const galleryImages: GalleryImage[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&h=400&fit=crop&auto=format", alt: "Niños jugando en el patio" },
  { id: "2", src: "https://images.unsplash.com/photo-1533222481259-ce20eda1e20b?w=400&h=560&fit=crop&auto=format", alt: "Niña corriendo y riendo" },
  { id: "3", src: "https://images.unsplash.com/photo-1627764940620-90393d0e8c34?w=500&h=340&fit=crop&auto=format", alt: "Niños tomados de la mano" },
  { id: "4", src: "https://images.unsplash.com/photo-1567746455504-cb3213f8f5b8?w=500&h=340&fit=crop&auto=format", alt: "Salón de clases colorido" },
  { id: "5", src: "https://images.unsplash.com/photo-1786667395513-1d0804488602?w=600&h=380&fit=crop&auto=format", alt: "Aulas modernas y coloridas" },
  { id: "6", src: "https://images.unsplash.com/photo-1583661664284-d1a5ed6ddde9?w=400&h=300&fit=crop&auto=format", alt: "Amigos en el recreo" },
  { id: "7", src: "https://images.unsplash.com/photo-1664990594725-552201db8079?w=400&h=520&fit=crop&auto=format", alt: "Grupo de niños felices" },
  { id: "8", src: "https://images.unsplash.com/photo-1533222535026-754c501569dd?w=500&h=340&fit=crop&auto=format", alt: "Niños jugando en el jardín" },
  { id: "9", src: "https://images.unsplash.com/photo-1786667395451-3f0cbf620a90?w=500&h=500&fit=crop&auto=format", alt: "Aula amarilla con materiales" },
];

const facilities = [
  {
    icon: "🏫",
    title: "Aulas Iluminadas",
    desc: "Espacios amplios, coloridos y estimulantes diseñados para el aprendizaje activo y la creatividad.",
    color: "bg-blue-50 border-blue-100",
    accent: "text-blue-700",
    img: "https://images.unsplash.com/photo-1786667395513-1d0804488602?w=420&h=230&fit=crop&auto=format",
  },
  {
    icon: "🌳",
    title: "Patio de Juegos",
    desc: "Área exterior segura y equipada con juegos, zona de arena y jardín para explorar la naturaleza.",
    color: "bg-green-50 border-green-100",
    accent: "text-green-700",
    img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=420&h=230&fit=crop&auto=format",
  },
  {
    icon: "🍽️",
    title: "Comedor Nutritivo",
    desc: "Menú balanceado y variado preparado con ingredientes frescos para el sano desarrollo de los niños.",
    color: "bg-yellow-50 border-yellow-100",
    accent: "text-yellow-700",
    img: "https://images.unsplash.com/photo-1567746455504-cb3213f8f5b8?w=420&h=230&fit=crop&auto=format",
  },
  {
    icon: "🎨",
    title: "Taller de Arte",
    desc: "Espacio creativo equipado con materiales para que los niños expresen su imaginación sin límites.",
    color: "bg-red-50 border-red-100",
    accent: "text-red-700",
    img: "https://images.unsplash.com/photo-1786667395451-3f0cbf620a90?w=420&h=230&fit=crop&auto=format",
  },
];

const upcomingEvents = [
  { day: "20", month: "NOV", title: "Día de Muertos", desc: "Celebración cultural con altares, música y tradiciones mexicanas para toda la familia.", color: "bg-purple-600" },
  { day: "12", month: "DIC", title: "Festival de Navidad", desc: "Gran presentación de obras de teatro, villancicos y entrega de regalos para los pequeños.", color: "bg-red-600" },
  { day: "30", month: "ABR", title: "Día del Niño", desc: "Jornada festiva llena de sorpresas, juegos, shows y actividades especiales para los alumnos.", color: "bg-yellow-500" },
  { day: "10", month: "MAY", title: "Día de las Madres", desc: "Presentación especial de los niños con canciones, manualidades y desayuno para mamá.", color: "bg-pink-500" },
];

const values = [
  { icon: "❤️", title: "Amor", desc: "Cada niño recibe cariño, respeto y dedicación genuina." },
  { icon: "🎓", title: "Educación", desc: "Metodología activa adaptada al desarrollo infantil." },
  { icon: "🌟", title: "Excelencia", desc: "Personal certificado y en constante actualización." },
  { icon: "🤝", title: "Comunidad", desc: "Construimos un vínculo sólido con cada familia." },
  { icon: "🎯", title: "Desarrollo", desc: "Estimulamos habilidades motoras, cognitivas y sociales." },
  { icon: "🔒", title: "Seguridad", desc: "Instalaciones seguras con cámaras y personal capacitado." },
];

const pastEvents = [
  { title: "Festival de Primavera 2024", date: "Abril 2024", img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=420&h=236&fit=crop&auto=format" },
  { title: "Ceremonia de Graduación 2024", date: "Julio 2024", img: "https://images.unsplash.com/photo-1627764940620-90393d0e8c34?w=420&h=236&fit=crop&auto=format" },
  { title: "Halloween & Día de Muertos 2024", date: "Octubre 2024", img: "https://images.unsplash.com/photo-1533222481259-ce20eda1e20b?w=420&h=236&fit=crop&auto=format" },
];

// ── Scroll helper ─────────────────────────────────
const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

// ── Navbar ────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { id: "inicio", label: "Inicio" },
    { id: "quienes-somos", label: "Quiénes Somos" },
    { id: "instalaciones", label: "Instalaciones" },
    { id: "galeria", label: "Galería" },
    { id: "eventos", label: "Eventos" },
    { id: "contactanos", label: "Contáctanos" },
  ];

  const handleNav = (id: string) => {
    scrollTo(id);
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-2" : "bg-white/95 backdrop-blur-sm py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => handleNav("inicio")} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-poppins font-bold text-sm tracking-tight">CDI</span>
          </div>
          <div className="text-left">
            <div className="font-poppins font-bold text-blue-700 text-sm leading-tight">CDI Petersen</div>
            <div className="font-nunito text-gray-500 text-xs">Centro de Desarrollo Infantil</div>
          </div>
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => handleNav(id)}
                className="font-nunito font-semibold text-sm text-gray-600 hover:text-blue-700 transition-colors duration-200"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav("contactanos")}
            className="hidden sm:flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white font-poppins font-semibold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            ✨ Inscríbete
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 shadow-lg">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className="flex w-full items-center py-3 px-3 rounded-xl font-nunito font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => handleNav("contactanos")}
            className="mt-3 w-full bg-blue-700 text-white font-poppins font-bold py-3 rounded-2xl shadow"
          >
            ✨ Inscríbete Ahora
          </button>
        </div>
      )}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────
function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-yellow-50"
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-[-120px] w-[560px] h-[560px] bg-yellow-300 opacity-35 pointer-events-none"
        style={{ borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%", filter: "blur(72px)" }}
      />
      <div
        className="absolute bottom-[-80px] left-[-120px] w-[480px] h-[480px] bg-blue-400 opacity-25 pointer-events-none"
        style={{ borderRadius: "45% 55% 70% 30% / 55% 40% 60% 45%", filter: "blur(60px)" }}
      />
      <div
        className="absolute top-[35%] left-[30%] w-[320px] h-[320px] bg-red-300 opacity-15 pointer-events-none"
        style={{ borderRadius: "70% 30% 40% 60% / 45% 55% 50% 50%", filter: "blur(80px)" }}
      />
      <div
        className="absolute top-16 left-[55%] w-[260px] h-[260px] bg-green-300 opacity-20 pointer-events-none"
        style={{ borderRadius: "55% 45% 65% 35% / 60% 40% 60% 40%", filter: "blur(64px)" }}
      />

      {/* Floating geometric accents */}
      <div className="absolute top-28 right-16 w-14 h-14 bg-yellow-400 rounded-2xl rotate-12 opacity-90 shadow-lg hidden md:block" />
      <div className="absolute bottom-36 right-44 w-9 h-9 bg-red-400 rounded-full opacity-80 hidden md:block" />
      <div className="absolute top-44 left-12 w-11 h-11 bg-green-400 rounded-2xl -rotate-12 opacity-80 hidden md:block" />
      <div className="absolute bottom-28 left-36 w-7 h-7 bg-blue-400 rounded-full opacity-70 hidden md:block" />
      <div className="absolute top-64 right-[28%] w-5 h-5 bg-yellow-500 rounded-full opacity-60 hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-14 items-center w-full">
        {/* Left: text */}
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 font-nunito font-semibold text-sm px-4 py-2 rounded-full mb-7 shadow-sm">
            <span>⭐</span> +15 años formando futuros líderes
          </div>
          <h1 className="font-poppins font-extrabold text-5xl sm:text-6xl lg:text-[68px] leading-[1.1] text-gray-900 mb-7">
            El mejor{" "}
            <span className="text-blue-700">inicio</span> para{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-yellow-500">tu hijo</span>
              <span
                className="absolute bottom-0 left-0 w-full h-4 bg-yellow-200 -z-0 rounded-sm"
                style={{ transform: "skewX(-3deg)" }}
              />
            </span>{" "}
            🌟
          </h1>
          <p className="font-nunito text-xl text-gray-600 leading-relaxed mb-9 max-w-lg">
            En el CDI Petersen, cada día es una aventura de aprendizaje. Brindamos un ambiente seguro,
            amoroso y estimulante donde los niños desarrollan todo su potencial.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("contactanos")}
              className="bg-blue-700 hover:bg-blue-800 text-white font-poppins font-bold text-base px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              🎒 ¡Inscribe a tu hijo!
            </button>
            <button
              onClick={() => scrollTo("quienes-somos")}
              className="bg-white text-gray-800 font-poppins font-bold text-base px-8 py-4 rounded-2xl shadow-md hover:shadow-lg border border-gray-200 hover:-translate-y-1 transition-all duration-300"
            >
              Conoce más →
            </button>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-10 mt-12 pt-10 border-t border-gray-200">
            {[
              { num: "500+", label: "Alumnos graduados", color: "text-blue-700" },
              { num: "15+", label: "Años de experiencia", color: "text-yellow-500" },
              { num: "20+", label: "Maestros certificados", color: "text-green-600" },
            ].map((s) => (
              <div key={s.label}>
                <div className={`font-poppins font-extrabold text-3xl ${s.color}`}>{s.num}</div>
                <div className="font-nunito text-gray-500 text-sm mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: hero image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Main blob-shaped image */}
            <div
              className="w-72 h-72 sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] overflow-hidden bg-blue-100 shadow-2xl"
              style={{ borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%" }}
            >
              <img
                src="https://images.unsplash.com/photo-1627764940620-90393d0e8c34?w=640&h=640&fit=crop&auto=format"
                alt="Niños felices en CDI Petersen"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badge: certified */}
            <div className="absolute -bottom-6 -left-10 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🏆</div>
              <div>
                <div className="font-poppins font-bold text-gray-900 text-sm">Certificados</div>
                <div className="font-nunito text-gray-500 text-xs">SEP y SEIEM</div>
              </div>
            </div>

            {/* Floating badge: satisfaction */}
            <div className="absolute -top-5 -right-5 bg-yellow-400 rounded-2xl shadow-lg p-4 flex items-center gap-2">
              <span className="text-2xl">😊</span>
              <div>
                <div className="font-poppins font-bold text-gray-900 text-sm">100%</div>
                <div className="font-poppins text-gray-800 text-xs">Satisfacción</div>
              </div>
            </div>

            {/* Floating badge: open */}
            <div className="absolute top-1/2 -right-12 bg-green-500 rounded-2xl shadow-lg px-4 py-2.5 hidden lg:flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
              <span className="font-nunito font-bold text-white text-sm">Abierto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
          <path d="M0 72L1440 72L1440 36C1200 72 960 0 720 36C480 72 240 0 0 36Z" fill="#f9fafb" />
        </svg>
      </div>
    </section>
  );
}

// ── Quiénes Somos ─────────────────────────────────
function QuienesSomos() {
  return (
    <section id="quienes-somos" className="bg-gray-50 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 font-nunito font-semibold text-sm px-4 py-2 rounded-full mb-4">
            Nuestra Historia
          </span>
          <h2 className="font-poppins font-extrabold text-4xl sm:text-5xl text-gray-900 mb-4">
            ¿Quiénes Somos? 👨‍👩‍👧‍👦
          </h2>
          <p className="font-nunito text-xl text-gray-600 max-w-2xl mx-auto">
            Somos una institución educativa con más de 15 años dedicados a la formación integral
            de los niños en sus primeros años de vida.
          </p>
        </div>

        {/* Mission block */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1533222481259-ce20eda1e20b?w=320&h=360&fit=crop&auto=format"
                alt="Niña feliz"
                className="rounded-3xl shadow-md w-full h-52 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1664990594725-552201db8079?w=320&h=280&fit=crop&auto=format"
                alt="Niños estudiando"
                className="rounded-3xl shadow-md w-full h-52 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1583661664284-d1a5ed6ddde9?w=320&h=280&fit=crop&auto=format"
                alt="Amigos en recreo"
                className="rounded-3xl shadow-md w-full h-52 object-cover -mt-6"
              />
              <img
                src="https://images.unsplash.com/photo-1533222535026-754c501569dd?w=320&h=360&fit=crop&auto=format"
                alt="Niños jugando"
                className="rounded-3xl shadow-md w-full h-52 object-cover"
              />
            </div>
            {/* Center badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-700 rounded-2xl p-5 shadow-2xl text-center pointer-events-none">
              <div className="font-poppins font-extrabold text-4xl text-white leading-none">15+</div>
              <div className="font-nunito text-blue-100 text-xs mt-1 leading-snug">Años de amor<br />y dedicación</div>
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 className="font-poppins font-bold text-3xl text-gray-900 mb-5">Nuestra Misión</h3>
            <p className="font-nunito text-gray-600 text-lg leading-relaxed mb-5">
              En el <strong className="text-blue-700">CDI Petersen</strong>, creemos que los primeros
              años de vida son fundamentales para el desarrollo del ser humano. Nuestra misión es
              proporcionar una educación de calidad en un ambiente seguro, cálido y estimulante
              que inspire a los niños a aprender con alegría.
            </p>
            <p className="font-nunito text-gray-600 text-lg leading-relaxed mb-8">
              Trabajamos de la mano con las familias para crear una comunidad educativa sólida
              donde cada niño pueda crecer, explorar y desarrollar su máximo potencial.
            </p>
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-blue-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">📜</div>
              <div>
                <div className="font-poppins font-bold text-gray-900 text-sm">Reconocimiento oficial</div>
                <div className="font-nunito text-gray-500 text-sm">Certificados por la SEP y la Secretaría de Educación del Estado de México</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 cursor-default"
            >
              <div className="text-4xl mb-3">{v.icon}</div>
              <div className="font-poppins font-bold text-gray-900 text-sm mb-1">{v.title}</div>
              <div className="font-nunito text-gray-500 text-xs leading-snug">{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Instalaciones ─────────────────────────────────
function Instalaciones() {
  return (
    <section id="instalaciones" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-green-100 text-green-700 font-nunito font-semibold text-sm px-4 py-2 rounded-full mb-4">
            Espacios de Aprendizaje
          </span>
          <h2 className="font-poppins font-extrabold text-4xl sm:text-5xl text-gray-900 mb-4">
            Nuestras Instalaciones 🏫
          </h2>
          <p className="font-nunito text-xl text-gray-600 max-w-2xl mx-auto">
            Espacios diseñados especialmente para niños: seguros, coloridos y estimulantes para cada etapa de su desarrollo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((f) => (
            <div
              key={f.title}
              className={`rounded-3xl overflow-hidden border shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group ${f.color}`}
            >
              <div className="overflow-hidden h-48 bg-gray-100">
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className={`font-poppins font-bold text-xl mb-2 ${f.accent}`}>{f.title}</h3>
                <p className="font-nunito text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Galería ───────────────────────────────────────
function Galeria() {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  return (
    <section id="galeria" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-yellow-100 text-yellow-700 font-nunito font-semibold text-sm px-4 py-2 rounded-full mb-4">
            Momentos Especiales
          </span>
          <h2 className="font-poppins font-extrabold text-4xl sm:text-5xl text-gray-900 mb-4">
            Nuestra Galería 📸
          </h2>
          <p className="font-nunito text-xl text-gray-600 max-w-2xl mx-auto">
            Cada imagen cuenta una historia de alegría, aprendizaje y amistad en nuestro centro.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className="break-inside-avoid mb-4 rounded-2xl overflow-hidden shadow-md cursor-pointer group relative"
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/30 transition-all duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-xl transition-all duration-300 scale-75 group-hover:scale-100">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-11 h-11 bg-white/15 hover:bg-white/25 text-white rounded-full flex items-center justify-center transition-colors"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-w-4xl max-h-[88vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={img_large(lightbox.src)}
              alt={lightbox.alt}
              className="w-full max-h-[80vh] object-contain rounded-3xl shadow-2xl"
            />
            <p className="text-center font-nunito text-white/80 mt-4 text-sm">{lightbox.alt}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function img_large(src: string) {
  return src.replace(/w=\d+&h=\d+/, "w=1200&h=800");
}

// ── Eventos ───────────────────────────────────────
function Eventos() {
  return (
    <section id="eventos" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-red-100 text-red-700 font-nunito font-semibold text-sm px-4 py-2 rounded-full mb-4">
            Vida Escolar
          </span>
          <h2 className="font-poppins font-extrabold text-4xl sm:text-5xl text-gray-900 mb-4">
            Eventos 🎉
          </h2>
          <p className="font-nunito text-xl text-gray-600 max-w-2xl mx-auto">
            Celebramos cada momento especial junto a nuestros pequeños y sus familias.
          </p>
        </div>

        {/* Past events - video placeholders */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-gray-200 rounded-xl flex items-center justify-center text-lg">🎬</div>
            <h3 className="font-poppins font-bold text-2xl text-gray-800">Eventos Pasados</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((ev) => (
              <div
                key={ev.title}
                className="rounded-3xl overflow-hidden bg-gray-900 shadow-lg group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={ev.img}
                    alt={ev.title}
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-blue-700 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="font-poppins font-bold text-white text-sm">{ev.title}</p>
                    <p className="font-nunito text-white/60 text-xs">{ev.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming events */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center text-lg">📅</div>
            <h3 className="font-poppins font-bold text-2xl text-gray-800">Próximos Eventos</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((ev) => (
              <div
                key={ev.title}
                className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`${ev.color} p-6 text-center`}>
                  <div className="font-poppins font-extrabold text-5xl text-white leading-none">{ev.day}</div>
                  <div className="font-poppins font-bold text-white/75 text-sm tracking-widest mt-1">{ev.month}</div>
                </div>
                <div className="bg-white p-5">
                  <h4 className="font-poppins font-bold text-gray-900 text-base mb-2">{ev.title}</h4>
                  <p className="font-nunito text-gray-500 text-sm leading-snug">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contáctanos ───────────────────────────────────
function Contactanos() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4500);
    setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
  };

  const socials = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.35 6.35 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.73a8.28 8.28 0 004.84 1.55V6.82a4.83 4.83 0 01-1.07-.13z" />
        </svg>
      ),
      label: "TikTok",
      handle: "@cdi.petersen",
      href: "https://tiktok.com",
      bg: "bg-gray-900 hover:bg-gray-800",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      label: "Facebook",
      handle: "CDI Petersen Oficial",
      href: "https://facebook.com",
      bg: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Correo Electrónico",
      handle: "contacto@cdipetersen.mx",
      href: "mailto:contacto@cdipetersen.mx",
      bg: "bg-red-500 hover:bg-red-600",
    },
  ];

  return (
    <section id="contactanos" className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 py-24 relative overflow-hidden">
      <div
        className="absolute top-[-100px] right-[-150px] w-[520px] h-[520px] bg-blue-500 opacity-20 pointer-events-none"
        style={{ borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%", filter: "blur(60px)" }}
      />
      <div
        className="absolute bottom-[-80px] left-[-100px] w-[400px] h-[400px] bg-yellow-400 opacity-10 pointer-events-none"
        style={{ borderRadius: "45% 55% 70% 30% / 55% 40% 60% 45%", filter: "blur(60px)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-600 text-blue-100 font-nunito font-semibold text-sm px-4 py-2 rounded-full mb-4">
            Estamos aquí para ti
          </span>
          <h2 className="font-poppins font-extrabold text-4xl sm:text-5xl text-white mb-4">
            Contáctanos 📩
          </h2>
          <p className="font-nunito text-blue-200 text-xl max-w-2xl mx-auto">
            ¿Tienes preguntas sobre la inscripción? Escríbenos y te responderemos a la brevedad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form card */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            {sent ? (
              <div className="text-center py-14">
                <div className="text-6xl mb-5">🎉</div>
                <h3 className="font-poppins font-bold text-2xl text-gray-900 mb-2">¡Mensaje enviado!</h3>
                <p className="font-nunito text-gray-600">Te contactaremos muy pronto. ¡Gracias por tu interés en el CDI Petersen!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-poppins font-bold text-2xl text-gray-900 mb-2">Envíanos un mensaje</h3>
                <p className="font-nunito text-gray-500 text-sm mb-6">Cuéntanos sobre tu hijo y te asesoraremos personalmente.</p>
                <div>
                  <label className="block font-nunito font-semibold text-gray-700 text-sm mb-1.5">Nombre completo *</label>
                  <input
                    type="text"
                    required
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    placeholder="Ej. María García López"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 font-nunito text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-nunito font-semibold text-gray-700 text-sm mb-1.5">Correo electrónico *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="correo@ejemplo.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 font-nunito text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-nunito font-semibold text-gray-700 text-sm mb-1.5">Teléfono</label>
                    <input
                      type="tel"
                      value={form.telefono}
                      onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      placeholder="55 1234 5678"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 font-nunito text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-nunito font-semibold text-gray-700 text-sm mb-1.5">Mensaje *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    placeholder="Cuéntanos sobre tu hijo, edad, y cualquier pregunta que tengas..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 font-nunito text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-poppins font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-base"
                >
                  Enviar Mensaje ✈️
                </button>
              </form>
            )}
          </div>

          {/* Right: socials + info */}
          <div className="space-y-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-5 p-5 rounded-2xl ${s.bg} text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group`}
              >
                <div className="opacity-90 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  {s.icon}
                </div>
                <div>
                  <div className="font-poppins font-bold text-lg">{s.label}</div>
                  <div className="font-nunito text-white/75 text-sm">{s.handle}</div>
                </div>
                <div className="ml-auto group-hover:translate-x-1 transition-transform duration-200 opacity-60">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-2">
              <h4 className="font-poppins font-bold text-white text-lg mb-5">📍 Encuéntranos</h4>
              <ul className="space-y-3 font-nunito text-blue-100 text-sm">
                <li className="flex items-start gap-2"><span>📌</span><span>Av. Petersen #123, Col. Centro, Ecatepec, Estado de México</span></li>
                <li className="flex items-center gap-2"><span>📞</span><span>(55) 1234-5678</span></li>
                <li className="flex items-center gap-2"><span>🕒</span><span>Lunes a Viernes: 7:00 am – 6:00 pm</span></li>
                <li className="flex items-center gap-2"><span>📅</span><span>Sábados: 8:00 am – 2:00 pm (solo consultas)</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-poppins font-bold text-base">CDI</span>
              </div>
              <div>
                <div className="font-poppins font-bold text-xl text-white">CDI Petersen</div>
                <div className="font-nunito text-gray-400 text-sm">Centro de Desarrollo Infantil</div>
              </div>
            </div>
            <p className="font-nunito text-gray-400 leading-relaxed max-w-sm text-sm">
              Formando el futuro un niño a la vez desde 2009. Educación de calidad en un ambiente seguro,
              amoroso y estimulante en el corazón del Estado de México.
            </p>
            <div className="flex gap-3 mt-6">
              {["TikTok", "Facebook", "Email"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors text-gray-400 hover:text-white"
                >
                  <span className="text-sm">{s === "TikTok" ? "♪" : s === "Facebook" ? "f" : "@"}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-poppins font-bold text-white text-base mb-5">Contacto</h5>
            <ul className="space-y-3 font-nunito text-gray-400 text-sm">
              <li>📞 (55) 1234-5678</li>
              <li>📧 contacto@cdipetersen.mx</li>
              <li>📌 Av. Petersen #123, Ecatepec</li>
              <li>🌐 Estado de México, México</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h5 className="font-poppins font-bold text-white text-base mb-5">Horarios</h5>
            <ul className="space-y-2.5 font-nunito text-gray-400 text-sm">
              <li className="flex justify-between gap-4">
                <span>Lun – Vie</span>
                <span className="text-white font-semibold">7:00 – 18:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sábados</span>
                <span className="text-white font-semibold">8:00 – 14:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Domingos</span>
                <span className="text-gray-600">Cerrado</span>
              </li>
            </ul>
            <div className="mt-5">
              <span className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-400 font-nunito text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Abierto ahora
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-nunito text-gray-500 text-sm">
            © 2025 CDI Petersen. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-5 justify-center">
            {["Aviso de Privacidad", "Términos de Uso", "Reglamento Escolar"].map((link) => (
              <a key={link} href="#" className="font-nunito text-gray-500 hover:text-white text-sm transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── WhatsApp FAB ──────────────────────────────────
function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/5512345678?text=Hola%2C%20me%20interesa%20inscribir%20a%20mi%20hijo%20en%20el%20CDI%20Petersen"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-50" />
        <div className="relative w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
      </div>
      {/* Tooltip */}
      <div className="absolute right-[72px] bottom-4 bg-gray-900 text-white font-nunito font-semibold text-sm px-3 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        💬 ¡Escríbenos!
      </div>
    </a>
  );
}

// ── App ───────────────────────────────────────────
export default function App() {
  return (
    <div className="font-nunito text-gray-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <QuienesSomos />
      <Instalaciones />
      <Galeria />
      <Eventos />
      <Contactanos />
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
