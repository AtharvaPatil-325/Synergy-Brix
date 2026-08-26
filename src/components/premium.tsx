import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
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
} from 'lucide-react'

function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <div className="section-tag inline-flex rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">{eyebrow}</div>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">{description}</p>
    </div>
  )
}

/* Subtle, desktop-only cursor parallax that mutates transform directly (no re-renders). */
export function PointerParallax({ children, strength = 12, className = '' }: { children: React.ReactNode; strength?: number; className?: string }) {
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

/* -------------------------------------------------------------------------- */
/* How We Work                                                                */
/* -------------------------------------------------------------------------- */

const howWeWork = [
  { num: '01', title: 'Discover', text: 'Understand the idea, business goals, target users, and requirements.', Icon: Compass },
  { num: '02', title: 'Strategy', text: 'Define the right technology, architecture, roadmap, and development approach.', Icon: Map },
  { num: '03', title: 'Design', text: 'Create intuitive user experiences and modern interfaces.', Icon: PenTool },
  { num: '04', title: 'Develop', text: 'Build scalable, secure, and high-performance solutions.', Icon: Code2 },
  { num: '05', title: 'Launch & Grow', text: 'Deploy, optimize, maintain, and improve the product.', Icon: Rocket },
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

  const fill = ((active + 1) / howWeWork.length) * 100

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-slate-50 py-20 lg:py-24">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      <Container>
        <SectionHeading eyebrow="How we work" title="A disciplined path from idea to impact" description="Every engagement follows a clear, business-aligned process — keeping technical quality, communication, and outcomes in sync from start to finish." />

        <div className="mt-14">
          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute left-0 right-0 top-[34px] h-0.5 rounded-full bg-slate-200" />
              <motion.div
                className="absolute left-0 top-[34px] h-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                animate={{ width: `${fill}%` }}
                transition={reduce ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
              />
              <div className="relative grid grid-cols-5 gap-4">
                {howWeWork.map((step, i) => {
                  const isActive = i <= active
                  const isCurrent = i === active
                  return (
                    <div key={step.num} className="flex flex-col items-center text-center">
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        className={`relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-2xl border-2 transition-colors duration-500 ${
                          isActive ? 'border-emerald-500 bg-emerald-500 text-white shadow-[0_12px_30px_rgba(16,185,129,0.3)]' : 'border-slate-200 bg-white text-slate-400'
                        }`}
                      >
                        <step.Icon size={26} className={isCurrent && !reduce ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''} />
                        {isCurrent && (
                          <span className="absolute -bottom-2 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                        )}
                      </motion.div>
                      <div className="mt-5 text-sm font-semibold text-emerald-700">{step.num}</div>
                      <h3 className="mt-1 text-lg font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-2 px-2 text-sm leading-6 text-slate-600">{step.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile/tablet: vertical timeline */}
          <div className="lg:hidden">
            <div className="relative pl-10">
              <div className="absolute left-[19px] top-2 bottom-2 w-0.5 rounded-full bg-slate-200" />
              <motion.div
                className="absolute left-[19px] top-2 w-0.5 rounded-full bg-gradient-to-b from-emerald-500 to-teal-400"
                animate={{ height: `${fill}%` }}
                transition={reduce ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
              />
              <div className="space-y-6">
                {howWeWork.map((step, i) => {
                  const isActive = i <= active
                  return (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.4 }}
                      className="relative"
                    >
                      <div className={`absolute -left-10 top-0 flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-colors duration-500 ${
                        isActive ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-200 bg-white text-slate-400'
                      }`}>
                        <step.Icon size={18} />
                      </div>
                      <div className={`rounded-2xl border p-4 transition-colors duration-500 ${
                        isActive ? 'border-emerald-200 bg-white shadow-sm' : 'border-slate-200 bg-white'
                      }`}>
                        <div className="text-xs font-semibold text-emerald-700">{step.num} · {step.title}</div>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{step.text}</p>
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

/* -------------------------------------------------------------------------- */
/* Why Choose Synergy Brix                                                    */
/* -------------------------------------------------------------------------- */

const whyChoose = [
  { title: 'Fast & Efficient Execution', text: 'We focus on delivering high-quality solutions efficiently without unnecessary complexity.', Icon: Zap },
  { title: 'Business-Focused Development', text: 'Every solution is built to solve a real business or user problem.', Icon: Target },
  { title: 'Scalable & Secure Architecture', text: 'Applications are built using clean, scalable, and secure development practices.', Icon: ShieldCheck },
  { title: 'Built for Growth', text: 'We create solutions that evolve as your business requirements grow.', Icon: TrendingUp },
  { title: 'Long-Term Collaboration', text: 'We build lasting relationships and support products well beyond launch.', Icon: Handshake },
]

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-24">
      <Container>
        <SectionHeading eyebrow="Why Synergy Brix" title="A partner built for long-term value" description="We combine disciplined engineering with genuine business understanding, so the technology we build keeps working as you grow." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group glass-card-hover relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-emerald-400/0 blur-2xl transition-colors duration-500 group-hover:bg-emerald-400/10" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_22px_rgba(16,185,129,0.3)]">
                <item.Icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Technology Stack                                                           */
/* -------------------------------------------------------------------------- */

const techCategories = [
  { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript'] },
  { title: 'Backend', items: ['Java', 'Spring Boot', 'Node.js'] },
  { title: 'Database', items: ['PostgreSQL', 'MongoDB'] },
  { title: 'Cloud & Deployment', items: ['Docker', 'Vercel', 'Cloud Technologies'] },
]

export function TechnologyStack() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
      <Container>
        <SectionHeading eyebrow="Technology" title="A modern, pragmatic stack" description="We choose technologies based on project needs — prioritizing scalability, maintainability, and long-term business value." />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {techCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: ci * 0.06 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">{cat.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {cat.items.map((tech) => (
                  <span
                    key={tech}
                    className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-[0_0_18px_rgba(16,185,129,0.15)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
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

/* -------------------------------------------------------------------------- */
/* Floating contact button                                                    */
/* -------------------------------------------------------------------------- */

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
            aria-label="Start a project with Synergy Brix"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(5,150,105,0.4)] transition hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-[0_18px_42px_rgba(5,150,105,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            <span className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full ${reduce ? '' : ''}`} />
            <span className={`absolute -left-1 -top-1 h-3 w-3 rounded-full bg-emerald-300 ${reduce ? '' : 'animate-ping opacity-60'}`} />
            <Send size={16} className="relative" />
            <span className="relative">Let&apos;s Talk</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
