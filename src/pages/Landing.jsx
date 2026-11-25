import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Bell, CheckCircle2, ChevronRight, ExternalLink, ShieldCheck, Sparkles, TrendingDown, Zap } from 'lucide-react';

const engineSpecs = [
  {
    store: 'Amazon',
    icon: 'bi-amazon',
    domain: 'amazon.com · amazon.in',
    latency: '118ms',
    status: 'Engine Operational',
    method: 'PricesAPI + HTML Fallback',
  },
  {
    store: 'Flipkart',
    icon: 'bi-bag-check-fill',
    domain: 'flipkart.com',
    latency: '142ms',
    status: 'Engine Operational',
    method: 'Cheerio DOM Parser',
  },
  {
    store: 'BestBuy',
    icon: 'bi-tag-fill',
    domain: 'bestbuy.com',
    latency: '165ms',
    status: 'Engine Operational',
    method: 'Direct Scraper Pipeline',
  },
  {
    store: 'Zara',
    icon: 'bi-gem',
    domain: 'zara.com',
    latency: '180ms',
    status: 'Engine Operational',
    method: 'Dynamic Price Extractor',
  },
];

const capabilities = [
  {
    icon: Zap,
    title: 'Autonomous Scraper Engine',
    subtitle: 'Zero Browser Extension Required',
    desc: 'Input any product URL. Our resilient multi-tier scraper extracts real-time prices, availability, and historical variants automatically.',
    tag: 'Daily Sweeps',
  },
  {
    icon: Bell,
    title: 'Target Price Telemetry',
    subtitle: 'SMS & WhatsApp Notifications',
    desc: 'Set custom price triggers. The second an item hits or drops below your target valuation, instant webhooks dispatch alert messages.',
    tag: 'Sub-Minute Dispatch',
  },
  {
    icon: ShieldCheck,
    title: 'Encrypted Session Guard',
    subtitle: 'Strict Security Protocols',
    desc: 'Hardened JWT refresh token rotation, isolated httpOnly cookies, rate-limited endpoints, and ownership verification for each product record.',
    tag: 'Enterprise Ready',
  },
];

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#06070a] text-slate-200 antialiased selection:bg-[#00f5a0] selection:text-[#06070a]">
      {/* Background Precision Grid & Radial Vignette */}
      <div className="pointer-events-none fixed inset-0 grid-premium opacity-60" />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-[#06070a]/40 to-[#06070a]" />

      {/* Top Navbar */}
      <header className="glass-nav sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-[#161c28] to-[#0c0f17] border border-white/10 shadow-specular text-[#00f5a0]">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display text-base font-extrabold tracking-tight text-white">Price Drop</span>
              <span className="ms-2 font-mono text-[10px] font-semibold text-[#00f5a0] border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-1.5 py-0.5 rounded">
                PRO v2.0
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 pb-28 pt-12 md:pt-20">
        {/* Hero Section */}
        <section className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00f5a0] animate-pulse" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                Automated Retail Intelligence
              </span>
            </div>

            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-white md:text-6xl">
              Precision price tracking for <span className="text-gradient">smart shoppers</span>.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300">
              Never overpay again. Monitor price trajectories across Amazon, Flipkart, BestBuy, and Zara with automated daily sweeps and instant SMS & WhatsApp drop alerts.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/register">
                <Button size="lg" className="gap-2">
                  Start Tracking Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="secondary">
                  Live Dashboard
                </Button>
              </Link>
            </div>

            {/* Micro specs */}
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/[0.06] pt-6 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00f5a0]" />
                <span>Daily 00:00 UTC Sweeps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00f5a0]" />
                <span>Twilio SMS & WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00f5a0]" />
                <span>Zero Extensions</span>
              </div>
            </div>
          </motion.div>

          {/* 3D Realistic Isometric Telemetry Console */}
          <motion.div
            className="iso-stage relative flex items-center justify-center py-8"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {/* Subtle Realistic Ambient Underglow */}
            <div className="pointer-events-none absolute -bottom-8 h-64 w-64 rounded-full bg-[#00f5a0]/15 blur-[100px]" />

            {/* 3D Angled Hardware Chassis */}
            <div className="iso-layer-base relative w-full max-w-md">
              {/* Backing Depth Plate (Simulated 3D Extrusion) */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-white/5 bg-[#050608] shadow-2xl" />

              {/* Main Command Console Surface */}
              <div className="glass-card-iso relative p-6">
                {/* Console Header Bar */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#00f5a0] animate-pulse" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#00f5a0]">
                      Active Telemetry · Amazon Store
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">Node #US-EAST-01</span>
                </div>

                {/* Live Product Card View */}
                <div className="mt-4 flex gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#07090f] p-1 shadow-inner">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-white/[0.04] text-slate-400 font-mono text-[10px]">
                      IMG
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Audio & Wearables</span>
                    <h3 className="text-base font-bold text-white truncate">Sony WH-1000XM5 ANC</h3>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-extrabold text-white">$343.20</span>
                      <span className="font-mono text-xs text-slate-500 line-through">$399.99</span>
                      <span className="ms-auto rounded-md bg-[#00f5a0]/15 px-2 py-0.5 font-mono text-[11px] font-bold text-[#00f5a0] border border-[#00f5a0]/30">
                        −14.2%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Valuation Metrics Grid */}
                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5 text-center">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Highest</p>
                    <p className="mt-0.5 font-mono text-xs font-bold text-slate-300">$399.99</p>
                  </div>
                  <div className="rounded-xl border border-[#00f5a0]/30 bg-[#00f5a0]/5 p-2.5 text-center shadow-[0_0_12px_rgba(0,245,160,0.1)]">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-[#00f5a0]">Target</p>
                    <p className="mt-0.5 font-mono text-xs font-extrabold text-[#00f5a0]">$345.00</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5 text-center">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Lowest</p>
                    <p className="mt-0.5 font-mono text-xs font-bold text-slate-300">$328.00</p>
                  </div>
                </div>

                {/* SVG Micro Price Chart Curve */}
                <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#07090f]/80 p-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-[10px] text-slate-400">30-Day Valuation Curve</span>
                    <span className="font-mono text-[10px] text-[#00f5a0] font-semibold">Target Met Today</span>
                  </div>
                  <div className="mt-2 flex h-20 items-end gap-1.5">
                    {[65, 78, 70, 85, 75, 62, 50, 55, 42, 35].map((val, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-t-sm transition-all duration-300 ${
                          idx >= 8
                            ? 'bg-gradient-to-t from-[#00f5a0] to-[#38bdf8] shadow-[0_0_8px_rgba(0,245,160,0.6)]'
                            : 'bg-slate-800'
                        }`}
                        style={{ height: `${val}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Dispatch Status Line */}
                <div className="mt-4 flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00f5a0]" />
                    <span className="text-slate-300">Trigger Executed: SMS Dispatched</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">14:02 UTC</span>
                </div>
              </div>

              {/* Floating Satellite 1: WhatsApp Alert (3D perspective floating tag) */}
              <div className="absolute -bottom-5 -right-5 hidden sm:flex items-center gap-3 rounded-xl border border-[#00f5a0]/40 bg-[#0c0f17]/95 p-3.5 shadow-2xl backdrop-blur-2xl animate-float-fast">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00f5a0]/20 text-[#00f5a0] border border-[#00f5a0]/40">
                  <i className="bi bi-whatsapp text-lg" />
                </div>
                <div>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#00f5a0]">WhatsApp Dispatch</p>
                  <p className="font-mono text-xs font-bold text-white">Price hit $343.20! Buy now</p>
                </div>
              </div>

              {/* Floating Satellite 2: Arbitrage Badge (Top Left) */}
              <div className="absolute -top-4 -left-4 hidden sm:flex items-center gap-2 rounded-xl border border-white/10 bg-[#0c0f17]/95 px-3 py-2 shadow-2xl backdrop-blur-2xl animate-float">
                <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse" />
                <span className="font-mono text-[11px] font-bold text-white">Target Reached</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Supported Stores Grid: Hardware Scraper Engines */}
        <section className="mt-32">
          <div className="text-center">
            <span className="glass-pill text-[#00f5a0] border-[#00f5a0]/30 font-mono text-[10px]">
              ENGINE SPECIFICATIONS
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Supported Retail Platforms
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Direct telemetry ingestion pipelines optimized for accuracy and bot evasion.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {engineSpecs.map((spec) => (
              <Card key={spec.store} hoverGlow isometric className="group p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-2xl text-white group-hover:border-[#00f5a0]/30 transition-colors">
                    <i className={`bi ${spec.icon} text-[#00f5a0]`} />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded border border-white/5">
                    {spec.latency}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{spec.store}</h3>
                <p className="mt-1 font-mono text-xs text-slate-400">{spec.domain}</p>
                
                <div className="mt-5 border-t border-white/[0.06] pt-3 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{spec.method}</span>
                  <span className="flex h-1.5 w-1.5 rounded-full bg-[#00f5a0]" />
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="mt-32">
          <div className="text-center">
            <span className="glass-pill text-[#38bdf8] border-[#38bdf8]/30 font-mono text-[10px]">
              CORE ARCHITECTURE
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Engineered for absolute reliability
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <Card key={cap.title} hoverGlow isometric className="group flex flex-col justify-between p-7">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#00f5a0]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-[10px] font-semibold text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/5">
                        {cap.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-white">{cap.title}</h3>
                    <p className="mt-1 font-mono text-xs text-slate-400">{cap.subtitle}</p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300">{cap.desc}</p>
                  </div>

                  <div className="mt-6 border-t border-white/[0.06] pt-4 flex items-center text-xs font-semibold text-[#00f5a0] gap-1">
                    Explore Architecture <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Bottom Call to Action */}
        <section className="mt-32">
          <div className="glass-card-iso relative overflow-hidden p-10 text-center md:p-16">
            <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-[#00f5a0]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-[#38bdf8]/10 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <span className="glass-pill text-[#00f5a0] border-[#00f5a0]/30 font-mono text-[10px]">
                GET STARTED IN 60 SECONDS
              </span>
              <h2 className="mt-6 font-display text-3xl font-extrabold text-white md:text-5xl tracking-tight">
                Stop overpaying for retail products.
              </h2>
              <p className="mt-4 text-base text-slate-300">
                Join our tracker engine today. Simply paste a link, establish your target valuation, and let the background scheduler do the rest.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="gap-2">
                    Deploy Free Tracker <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#07090e] py-8 text-center font-mono text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Price Drop Alert · B.Tech Final Project. All rights reserved.</p>
      </footer>
    </div>
  );
}