import { Bot, Gauge, Globe, LayoutDashboard, Puzzle, Smartphone, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  plain: string;
  icon: LucideIcon;
  overview: string;
  examples: { title: string; text: string }[];
  capabilities: { heading: string; items: string[] }[];
  relatedProducts?: string[];
};

export const services: Service[] = [
  {
    slug: "wordpress-plugins",
    title: "WordPress & WooCommerce Plugins",
    plain: "Add custom features, smarter checkout options, and time-saving admin tools to your existing online store.",
    icon: Puzzle,
    overview:
      "Your store is almost perfect — it just misses one feature that would make selling easier. We build that feature as a clean, dedicated plugin that fits right into your current WordPress or WooCommerce site, so you don't have to rebuild anything.",
    examples: [
      { title: "Pay-in-parts checkout", text: "Let customers pay half now and half later, or spread a large order over several months." },
      { title: "Smarter pricing tools", text: "Update hundreds of product option prices in a few clicks instead of editing spreadsheets." },
      { title: "Time-saving admin screens", text: "A simple dashboard that replaces the repetitive copy-and-paste jobs your team does every week." },
    ],
    capabilities: [
      { heading: "WordPress & WooCommerce", items: ["PHP plugin development", "WooCommerce actions & filters", "HPOS-compatible code", "Admin settings pages & custom order screens"] },
      { heading: "Payments & pricing", items: ["Custom payment gateways", "Deposit & installment logic", "Dynamic pricing layers", "Plugin compatibility testing (e.g. WAPF)"] },
      { heading: "Delivery", items: ["Versioned releases & auto-updates", "Automated test suites", "Documentation & handover"] },
    ],
    relatedProducts: ["split-pay", "wapf-price-manager"],
  },
  {
    slug: "automation-ai",
    title: "Business Automation & AI",
    plain: "Let smart AI assistants and automated workflows handle repetitive customer questions, emails, and daily admin work 24/7.",
    icon: Bot,
    overview:
      "If your team answers the same questions or moves the same data around every day, a computer should be doing it. We set up AI assistants and automated workflows that quietly handle the routine work — so you and your team can focus on customers and growth.",
    examples: [
      { title: "Website chat assistant", text: "An assistant that knows your products and policies and answers visitors any time of day." },
      { title: "Automatic email sorting & replies", text: "Incoming requests are labeled, answered or routed to the right person without you lifting a finger." },
      { title: "Order & lead follow-ups", text: "New orders and enquiries trigger the right messages and tasks automatically." },
    ],
    capabilities: [
      { heading: "AI", items: ["RAG chatbots on your own content", "Website crawling & knowledge indexing", "Prompt rules, tone & guardrails", "Lead capture & human hand-off"] },
      { heading: "Workflows", items: ["n8n workflow design & hosting", "Webhooks & scheduled jobs", "Migration from Zapier / Make", "Error handling & monitoring"] },
      { heading: "Integrations", items: ["REST / GraphQL APIs", "Email, CRM, WooCommerce, Google Workspace", "Secure credential handling"] },
    ],
    relatedProducts: ["advisio-ai"],
  },
  {
    slug: "custom-web",
    title: "Custom Web & E-Commerce Builds",
    plain: "Complete, modern websites and online stores built from scratch around how your business actually sells.",
    icon: Globe,
    overview:
      "Instead of squeezing your business into a template, we design a website or store around your customers, your products and the way you actually sell. The result is fast, easy to manage, and built to turn visitors into customers.",
    examples: [
      { title: "A new online store", text: "A store with your catalog, pricing rules and checkout flow built exactly the way you need them." },
      { title: "A high-converting company site", text: "A clear, fast website that explains what you do and makes it easy to get in touch." },
      { title: "A B2B ordering site", text: "Customer-specific pricing, quote requests and reorder flows for business buyers." },
    ],
    capabilities: [
      { heading: "Front-end", items: ["Next.js / React", "Tailwind CSS design systems", "Core Web Vitals-focused builds", "Accessible, responsive layouts"] },
      { heading: "Commerce", items: ["WooCommerce builds", "Headless storefronts", "Custom checkout flows", "Search, filters & product configurators"] },
      { heading: "Back-end", items: ["Supabase / Postgres", "Authentication & roles", "Content management", "Hosting & CI/CD"] },
    ],
  },
  {
    slug: "custom-apps",
    title: "Custom Web, Mobile & Internal Apps",
    plain: "Tailored web apps, mobile-friendly tools, customer portals, and interactive calculators built for your customers or internal team.",
    icon: Smartphone,
    overview:
      "Some problems don't fit any off-the-shelf software. We build the exact tool you need — whether it's a portal where customers check their orders, a calculator that creates instant quotes, or an internal app that replaces a tangle of spreadsheets.",
    examples: [
      { title: "Customer portal", text: "Customers log in to see orders, documents and invoices without emailing you." },
      { title: "Interactive quote calculator", text: "Visitors enter their requirements and instantly get an estimate or a request-ready summary." },
      { title: "Internal team tool", text: "A mobile-friendly app for bookings, inventory checks or job tracking that replaces paper and spreadsheets." },
    ],
    capabilities: [
      { heading: "Applications", items: ["Next.js / React web apps", "Progressive Web Apps (installable, mobile-first)", "Role-based access", "Realtime updates"] },
      { heading: "Data", items: ["Supabase / Postgres with row-level security", "File storage & PDF generation", "Audit logs & exports"] },
      { heading: "Quality", items: ["TypeScript end-to-end", "Automated testing", "Secure authentication"] },
    ],
  },
  {
    slug: "store-optimization",
    title: "Speed, Checkout & Store Optimization",
    plain: "Turn slow websites into fast, high-converting stores, fix lost ad tracking, and make your checkout compliant with modern accessibility rules.",
    icon: Gauge,
    overview:
      "A slow store loses sales, broken tracking wastes ad budget, and an inaccessible checkout can turn customers away — and now carries legal risk. We find the problems, fix them properly, and show you the results.",
    examples: [
      { title: "Faster pages", text: "Strip out what slows your store down so pages load quickly on phones and desktops." },
      { title: "Ad tracking you can trust", text: "Get your real conversions back in your ad reports, even with modern browser privacy limits." },
      { title: "Accessible checkout", text: "Make your store usable for everyone and ready for the European Accessibility Act (EAA)." },
    ],
    capabilities: [
      { heading: "Performance", items: ["Plugin & script debloating", "Database & query optimization", "Caching, image & font optimization", "Core Web Vitals (LCP / INP / CLS)"] },
      { heading: "Tracking", items: ["Server-side tracking (GA4, Meta CAPI)", "Consent mode & event debugging", "Conversion data validation"] },
      { heading: "Accessibility", items: ["WCAG 2.2 AA code remediation", "AI-assisted alt text for product images", "Keyboard & screen-reader testing"] },
    ],
  },
  {
    slug: "integrations-dashboards",
    title: "System Integrations & Custom Dashboards",
    plain: "Connect your website, inventory, CRM, and accounting so your tools talk to each other automatically—with one clean dashboard to track it all.",
    icon: LayoutDashboard,
    overview:
      "When your store, stock system, CRM and accounting software don't talk to each other, someone has to copy data between them by hand. We connect them so information flows automatically, and give you one clean dashboard to see how the business is doing.",
    examples: [
      { title: "Orders to accounting", text: "Every paid order becomes an invoice in your accounting tool — no manual entry." },
      { title: "Live stock sync", text: "Inventory stays correct across your store and your warehouse system." },
      { title: "One owner dashboard", text: "Sales, leads and open tasks from all your systems on a single screen." },
    ],
    capabilities: [
      { heading: "Integrations", items: ["REST / GraphQL / webhook integrations", "ERP, CRM & accounting connectors", "Two-way data sync & conflict handling", "n8n or custom middleware"] },
      { heading: "Dashboards", items: ["Supabase-backed dashboards", "Charts, KPIs & exports", "Role-based access"] },
      { heading: "Reliability", items: ["Retry queues & alerting", "Logging & audit trails", "Documented data mappings"] },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
