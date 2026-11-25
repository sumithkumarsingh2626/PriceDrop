import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: 'bi-graph-up-arrow',
    title: 'Live Price Tracking',
    copy: 'Instant scrape on add, followed by automated daily sweeps with full interactive price history charts.',
    badge: 'Real-time',
    gradient: 'from-brand-violet to-brand-purple',
  },
  {
    icon: 'bi-bell-fill',
    title: 'Smart Instant Alerts',
    copy: 'Get notified via SMS and WhatsApp the exact moment prices reach or drop below your target price.',
    badge: 'Omni-channel',
    gradient: 'from-brand-cyan to-blue-500',
  },
  {
    icon: 'bi-shield-check',
    title: 'Secure JWT Sessions',
    copy: 'Encrypted tokens, httpOnly cookies, rate-limited endpoints, and protected dashboard routes.',
    badge: 'Enterprise',
    gradient: 'from-emerald-400 to-teal-500',
  },
];

const stores = [
  { name: 'Amazon', icon: 'bi-amazon', domain: 'amazon.in / amazon.com', status: 'Live Engine' },
  { name: 'Flipkart', icon: 'bi-bag-check-fill', domain: 'flipkart.com', status: 'Live Engine' },
  { name: 'BestBuy', icon: 'bi-tag-fill', domain: 'bestbuy.com', status: 'Live Engine' },
  { name: 'Zara', icon: 'bi-gem', domain: 'zara.com', status: 'Live Engine' },
];

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-ink text-slate-100 antialiased selection:bg-brand-violet selection:text-white">
      {/* Dynamic Ambient Background Orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-brand-violet/20 blur-[140px]" />
        <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-cyan/15 blur-[130px]" />
        <div className="absolute bottom-10 left-1/3 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[150px]" />
      </div>

      {/* Glassmorphic Navbar */}
      <header className="glass-nav sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-violet via-purple-600 to-brand-cyan shadow-glow">
              <i className="bi bi-lightning-charge-fill text-xl text-white" />
            </div>
            <div>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">Price Drop</span>
              <span className="ms-1.5 rounded-md border border-brand-cyan/30 bg-brand-cyan/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-cyan">PRO</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-300 transition hover:text-white">
              Sign in
            </Link>
            <Link to="/register">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 pb-28 pt-12 md:pt-20">
        {/* Hero Section */}
        <section className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold backdrop-blur-xl">
              <span className="flex h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
              <span className="text-gradient">Next-Gen Price Intelligence</span>
            </div>

            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-white md:text-6xl">
              Never miss a <span className="text-gradient">price drop</span> again.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Track products with sub-cent precision across Amazon, Flipkart, BestBuy, and Zara. Visualize historical pricing curves and receive automated alerts when items hit your target.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/register">
                <Button size="lg" className="shadow-[0_15px_35px_-5px_rgba(124,58,237,0.6)]">
                  Start tracking free <i className="bi bi-arrow-right ms-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Live dashboard demo
                </Button>
              </Link>
            </div>

            {/* Feature Bullets */}
            <div className="mt-12 flex flex-wrap gap-6 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-2">
                <i className="bi bi-check-circle-fill text-brand-cyan" />
                Daily Automated Sweeps
              </span>
              <span className="flex items-center gap-2">
                <i className="bi bi-check-circle-fill text-brand-cyan" />
                SMS & WhatsApp Alerts
              </span>
              <span className="flex items-center gap-2">
                <i className="bi bi-check-circle-fill text-brand-cyan" />
                Multi-Store Fallback Scraper
              </span>
            </div>
          </motion.div>

          {/* 3D Isometric Glass Showcase */}
          <motion.div
            className="iso-stage relative flex items-center justify-center py-10"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {/* Isometric Grid Floor Glow */}
            <div className="pointer-events-none absolute -bottom-10 h-72 w-72 rounded-full bg-gradient-to-tr from-brand-violet/40 to-brand-cyan/30 blur-[90px]" />

            {/* Main 3D Isometric Card Deck */}
            <div className="iso-layer-base relative w-full max-w-md">
              {/* Backing Depth Layer (Isometric Extrusion) */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border border-white/5 bg-slate-950/80 backdrop-blur-xl" />

              {/* Main Translucent Glass Card */}
              <div className="glass-card-iso relative p-7">
                {/* Specular Light Bar */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-cyan">
                      Live Watch · Amazon
                    </span>
                    <h3 className="mt-1 text-2xl font-bold text-white">Sony WH-1000XM5</h3>
                    <p className="text-xs text-slate-400">Wireless Noise-Canceling Headphones</p>
                  </div>
                  <span className="glass-pill border-emerald-400/30 bg-emerald-500/15 text-emerald-400">
                    <i className="bi bi-arrow-down-right" /> −14.2%
                  </span>
                </div>

                {/* 3D Price Metric Tiles */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center backdrop-blur-md">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Original</p>
                    <p className="mt-1 text-sm font-semibold text-slate-300 line-through">$399.99</p>
                  </div>
                  <div className="rounded-2xl border border-brand-cyan/30 bg-brand-cyan/10 p-3 text-center backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan">Current</p>
                    <p className="mt-1 text-base font-extrabold text-white">$343.20</p>
                  </div>
                  <div className="rounded-2xl border border-brand-violet/30 bg-brand-violet/10 p-3 text-center backdrop-blur-md">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-violet-300">Target</p>
                    <p className="mt-1 text-sm font-bold text-violet-200">$345.00</p>
                  </div>
                </div>

                {/* Interactive Isometric Price History Chart Bars */}
                <div className="mt-7">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>30-Day Trend</span>
                    <span className="text-emerald-400 font-semibold">Target Met Today!</span>
                  </div>
                  <div className="mt-3 flex h-24 items-end gap-1.5 rounded-xl border border-white/5 bg-slate-950/40 p-2.5">
                    {[45, 60, 52, 70, 58, 48, 38, 42, 34, 28].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-md transition-all duration-300 hover:brightness-125 ${
                          i >= 8
                            ? 'bg-gradient-to-t from-brand-violet via-purple-500 to-brand-cyan shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                            : 'bg-slate-800 hover:bg-slate-700'
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating 3D Alert Pill attached to card */}
                <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 p-3 text-xs backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-slate-300">SMS Notification Dispatched</span>
                  </div>
                  <span className="text-[10px] text-slate-500">2 mins ago</span>
                </div>
              </div>

              {/* Floating Isometric 3D Satellite Token (Bottom-Right) */}
              <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 rounded-2xl border border-brand-cyan/40 bg-slate-900/90 p-4 shadow-glass backdrop-blur-2xl animate-float-fast">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan to-blue-600 text-white shadow-glow-cyan">
                  <i className="bi bi-whatsapp text-lg" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan">WhatsApp Alert</p>
                  <p className="text-xs font-bold text-white">Price hit $343.20! Buy now</p>
                </div>
              </div>

              {/* Floating Isometric 3D Target Chip (Top-Left) */}
              <div className="absolute -left-6 -top-6 hidden sm:flex items-center gap-2.5 rounded-2xl border border-brand-violet/40 bg-slate-900/90 px-3.5 py-2.5 shadow-glass backdrop-blur-2xl animate-float">
                <i className="bi bi-shield-fill-check text-brand-purple text-base" />
                <span className="text-xs font-bold text-white">Target Reached</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Supported Stores Section: 3D Isometric Frosted Tiles */}
        <section className="mt-32">
          <div className="text-center">
            <span className="glass-pill border-brand-cyan/30 text-brand-cyan">
              Multi-Platform Intelligence
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Track from your favourite stores
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Paste any URL. Our fallback scraper pipeline extracts live prices, titles, and currencies.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stores.map((s) => (
              <Card key={s.name} hoverGlow isometric className="group p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] text-2xl text-white shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <i className={`bi ${s.icon} text-gradient`} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{s.name}</h3>
                <p className="mt-1 text-xs text-slate-400">{s.domain}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {s.status}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Core Features: 3D Isometric Glass Cards */}
        <section className="mt-32">
          <div className="text-center">
            <span className="glass-pill border-brand-violet/30 text-brand-purple">
              Engine Capabilities
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Engineered for precision & speed
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} hoverGlow isometric className="group flex flex-col justify-between p-8">
                <div>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} text-xl text-white shadow-glow transition-transform duration-300 group-hover:scale-110`}>
                    <i className={`bi ${f.icon}`} />
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{f.title}</h3>
                    <span className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-bold text-slate-300">
                      {f.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.copy}</p>
                </div>
                <div className="mt-6 border-t border-white/[0.06] pt-4 text-xs font-semibold text-brand-cyan flex items-center gap-1">
                  Learn more <i className="bi bi-chevron-right text-[10px]" />
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="mt-32">
          <div className="glass-card-iso relative overflow-hidden p-10 text-center md:p-16">
            <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-brand-violet/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-brand-cyan/25 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <span className="glass-pill border-brand-cyan/30 text-brand-cyan">
                Ready in under 60 seconds
              </span>
              <h2 className="mt-6 font-display text-3xl font-extrabold text-white md:text-5xl">
                Start tracking your favourite items today.
              </h2>
              <p className="mt-4 text-base text-slate-300">
                Join thousands of shoppers saving money automatically every day. No browser extensions required.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="shadow-glow">
                    Create free account <i className="bi bi-arrow-right ms-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/60 py-8 text-center text-xs text-slate-500 backdrop-blur-xl">
        <p>© {new Date().getFullYear()} Price Drop Alert · B.Tech Final Project. All rights reserved.</p>
      </footer>
    </div>
  );
}