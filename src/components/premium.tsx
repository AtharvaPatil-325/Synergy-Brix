import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import {
  Compass,
  Map,
  PenTool,
  Code2,
  Rocket,
  Zap,
  Target,
  ShieldCheck,
  TrendingUp,
  Handshake,
  Send,
  ArrowUpRight,
} from 'lucide-react'

/* ============================================================================
 * Shared primitives
 * ========================================================================= */

function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

export function SectionIndex({ index, label }: { index: string; label: string }) {
  return (
    <div className="section-index">
      <span className="index-num">{index}</span>
      <span>{label}</span>
    </div>
  )
}

/* Subtle, desktop-only cursor parallax that mutates transform directly. */
export function PointerParallax({ children, strength = 16, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduce) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    let raf = 0
    let tx = 0
    let ty = 0
    const apply = () => {
      raf = 0
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
    }
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      tx = ((e.clientX - cx) / cx) * strength
      ty = ((e.clientY - cy) / cy) * strength
      if (!raf) raf = requestAnimationFrame(apply)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [strength, reduce])
  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}

/* Custom cursor — desktop only */
export function Cursor() {
  return null
}

/* Word-by-word mask reveal */
export function RevealText({
  children,
  className = '',
  delay = 0,
  as: As = 'span',
}: {
  children: string
  className?: string
  delay?: number
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div'
}) {
  const words = children.split(' ')
  return (
    <As className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </As>
  )
}

/* Magnetic wrapper for buttons (desktop only) */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      x.set(dx)
      y.set(dy)
    }
    const onLeave = () => {
      x.set(0)
      y.set(0)
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength, x, y, reduce])

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: 'inline-block' }}>
      {children}
    </motion.div>
  )
}

/* ============================================================================
 * Floating technology chips for the hero
 * ========================================================================= */

export function HeroFloatingCards() {
  const cards = [
    { label: 'React', x: '1%', y: '8%', delay: '' },
    { label: 'REST APIs', x: 'auto', y: '14%', right: '4%', delay: 'hero-float-delayed' },
    { label: 'Cloud Deploy', x: '4%', y: 'auto', bottom: '12%', delay: 'hero-float-delayed' },
    { label: 'Dashboards', x: 'auto', y: 'auto', right: '2%', bottom: '14%', delay: '' },
  ]
  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`hero-tech-card hero-float ${c.delay} absolute`}
          style={{
            top: c.y !== 'auto' ? c.y : undefined,
            bottom: c.bottom,
            left: c.x,
            right: c.right,
          }}
        >
          <span className="dot" />
          {c.label}
        </div>
      ))}
    </div>
  )
}

/* ============================================================================
 * Floating contact button (refined)
 * ========================================================================= */

export function FloatingContactButton() {
  const [visible, setVisible] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6"
        >
          <Link
            to="/contact"
            data-cursor="hover"
            aria-label="Start a project with Synergy Brix"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-950 shadow-[0_14px_34px_rgba(5,150,105,0.4)] transition hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-[0_18px_42px_rgba(5,150,105,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {!reduce && <span className="absolute -left-1 -top-1 h-3 w-3 rounded-full bg-emerald-300 animate-ping opacity-60" />}
            <Send size={16} className="relative" />
            <span className="relative">Let&apos;s Talk</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ============================================================================
 * Marquee (tech chip bar)
 * ========================================================================= */

export function Marquee({ items, className = '' }: { items: string[]; className?: string }) {
  const seq = [...items, ...items]
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent z-10" />
      <div className="marquee gap-10">
        {seq.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-3 text-sm font-medium text-slate-400 whitespace-nowrap"
          >
            <span className="h-1 w-1 rounded-full bg-emerald-400/70" />
            <span className="tracking-wide">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================================
 * How We Work — premium timeline
 * ========================================================================= */

const howWeWork = [
  { num: '01', title: 'Discover', text: 'We understand the idea, business goals, target users, and the constraints that actually shape delivery.', Icon: Compass },
  { num: '02', title: 'Strategy', text: 'We define the right technology, architecture, and roadmap so the system fits the business — not the other way around.', Icon: Map },
  { num: '03', title: 'Design', text: 'We design intuitive user experiences and product surfaces that feel as good as they perform.', Icon: PenTool },
  { num: '04', title: 'Develop', text: 'We build scalable, secure, and high-performance software with clean, maintainable engineering.', Icon: Code2 },
  { num: '05', title: 'Launch & Grow', text: 'We deploy, monitor, optimize, and continuously improve the product as your business evolves.', Icon: Rocket },
]

export function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 75%', 'end 65%'] })
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(howWeWork.length - 1, Math.max(0, Math.floor(v * howWeWork.length)))
    setActive(idx)
  })

  const fillPercent = ((active + 1) / howWeWork.length) * 100

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink-950 py-24 lg:py-32 noise-overlay">
      <div className="mesh-bg absolute inset-0" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />
      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionIndex index="02" label="How we work" />
            <h2 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tightest text-white sm:text-5xl lg:text-6xl">
              A disciplined path <span className="font-serif-display italic text-emerald-200/90">from idea</span> to impact.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-slate-400 lg:text-right">
            Every engagement follows a clear, business-aligned process — keeping technical quality, communication, and outcomes in sync from start to finish.
          </p>
        </div>

        <div className="mt-20">
          {/* Desktop timeline */}
          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-5xl">
              <div className="timeline-track" />
              <motion.div
                className="timeline-track-fill"
                animate={{ width: `${fillPercent}%` }}
                transition={reduce ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
              />
              <div className="relative grid grid-cols-5 gap-4">
                {howWeWork.map((step, i) => {
                  const isActive = i <= active
                  return (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-center text-center"
                    >
                      <div
                        className="timeline-node"
                        data-active={isActive}
                      >
                        <step.Icon size={24} />
                      </div>
                      <div className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-emerald-300/80">{step.num}</div>
                      <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                      <p className="mt-2 px-2 text-sm leading-6 text-slate-400">{step.text}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="lg:hidden">
            <div className="relative pl-12">
              <div className="absolute left-5 top-2 bottom-2 w-px bg-white/8" />
              <motion.div
                className="absolute left-5 top-2 w-px bg-gradient-to-b from-emerald-400 to-teal-400"
                animate={{ height: `${fillPercent}%` }}
                transition={reduce ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
              />
              <div className="space-y-8">
                {howWeWork.map((step, i) => {
                  const isActive = i <= active
                  return (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div
                        className="timeline-node absolute -left-12 top-0"
                        data-active={isActive}
                        style={{ width: 44, height: 44 }}
                      >
                        <step.Icon size={18} />
                      </div>
                      <div className="glass-panel relative-sweep rounded-2xl border border-white/6 p-5">
                        <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-emerald-300/80">{step.num} · {step.title}</div>
                        <p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ============================================================================
 * Why Choose — editorial split layout
 * ========================================================================= */

const whyChoose = [
  { title: 'Fast & Efficient Execution', text: 'We focus on delivering high-quality solutions efficiently — without unnecessary complexity.', Icon: Zap },
  { title: 'Business-Focused Development', text: 'Every solution is built to solve a real business or user problem — not to showcase technology.', Icon: Target },
  { title: 'Scalable & Secure Architecture', text: 'Applications are built with clean, scalable, and secure development practices from the start.', Icon: ShieldCheck },
  { title: 'Built for Growth', text: 'We create solutions that evolve as your business requirements grow and shift.', Icon: TrendingUp },
  { title: 'Long-Term Collaboration', text: 'We build lasting relationships and support products well beyond launch.', Icon: Handshake },
]

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 lg:py-32">
      <div className="dotted-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-500/8 blur-[100px]" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionIndex index="01" label="Why Synergy Brix" />
            <h2 className="mt-6 text-4xl font-semibold tracking-tightest text-white sm:text-5xl lg:text-6xl">
              A partner built for <span className="font-serif-display italic text-emerald-200/90">long-term</span> value.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
              We combine disciplined engineering with genuine business understanding, so the technology we build keeps working as you grow.
            </p>
            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] text-emerald-200/80">
              <span className="status-pulse" />
              Active for new engagements
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <ul className="divide-y divide-white/6">
              {whyChoose.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6 transition-colors hover:bg-white/[0.015]"
                >
                  <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-emerald-300/80">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="flex items-center gap-3 text-lg font-semibold text-white">
                      <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/3 text-emerald-300 transition-all duration-500 group-hover:border-emerald-400/40 group-hover:bg-emerald-500/10 group-hover:scale-110 group-hover:-rotate-3">
                        <item.Icon size={16} />
                      </span>
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-slate-400">{item.text}</p>
                  </div>
                  <div className="text-slate-500 transition-all duration-500 group-hover:translate-x-1 group-hover:text-emerald-300">
                    <ArrowUpRight size={20} />
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ============================================================================
 * Technology Stack — refined grid with chips
 * ========================================================================= */

const techCategories = [
  { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript'] },
  { title: 'Backend', items: ['Java', 'Spring Boot', 'Node.js', 'REST APIs'] },
  { title: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { title: 'Cloud & DevOps', items: ['Docker', 'CI/CD', 'Vercel', 'Cloud Deployment'] },
]

export function TechnologyStack() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-teal-500/8 blur-[100px]" />
      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionIndex index="06" label="Technology" />
            <h2 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tightest text-white sm:text-5xl lg:text-6xl">
              A modern, <span className="font-serif-display italic text-emerald-200/90">pragmatic</span> stack.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-slate-400 lg:text-right">
            We choose technologies based on project needs — prioritizing scalability, maintainability, and long-term business value.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {techCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: ci * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card-lift glass-panel relative-sweep relative overflow-hidden rounded-3xl p-7"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-emerald-300/80">{cat.title}</h3>
                <span className="font-mono text-[0.7rem] text-slate-600">{String(ci + 1).padStart(2, '0')}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {cat.items.map((tech) => (
                  <span
                    key={tech}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-3.5 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-emerald-500/8 hover:text-emerald-200"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500 transition-all duration-300 group-hover:bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ============================================================================
 * Big background text (decorative)
 * ========================================================================= */

export function BgText({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-text font-display ${className}`}
      style={{ fontSize: 'clamp(8rem, 18vw, 22rem)', lineHeight: 0.85 }}
    >
      {children}
    </div>
  )
}
