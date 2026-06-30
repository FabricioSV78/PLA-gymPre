"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Dumbbell,
  Flame,
  HeartPulse,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  MoveUpRight,
  Play,
  Plus,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { createContext, CSSProperties, FormEvent, ReactNode, useContext, useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "51987654321";
const SITE_MOTION_ENABLED = true;

const navItems = [
  { label: "Objetivos", href: "#objetivos" },
  { label: "Método", href: "#metodo" },
  { label: "Clases", href: "#clases" },
  { label: "Coaches", href: "#coaches" },
  { label: "Planes", href: "#planes" },
];

const marqueeItems = [
  "Fuerza guiada",
  "Cardio inteligente",
  "Coaches en piso",
  "Planes sin matrícula",
  "Abierto desde 5:20 a.m.",
];

const marqueeGroupItems = Array.from({ length: 4 }, () => marqueeItems).flat();

const goals = [
  {
    id: "strength",
    index: "01",
    title: "Ganar fuerza",
    caption: "Construye una base que se note dentro y fuera del rack.",
    result: "+18% de fuerza media en 12 semanas",
    icon: Dumbbell,
  },
  {
    id: "conditioning",
    index: "02",
    title: "Mejorar condición",
    caption: "Resistencia real para rendir más sin quedarte sin aire.",
    result: "Sesiones escalables a tu nivel actual",
    icon: HeartPulse,
  },
  {
    id: "transform",
    index: "03",
    title: "Transformar mi físico",
    caption: "Entrenamiento, nutrición y seguimiento en un solo plan.",
    result: "Progreso medido cada cuatro semanas",
    icon: Flame,
  },
];

const methodSteps = [
  { number: "01", title: "Diagnóstico", text: "Medimos tu punto de partida y definimos un objetivo realista.", focus: "Evaluación inicial", icon: Target },
  { number: "02", title: "Plan", text: "Armamos una ruta semanal con cargas, bloques y descansos claros.", focus: "Ruta personalizada", icon: Dumbbell },
  { number: "03", title: "Coaching", text: "Ajustamos técnica en piso para que avances sin entrenar a ciegas.", focus: "Corrección constante", icon: ShieldCheck },
  { number: "04", title: "Evolución", text: "Revisamos resultados y elevamos el reto cuando tu cuerpo responde.", focus: "Progreso medible", icon: Trophy },
];

const classes = [
  { name: "Power Lab", type: "Fuerza", intensity: "Alta", duration: "55 min", coach: "Marco", icon: Dumbbell },
  { name: "Engine", type: "HIIT", intensity: "Alta", duration: "45 min", coach: "Valeria", icon: Zap },
  { name: "Mobility Reset", type: "Movilidad", intensity: "Media", duration: "40 min", coach: "Sofía", icon: HeartPulse },
  { name: "Rat Box", type: "Funcional", intensity: "Escalable", duration: "50 min", coach: "Diego", icon: Target },
];

const coaches = [
  {
    id: "carlos",
    name: "Carlos Mendoza",
    role: "Head coach",
    discipline: "Fuerza",
    tags: ["Técnica", "Potencia"],
    description: "Construye fuerza real con técnica limpia, progresión medible y control de cada levantamiento.",
    traits: ["8 años de experiencia", "Técnica de barra", "Progresión por objetivos"],
    image: "/media/coach.jpg",
    imagePosition: "center",
  },
  {
    id: "valeria",
    name: "Valeria Ríos",
    role: "HIIT coach",
    discipline: "Cardio",
    tags: ["HIIT", "Resistencia"],
    description: "Ritmo alto, técnica clara y energía sin perder control.",
    traits: ["Bloques intensos", "Cardio medible", "Escala por nivel"],
    image: "/media/facilities/pesas.jpg",
    imagePosition: "48% center",
  },
  {
    id: "diego",
    name: "Diego Torres",
    role: "Performance coach",
    discipline: "Engine",
    tags: ["HIIT", "Cardio"],
    description: "Eleva tu capacidad física con sesiones intensas, escalables y diseñadas para sostener el ritmo.",
    traits: ["Motor y resistencia", "HIIT escalable", "Control de intensidad"],
    image: "/media/facilities/cardio.jpg",
    imagePosition: "70% center",
  },
  {
    id: "sofia",
    name: "Sofía Vega",
    role: "Mobility coach",
    discipline: "Recovery",
    tags: ["Movilidad", "Control"],
    description: "Mejor rango, menos tensión y movimiento más limpio.",
    traits: ["Movilidad activa", "Respiración", "Recuperación guiada"],
    image: "/media/facilities/duchas.jpg",
    imagePosition: "center",
  },
  {
    id: "marco",
    name: "Marco Salazar",
    role: "Strength coach",
    discipline: "Power",
    tags: ["Barbell", "Rendimiento"],
    description: "Convierte potencia y disciplina en rendimiento con sesiones precisas y sin movimientos de relleno.",
    traits: ["Potencia aplicada", "Trabajo con barra", "Rendimiento deportivo"],
    image: "/media/facilities/lockers.jpg",
    imagePosition: "34% center",
  },
];

const schedule = {
  Lun: ["06:00 Power Lab", "08:00 Mobility", "18:30 Engine", "20:00 Rat Box"],
  Mar: ["06:30 Engine", "09:00 Rat Box", "19:00 Power Lab", "20:30 Mobility"],
  Mié: ["06:00 Power Lab", "08:00 Mobility", "18:30 Rat Box", "20:00 Engine"],
  Jue: ["06:30 Rat Box", "09:00 Engine", "19:00 Power Lab", "20:30 Mobility"],
  Vie: ["06:00 Power Lab", "08:00 Mobility", "18:30 Engine", "20:00 Rat Box"],
  Sáb: ["08:00 Engine", "09:30 Power Lab", "11:00 Rat Box", "12:30 Mobility"],
};

const facilities = [
  {
    src: "/media/facilities/pesas.jpg",
    alt: "Zona de fuerza con racks, barras y discos profesionales",
    title: "Strength arena",
    detail: "Racks, plataformas y peso libre",
    className: "facility-card facility-card--hero",
  },
  {
    src: "/media/facilities/cardio.jpg",
    alt: "Zona amplia de cardio del gimnasio",
    title: "Cardio lab",
    detail: "Tecnología para medir cada esfuerzo",
    className: "facility-card",
  },
  {
    src: "/media/facilities/lockers.jpg",
    alt: "Lockers seguros para miembros del gimnasio",
    title: "Lockers",
    detail: "Tu espacio, seguro y cómodo",
    className: "facility-card",
  },
  {
    src: "/media/facilities/batidos.jpg",
    alt: "Bar de batidos y nutrición dentro del club",
    title: "Fuel bar",
    detail: "Recarga antes o después de entrenar",
    className: "facility-card facility-card--wide",
  },
  {
    src: "/media/facilities/duchas.jpg",
    alt: "Duchas disponibles para miembros de Gym Rat Club",
    title: "Duchas",
    detail: "Comodidad para continuar tu día",
    className: "facility-card",
  },
  {
    src: "/media/facilities/estacionamiento_vehicular.jpg",
    alt: "Estacionamiento vehicular de Gym Rat Club",
    title: "Estacionamiento",
    detail: "Acceso vehicular para entrenar sin fricción",
    className: "facility-card",
  },
];

const plans = [
  {
    name: "Base",
    monthly: 119,
    description: "Para entrenar a tu ritmo con todo lo esencial.",
    features: ["Acceso a pesas y cardio", "Rutinas guiadas", "Soporte en piso", "Lockers diarios"],
  },
  {
    name: "Performance",
    monthly: 179,
    description: "La experiencia completa para acelerar resultados.",
    features: ["Todo lo del plan mensual", "Evaluación física inicial", "Descuento en tienda", "Plan de entrenamiento", "Revisión mensual"],
    featured: true,
  },
  {
    name: "Elite",
    monthly: 289,
    description: "Coaching cercano, recuperación y máxima atención.",
    features: ["Todo lo del plan trimestral", "Asesoría nutricional", "Eventos y retos", "4 sesiones personalizadas", "Acceso prioritario"],
  },
];

const testimonials = [
  {
    quote: "Por primera vez dejé de improvisar. En tres meses levanté más, dormí mejor y volví a disfrutar entrenar.",
    name: "Lucía Fernández",
    detail: "Miembro desde 2024 · Performance",
    result: "+22 kg en sentadilla",
  },
  {
    quote: "El ambiente empuja, pero los coaches cuidan la técnica. Esa mezcla fue exactamente lo que necesitaba.",
    name: "Andrés Salazar",
    detail: "Miembro desde 2023 · Elite",
    result: "-8 cm de cintura",
  },
];

const faqs = [
  ["¿Necesito experiencia previa?", "No. La evaluación inicial nos permite adaptar cargas, movimientos e intensidad desde tu primer día."],
  ["¿Qué incluye la semana de experiencia?", "Acceso al club, una evaluación con coach y dos clases para que pruebes el método antes de elegir un plan."],
  ["¿Puedo congelar mi membresía?", "Sí. Los planes Performance y Elite permiten pausas programadas por viaje o indicación médica."],
  ["¿Hay estacionamiento y duchas?", "Sí. Contamos con estacionamiento, lockers, duchas y zona de recuperación para miembros."],
];

type FormErrors = Partial<Record<"name" | "phone" | "goal" | "date", string>>;

type RuntimePerformance = {
  lite: boolean;
  motion: boolean;
  progress: boolean;
  pointer: boolean;
  richMedia: boolean;
};

type NavigatorConnection = {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: "change", listener: EventListenerOrEventListenerObject) => void;
  removeEventListener?: (type: "change", listener: EventListenerOrEventListenerObject) => void;
};

const defaultRuntimePerformance: RuntimePerformance = {
  lite: true,
  motion: false,
  progress: false,
  pointer: false,
  richMedia: false,
};

const MotionEnabledContext = createContext(false);

function getRuntimePerformance(): RuntimePerformance {
  const runtimeNavigator = navigator as Navigator & {
    connection?: NavigatorConnection;
    deviceMemory?: number;
  };
  const connection = runtimeNavigator.connection;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const mobileLike = coarsePointer || window.matchMedia("(max-width: 900px) and (hover: none)").matches;
  const desktopLike = finePointer && !mobileLike;
  const saveData = connection?.saveData ?? false;
  const slowConnection = typeof connection?.effectiveType === "string" && /(2g|3g)/i.test(connection.effectiveType);
  const lowMemory = typeof runtimeNavigator.deviceMemory === "number" && runtimeNavigator.deviceMemory <= 4;
  const lowCpu = navigator.hardwareConcurrency <= 4;
  const lite =
    saveData ||
    slowConnection ||
    mobileLike ||
    (mobileLike && prefersReducedMotion) ||
    (!desktopLike && (lowMemory || lowCpu));
  const motion = SITE_MOTION_ENABLED && !lite;

  return {
    lite,
    motion,
    progress: !lite,
    pointer: !lite && finePointer,
    richMedia: !lite,
  };
}

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type RevealDirection = "up" | "left" | "right" | "scale";

const revealInitialState: Record<RevealDirection, { opacity: number; x?: number; y?: number; scale?: number }> = {
  up: { opacity: 0, y: 34 },
  left: { opacity: 0, x: -46 },
  right: { opacity: 0, x: 46 },
  scale: { opacity: 0, y: 18, scale: 0.94 },
};

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
}) {
  const motionEnabled = useContext(MotionEnabledContext);
  const reduceMotion = !motionEnabled;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={revealInitialState[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -4% 0px" }}
      transition={{ type: "spring", stiffness: 72, damping: 17, mass: 0.72, delay }}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.25 });

  return <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />;
}

function LogoMark() {
  return (
    <span className="brand" aria-label="Gym Rat Club">
      <span className="brand-mark" aria-hidden="true">GR</span>
      <span className="brand-copy"><strong>Gym Rat</strong></span>
    </span>
  );
}

function SectionHeading({ eyebrow, title, copy, align = "left" }: { eyebrow?: string; title: ReactNode; copy?: string; align?: "left" | "center" }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow ? <span className="eyebrow"><span aria-hidden="true" />{eyebrow}</span> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

function openWindowUrl(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function openWhatsappWindow(message: string) {
  openWindowUrl(whatsappUrl(message));
}

function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);
}

function SiteHeader({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useBodyScrollLock(menuOpen);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (soundOn) {
      audio.volume = 0.32;
      void audio.play().catch(() => setSoundOn(false));
      return;
    }

    audio.pause();
  }, [soundOn]);

  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/media/workout.mp3" loop preload="none" />

      <header className="site-header">
        <a href="#inicio" className="brand-link"><LogoMark /></a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <button
            className={`sound-button ${soundOn ? "is-active" : ""}`}
            type="button"
            onClick={() => setSoundOn((value) => !value)}
            aria-label={soundOn ? "Pausar música de entrenamiento" : "Activar música de entrenamiento"}
            aria-pressed={soundOn}
          >
            {soundOn ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
          </button>
          <a className="button button--compact" href="#experiencia">Prueba 7 días <ArrowRight aria-hidden="true" /></a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Abrir menú" aria-expanded={menuOpen}>
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú principal" onClick={() => setMenuOpen(false)} initial={prefersReducedMotion ? false : { opacity: 0 }} animate={prefersReducedMotion ? undefined : { opacity: 1 }} exit={prefersReducedMotion ? undefined : { opacity: 0 }}>
            <motion.div className="mobile-menu__panel" onClick={(event) => event.stopPropagation()} initial={prefersReducedMotion ? false : { x: "100%" }} animate={prefersReducedMotion ? undefined : { x: 0 }} exit={prefersReducedMotion ? undefined : { x: "100%" }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <div className="mobile-menu__top"><LogoMark /><button type="button" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><X /></button></div>
              <nav aria-label="Navegación móvil">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ChevronRight /></a>
                ))}
              </nav>
              <a className="button" href="#experiencia" onClick={() => setMenuOpen(false)}>Quiero probar el club <ArrowRight /></a>
              <p>Av. América Oeste · Trujillo<br />Lun–Sáb 5:20 a.m.–12:00 a.m.</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function HeroSection({ prefersReducedMotion, enableRichMedia }: { prefersReducedMotion: boolean; enableRichMedia: boolean }) {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video || !enableRichMedia) return;

    let inViewport = true;

    const playVideo = () => {
      if (!inViewport || document.hidden) return;
      void video.play().catch(() => undefined);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        return;
      }

      playVideo();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry?.isIntersecting ?? true;

        if (inViewport) {
          playVideo();
          return;
        }

        video.pause();
      },
      { threshold: 0.18 },
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    playVideo();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.pause();
    };
  }, [enableRichMedia]);

  return (
    <section className={`hero ${enableRichMedia ? "" : "hero--still"}`} id="inicio">
      <Image
        src="/media/club.webp"
        alt=""
        fill
        priority
        quality={72}
        sizes="100vw"
        className="hero__video hero__still"
        aria-hidden="true"
      />
      {enableRichMedia ? (
        <video
          ref={heroVideoRef}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
      ) : null}
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__content">
        <motion.div className="hero__copy" initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <h1>Tu límite<br />no vive <em>aquí.</em></h1>
          <p><strong>Fuerza, cardio y acompañamiento real.</strong> Zona de pesas y cardio, entrenadores especializados, rutinas para principiantes y tienda de suplementos.</p>
          <div className="hero__actions">
            <a className="button button--large" href="#experiencia">Vive 7 días gratis <ArrowRight /></a>
            <a className="text-link" href="#metodo"><Play aria-hidden="true" /> Descubre el método</a>
          </div>
          <div className="hero__rating">
            <div className="stars" aria-hidden="true">{Array.from({ length: 5 }).map((_, index) => <Star key={index} />)}</div>
            <strong>4.9 promedio</strong>
            <span>+380 reseñas verificadas</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ClassesSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const [selectedDay, setSelectedDay] = useState<keyof typeof schedule>("Lun");

  return (
    <section className="section classes" id="clases">
      <div className="container">
        <Reveal direction="left"><SectionHeading eyebrow="Entrena en equipo" title={<>La energía se contagia.<br /><span>El progreso también.</span></>} copy="Cuatro formatos, coaches presentes y una intensidad que se adapta sin quitarte el reto." /></Reveal>
        <div className="classes__grid">
          {classes.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.name} className="class-card" delay={index * 0.055} direction={index % 2 === 0 ? "left" : "right"}>
                <div className="class-card__top"><Icon aria-hidden="true" /></div>
                <h3>{item.name}</h3>
                <dl><div><dt>Duración</dt><dd>{item.duration}</dd></div><div><dt>Intensidad</dt><dd>{item.intensity}</dd></div><div><dt>Coach</dt><dd>{item.coach}</dd></div></dl>
                <a href={whatsappUrl(`Hola, quiero reservar una clase de ${item.name}.`)} target="_blank" rel="noreferrer">Reservar clase <ArrowRight /></a>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="schedule" direction="scale">
          <div className="schedule__head"><div><h3>Encuentra tu momento</h3></div><a href={whatsappUrl("Hola, quisiera conocer el horario completo de clases.")} target="_blank" rel="noreferrer">Ver horario completo <MoveUpRight /></a></div>
          <div className="schedule__days" role="tablist" aria-label="Días de la semana">
            {(Object.keys(schedule) as Array<keyof typeof schedule>).map((day) => <button key={day} type="button" role="tab" aria-selected={selectedDay === day} className={selectedDay === day ? "is-active" : ""} onClick={() => setSelectedDay(day)}>{day}</button>)}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={selectedDay} className="schedule__sessions" initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10, scale: 0.99 }} transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}>
              {schedule[selectedDay].map((session) => {
                const [time, ...name] = session.split(" ");
                return <div key={session}><Clock3 aria-hidden="true" /><strong>{time}</strong><span>{name.join(" ")}</span><button type="button" onClick={() => openWhatsappWindow(`Hola, quiero reservar ${name.join(" ")} el ${selectedDay} a las ${time}.`)} aria-label={`Reservar ${name.join(" ")} a las ${time}`}><Plus /></button></div>;
              })}
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

function CoachSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const [coachModalId, setCoachModalId] = useState<string | null>(null);
  const modalCoach = coaches.find((coach) => coach.id === coachModalId) ?? null;

  useBodyScrollLock(Boolean(coachModalId));

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCoachModalId(null);
      }
    };

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <section className="section coach" id="coaches">
        <div className="container">
          <Reveal direction="right">
            <SectionHeading eyebrow="Elige tu coach" title={<>Elige al coach<br /><span>que va contigo.</span></>} align="center" />
          </Reveal>

          <div className="coach-deck-stage is-open">
            <div className="coach-deck" role="group" aria-label="Baraja de entrenadores de Gym Rat Club">
              {coaches.map((coach, index) => (
                <motion.button
                  key={coach.id}
                  type="button"
                  className="coach-card"
                  aria-label={`Ver perfil de ${coach.name}`}
                  onClick={() => setCoachModalId(coach.id)}
                  style={{ "--coach-order": index } as CSSProperties}
                >
                  <Image
                    src={coach.image}
                    alt={`${coach.name}, ${coach.role} en Gym Rat Club`}
                    fill
                    sizes="(max-width: 900px) 82vw, 45vw"
                    quality={62}
                    style={{ objectPosition: coach.imagePosition }}
                  />

                  <div className="coach-card__content">
                    <h3>{coach.name}</h3>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {modalCoach ? (
          <motion.div
            className="coach-modal"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
            onClick={(event) => event.target === event.currentTarget && setCoachModalId(null)}
          >
            <motion.div
              className="coach-modal__panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="coach-modal-title"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 42, scale: 0.94, rotate: -1.5 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: 24, scale: 0.97 }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 190, damping: 22, mass: 0.8 }}
            >
              <button className="coach-modal__close" type="button" onClick={() => setCoachModalId(null)} aria-label="Cerrar perfil del coach" autoFocus><X /></button>
              <div className="coach-modal__visual">
                <Image src={modalCoach.image} alt={`${modalCoach.name}, ${modalCoach.role}`} fill sizes="(max-width: 700px) 94vw, 46vw" quality={68} style={{ objectPosition: modalCoach.imagePosition }} />
                <span>{modalCoach.discipline}</span>
              </div>
              <div className="coach-modal__content">
                <h2 id="coach-modal-title">{modalCoach.name}</h2>
                <p className="coach-modal__role">{modalCoach.role}</p>
                <p>{modalCoach.description}</p>
                <div className="coach-modal__tags">{modalCoach.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <ul>{modalCoach.traits.map((trait) => <li key={trait}><Check aria-hidden="true" />{trait}</li>)}</ul>
                <a className="button" href={whatsappUrl(`Hola, quiero entrenar con ${modalCoach.name} en Gym Rat Club.`)} target="_blank" rel="noreferrer">Entrenar con {modalCoach.name.split(" ")[0]} <ArrowRight /></a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function PricingSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const [quarterly, setQuarterly] = useState(false);

  return (
    <section className="section pricing" id="planes">
      <div className="container">
        <Reveal className="pricing__header" direction="left">
          <SectionHeading eyebrow="Membresías" title={<>Elige cuánto quieres<br /><span>acelerar.</span></>} copy="Todos los planes comienzan con evaluación. Sin matrícula escondida ni permanencia obligatoria." />
          <div className="billing-toggle" role="group" aria-label="Periodo de membresía"><button type="button" className={!quarterly ? "is-active" : ""} onClick={() => setQuarterly(false)}>Mensual</button><button type="button" className={quarterly ? "is-active" : ""} onClick={() => setQuarterly(true)}>Trimestral -15%</button></div>
        </Reveal>
        <div className="plans-grid">
          {plans.map((plan, index) => {
            const price = quarterly ? Math.round(plan.monthly * 0.85) : plan.monthly;
            return (
              <Reveal key={plan.name} className={`plan-card ${plan.featured ? "is-featured" : ""}`} delay={index * 0.065} direction={index === 0 ? "left" : index === 1 ? "scale" : "right"}>
                {plan.featured ? <span className="plan-card__badge"><Star /> Mejor elección</span> : null}
                <h3>{plan.name}</h3><p>{plan.description}</p>
                <div className="plan-card__price"><small>S/</small><motion.strong key={price} initial={{ opacity: 0, y: 12, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}>{price}</motion.strong><span>/ mes</span></div>
                {quarterly ? <div className="plan-card__saving">Ahorras S/{(plan.monthly - price) * 3} por trimestre</div> : <div className="plan-card__saving plan-card__saving--muted">Cancela o cambia cuando quieras</div>}
                <ul>{plan.features.map((feature) => <li key={feature}><Check />{feature}</li>)}</ul>
                <a className={plan.featured ? "button" : "button button--outline"} href={whatsappUrl(`Hola, quiero información del plan ${plan.name} ${quarterly ? "trimestral" : "mensual"}.`)} target="_blank" rel="noreferrer">Elegir {plan.name} <ArrowRight /></a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [toast, setToast] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleTrial = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const goal = String(form.get("goal") ?? "");
    const date = String(form.get("date") ?? "");

    const nextErrors: FormErrors = {};
    if (!name) nextErrors.name = "Escribe tu nombre para identificarte.";
    if (phone.replace(/\D/g, "").length < 7) nextErrors.phone = "Ingresa un celular válido con al menos 7 dígitos.";
    if (!goal) nextErrors.goal = "Selecciona el objetivo que mejor te representa.";
    if (!date) nextErrors.date = "Elige una fecha tentativa para tu visita.";
    setFormErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      setToast("Revisa los campos marcados para continuar.");
      (event.currentTarget.elements.namedItem(firstError) as HTMLElement | null)?.focus();
      return;
    }

    setFormErrors({});
    setToast("Listo. Estamos abriendo WhatsApp con tu solicitud.");
    openWhatsappWindow(`Hola, soy ${name}. Quiero activar mi semana de experiencia en Gym Rat Club.\nCelular: ${phone}\nObjetivo: ${goal}\nFecha ideal: ${date}`);
  };

  return (
    <section className="section experience" id="experiencia">
      <div className="experience__background" aria-hidden="true" />
      <div className="container experience__grid">
        <Reveal className="experience__copy" direction="left">
          <span className="eyebrow"><span /> Tu primera semana</span>
          <h2>Siente el club.<br /><em>Decide después.</em></h2>
          <p>Siete días para conocer el espacio, probar dos clases y recibir una evaluación con un coach. Sin presión. Sin letra pequeña.</p>
          <ul><li><Check /> Acceso completo por 7 días</li><li><Check /> Evaluación inicial de 30 minutos</li><li><Check /> Dos clases a elección</li><li><Check /> Recomendación de plan personalizada</li></ul>
        </Reveal>
        <Reveal className="trial-card" direction="right">
          <div className="trial-card__head"><span>Activa tu experiencia</span><strong>S/ 0</strong></div>
          <form onSubmit={handleTrial} noValidate>
            <label>Tu nombre<input type="text" name="name" autoComplete="name" placeholder="¿Cómo te llamas?" aria-invalid={Boolean(formErrors.name)} aria-describedby={formErrors.name ? "name-error" : undefined} required />{formErrors.name ? <span className="field-error" id="name-error" role="alert">{formErrors.name}</span> : null}</label>
            <label>WhatsApp<input type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="987 654 321" aria-invalid={Boolean(formErrors.phone)} aria-describedby={formErrors.phone ? "phone-error" : undefined} required />{formErrors.phone ? <span className="field-error" id="phone-error" role="alert">{formErrors.phone}</span> : null}</label>
            <label>Tu objetivo<select name="goal" defaultValue="" aria-invalid={Boolean(formErrors.goal)} aria-describedby={formErrors.goal ? "goal-error" : undefined} required><option value="" disabled>Selecciona una opción</option><option>Ganar fuerza</option><option>Mejorar condición</option><option>Transformar mi físico</option><option>Volver a entrenar</option></select>{formErrors.goal ? <span className="field-error" id="goal-error" role="alert">{formErrors.goal}</span> : null}</label>
            <label>¿Cuándo quieres venir?<input type="date" name="date" aria-invalid={Boolean(formErrors.date)} aria-describedby={formErrors.date ? "date-error" : undefined} required />{formErrors.date ? <span className="field-error" id="date-error" role="alert">{formErrors.date}</span> : null}</label>
            <button className="button button--large" type="submit">Solicitar mis 7 días <MessageCircle /></button>
            <p className="form-status" aria-live="polite">{toast}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq">
      <div className="container faq__grid">
        <Reveal direction="left"><SectionHeading eyebrow="Antes de venir" title={<>Resolvamos<br /><span>tus dudas.</span></>} copy="Si necesitas algo más específico, un asesor real te responde por WhatsApp." /><a className="text-link" href={whatsappUrl("Hola, tengo una consulta sobre Gym Rat Club.")} target="_blank" rel="noreferrer">Hablar con una persona <MessageCircle /></a></Reveal>
        <Reveal className="faq__list" direction="right">
          {faqs.map(([question, answer], index) => (
            <details
              key={question}
              open={openIndex === index}
              onToggle={(event) => {
                const isOpen = event.currentTarget.open;
                setOpenIndex((current) => (isOpen ? index : current === index ? -1 : current));
              }}
            >
              <summary>{question}<span className="faq__plus"><Plus className="plus" /><Minus className="minus" /></span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="section location" id="ubicacion">
      <div className="container location__layout">
        <Reveal className="location__card" direction="left">
          <span className="eyebrow"><span /> Visítanos</span>
          <h2>Tu próximo nivel<br />está en Trujillo.</h2>
          <p>Calle / Av. América Oeste<br />Trujillo, La Libertad</p>
          <div><span><Clock3 /> Lun–Sáb</span><strong>5:20 a.m. — 12:00 a.m.</strong></div>
          <div><span><Instagram /> Redes</span><strong>Instagram · Facebook</strong></div>
          <a className="button" href="https://maps.google.com/?q=GYM+RAT+CLUB+Trujillo" target="_blank" rel="noreferrer">Cómo llegar <MoveUpRight /></a>
        </Reveal>

        <Reveal className="location__map-card" direction="right">
          <div className="location__map-head">
            <span><MapPin aria-hidden="true" /> Gym Rat Club · Trujillo</span>
            <a href="https://maps.google.com/?q=GYM+RAT+CLUB+Trujillo" target="_blank" rel="noreferrer">Abrir Maps <MoveUpRight /></a>
          </div>
          <div className="location__map-frame">
            <iframe
              title="Mapa de Gym Rat Club en Trujillo"
              src="https://www.google.com/maps?q=GYM%20RAT%20CLUB%20Trujillo&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MobileCta() {
  const [showMobileCta, setShowMobileCta] = useState(false);

  useEffect(() => {
    let frame: number | null = null;
    const mobileMediaQuery = window.matchMedia("(max-width: 700px)");

    const updateMobileCta = () => {
      frame = null;
      const visible = mobileMediaQuery.matches && window.scrollY > window.innerHeight;
      setShowMobileCta((current) => (current === visible ? current : visible));
    };

    const requestUpdate = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(updateMobileCta);
    };

    updateMobileCta();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    mobileMediaQuery.addEventListener("change", requestUpdate);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      mobileMediaQuery.removeEventListener("change", requestUpdate);
    };
  }, []);

  return <a className={`mobile-cta ${showMobileCta ? "is-visible" : ""}`} href="#experiencia" aria-hidden={!showMobileCta} tabIndex={showMobileCta ? undefined : -1}><span><strong>Empieza gratis</strong></span><ArrowRight /></a>;
}

export function GymExperience() {
  const [runtimePerformance, setRuntimePerformance] = useState(defaultRuntimePerformance);
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const pointerPositionRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = !runtimePerformance.motion;
  const enableAnimatedProgress = runtimePerformance.progress;
  const enablePointerEffects = runtimePerformance.pointer;
  const enableRichMedia = runtimePerformance.richMedia;

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NavigatorConnection }).connection;
    const mediaQueries = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(hover: none)"),
      window.matchMedia("(hover: hover) and (pointer: fine)"),
      window.matchMedia("(max-width: 900px) and (hover: none)"),
    ];
    const updateRuntimePerformance = () => setRuntimePerformance(getRuntimePerformance());

    updateRuntimePerformance();
    mediaQueries.forEach((query) => query.addEventListener("change", updateRuntimePerformance));
    connection?.addEventListener?.("change", updateRuntimePerformance);

    return () => {
      mediaQueries.forEach((query) => query.removeEventListener("change", updateRuntimePerformance));
      connection?.removeEventListener?.("change", updateRuntimePerformance);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (pointerFrameRef.current !== null) window.cancelAnimationFrame(pointerFrameRef.current);
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enablePointerEffects || event.pointerType !== "mouse" || !rootRef.current) return;
    pointerPositionRef.current = { x: event.clientX, y: event.clientY };

    if (pointerFrameRef.current !== null) return;

    pointerFrameRef.current = window.requestAnimationFrame(() => {
      pointerFrameRef.current = null;
      const { x, y } = pointerPositionRef.current;
      rootRef.current?.style.setProperty("--pointer-x", `${x}px`);
      rootRef.current?.style.setProperty("--pointer-y", `${y}px`);
    });
  };

  return (
    <MotionEnabledContext.Provider value={runtimePerformance.motion}>
      <div
        ref={rootRef}
        className="site-shell"
        data-performance={runtimePerformance.lite ? "lite" : "full"}
        onPointerMove={enablePointerEffects ? handlePointerMove : undefined}
      >
        {enableAnimatedProgress ? <ScrollProgressBar /> : null}
        {enablePointerEffects ? <div className="pointer-light" aria-hidden="true" /> : null}

        <a className="skip-link" href="#contenido">Saltar al contenido principal</a>

        <SiteHeader prefersReducedMotion={prefersReducedMotion} />

        <main id="contenido">
          <HeroSection prefersReducedMotion={prefersReducedMotion} enableRichMedia={enableRichMedia} />

          <div className="announcement" aria-label="Beneficios de Gym Rat Club">
            <div className="marquee">
              <div className="marquee__track">
                {Array.from({ length: 2 }).map((_, groupIndex) => (
                  <div key={groupIndex} className="marquee__group" aria-hidden={groupIndex === 1}>
                    {marqueeGroupItems.map((item, itemIndex) => (
                      <span key={`${groupIndex}-${itemIndex}-${item}`}>{item}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section className="section goals" id="objetivos">
            <div className="container">
              <Reveal direction="left"><SectionHeading eyebrow="Empieza por ti" title={<>¿Qué quieres <span>cambiar?</span></>} copy="El mejor plan no es el más duro. Es el que entiende dónde estás y te lleva exactamente a donde quieres llegar." /></Reveal>
              <div className="goals__layout">
                <div className="goals__cards" role="list">
                  {goals.map((goal, index) => {
                    const Icon = goal.icon;
                    return (
                      <Reveal key={goal.id} delay={index * 0.055} direction={index % 2 === 0 ? "left" : "right"}>
                        <article className="goal-card" role="listitem">
                          <span className="goal-card__icon"><Icon aria-hidden="true" /></span>
                          <strong>{goal.title}</strong>
                          <span>{goal.caption}</span>
                          <ArrowRight className="goal-card__arrow" aria-hidden="true" />
                        </article>
                      </Reveal>
                    );
                  })}
                </div>
                <Reveal className="goals__visual" direction="scale">
                  <Image src="/media/club.webp" alt="Sala principal de Gym Rat Club con equipamiento de fuerza" fill sizes="(max-width: 900px) 92vw, 42vw" quality={72} />
                  <a className="goals__visual-cta button" href="#experiencia">Comenzar el cambio <ArrowRight aria-hidden="true" /></a>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="section method" id="metodo">
            <div className="method__word" aria-hidden="true">MÉTODO</div>
            <div className="container">
              <div className="method__header">
                <Reveal direction="right"><SectionHeading eyebrow="Sistema Gym Rat" title={<>De improvisar<br />a <span>progresar.</span></>} copy="Cada sesión tiene una razón. Cada ajuste responde a tus datos. Cada avance se convierte en el nuevo punto de partida." /></Reveal>
                <Reveal className="method__summary" direction="scale">
                  <span>Método guiado</span>
                  <strong>4 fases para entrenar con dirección.</strong>
                  <p>Evaluación, plan, coaching y seguimiento en un flujo simple para saber qué hacer y por qué hacerlo.</p>
                  <a href="#experiencia">Agendar evaluación <ArrowRight aria-hidden="true" /></a>
                </Reveal>
              </div>
              <div className="method__steps" role="list">
                {methodSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <Reveal key={step.number} className="method-step" delay={index * 0.055} direction={index % 2 === 0 ? "left" : "right"}>
                      <article role="listitem">
                        <div className="method-step__top">
                          <span>{step.number}</span>
                          <Icon aria-hidden="true" />
                        </div>
                        <div>
                          <h3>{step.title}</h3>
                          <p>{step.text}</p>
                        </div>
                        <small>{step.focus}</small>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
              <Reveal className="method__promise" direction="scale">
                <div><ShieldCheck aria-hidden="true" /><span><strong>Garantía de ajuste.</strong> Si en 30 días no sientes un cambio en tu energía, técnica o rendimiento, revisamos tu plan uno a uno.</span></div>
                <a href="#experiencia">Empezar mi evaluación <ArrowRight /></a>
              </Reveal>
            </div>
          </section>

          <ClassesSection prefersReducedMotion={prefersReducedMotion} />

          <section className="section club" id="club">
            <div className="container">
              <Reveal direction="right"><SectionHeading eyebrow="El club" title={<>Diseñado para que quieras<br /><span>volver mañana.</span></>} copy="Más que máquinas: espacios que eliminan fricción antes, durante y después de cada entrenamiento." /></Reveal>
              <div className="facilities-grid">
                {facilities.map((facility, index) => (
                  <Reveal key={facility.title} className={facility.className} delay={index * 0.05} direction={index % 3 === 0 ? "left" : index % 3 === 1 ? "right" : "scale"}>
                    <Image src={facility.src} alt={facility.alt} fill sizes="(max-width: 700px) 92vw, 50vw" quality={64} />
                    <div><h3>{facility.title}</h3><p>{facility.detail}</p></div>
                  </Reveal>
                ))}
              </div>
              <Reveal className="club__amenities" direction="up">
                {[{ icon: MapPin, label: "Estacionamiento" }, { icon: ShieldCheck, label: "Lockers seguros" }, { icon: Sparkles, label: "Duchas premium" }, { icon: HeartPulse, label: "Zona recovery" }].map((item) => <div key={item.label}><item.icon aria-hidden="true" /><span>{item.label}</span></div>)}
              </Reveal>
            </div>
          </section>

          <CoachSection prefersReducedMotion={prefersReducedMotion} />

          <PricingSection prefersReducedMotion={prefersReducedMotion} />

          <section className="section stories">
            <div className="container">
              <Reveal direction="right"><SectionHeading eyebrow="Progreso real" title={<>No son promesas.<br /><span>Son personas.</span></>} /></Reveal>
              <div className="stories__grid">
                {testimonials.map((item, index) => <Reveal key={item.name} className="story-card" delay={index * 0.07} direction={index % 2 === 0 ? "left" : "right"}><Quote aria-hidden="true" /><blockquote>“{item.quote}”</blockquote><div><p><strong>{item.name}</strong></p></div></Reveal>)}
                <Reveal className="stories__rating" direction="scale"><strong>4.9</strong><div className="stars">{Array.from({ length: 5 }).map((_, index) => <Star key={index} />)}</div><span>+380 experiencias verificadas</span></Reveal>
              </div>
            </div>
          </section>

          <ExperienceSection />

          <FaqSection />

          <LocationSection />
        </main>

        <footer>
          <Reveal className="container footer__top" direction="up"><div><LogoMark /><p>Fuerza, cardio y acompañamiento real en Trujillo.</p></div><div><strong>Explora</strong>{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div><div><strong>Contacto</strong><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp</a><a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram /> Instagram</a><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></div><div><strong>Horario</strong><span>Lun–Sáb</span><span>5:20 a.m.–12:00 a.m.</span><span>Av. América Oeste · Trujillo</span></div></Reveal>
          <div className="container footer__bottom"><span>© {new Date().getFullYear()} Gym Rat Club · Todos los derechos reservados</span><span>Términos · Privacidad</span><a href="#inicio">Volver arriba <ArrowDown /></a></div>
        </footer>

        <MobileCta />
      </div>
    </MotionEnabledContext.Provider>
  );
}
