import { useEffect, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Check, Menu, X, ShieldCheck, Layers3, Building2, Sparkles, Code2, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import {
  blogPosts,
  caseStudies,
  companyValues,
  contactTypes,
  footerLinks,
  faqs,
  homeProblems,
  homeSolutions,
  industries,
  navItems,
  pageMeta,
  processSteps,
  services,
  solutions,
  technologyGroups,
  budgetRanges,
  timelines,
} from './data/siteData'
import { submitContactForm, type ContactFormValues } from './services/contactService'
import { usePageMeta } from './hooks/usePageMeta'

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, 'Please share a few details about your project.'),
})

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
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

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
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-200/60 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Synergy Brix home" className="flex items-center gap-3">
          <BrandLogo />
          <div className="leading-tight">
            <div className="text-lg font-semibold tracking-tight text-white">Synergy Brix</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="group relative">
                  <button type="button" className="flex items-center gap-1 text-sm font-medium text-slate-200 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">
                    {item.label} <ChevronDown size={14} />
                  </button>
                  <div className="invisible absolute left-0 top-full mt-4 w-72 rounded-2xl border border-slate-700/70 bg-slate-900/95 p-3 opacity-0 shadow-[0_16px_52px_rgba(15,23,42,0.45)] transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {item.children.map((child) => (
                      <Link key={child.to} to={child.to} className="block rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`
                }
              >
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LinkButton to="/contact" variant="primary">Start a Project</LinkButton>
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
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="space-y-2">
                  <div className="px-2 py-2 text-sm font-semibold text-slate-200">{item.label}</div>
                  {item.children.map((child) => (
                    <Link key={child.to} to={child.to} className="block rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-900 hover:text-white" onClick={() => setIsOpen(false)}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => `block rounded-xl px-2 py-2 text-sm font-medium ${isActive ? 'bg-slate-900 text-white' : 'text-slate-300'}`} onClick={() => setIsOpen(false)}>
                  {item.label}
                </NavLink>
              ),
            )}
            <div className="pt-2">
              <LinkButton to="/contact" variant="primary" fullWidth onClick={() => setIsOpen(false)}>
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
      <section className="relative overflow-hidden bg-slate-950">
        <div className="mesh-bg absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_25%)]" />
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <div className="section-tag mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-white/5 px-3 py-1.5 text-sm font-medium text-emerald-100 shadow-[0_0_0_1px_rgba(52,211,153,0.12)] backdrop-blur-sm">
              <Sparkles size={14} className="text-emerald-300" />
              Technology built for real business needs
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.07em] text-white sm:text-5xl lg:text-6xl">
              Building digital solutions that move your business forward.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Custom software, business automation, web applications, and digital systems designed around the way your business actually works.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton to="/contact" variant="primary" icon={<ArrowRight size={18} />}>Start a Project</LinkButton>
              <LinkButton to="/services" variant="secondary-light">Explore Our Services</LinkButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
              {['Custom software', 'Automation', 'APIs', 'Cloud', 'Dashboards'].map((item) => (
                <span key={item} className="rounded-full border border-slate-700/80 bg-slate-900/40 px-3 py-1.5 backdrop-blur-sm">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="relative">
            <div className="hero-shell relative overflow-hidden rounded-[32px] border border-emerald-300/20 bg-white/5 p-5 shadow-[0_34px_100px_rgba(15,23,42,0.45)] backdrop-blur-xl">
              <div className="absolute -right-6 top-8 h-28 w-28 rounded-full bg-emerald-300/30 blur-3xl" />
              <div className="absolute -left-4 bottom-8 h-36 w-36 rounded-full bg-violet-400/20 blur-3xl" />
              <div className="relative flex items-center justify-between rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-3 text-white">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">System view</div>
                  <div className="mt-2 text-xl font-semibold text-white">Synergy Brix</div>
                </div>
                <div className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">Operational</div>
              </div>

              <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-4 text-white shadow-inner shadow-slate-950/30">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm font-medium text-slate-300">Core services</div>
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-9 rounded-xl bg-emerald-500/10" />
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-12 rounded-lg bg-slate-800" />
                      <div className="h-12 rounded-lg bg-emerald-500/15" />
                      <div className="h-12 rounded-lg bg-slate-800" />
                    </div>
                    <div className="h-12 rounded-xl bg-slate-800" />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/70 p-4 text-white">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Delivery model</span>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-200">Live</span>
                  </div>
                  <div className="mt-5 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-semibold text-white">84%</span>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400">workflows</span>
                    </div>
                    <div className="space-y-2">
                      {[65, 78, 90].map((bar) => (
                        <div key={bar} className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                          <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-300" style={{ width: `${bar}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mt-6 grid grid-cols-3 gap-3">
                {[{ label: 'Custom', tone: 'emerald' }, { label: 'API', tone: 'slate' }, { label: 'Cloud', tone: 'amber' }].map((item) => (
                  <div key={item.label} className={`rounded-2xl border p-3 ${item.tone === 'emerald' ? 'border-emerald-400/20 bg-emerald-500/10' : item.tone === 'amber' ? 'border-amber-400/20 bg-amber-500/10' : 'border-slate-600 bg-slate-800/70'}`}>
                    <div className={`mb-2 inline-flex rounded-lg px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${item.tone === 'emerald' ? 'bg-white/10 text-emerald-100' : item.tone === 'amber' ? 'bg-white/10 text-amber-100' : 'bg-white/10 text-slate-200'}`}>
                      {item.label}
                    </div>
                    <div className="flex items-end gap-1">
                      <div className="h-10 w-6 rounded-md bg-emerald-400/80" />
                      <div className="h-14 w-6 rounded-md bg-slate-700" />
                      <div className="h-8 w-6 rounded-md bg-amber-300/80" />
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </motion.div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Why Synergy Brix" title="Technology built around your business." description="We don't just build software. We understand the problem, design the right solution, and engineer technology around the way your business works." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: <Building2 size={22} />, title: 'Business-first thinking', text: 'We start with business process, priorities, and outcomes.' },
              { icon: <Sparkles size={22} />, title: 'Custom solutions', text: 'Every solution is designed for your operational reality.' },
              { icon: <Layers3 size={22} />, title: 'Scalable architecture', text: 'Systems are structured for growth, maintenance, and change.' },
              { icon: <ShieldCheck size={22} />, title: 'Security-conscious development', text: 'We build with access control and reliability in mind.' },
            ].map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.06 }} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-900">{item.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="soft">
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
          <SectionHeading eyebrow="Business value" title="Problems we solve" description="We don’t add technology for the sake of it. We solve real business challenges by removing friction and improving operations." />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {homeProblems.map((problem) => (
              <div key={problem.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-900"><Check size={15} /></div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{problem.question}</h3>
                    <p className="mt-2 text-slate-600">{problem.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="soft">
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

      <Section background="soft">
        <Container>
          <SectionHeading eyebrow="Why Synergy Brix" title="Structured for long-term business value" description="Every engagement is shaped around the realities of your operations, your teams, and your future growth." />
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

      <Section>
        <Container>
          <SectionHeading eyebrow="Work" title="Selected demonstration projects" description="We are building reusable case-study formats so real projects can be added easily and clearly as they become available." />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {caseStudies.map((project) => (
              <CaseStudyCard key={project.slug} item={project} />
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Have a business problem worth solving?"
        description="Tell us what you're trying to build, improve, or automate."
        primaryLabel="Start a Project"
        secondaryLabel="Talk to Us"
        primaryHref="/contact"
        secondaryHref="/contact"
      />
    </>
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

  return (
    <PageShell title="Services" subtitle="Technology capabilities designed to solve real business challenges and support long-term growth." description="We help organizations modernize operations, build custom software, connect systems, and create practical digital tools that scale with the business.">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} detail />
        ))}
      </div>
    </PageShell>
  )
}

function ServiceDetailPage() {
  const { slug } = useParams()
  const service = services.find((item) => item.slug === slug)

  usePageMeta({
    title: service ? `${service.title} | Synergy Brix` : pageMeta.notFound.title,
    description: service ? service.short : pageMeta.notFound.description,
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
            <LinkButton to="/contact" variant="secondary-light" className="mt-5">{service.cta}</LinkButton>
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
    title: item ? `${item.title} | Synergy Brix` : pageMeta.notFound.title,
    description: item ? item.overview : pageMeta.notFound.description,
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
        <LinkButton to="/contact" variant="primary" className="mt-6">Start a Project</LinkButton>
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
    title: post ? `${post.title} | Synergy Brix` : pageMeta.notFound.title,
    description: post ? post.excerpt : pageMeta.notFound.description,
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

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: '',
    },
  })

  const [submitState, setSubmitState] = useState<{ success: boolean; message: string } | null>(null)

  async function onSubmit(values: ContactFormValues) {
    const result = await submitContactForm(values)
    setSubmitState(result)
    if (result.success) {
      form.reset()
    }
  }

  return (
    <PageShell title="Let's Build Something That Matters." subtitle="Tell us about your goals, challenge, or opportunity." description="Share a few details about your project and we will respond with the right next steps.">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
          <h3 className="text-2xl font-semibold">Start the conversation</h3>
          <p className="mt-3 text-slate-300">We help businesses define the right technology approach and move from concept to dependable delivery.</p>
          <ul className="mt-8 space-y-4 text-sm text-slate-200">
            <li className="flex items-center gap-3"><Mail size={16} className="text-emerald-300" /> hello@synergybrix.com</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-emerald-300" /> +91 00000 00000</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-emerald-300" /> India • Remote-ready</li>
          </ul>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" error={form.formState.errors.name?.message}>
              <input {...form.register('name')} className="input" placeholder="Your name" />
            </Field>
            <Field label="Company" error={form.formState.errors.company?.message}>
              <input {...form.register('company')} className="input" placeholder="Your company" />
            </Field>
            <Field label="Email" error={form.formState.errors.email?.message}>
              <input {...form.register('email')} type="email" className="input" placeholder="name@company.com" />
            </Field>
            <Field label="Phone" error={form.formState.errors.phone?.message}>
              <input {...form.register('phone')} className="input" placeholder="+91 ..." />
            </Field>
            <Field label="Project Type" error={form.formState.errors.projectType?.message}>
              <select {...form.register('projectType')} className="input">
                <option value="">Select project type</option>
                {contactTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </Field>
            <Field label="Budget Range" error={form.formState.errors.budget?.message}>
              <select {...form.register('budget')} className="input">
                <option value="">Select budget</option>
                {budgetRanges.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="Timeline" error={form.formState.errors.timeline?.message} className="md:col-span-2">
              <select {...form.register('timeline')} className="input">
                <option value="">Select timeline</option>
                {timelines.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="Message" error={form.formState.errors.message?.message} className="md:col-span-2">
              <textarea {...form.register('message')} className="input min-h-32" placeholder="Tell us what you're trying to build, improve, or automate." />
            </Field>
          </div>

          {submitState && (
            <div className={`mt-5 rounded-2xl px-4 py-3 text-sm ${submitState.success ? 'bg-emerald-50 text-emerald-900' : 'bg-red-50 text-red-700'}`}>
              {submitState.message}
            </div>
          )}

          <button type="submit" className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:opacity-50" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </PageShell>
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
  usePageMeta(pageMeta.notFound)

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
    <section className="border-y border-emerald-100 bg-emerald-900 text-white">
      <Container className="flex flex-col items-center justify-between gap-8 py-16 text-center lg:flex-row lg:text-left">
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
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-900"><Code2 size={18} /></div>
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
        Learn more <ArrowRight size={16} />
      </Link>
    </motion.article>
  )
}

function IndustryCard({ industry }: { industry: { title: string; summary: string } }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-900"><Building2 size={18} /></div>
      <h3 className="text-xl font-semibold text-slate-900">{industry.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{industry.summary}</p>
    </div>
  )
}

function CaseStudyCard({ item }: { item: (typeof caseStudies)[number] }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{item.label}</div>
      <h3 className="mt-3 text-2xl font-semibold text-slate-900">{item.title}</h3>
      <p className="mt-3 text-slate-600">{item.overview}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {item.technology.map((tech) => (
          <span key={tech} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">{tech}</span>
        ))}
      </div>
      <Link to={`/work/${item.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">
        Read project detail <ArrowRight size={16} />
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

function Field({ label, error, children, className = '' }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error && <span className="mt-2 block text-sm text-red-600">{error}</span>}
    </label>
  )
}

function LinkButton({ to, children, variant = 'primary', className = '', icon, fullWidth = false, onClick }: { to: string; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'primary-light' | 'secondary-light'; className?: string; icon?: React.ReactNode; fullWidth?: boolean; onClick?: () => void }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 hover:-translate-y-0.5 hover:shadow-lg'
  const styles = {
    primary: 'bg-emerald-700 text-white shadow-[0_12px_30px_rgba(5,150,105,0.25)] hover:bg-emerald-600',
    secondary: 'border border-slate-200 bg-white text-slate-900 hover:border-emerald-200 hover:text-emerald-900',
    'primary-light': 'bg-white text-emerald-900 hover:bg-emerald-50',
    'secondary-light': 'border border-white/25 bg-white/5 text-white hover:border-emerald-300/50 hover:bg-white/10',
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
      className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${dark
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

function Section({ children, background = 'white' }: { children: React.ReactNode; background?: 'white' | 'soft' }) {
  return <section className={background === 'soft' ? 'bg-slate-50 py-20' : 'bg-white py-20'}>{children}</section>
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
