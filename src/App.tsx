import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Check, Menu, X, ShieldCheck, Layers3, Building2, Sparkles, Code2, Mail, Phone, MapPin, Cloud, Database, BarChart3, Workflow, Globe2, Boxes, Compass, Rocket, Headphones } from 'lucide-react'
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import {
  blogPosts,
  caseStudies,
  companyValues,
  footerLinks,
  faqs,
  homeProblems,
  homeSolutions,
  industries,
  pageMeta,
  processSteps,
  services,
  solutions,
  technologyGroups,
} from './data/siteData'
import { usePageMeta } from './hooks/usePageMeta'

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfULk7ZMRSZ9krewdbd1elEYa8jLu0qmj3051MAKiYAqxCHcw/viewform?usp=header'

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

function AppShell() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      window.setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'auto', block: 'start' }), 0)
      return
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.hash, location.pathname])

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/technologies" element={<TechnologiesPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<InsightDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
          <Route path="/cookies" element={<LegalPage type="cookies" />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

const landingNavigation = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Solutions', id: 'solutions' },
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const updateHeader = () => setIsCompact(window.scrollY > 24)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') return
    const sections = landingNavigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.05, 0.25, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [location.pathname])

  const goToSection = (id: string) => {
    setActiveSection(id)
    setIsOpen(false)
    setIsServicesOpen(false)
    if (location.pathname !== '/') {
      navigate(`/#${id}`)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <header className={`sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl transition-all duration-300 ${isCompact ? 'shadow-[0_10px_30px_rgba(2,6,23,0.28)]' : ''}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${isCompact ? 'py-2' : 'py-3'}`}>
        <Link to="/" aria-label="Synergy Brix home" className="flex items-center gap-3">
          <BrandLogo />
          <div className="leading-tight">
            <div className="text-lg font-semibold tracking-tight text-white">Synergy Brix</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {landingNavigation.map((item) => item.id === 'services' ? (
            <div key={item.id} className="relative">
              <button type="button" aria-expanded={isServicesOpen} aria-haspopup="menu" onClick={() => setIsServicesOpen((open) => !open)} className={`relative flex items-center gap-1 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 ${location.pathname === '/' && activeSection === item.id ? 'text-emerald-300' : 'text-slate-300 hover:text-white'}`}>
                Services <ChevronDown size={14} className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute bottom-0 left-0 h-px bg-emerald-300 transition-all duration-300 ${location.pathname === '/' && activeSection === item.id ? 'w-full' : 'w-0'}`} />
              </button>
              {isServicesOpen && <div className="absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 rounded-2xl border border-slate-700/80 bg-slate-900/95 p-2 shadow-[0_18px_48px_rgba(2,6,23,.45)] backdrop-blur-xl" role="menu">
                <Link to="/services" onClick={() => setIsServicesOpen(false)} className="mb-1 block rounded-xl border border-emerald-400/15 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/15">All services</Link>
                {services.map((service) => <Link key={service.slug} to={`/services/${service.slug}`} onClick={() => setIsServicesOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white" role="menuitem">{service.title}</Link>)}
              </div>}
            </div>
          ) : (
            <button key={item.id} type="button" onClick={() => goToSection(item.id)} className={`relative py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 ${location.pathname === '/' && activeSection === item.id ? 'text-emerald-300' : 'text-slate-300 hover:text-white'}`}>
              {item.label}
              <span className={`absolute bottom-0 left-0 h-px bg-emerald-300 transition-all duration-300 ${location.pathname === '/' && activeSection === item.id ? 'w-full' : 'w-0'}`} />
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LinkButton to={GOOGLE_FORM_URL} variant="primary">Start a Project</LinkButton>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-200 shadow-sm lg:hidden"
          aria-expanded={isOpen}
          aria-label="Open menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-700 bg-slate-950 lg:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6">
            {landingNavigation.map((item) => item.id === 'services' ? (
              <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-1">
                <div className="flex items-center justify-between"><button type="button" onClick={() => goToSection(item.id)} className="px-2 py-2.5 text-left text-sm font-medium text-emerald-200">Services</button><button type="button" aria-label="Toggle services menu" aria-expanded={isServicesOpen} onClick={() => setIsServicesOpen((open) => !open)} className="p-2 text-slate-300"><ChevronDown size={17} className={isServicesOpen ? 'rotate-180' : ''} /></button></div>
                {isServicesOpen && <div className="border-t border-slate-800 px-1 py-2">{services.map((service) => <Link key={service.slug} to={`/services/${service.slug}`} onClick={() => { setIsOpen(false); setIsServicesOpen(false) }} className="block rounded-lg px-2 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">{service.title}</Link>)}</div>}
              </div>
            ) : (
              <button key={item.id} type="button" onClick={() => goToSection(item.id)} className={`block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium ${location.pathname === '/' && activeSection === item.id ? 'bg-emerald-500/10 text-emerald-200' : 'text-slate-300 hover:bg-slate-900 hover:text-white'}`}>
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <LinkButton to={GOOGLE_FORM_URL} variant="primary" fullWidth onClick={() => setIsOpen(false)}>
                Start a Project
              </LinkButton>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1.3fr]">
          <div>
            <Link to="/" className="mb-5 inline-flex items-center gap-3">
              <BrandLogo dark />
              <div className="text-lg font-semibold text-white">Synergy Brix</div>
            </Link>
            <p className="max-w-md text-sm leading-7 text-slate-300">
              Synergy Brix helps businesses modernize operations, build custom software, and engineer scalable digital systems around how work actually happens.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-300">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">Connect</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2"><Mail size={16} className="text-emerald-300" /> @synergybrix.com</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-emerald-300" /> +91 00000 00000</li>
              <li className="flex items-center gap-2"><MapPin size={16} className="text-emerald-300" /> India • Remote-ready</li>
            </ul>
           <div className="mt-5 flex gap-3">
  {footerLinks.social.map((social) => (
    <a
      key={social.label}
      href={social.href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-200 transition hover:border-emerald-400 hover:text-emerald-200"
      aria-label={social.label}
    >
      {social.label.toLowerCase().includes("linkedin") ? (
        <FaLinkedinIn size={18} />
      ) : (
        <FaGithub size={18} />
      )}
    </a>
  ))}
</div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-400">
          © 2026 Synergy Brix. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  usePageMeta(pageMeta.home)

  return (
    <>
      <section id="home" className="relative overflow-hidden bg-slate-950">
        <div className="mesh-bg absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_25%)]" />
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}>
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="section-tag mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-white/5 px-3 py-1.5 text-sm font-medium text-emerald-100 shadow-[0_0_0_1px_rgba(52,211,153,0.12)] backdrop-blur-sm">
              <Sparkles size={14} className="text-emerald-300" />
              Technology built for real business needs
            </motion.div>
            <motion.h1 variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.65 }} className="max-w-2xl text-4xl font-semibold leading-[1.04] tracking-[-0.065em] text-white sm:text-5xl lg:text-6xl">
              Building digital solutions that move your business forward.
            </motion.h1>
            <motion.p variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }} className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Custom software, business automation, web applications, and digital systems designed around the way your business actually works.
            </motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton to={GOOGLE_FORM_URL} variant="primary" icon={<ArrowRight size={18} />}>Start a Project</LinkButton>
              <LinkButton to="/services" variant="secondary-light">Explore Our Services</LinkButton>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }} className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
              {['Custom software', 'Automation', 'APIs', 'Cloud', 'Dashboards'].map((item) => (
                <span key={item} className="rounded-full border border-slate-700/80 bg-slate-900/40 px-3 py-1.5 backdrop-blur-sm">
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.75, ease: 'easeOut' }} className="relative">
            <ArchitectureVisual />
          </motion.div>
        </Container>
      </section>

      <section className="why-section relative overflow-hidden py-20 lg:py-24">
        <div className="why-section-grid absolute inset-0" />
        <div className="why-section-glow absolute -right-24 top-16 h-80 w-80 rounded-full" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[.88fr_1.12fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55 }} className="relative">
            <div className="why-heading-line absolute -left-6 top-9 hidden h-24 w-px lg:block" />
            <div className="section-tag inline-flex rounded-full border border-emerald-200 bg-white/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-emerald-800">Why Synergy Brix</div>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.04] tracking-[-.06em] text-slate-950 sm:text-5xl">Technology built around your business.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">We don&apos;t just build software. We understand the problem, design the right solution, and engineer technology around the way your business works.</p>
            <div className="mt-8 flex items-center gap-3 text-sm font-medium text-emerald-900"><span className="h-px w-10 bg-emerald-500" />Business understanding, engineered into every layer.</div>
          </motion.div>

          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Building2, number: '01', title: 'Business-first thinking', text: 'We start with business process, priorities, and outcomes.' },
                { icon: Sparkles, number: '02', title: 'Custom solutions', text: 'Every solution is designed for your operational reality.' },
                { icon: Layers3, number: '03', title: 'Scalable architecture', text: 'Systems are structured for growth, maintenance, and change.' },
                { icon: ShieldCheck, number: '04', title: 'Security-conscious development', text: 'We build with access control and reliability in mind.' },
              ].map(({ icon: Icon, number, title, text }, index) => (
                <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .42, delay: index * .09 }} className="why-principle group">
                  <div className="flex items-start justify-between gap-4"><div className="why-principle-icon"><Icon size={20} /></div><span className="text-xs font-semibold tracking-[.16em] text-emerald-700">{number}</span></div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Section id="services" background="soft">
        <Container>
          <div className="flex items-end justify-between gap-3">
            <SectionHeading eyebrow="Services" title="What we build" description="Focused software capabilities for businesses that need reliable digital systems." />
            <LinkButton to="/services" variant="secondary">Explore Our Services</LinkButton>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Business value" title="Problems we solve" description="The goal is not to add technology for technology's sake. It is to remove friction and improve how the business runs." />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {homeProblems.map((problem) => (
              <div key={problem.question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:border-emerald-200 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-900"><Check size={15} /></div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{problem.question}</h3>
                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-emerald-800"><ArrowRight size={15} /><span>Technology solution</span></div>
                    <p className="mt-1 text-slate-600">{problem.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="solutions" background="soft">
        <Container>
          <SectionHeading eyebrow="Solutions" title="Business systems that create clarity and momentum" description="We design digital tools around the outcomes businesses need: smoother operations, better reporting, and scalable internal capability." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {homeSolutions.map((solution) => (
              <div key={solution} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm">
                {solution}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Industries" title="Business environments we support" description="We help organizations solve operational pain points with flexible digital systems suited to their domain." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry) => (
              <IndustryCard key={industry.title} industry={industry} />
            ))}
          </div>
        </Container>
      </Section>

      <Section background="soft">
        <Container>
          <SectionHeading eyebrow="Technology" title="Capabilities built for modern software delivery" description="We choose technologies based on project requirements, scalability, maintainability, and business goals." />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {technologyGroups.map((group) => (
              <div key={group.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-sm text-slate-700">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Process" title="A disciplined delivery model" description="Our process keeps communication clear, technical decisions grounded, and milestones measurable from the beginning." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {processSteps.map((step) => (
              <div key={step.number} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{step.number}</div>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="about" background="soft">
        <Container>
          <SectionHeading eyebrow="About Synergy Brix" title="Structured for long-term business value" description="We are a software engineering partner focused on the realities of your operations, your teams, and your future growth." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {companyValues.map((value) => (
              <div key={value} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-900"><Check size={14} /></div>
                <span className="text-sm font-medium text-slate-700">{value}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="work">
        <Container>
          <SectionHeading eyebrow="Work" title="Selected demonstration projects" description="We are building reusable case-study formats so real projects can be added easily and clearly as they become available." />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {caseStudies.map((project) => (
              <CaseStudyCard key={project.slug} item={project} />
            ))}
          </div>
        </Container>
      </Section>

      <div id="contact">
      <CTASection
        title="Have a business problem worth solving?"
        description="Tell us what you're trying to build, improve, or automate."
        primaryLabel="Start a Project"
        secondaryLabel="Talk to Us"
        primaryHref={GOOGLE_FORM_URL}
        secondaryHref={GOOGLE_FORM_URL}
      />
      </div>
    </>
  )
}

const architectureNodes = [
  { label: 'Web Apps', icon: Globe2, position: 'node-web' },
  { label: 'APIs', icon: Boxes, position: 'node-api' },
  { label: 'Automation', icon: Workflow, position: 'node-automation' },
  { label: 'Cloud', icon: Cloud, position: 'node-cloud' },
  { label: 'Database', icon: Database, position: 'node-database' },
  { label: 'Analytics', icon: BarChart3, position: 'node-analytics' },
]

function ArchitectureVisual() {
  return (
    <div className="architecture-visual" aria-label="Synergy Brix digital system architecture">
      <div className="architecture-grid" />
      <div className="architecture-aurora architecture-aurora-one" />
      <div className="architecture-aurora architecture-aurora-two" />
      <svg className="architecture-links" viewBox="0 0 600 520" role="img" aria-label="Connections from Synergy Brix to business technology systems">
        <defs>
          <linearGradient id="architecture-line" x1="0" x2="1">
            <stop stopColor="#34d399" stopOpacity=".12" />
            <stop offset=".5" stopColor="#6ee7b7" stopOpacity=".85" />
            <stop offset="1" stopColor="#34d399" stopOpacity=".12" />
          </linearGradient>
        </defs>
        {['M286 239 C235 194 185 152 130 116', 'M316 239 C366 191 414 148 474 116', 'M270 273 C205 286 146 308 98 326', 'M330 273 C389 296 437 319 489 348', 'M284 285 C264 342 232 394 200 435', 'M320 285 C356 340 395 393 435 430'].map((path) => <path key={path} className="architecture-link" d={path} />)}
        <circle className="architecture-particle particle-web" cx="286" cy="239" r="3" />
        <circle className="architecture-particle particle-api" cx="316" cy="239" r="3" />
        <circle className="architecture-particle particle-automation" cx="270" cy="273" r="3" />
        <circle className="architecture-particle particle-cloud" cx="330" cy="273" r="3" />
        <circle className="architecture-particle particle-database" cx="284" cy="285" r="3" />
        <circle className="architecture-particle particle-analytics" cx="320" cy="285" r="3" />
      </svg>

      <div className="architecture-core">
        <div className="architecture-core-orbit" />
        <div className="architecture-core-inner">
          <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-emerald-200/80">Connected by</span>
          <span className="mt-1 block text-lg font-semibold tracking-[-0.04em] text-white">Synergy Brix</span>
          <span className="mt-2 flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-emerald-300"><i className="status-pulse h-1.5 w-1.5 rounded-full bg-emerald-300" />System core</span>
        </div>
      </div>

      {architectureNodes.map(({ label, icon: Icon, position }) => (
        <div key={label} className={`architecture-node ${position}`}>
          <div className="architecture-node-icon"><Icon size={18} strokeWidth={1.8} /></div>
          <span>{label}</span>
        </div>
      ))}
      <div className="architecture-caption"><span className="status-pulse h-1.5 w-1.5 rounded-full bg-emerald-300" /> Business systems, connected with intent</div>
    </div>
  )
}

function AboutPage() {
  usePageMeta(pageMeta.about)

  return (
    <PageShell title="Who We Are" subtitle="Synergy Brix is a software engineering partner for companies that need dependable digital systems, practical business logic, and scalable solutions." description="We act as a collaborative technology partner focused on solving real business problems with clear engineering and disciplined execution.">
      <div className="grid gap-8 lg:grid-cols-2">
        <InfoPanel title="Our Mission" text="To help businesses build reliable technology that supports growth, improves efficiency, and makes operations more confident and predictable." />
        <InfoPanel title="Our Vision" text="To be a trusted technology partner for organizations that need strong engineering, thoughtful architecture, and business-aligned digital transformation." />
        <InfoPanel title="Our Approach" text="We take a practical, structured approach: understand the problem, design the right solution, and build technology that fits the way your business actually works." />
        <InfoPanel title="Engineering Principles" text="We focus on maintainability, clarity, scalability, security, and communication so technology stays useful as the business changes." />
      </div>
      <div className="mt-10 rounded-3xl border border-slate-200 bg-emerald-50 p-8">
        <h3 className="text-2xl font-semibold text-slate-900">Why We Build</h3>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          We believe digital systems should create clarity, reduce friction, and unlock business opportunity. We build software that helps teams work smarter, serve customers better, and adapt with confidence.
        </p>
      </div>
    </PageShell>
  )
}

function ServicesPage() {
  usePageMeta(pageMeta.services)
  const showLegacyServicesRedesign = false

  return (
    <PageShell title="Services" subtitle="Technology capabilities designed to solve real business challenges and support long-term growth." description="We help organizations modernize operations, build custom software, connect systems, and create practical digital tools that scale with the business.">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} detail />
        ))}
      </div>
      {showLegacyServicesRedesign && <>
      <section className="services-hero relative overflow-hidden bg-slate-950 text-white">
        <div className="mesh-bg absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_38%,rgba(16,185,129,0.2),transparent_23%),radial-gradient(circle_at_10%_90%,rgba(15,118,110,0.14),transparent_28%)]" />
        <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <div className="section-tag inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-emerald-100"><Sparkles size={13} /> Synergy Brix services</div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.03] tracking-[-.065em] sm:text-5xl lg:text-6xl">Technology that moves your business forward.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Custom systems, connected workflows, and dependable software engineered around the way your business operates.</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300"><span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">Business-first engineering</span><span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">Built to integrate</span></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .1 }}><div /></motion.div>
        </Container>
      </section>

      <section className="py-14 lg:py-18">
        <Container>
          <SectionHeading eyebrow="Service capabilities" title="Purpose-built systems, not generic software." description="Each engagement begins with the business need, then brings together the technology, workflow, and data layers needed to solve it." />
          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            <ServiceCard service={services[0]} detail />
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <ServiceCard service={services[1]} detail />
              <ServiceCard service={services[2]} detail />
            </div>
            {services.slice(3).map((service) => <ServiceCard key={service.slug} service={service} detail />)}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-14 lg:py-16">
        <Container>
          <SectionHeading eyebrow="A connected approach" title="From business friction to better flow." description="We create the technology layer that lets people, processes, and information work together with more clarity." />
          <div />
        </Container>
      </section>

      <section className="py-14 lg:py-16">
        <Container>
          <SectionHeading eyebrow="How we build" title="A deliberate path from complexity to capability." description="A clear delivery model keeps decisions grounded in the business, while making space for the technical details that matter." />
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {['Understand the business', 'Design the solution', 'Build the system', 'Integrate existing tools', 'Deploy and improve'].map((step, index) => (
              <motion.div key={step} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .4, delay: index * .08 }} className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
                <div className="mb-8 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-950 text-sm font-semibold text-emerald-100">0{index + 1}</div>
                <h3 className="text-lg font-semibold leading-6 text-slate-900">{step}</h3>
                {index < 4 && <span className="absolute -right-3 top-9 z-10 hidden h-px w-6 bg-emerald-200 md:block" />}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection title="Have a business problem worth solving?" description="Tell us what you need to improve, connect, or build. We’ll help shape a practical way forward." primaryLabel="Start a Project" secondaryLabel="Talk to Us" primaryHref="/contact" secondaryHref="/contact" />
      </>}
    </PageShell>
  )
}

function ServiceDetailPage() {
  const { slug } = useParams()
  const service = services.find((item) => item.slug === slug)

  usePageMeta({
    title: service ? `${service.title} | Synergy Brix` : 'Page Not Found | Synergy Brix',
    description: service ? service.short : 'The page you requested could not be found.',
    canonical: service ? `https://synergybrix.com/services/${service.slug}` : 'https://synergybrix.com/404',
  })

  if (!service) return <NotFoundPage />

  return (
    <PageShell title={service.title} subtitle={service.short} description={service.solution} breadcrumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Problem</h3>
          <p className="mt-3 text-slate-600">{service.problem}</p>

          <h3 className="mt-8 text-xl font-semibold text-slate-900">Solution</h3>
          <p className="mt-3 text-slate-600">{service.solution}</p>

          <h3 className="mt-8 text-xl font-semibold text-slate-900">What we provide</h3>
          <ul className="mt-4 space-y-2 text-slate-600">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3"><Check className="mt-1 text-emerald-700" size={16} /> {feature}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h3 className="text-xl font-semibold text-slate-900">Technology approach</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {service.technology.map((tech) => (
              <span key={tech} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700">{tech}</span>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-emerald-900 p-6 text-white">
            <h4 className="text-lg font-semibold">Ready to move forward?</h4>
            <p className="mt-2 text-sm text-emerald-100">We can help shape the right technology approach for your goals.</p>
            <LinkButton to={GOOGLE_FORM_URL} variant="secondary-light" className="mt-5">{service.cta}</LinkButton>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

function SolutionsPage() {
  usePageMeta(pageMeta.solutions)

  return (
    <PageShell title="Solutions" subtitle="Business-oriented systems designed to improve visibility, efficiency, and control." description="We build digital solutions around business outcomes—streamlining operations, connecting teams, and making the right information accessible.">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {solutions.map((solution) => (
          <div key={solution.slug} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">{solution.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{solution.summary}</p>
            <div className="mt-5 space-y-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Business problem</div>
                <p className="mt-2 text-sm text-slate-600">{solution.problem}</p>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Potential solution</div>
                <p className="mt-2 text-sm text-slate-600">{solution.approach}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}

function IndustriesPage() {
  usePageMeta(pageMeta.industries)

  return (
    <PageShell title="Industries" subtitle="Flexible technology support for businesses operating in complex environments." description="We design software and systems that reflect the realities of each industry, from operational workflows to customer interactions and reporting needs.">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {industries.map((industry) => (
          <IndustryCard key={industry.title} industry={industry} />
        ))}
      </div>
    </PageShell>
  )
}

function WorkPage() {
  usePageMeta(pageMeta.work)

  return (
    <PageShell title="Work" subtitle="Selected project concepts and reusable case-study structures." description="We present demonstration-ready work placeholders so real case studies can be added later with clear context and verified detail.">
      <div className="grid gap-6 lg:grid-cols-2">
        {caseStudies.map((item) => (
          <CaseStudyCard key={item.slug} item={item} />
        ))}
      </div>
    </PageShell>
  )
}

function CaseStudyPage() {
  const { slug } = useParams()
  const item = caseStudies.find((entry) => entry.slug === slug)

  usePageMeta({
    title: item ? `${item.title} | Synergy Brix` : 'Not Found | Synergy Brix',
    description: item ? item.overview : 'The page you requested does not exist or may have moved.',
    canonical: item ? `https://synergybrix.com/work/${item.slug}` : 'https://synergybrix.com/404',
  })

  if (!item) return <NotFoundPage />

  return (
    <PageShell title={item.title} subtitle={item.label} description={item.overview} breadcrumbs={[{ label: 'Work', to: '/work' }, { label: item.title }]}>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <SectionColumn title="Overview" body={item.overview} />
          <SectionColumn title="Challenge" body={item.challenge} />
          <SectionColumn title="Approach" body={item.approach} />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <SectionColumn title="Solution" body={item.solution} />
          <SectionColumn title="Technology" body={item.technology.join(', ')} />
          <SectionColumn title="Architecture" body={item.architecture} />
          <SectionColumn title="Outcome" body={item.outcome} />
        </div>
      </div>
    </PageShell>
  )
}

function ProcessPage() {
  usePageMeta(pageMeta.process)

  return (
    <PageShell title="Process" subtitle="A clear, business-aligned development process." description="We follow a structured delivery model that keeps technical quality, communication, and business understanding aligned throughout the project lifecycle.">
      <div className="grid gap-6 lg:grid-cols-2">
        {processSteps.map((step) => (
          <div key={step.number} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{step.number}</div>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-3 text-slate-600">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-8">
        <h3 className="text-2xl font-semibold text-slate-900">Discovery and planning are central to every project.</h3>
        <p className="mt-4 max-w-3xl text-slate-700">We value clear requirements, realistic milestones, practical design decisions, and sustainable implementation choices that help your teams stay aligned from start to finish.</p>
        <LinkButton to={GOOGLE_FORM_URL} variant="primary" className="mt-6">Start a Project</LinkButton>
      </div>
    </PageShell>
  )
}

function TechnologiesPage() {
  usePageMeta(pageMeta.technologies)

  return (
    <PageShell title="Technologies" subtitle="Choosing technology to fit the business, not the other way around." description="We choose technologies based on project requirements, scalability, maintainability, and business goals.">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {technologyGroups.map((group) => (
          <div key={group.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}




function InsightsPage() {
  usePageMeta(pageMeta.insights)

  return (
    <PageShell title="Insights" subtitle="Ideas and practical perspectives on software, systems, and business technology." description="Explore short articles on software development, APIs, business automation, cloud planning, digital transformation, and better technology decisions.">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </PageShell>
  )
}

function InsightDetailPage() {
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.slug === slug)

  usePageMeta({
    title: post ? `${post.title} | Synergy Brix` : 'Page Not Found | Synergy Brix',
    description: post ? post.excerpt : 'The insight you are looking for could not be found.',
    canonical: post ? `https://synergybrix.com/insights/${post.slug}` : 'https://synergybrix.com/404',
  })

  if (!post) return <NotFoundPage />

  return (
    <PageShell title={post.title} subtitle={`${post.category} • ${post.date} • ${post.readTime}`} description={post.excerpt} breadcrumbs={[{ label: 'Insights', to: '/insights' }, { label: post.title }]}>
      <article className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{post.category}</p>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </PageShell>
  )
}

function ContactPage() {
  usePageMeta(pageMeta.contact)

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="mesh-bg absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.20),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.10),transparent_30%)]" />
      <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-28">
        <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} className="relative">
          <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.45 }} className="section-tag inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-white/5 px-3 py-1.5 text-sm font-medium text-emerald-100 shadow-[0_0_0_1px_rgba(52,211,153,0.12)] backdrop-blur-sm">
            <span className="status-pulse h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Let&apos;s start a project
          </motion.div>

          <motion.h1 variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }} className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.04] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
            Let&apos;s Build Something <span className="bg-gradient-to-r from-emerald-200 via-emerald-300 to-teal-200 bg-clip-text text-transparent">That Matters.</span>
          </motion.h1>

          <motion.p variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.55 }} className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Tell us about your goals, challenge, or opportunity. Share a few details and we&apos;ll get back to you with the right next steps.
          </motion.p>

          <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.55 }} className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-emerald-500 px-7 py-4 text-base font-semibold text-emerald-950 shadow-[0_18px_45px_rgba(16,185,129,0.32)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-[0_22px_55px_rgba(16,185,129,0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-200"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Start a Project</span>
              <ArrowRight size={18} className="relative transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <span className="text-sm text-slate-400">Opens our project enquiry form in a new tab</span>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-12 grid gap-4 sm:grid-cols-2">
            <ContactInfoCard
              icon={<Mail size={18} />}
              label="Email"
              value="hello@synergybrix.com"
              href="mailto:hello@synergybrix.com"
            />
            <ContactInfoCard
              icon={<MapPin size={18} />}
              label="Location"
              value="India • Remote-ready"
            />
            <ContactInfoCard
              icon={<FaLinkedinIn size={16} />}
              label="LinkedIn"
              value="Connect on LinkedIn"
              href="https://www.linkedin.com"
            />
            <ContactInfoCard
              icon={<FaGithub size={16} />}
              label="GitHub"
              value="View on GitHub"
              href="https://github.com"
            />
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.75, ease: 'easeOut' }} className="relative">
          <ContactNetwork />
        </motion.div>
      </Container>
    </section>
  )
}

function ContactInfoCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-500/10 text-emerald-200">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200/80">{label}</span>
        <span className="text-sm font-medium text-white">{value}</span>
      </span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/30 hover:bg-white/[0.07]"
      >
        {content}
      </a>
    )
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      {content}
    </div>
  )
}

const contactNetworkNodes = [
  { label: 'Discovery', icon: Compass, position: 'contact-node-discovery' },
  { label: 'Strategy', icon: Sparkles, position: 'contact-node-strategy' },
  { label: 'Engineering', icon: Code2, position: 'contact-node-engineering' },
  { label: 'Launch', icon: Rocket, position: 'contact-node-launch' },
  { label: 'Email', icon: Mail, position: 'contact-node-email' },
  { label: 'Support', icon: Headphones, position: 'contact-node-support' },
]

const contactNetworkPaths = [
  'M240 220 C195 180 150 140 105 105',
  'M260 220 C310 180 360 140 405 105',
  'M225 250 C170 270 125 300 90 320',
  'M275 250 C335 285 380 320 425 345',
  'M235 265 C215 320 185 370 160 410',
  'M265 265 C300 320 340 370 370 410',
]

const contactNetworkParticles = [
  { x: 240, y: 220 },
  { x: 260, y: 220 },
  { x: 225, y: 250 },
  { x: 275, y: 250 },
  { x: 235, y: 265 },
  { x: 265, y: 265 },
]

function ContactNetwork() {
  return (
    <div className="contact-network" aria-label="Synergy Brix project connection network">
      <div className="contact-network-grid" />
      <div className="contact-network-aurora contact-network-aurora-one" />
      <div className="contact-network-aurora contact-network-aurora-two" />
      <svg className="contact-network-links" viewBox="0 0 500 460" role="img" aria-label="Connections between your goals and Synergy Brix capabilities">
        <defs>
          <linearGradient id="contact-network-line" x1="0" x2="1">
            <stop stopColor="#34d399" stopOpacity=".12" />
            <stop offset=".5" stopColor="#6ee7b7" stopOpacity=".85" />
            <stop offset="1" stopColor="#34d399" stopOpacity=".12" />
          </linearGradient>
        </defs>
        {contactNetworkPaths.map((path) => (
          <path key={path} className="contact-network-link" d={path} />
        ))}
        {contactNetworkParticles.map((p, index) => (
          <circle key={index} className={`contact-network-particle contact-particle-${index}`} cx={p.x} cy={p.y} r={3} />
        ))}
      </svg>

      <div className="contact-network-core">
        <div className="contact-network-core-orbit" />
        <div className="contact-network-core-inner">
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-emerald-200/80">Connect with</span>
          <span className="mt-1 block text-base font-semibold tracking-[-0.04em] text-white">Synergy Brix</span>
          <span className="mt-2 flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-emerald-300">
            <i className="status-pulse h-1.5 w-1.5 rounded-full bg-emerald-300" /> Project hub
          </span>
        </div>
      </div>

      {contactNetworkNodes.map(({ label, icon: Icon, position }) => (
        <div key={label} className={`contact-network-node ${position}`}>
          <div className="contact-network-node-icon"><Icon size={15} strokeWidth={1.8} /></div>
          <span>{label}</span>
        </div>
      ))}

      <div className="contact-network-caption">
        <span className="status-pulse h-1.5 w-1.5 rounded-full bg-emerald-300" /> Discovery · Strategy · Build · Launch
      </div>
    </div>
  )
}

function FAQPage() {
  usePageMeta(pageMeta.faq)

  return (
    <PageShell title="FAQ" subtitle="Questions companies often ask before starting a project." description="Common answers about software development, integration, automation, cloud deployment, maintenance, and project planning.">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQAccordion key={faq.question} question={faq.question} answer={faq.answer} defaultOpen={index === 0} />
        ))}
      </div>
    </PageShell>
  )
}

function LegalPage({ type }: { type: 'privacy' | 'terms' | 'cookies' }) {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      description: 'This privacy policy is a placeholder for future legal review and should be customized to the final company operating model and jurisdiction.',
      sections: [
        'Synergy Brix respects the privacy of visitors and business contacts. This placeholder policy outlines the types of information that may be collected and how it may be used in the future.',
        'Information may be collected through website forms, communication channels, or direct interactions where consent is provided. Such data may be used to respond to inquiries, discuss project opportunities, and manage ongoing communications.',
        'This policy should be reviewed by legal counsel before publication and adapted to the final business practices, data processing activities, and privacy obligations applicable to the company.',
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      description: 'These terms and conditions are a placeholder for legal review and should be refined to reflect the actual service offering, scope of work, and commercial terms.',
      sections: [
        'This website is provided for informational purposes and does not constitute a contractual commitment. Final engagement terms, scope, and commercial arrangements are subject to separate written agreements.',
        'Users of this website are responsible for ensuring that any information they submit is accurate and lawful. Synergy Brix may update website content at any time without prior notice.',
        'These terms should be reviewed by legal counsel before being published or used as final commercial terms.',
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      description: 'This cookie policy is a placeholder and may be updated as analytics, consent tools, or third-party integrations are introduced.',
      sections: [
        'This website may use cookies or similar technologies to improve user experience, understand visitor interactions, and support performance monitoring.',
        'Any use of analytics or tracking tools should be disclosed clearly and managed according to applicable privacy and consent requirements.',
        'This policy should be reviewed by legal counsel before final publication and updated when the live website implementation is finalized.',
      ],
    },
  }[type]

  usePageMeta({
    title: `${content.title} | Synergy Brix`,
    description: content.description,
    canonical: `https://synergybrix.com/${type === 'privacy' ? 'privacy' : type === 'terms' ? 'terms' : 'cookies'}`,
  })

  return (
    <PageShell title={content.title} subtitle="Legal placeholder content for future review." description={content.description}>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        {content.sections.map((section) => (
          <p key={section} className="mt-4 text-base leading-8 text-slate-700 first:mt-0">{section}</p>
        ))}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Legal review required before final publication.
        </div>
      </div>
    </PageShell>
  )
}

function NotFoundPage() {
  usePageMeta({
    title: 'Page Not Found | Synergy Brix',
    description: 'The page you requested does not exist or may have moved.',
    canonical: 'https://synergybrix.com/404',
  })

  return (
    <PageShell title="404" subtitle="This page could not be found." description="The page you requested does not exist or may have moved.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-3xl font-semibold text-slate-900">Page not found</h2>
        <p className="mt-4 text-slate-600">The requested page is not available. Please return to the homepage and continue exploring Synergy Brix.</p>
        <LinkButton to="/" variant="primary" className="mt-6">Back to Home</LinkButton>
      </div>
    </PageShell>
  )
}

function PageShell({ title, subtitle, description, breadcrumbs, children }: { title: string; subtitle?: string; description?: string; breadcrumbs?: { label: string; to?: string }[]; children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 py-16">
      <Container>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="mb-10 max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Synergy Brix</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 text-xl leading-8 text-slate-700">{subtitle}</p>}
          {description && <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>}
        </div>
        {children}
      </Container>
    </div>
  )
}

function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-600">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          {index > 0 && <span className="text-slate-400">/</span>}
          {item.to ? <Link to={item.to} className="hover:text-emerald-900">{item.label}</Link> : <span>{item.label}</span>}
        </div>
      ))}
    </nav>
  )
}

function InfoPanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-base leading-8 text-slate-600">{text}</p>
    </div>
  )
}

function SectionColumn({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-6 first:mt-0">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-base leading-8 text-slate-600">{body}</p>
    </div>
  )
}

function CTASection({ title, description, primaryLabel, secondaryLabel, primaryHref, secondaryHref }: { title: string; description: string; primaryLabel: string; secondaryLabel: string; primaryHref: string; secondaryHref: string }) {
  return (
    <section className="cta-grid relative overflow-hidden border-y border-emerald-700/50 bg-emerald-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(52,211,153,0.20),transparent_28%)]" />
      <Container className="relative flex flex-col items-center justify-between gap-8 py-16 text-center lg:flex-row lg:text-left">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Let’s talk</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-xl text-lg text-emerald-100">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton to={primaryHref} variant="primary-light">{primaryLabel}</LinkButton>
          <LinkButton to={secondaryHref} variant="secondary-light">{secondaryLabel}</LinkButton>
        </div>
      </Container>
    </section>
  )
}

function ServiceCard({ service, detail = false }: { service: (typeof services)[number]; detail?: boolean }) {
  return (
    <motion.article initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.35 }} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-900 transition duration-300 group-hover:scale-105 group-hover:bg-emerald-100"><Code2 size={18} /></div>
        <span className="rounded-full border border-slate-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Service</span>
      </div>
      <h3 className="mt-6 text-xl font-semibold text-slate-900">{service.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{service.short}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {service.technology.slice(0, 2).map((tech) => (
          <span key={tech} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">{tech}</span>
        ))}
      </div>
      <Link to={detail ? `/services/${service.slug}` : `/services/${service.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">
        Learn more <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </motion.article>
  )
}

function IndustryCard({ industry }: { industry: { title: string; summary: string } }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
      <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-900 transition duration-300 group-hover:scale-105"><Building2 size={18} /></div>
      <h3 className="text-xl font-semibold text-slate-900">{industry.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{industry.summary}</p>
    </div>
  )
}

function CaseStudyCard({ item }: { item: (typeof caseStudies)[number] }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <div className="mb-6 h-28 rounded-xl border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ecfdf5_55%,#d1fae5_100%)] p-4">
        <div className="h-2 w-20 rounded-full bg-emerald-900/15" /><div className="mt-4 grid grid-cols-3 gap-2"><div className="h-12 rounded-md bg-white shadow-sm" /><div className="h-12 rounded-md bg-emerald-600/15" /><div className="h-12 rounded-md bg-white shadow-sm" /></div>
      </div>
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{item.label}</div>
      <h3 className="mt-3 text-2xl font-semibold text-slate-900">{item.title}</h3>
      <p className="mt-3 text-slate-600">{item.overview}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {item.technology.map((tech) => (
          <span key={tech} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">{tech}</span>
        ))}
      </div>
      <Link to={`/work/${item.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">
        View case study <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </article>
  )
}

function BlogCard({ post }: { post: (typeof blogPosts)[number] }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{post.category}</div>
      <h3 className="mt-3 text-xl font-semibold text-slate-900">{post.title}</h3>
      <div className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-500">{post.date} • {post.readTime}</div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{post.excerpt}</p>
      <Link to={`/insights/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">
        Read article <ArrowRight size={16} />
      </Link>
    </article>
  )
}

function FAQAccordion({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button type="button" className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left" onClick={() => setIsOpen(!isOpen)}>
        <span className="font-medium text-slate-900">{question}</span>
        <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition ${isOpen ? 'rotate-180' : ''}`}><ChevronDown size={16} /></span>
      </button>
      {isOpen && <div className="border-t border-slate-200 px-5 py-4 text-slate-600">{answer}</div>}
    </div>
  )
}

function isExternalHref(href: string) {
  return /^(https?:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
}

function LinkButton({ to, children, variant = 'primary', className = '', icon, fullWidth = false, onClick }: { to: string; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'primary-light' | 'secondary-light'; className?: string; icon?: React.ReactNode; fullWidth?: boolean; onClick?: () => void }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 hover:-translate-y-0.5 hover:shadow-lg'
  const styles = {
    primary: 'bg-emerald-700 text-white shadow-[0_12px_30px_rgba(5,150,105,0.25)] hover:bg-emerald-600',
    secondary: 'border border-slate-200 bg-white text-slate-900 hover:border-emerald-200 hover:text-emerald-900',
    'primary-light': 'bg-white text-emerald-900 hover:bg-emerald-50',
    'secondary-light': 'border border-white/25 bg-white/5 text-white hover:border-emerald-300/50 hover:bg-white/10',
  }

  if (isExternalHref(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" onClick={onClick} className={`${base} ${styles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}>
        {children}
        {icon}
      </a>
    )
  }

  return (
    <Link to={to} onClick={onClick} className={`${base} ${styles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}>
      {children}
      {icon}
    </Link>
  )
}

function BrandLogo({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
        dark
          ? 'bg-white p-1 shadow-sm ring-1 ring-white/20'
          : 'bg-white p-1 shadow-sm ring-1 ring-slate-200/80'
      } ${className}`}
      aria-label="Synergy Brix logo"
    >
      <img
        src="/logo.png"
        alt="Synergy Brix logo mark"
        className="h-full w-full object-contain"
      />
    </div>
  )
}

function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

function Section({ children, background = 'white', id }: { children: React.ReactNode; background?: 'white' | 'soft'; id?: string }) {
  return <section id={id} className={background === 'soft' ? 'bg-slate-50 py-20' : 'bg-white py-20'}>{children}</section>
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

export default App
