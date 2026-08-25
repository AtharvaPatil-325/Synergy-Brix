export type NavItem = {
  label: string
  to: string
  children?: { label: string; to: string }[]
}

export type Service = {
  slug: string
  title: string
  short: string
  problem: string
  solution: string
  features: string[]
  technology: string[]
  cta: string
}

export type Solution = {
  slug: string
  title: string
  summary: string
  problem: string
  approach: string
}

export type Industry = {
  title: string
  summary: string
}

export type CaseStudy = {
  slug: string
  title: string
  label: string
  overview: string
  challenge: string
  approach: string
  solution: string
  technology: string[]
  architecture: string
  outcome: string
}

export type BlogPost = {
  slug: string
  title: string
  category: string
  excerpt: string
  readTime: string
  date: string
  content: string[]
}

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Services',
    to: '/services',
    children: [
      { label: 'Custom Software Development', to: '/services/custom-software-development' },
      { label: 'Web Application Development', to: '/services/web-development' },
      { label: 'API Development', to: '/services/api-development' },
      { label: 'Business Automation', to: '/services/business-automation' },
      { label: 'Dashboard Development', to: '/services/dashboard-development' },
      { label: 'SaaS Development', to: '/services/saas-development' },
      { label: 'Cloud Solutions', to: '/services/cloud-solutions' },
      { label: 'Database Solutions', to: '/services/database-solutions' },
    ],
  },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
]

export const services: Service[] = [
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    short: 'Business-focused software designed around your operational realities.',
    problem: 'Off-the-shelf tools rarely fit the way your business actually works.',
    solution: 'We design tailored digital systems that streamline workflows and align with your goals.',
    features: ['Requirements mapping', 'Custom workflows', 'Integrations', 'Scalable architecture', 'Ongoing support'],
    technology: ['React', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL'],
    cta: 'Discuss a custom solution',
  },
  {
    slug: 'web-development',
    title: 'Web Application Development',
    short: 'Modern web platforms that are fast, secure, and built for scale.',
    problem: 'Operational bottlenecks often come from fragmented internal and customer-facing web tools.',
    solution: 'We build responsive, maintainable web applications that support your teams and customers.',
    features: ['Responsive UI', 'Role-based access', 'Audit-friendly workflows', 'Performance tuned', 'Growth-ready architecture'],
    technology: ['React', 'TypeScript', 'HTML', 'CSS', 'REST APIs'],
    cta: 'Plan a web app',
  },
  {
    slug: 'api-development',
    title: 'API Development',
    short: 'Stable interfaces to connect systems, automate processes, and unlock data.',
    problem: 'Disconnected software creates duplication, delays, and missed opportunities.',
    solution: 'We design and implement secure, reliable APIs for integration and product extension.',
    features: ['REST API design', 'Authentication flows', 'Versioning strategy', 'Error handling', 'Monitoring-ready endpoints'],
    technology: ['Java', 'Spring Boot', 'REST', 'MySQL', 'PostgreSQL'],
    cta: 'Build an integration layer',
  },
  {
    slug: 'business-automation',
    title: 'Business Automation',
    short: 'Reduce friction with workflows that connect data, timing, and actions.',
    problem: 'Manual handoffs slow teams and create avoidable operational risk.',
    solution: 'We automate repeatable processes to save time and improve consistency across your business.',
    features: ['Workflow automation', 'Notifications', 'Document processing', 'Task orchestration', 'Data sync'],
    technology: ['Java', 'REST APIs', 'Cron jobs', 'Cloud services', 'Reporting'],
    cta: 'Automate business workflows',
  },
  {
    slug: 'dashboard-development',
    title: 'Dashboard Development',
    short: 'Operational visibility that turns fragmented metrics into decisions.',
    problem: 'Without clear dashboards, teams make decisions from scattered information.',
    solution: 'We build executive and operational dashboards that provide the right visibility at the right time.',
    features: ['Data aggregation', 'Custom KPIs', 'Interactive views', 'Traceable reporting', 'Role-based dashboards'],
    technology: ['React', 'TypeScript', 'Data visualization', 'REST APIs', 'Security patterns'],
    cta: 'Design a dashboard',
  },
  {
    slug: 'saas-development',
    title: 'SaaS Development',
    short: 'Scalable software products designed to serve users and teams efficiently.',
    problem: 'Growing digital products need structure, performance, and clear growth paths.',
    solution: 'We design SaaS systems with modularity, onboarding flows, configuration management, and maintainability in mind.',
    features: ['Multi-tenant ready architecture', 'User onboarding', 'Billing-ready foundation', 'Observability', 'Scalable product structure'],
    technology: ['React', 'TypeScript', 'Java', 'Spring Boot', 'Cloud deployment'],
    cta: 'Discuss a SaaS product',
  },
  {
    slug: 'cloud-solutions',
    title: 'Cloud Solutions',
    short: 'Deployment strategies that support reliability, scalability, and simplicity.',
    problem: 'Applications can become expensive or brittle without the right cloud strategy.',
    solution: 'We help shape cloud-ready architecture, deployment patterns, and scalability planning.',
    features: ['Cloud architecture planning', 'Containerization', 'CI/CD-ready delivery', 'Deployment support', 'Performance optimization'],
    technology: ['Docker', 'Cloud deployment', 'CI/CD', 'Container orchestration', 'Monitoring'],
    cta: 'Plan cloud deployment',
  },
  {
    slug: 'database-solutions',
    title: 'Database Solutions',
    short: 'Robust database design that supports data integrity, access, and growth.',
    problem: 'Poor database design leads to slow queries, data inconsistency, and brittle systems.',
    solution: 'We design data models and storage approaches that support business logic and future scale.',
    features: ['Schema design', 'Migration planning', 'Query optimization', 'Data modeling', 'Integrity safeguards'],
    technology: ['PostgreSQL', 'MySQL', 'Database design', 'SQL', 'System integration'],
    cta: 'Improve your data foundation',
  },
]

export const solutions: Solution[] = [
  { slug: 'business-management', title: 'Business Management', summary: 'Operational workflows that unify teams, processes, and visibility.', problem: 'Business teams often work across disconnected spreadsheets, forms, and legacy tools.', approach: 'We map core workflows and build an intelligent system around them with role-based controls and reporting.' },
  { slug: 'crm', title: 'CRM', summary: 'Customer relationship tools that bring pipeline, communication, and follow-up together.', problem: 'Without a common record of customer activity, teams lose context and momentum.', approach: 'We design structured customer records, lead tracking, and process automation around your sales and service model.' },
  { slug: 'inventory-management', title: 'Inventory Management', summary: 'Accurate stock oversight with demand visibility and process control.', problem: 'Inventory errors create lost sales, delays, and inaccurate financial reporting.', approach: 'We implement inventory workflows, stock monitoring, movement tracking, and reporting that support operational clarity.' },
  { slug: 'employee-management', title: 'Employee Management', summary: 'People and operations data centralized for better planning and visibility.', problem: 'HR and operational data often remain fragmented across multiple systems.', approach: 'We build systems to manage employee information, onboarding, attendance, and role-based access with consistency.' },
  { slug: 'customer-portals', title: 'Customer Portals', summary: 'Self-serve access that improves service delivery and data visibility.', problem: 'Customers need fast access to information without unnecessary internal overhead.', approach: 'We build secure portals for requests, updates, tracking, and document access tailored to your service model.' },
  { slug: 'workflow-automation', title: 'Workflow Automation', summary: 'Automated business processes that remove repetitive manual work.', problem: 'Manual steps between systems create delays, errors, and staff burnout.', approach: 'We automate tasks, alerts, approvals, and handoffs across systems to improve speed and quality.' },
  { slug: 'analytics-reporting', title: 'Analytics & Reporting', summary: 'Sensible business reporting built to support smarter decisions.', problem: 'Reporting is often inconsistent, delayed, or hidden inside manual spreadsheets.', approach: 'We create metrics dashboards and reporting flows that make performance visible and actionable.' },
  { slug: 'document-management', title: 'Document Management', summary: 'Organized digital records and document workflows with governance in mind.', problem: 'Critical information becomes difficult to track, review, and retrieve.', approach: 'We structure document repositories, version control, access policies, and process automation around your compliance needs.' },
  { slug: 'scheduling', title: 'Scheduling', summary: 'Operational scheduling systems that reduce overlaps and improve planning.', problem: 'Teams lose time to scheduling conflicts and inconsistent coordination.', approach: 'We create scheduling solutions with resource planning, calendars, and automation tailored to your operational patterns.' },
  { slug: 'internal-tools', title: 'Internal Tools', summary: 'Practical internal systems that improve team speed and accountability.', problem: 'Simple operational tasks often rely on brittle spreadsheets or disconnected tools.', approach: 'We build purpose-built internal tools that reflect the way your team really works and remove administrative drain.' },
]

export const industries: Industry[] = [
  { title: 'Manufacturing', summary: 'Production planning, inventory visibility, and operational automation for factories and supply networks.' },
  { title: 'Engineering', summary: 'Project coordination, technical workflows, and system integration for design and operations teams.' },
  { title: 'Healthcare', summary: 'Operational systems that support service workflows, records access, and process consistency.' },
  { title: 'Education', summary: 'Student, admin, and operational tools designed to improve efficiency and experience.' },
  { title: 'Logistics', summary: 'Route coordination, process automation, and tracking systems that support delivery operations.' },
  { title: 'Retail', summary: 'Business tools and customer-facing applications for transaction, stock, and service visibility.' },
  { title: 'Professional Services', summary: 'Delivery process management, client workflows, and internal productivity systems for service firms.' },
  { title: 'Real Estate', summary: 'Property processes, workflow tools, and dashboards tailored to operational and customer needs.' },
  { title: 'Startups & SMEs', summary: 'Scalable digital solutions that support growth without unnecessary complexity or overhead.' },
]

export const caseStudies: CaseStudy[] = [
  {
    slug: 'operations-visibility-platform',
    title: 'Operations Visibility Platform',
    label: 'Selected Demonstration Project',
    overview: 'A modular dashboard system designed to unify reporting across sales, inventory, and service operations.',
    challenge: 'The client had fragmented operational data across spreadsheets, manual reporting, and multiple tools.',
    approach: 'We mapped the reporting flows and created a single business intelligence layer with role-based views.',
    solution: 'The platform brought together operational data, surfaced the key metrics, and improved team visibility across departments.',
    technology: ['React', 'TypeScript', 'REST APIs', 'PostgreSQL', 'Dashboard Design'],
    architecture: 'Frontend in React with a service-oriented API layer and a database design focused on reporting and access control.',
    outcome: 'Project structure and solution direction were defined for scalable rollout once real business data and workflows are available.',
  },
  {
    slug: 'process-automation-suite',
    title: 'Process Automation Suite',
    label: 'Selected Demonstration Project',
    overview: 'An automation-focused platform for repetitive operational steps across multiple departments.',
    challenge: 'The business needed to reduce manual work and improve consistency across approvals and notifications.',
    approach: 'We defined the workflows, triggers, and routing logic, then packaged them into a structured automation design.',
    solution: 'The solution model simplified repetitive work, centralized task approvals, and improved operational speed.',
    technology: ['Java', 'Spring Boot', 'REST APIs', 'Workflow Design', 'Notifications'],
    architecture: 'A modular backend process engine with event triggers, service integrations, and a simple reporting interface.',
    outcome: 'The project demonstrates how business automation can be designed around measurable operational improvements and future extensibility.',
  },
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-technology-around-business-processes',
    title: 'Building technology around business processes',
    category: 'Software Development',
    excerpt: 'Successful software starts with a clear understanding of how work actually happens inside an organization.',
    readTime: '5 min read',
    date: 'June 2026',
    content: [
      'Good software does not begin with code. It begins with business clarity. Before a feature is designed or a platform is developed, teams need to understand the real operational flow behind the work.',
      'This is especially important when businesses are dealing with fragmented systems, manual handoffs, or informal processes that only work because people are carrying them mentally. The right engineering approach is to map those realities first and then build digital systems around them.',
      'When the process is clear, the technology becomes easier to design, more reliable to implement, and more valuable to the business long term.',
    ],
  },
  {
    slug: 'what-makes-an-api-reliable',
    title: 'What makes an API reliable',
    category: 'APIs',
    excerpt: 'Reliable APIs are not just technically sound—they are predictable, secure, and easy to integrate over time.',
    readTime: '6 min read',
    date: 'May 2026',
    content: [
      'A reliable API is built around clarity. It needs consistent contracts, predictable behavior, and a thoughtful approach to versioning and error handling.',
      'Security, observability, and maintainability are not afterthoughts. They are part of a strong API design strategy from the beginning.',
      'When organizations connect internal and external systems through well-designed interfaces, they reduce complexity and improve flexibility for future product growth.',
    ],
  },
  {
    slug: 'when-dashboards-drive-better-decisions',
    title: 'When dashboards drive better decisions',
    category: 'Web Development',
    excerpt: 'A good dashboard does not overwhelm teams—it highlights the right signals and supports practical action.',
    readTime: '4 min read',
    date: 'April 2026',
    content: [
      'Dashboards are only useful when they support real decision-making. If data is noisy or difficult to interpret, a dashboard becomes a burden rather than an advantage.',
      'Business-critical dashboards should focus on the most meaningful metrics, use clear grouping, and align with the needs of each decision-maker.',
      'When the information is organized around actual business questions, dashboards become a practical tool for operational clarity and speed.',
    ],
  },
]

export const faqs = [
  { question: 'What types of software do you build?', answer: 'We build custom software, web applications, APIs, automation systems, dashboards, internal tools, integration layers, and digital platforms for business operations.' },
  { question: 'How does your development process work?', answer: 'Our process begins with discovery and requirement analysis, then planning, architecture, design, development, testing, deployment, and support.' },
  { question: 'How long does a project take?', answer: 'Project duration varies depending on scope, complexity, integrations, and business requirements. We define a realistic timeline during the discovery and planning stages.' },
  { question: 'Do you work with startups and SMEs?', answer: 'Yes. We work with organizations that need scalable, well-structured technology without unnecessary complexity or rigid delivery models.' },
  { question: 'Can you work with existing software?', answer: 'Yes. We can review, improve, extend, or integrate with existing systems when the business needs a practical modernization path.' },
  { question: 'Can you integrate APIs?', answer: 'Yes. We design and implement API-driven integrations to connect systems, automate workflows, and improve data exchange.' },
  { question: 'Can you automate existing business processes?', answer: 'Yes. We map operational processes and automate repetitive or manual steps when the business case is clear and the workflow can be standardized.' },
  { question: 'Do you provide cloud deployment?', answer: 'Yes. We can plan and support cloud-ready deployment strategies, containerized setups, and scalable hosting approaches based on project needs.' },
  { question: 'Can you maintain existing applications?', answer: 'Yes. We provide maintenance and support services to improve stability, address issues, and extend functionality over time.' },
  { question: 'How do project estimates work?', answer: 'Estimates are based on the project scope, business goals, technical complexity, integrations, timeline, and any support requirements after launch.' },
]

export const technologyGroups = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Backend',
    items: ['Java', 'Spring Boot', 'REST APIs'],
  },
  {
    title: 'Databases',
    items: ['PostgreSQL', 'MySQL'],
  },
  {
    title: 'APIs',
    items: ['REST API Design', 'API Integration', 'System Connectivity'],
  },
  {
    title: 'Security',
    items: ['Authentication', 'Authorization', 'JWT', 'Role-Based Access Control'],
  },
  {
    title: 'Cloud',
    items: ['Docker', 'Cloud Deployment', 'CI/CD-ready architecture'],
  },
  {
    title: 'DevOps',
    items: ['Version Control', 'Environment readiness', 'Deployment support', 'Monitoring preparation'],
  },
]

export const processSteps = [
  { number: '01', title: 'Discover', description: 'Understand requirements and business objectives.' },
  { number: '02', title: 'Plan', description: 'Define scope, architecture, technology, and milestones.' },
  { number: '03', title: 'Design', description: 'Create user flows, interfaces, and system structure.' },
  { number: '04', title: 'Develop', description: 'Build clean and maintainable software.' },
  { number: '05', title: 'Test', description: 'Validate functionality, usability, security, and reliability.' },
  { number: '06', title: 'Deploy', description: 'Launch the solution and provide ongoing support.' },
]

export const companyValues = [
  'Business-first approach',
  'Clean engineering',
  'Scalable architecture',
  'Security-conscious development',
  'Transparent communication',
  'Custom solutions',
  'Long-term support',
]

export const homeSolutions = [
  'Business Management Systems',
  'CRM Solutions',
  'Inventory Systems',
  'Customer Portals',
  'Workflow Automation',
  'Reporting Dashboards',
  'Employee Management',
  'Document Management',
  'Scheduling Systems',
  'Internal Business Tools',
]

export const homeProblems = [
  { question: 'Too much manual work?', answer: 'We can automate repetitive workflows.' },
  { question: 'Business data is scattered?', answer: 'We can centralize it into one system.' },
  { question: 'Using spreadsheets for everything?', answer: 'We can build a proper business application.' },
  { question: 'Existing systems do not communicate?', answer: 'We can integrate them through APIs.' },
  { question: 'Need better visibility?', answer: 'We can build dashboards and reporting systems.' },
]

export const footerLinks = {
  quickLinks: [
    { label: 'Services', to: '/services' },
    { label: 'Solutions', to: '/solutions' },
    { label: 'Industries', to: '/industries' },
    { label: 'Work', to: '/work' },
    { label: 'About', to: '/about' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms & Conditions', to: '/terms' },
    { label: 'Cookie Policy', to: '/cookies' },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
  ],
}

export const pageMeta = {
  home: {
    title: 'Synergy Brix | Software Development & Technology Solutions',
    description: 'Synergy Brix builds software, web applications, APIs, automation systems, and digital solutions that help businesses operate smarter and grow with confidence.',
    canonical: 'https://synergybrix.com/',
  },
  about: {
    title: 'About Synergy Brix | Technology Partner for Modern Business',
    description: 'Learn about Synergy Brix and how we work as a technology partner focused on business-first engineering and practical digital transformation.',
    canonical: 'https://synergybrix.com/about',
  },
  services: {
    title: 'Services | Synergy Brix',
    description: 'Discover Synergy Brix services including custom software, web apps, APIs, automation, dashboards, SaaS, cloud, and database solutions.',
    canonical: 'https://synergybrix.com/services',
  },
  solutions: {
    title: 'Solutions | Synergy Brix',
    description: 'Explore business solutions from Synergy Brix for operations, CRM, inventory, customer portals, automation, reporting, and internal tools.',
    canonical: 'https://synergybrix.com/solutions',
  },
  industries: {
    title: 'Industries | Synergy Brix',
    description: 'See how Synergy Brix supports manufacturing, engineering, healthcare, education, logistics, retail, services, real estate, and startups.',
    canonical: 'https://synergybrix.com/industries',
  },
  work: {
    title: 'Work | Synergy Brix',
    description: 'Browse selected project showcases and approach examples from Synergy Brix, including demonstration case studies and solution patterns.',
    canonical: 'https://synergybrix.com/work',
  },
  process: {
    title: 'Process | Synergy Brix',
    description: 'Learn how Synergy Brix approaches discovery, planning, design, development, testing, deployment, and support for business software projects.',
    canonical: 'https://synergybrix.com/process',
  },
  technologies: {
    title: 'Technologies | Synergy Brix',
    description: 'Review Synergy Brix technology capabilities across frontend, backend, databases, APIs, security, cloud, and DevOps.',
    canonical: 'https://synergybrix.com/technologies',
  },
  insights: {
    title: 'Insights | Synergy Brix',
    description: 'Explore practical insights on business software, automation, architecture, integrations, digital transformation, and technology strategy.',
    canonical: 'https://synergybrix.com/insights',
  },
  careers: {
    title: 'Careers | Synergy Brix',
    description: 'Discover the Synergy Brix engineering culture, learning approach, and opportunities to join the team.',
    canonical: 'https://synergybrix.com/careers',
  },

  contact: {
    title: 'Contact | Synergy Brix',
    description: 'Tell Synergy Brix about your software challenge, automation idea, or business technology initiative.',
    canonical: 'https://synergybrix.com/contact',
  },
  faq: {
    title: 'FAQ | Synergy Brix',
    description: 'Find answers about software development services, project process, integrations, cloud deployment, automation, and support.',
    canonical: 'https://synergybrix.com/faq',
  },
  privacy: {
    title: 'Privacy Policy | Synergy Brix',
    description: 'Read the Synergy Brix privacy policy placeholder and information requirements for future legal review.',
    canonical: 'https://synergybrix.com/privacy',
  },
  terms: {
    title: 'Terms & Conditions | Synergy Brix',
    description: 'Read the Synergy Brix terms and conditions placeholder for legal review and future refinement.',
    canonical: 'https://synergybrix.com/terms',
  },
  cookies: {
    title: 'Cookie Policy | Synergy Brix',
    description: 'Review the Synergy Brix cookie policy placeholder and understand future cookie and tracking requirements.',
    canonical: 'https://synergybrix.com/cookies',
  },
  notFound: {
    title: 'Page Not Found | Synergy Brix',
    description: 'The page you requested cannot be found. Return to the Synergy Brix homepage.',
    canonical: 'https://synergybrix.com/404',
  },
}

export const contactTypes = [
  'Custom Software',
  'Web Application',
  'API Development',
  'Automation',
  'Dashboard',
  'SaaS Product',
  'Cloud Solution',
  'Other',
]

export const budgetRanges = ['Under ₹2L', '₹2L - ₹5L', '₹5L - ₹15L', '₹15L - ₹30L', '₹30L+']

export const timelines = ['ASAP', 'Within 1 month', 'Within 3 months', 'Within 6 months', 'Flexible']
