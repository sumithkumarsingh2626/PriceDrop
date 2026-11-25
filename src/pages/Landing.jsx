import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Cpu,
  Database,
  Globe,
  Layers,
  LineChart,
  Lock,
  MessageSquare,
  Radio,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Zap,
} from 'lucide-react';

const stats = [
  { value: '$480K+', label: 'Savings Ingested', detail: 'Across monitored goods' },
  { value: '99.98%', label: 'Scrape Reliability', detail: 'Zero bot blockages' },
  { value: '120ms', label: 'Average Ingestion', detail: 'Direct DOM pipeline' },
  { value: '12.5K+', label: 'Active Watches', detail: 'Scheduled daily sweeps' },
];

const features = [
  {
    icon: Cloud,
    title: 'Cloud AI Scraper Cluster',
    desc: 'Distributed cloud headless workers bypass bot challenges and extract structured price and variant telemetry with sub-cent precision.',
    gradient: 'from-[#2563EB] to-[#00D4FF]',
    tag: 'Cloud Native',
  },
  {
    icon: Zap,
    title: 'Autonomous Price Sweeper',
    desc: 'Automated daily background jobs compare live retail valuations against historical baselines and user target thresholds.',
    gradient: 'from-[#00D4FF] to-[#38BDF8]',
    tag: 'Continuous Engine',
  },
  {
    icon: Bell,
    title: 'Omni-Channel Alert Gateway',
    desc: 'Instantaneous multi-protocol alert dispatch via Twilio SMS, WhatsApp Business API, and real-time dashboard webhooks.',
    gradient: 'from-[#8B5CF6] to-[#00D4FF]',
    tag: 'Instant Webhooks',
  },
  {
    icon: ShieldCheck,
    title: 'Hardened Security Protocol',
    desc: 'Enterprise-grade JWT session authentication, encrypted httpOnly cookie transport, and per-user isolation for total data privacy.',
    gradient: 'from-[#3B82F6] to-[#8B5CF6]',
    tag: 'Zero-Trust Guard',
  },
];

const steps = [
  {
    step: '01',
    title: 'Paste Product URL',
    desc: 'Input any URL from Amazon, Flipkart, BestBuy, or Zara. Our ingestion API normalizes and registers the product instantly.',
    icon: Globe,
  },
  {
    step: '02',
    title: 'Cloud Engine Ingestion',
    desc: 'Cloud crawlers extract the current price, original MSRP, product imagery, and stock availability into a time-series model.',
    icon: Server,
  },
  {
    step: '03',
    title: 'Instant Multi-Channel Dispatch',
    desc: 'The millisecond a price drops or hits your target, autonomous SMS and WhatsApp triggers notify you immediately.',
    icon: MessageSquare,
  },
];

const techStack = [
  { name: 'Headless Chromium', category: 'Ingestion Cluster', icon: Cpu },
  { name: 'MongoDB Atlas', category: 'Telemetry Storage', icon: Database },
  { name: 'Twilio Omni-Channel', category: 'SMS & WhatsApp Gateway', icon: Radio },
  { name: 'Redis Micro-Cache', category: 'High-Throughput State', icon: Server },
  { name: 'Next-Gen Vite SPA', category: 'Reactive Frontend', icon: Zap },
  { name: 'Node.js Express', category: 'Core API Engine', icon: Layers },
];

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050B18] text-[#F8FAFC] antialiased selection:bg-[#00D4FF] selection:text-[#050B18]">
      {/* Background Radial Light Cones & Grid */}
      <div className="pointer-events-none fixed inset-0 grid-premium opacity-40" />
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#2563EB]/20 via-[#00D4FF]/10 to-transparent blur-[140px]" />
      <div className="pointer-events-none fixed -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#8B5CF6]/15 blur-[140px]" />

      {/* 1. Navigation Bar */}
      <header className="glass-nav sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#00D4FF] p-0.5 shadow-glow-cyan">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#050B18]">
                <Cloud className="h-5 w-5 text-[#00D4FF]" />
              </div>
            </div>
            <div>
              <span className="font-display text-base font-extrabold tracking-tight text-white">Price Drop</span>
              <span className="ms-2 rounded border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#00D4FF]">
                AI CLOUD
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-[#00D4FF] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#00D4FF] transition-colors">How It Works</a>
            <a href="#preview" className="hover:text-[#00D4FF] transition-colors">Console Preview</a>
            <a href="#technology" className="hover:text-[#00D4FF] transition-colors">Technology</a>
          </nav>

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
        {/* 2. Hero Section */}
        <section className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-[#0B1428]/80 px-4 py-1.5 backdrop-blur-xl shadow-glow-cyan">
              <Sparkles className="h-3.5 w-3.5 text-[#00D4FF]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#00D4FF]">
                Autonomous Cloud Price Telemetry
              </span>
            </div>

            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-white md:text-6xl">
              Next-generation <span className="text-gradient">AI price tracking</span> for modern shoppers.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#94A3B8]">
              Continuous cloud crawlers monitor price drops across Amazon, Flipkart, BestBuy, and Zara. Set your target valuation and receive instant autonomous SMS & WhatsApp dispatch triggers.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/register">
                <Button size="lg" className="gap-2 shadow-btn-ai">
                  Launch Cloud Tracker <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="secondary">
                  Live Platform Demo
                </Button>
              </Link>
            </div>

            {/* Micro Checkmarks */}
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/[0.08] pt-6 font-mono text-xs text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00D4FF]" />
                <span>Zero Browser Extensions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00D4FF]" />
                <span>Sub-Cent Valuation Sweeps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00D4FF]" />
                <span>Twilio SMS & WhatsApp</span>
              </div>
            </div>
          </motion.div>

          {/* 3D AI / Cloud Computing Holographic Visual */}
          <motion.div
            className="iso-stage relative flex items-center justify-center py-8"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {/* Ambient Lighting Orbs */}
            <div className="pointer-events-none absolute -top-10 h-72 w-72 rounded-full bg-[#00D4FF]/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-10 h-72 w-72 rounded-full bg-[#8B5CF6]/20 blur-[100px]" />

            {/* 3D Isometric Hologram Chassis */}
            <div className="iso-layer-base relative w-full max-w-md">
              {/* Backing Extrusion Plate */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-white/5 bg-[#050B18] shadow-2xl" />

              {/* Main Hologram Terminal */}
              <div className="glass-card-iso relative p-6">
                {/* Console Top Bar */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#00D4FF] animate-pulse" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#00D4FF]">
                      AI Cloud Node · Active Sweep
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded border border-white/5">
                    120ms Latency
                  </span>
                </div>

                {/* Tracked Item Preview */}
                <div className="mt-4 flex gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0B1428] p-1 shadow-inner">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB]/20 to-[#00D4FF]/20 text-[#00D4FF] font-mono text-xs font-bold">
                      <Cloud className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#00D4FF]">
                      Amazon Store Pipeline
                    </span>
                    <h3 className="text-base font-bold text-white truncate">Sony WH-1000XM5 ANC</h3>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-extrabold text-white">$343.20</span>
                      <span className="font-mono text-xs text-slate-500 line-through">$399.99</span>
                      <span className="ms-auto rounded-md bg-[#00D4FF]/15 px-2 py-0.5 font-mono text-[11px] font-bold text-[#00D4FF] border border-[#00D4FF]/30">
                        −14.2%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metric Readout Grid */}
                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5 text-center">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Peak MSRP</p>
                    <p className="mt-0.5 font-mono text-xs font-bold text-slate-200">$399.99</p>
                  </div>
                  <div className="rounded-xl border border-[#00D4FF]/30 bg-[#00D4FF]/10 p-2.5 text-center shadow-glow-cyan">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-[#00D4FF]">Target Alert</p>
                    <p className="mt-0.5 font-mono text-xs font-extrabold text-[#00D4FF]">$345.00</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5 text-center">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Record Low</p>
                    <p className="mt-0.5 font-mono text-xs font-bold text-slate-200">$328.00</p>
                  </div>
                </div>

                {/* Holographic Micro Trend Bars */}
                <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#050B18]/80 p-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-[10px] text-slate-400">30-Day Valuation Trajectory</span>
                    <span className="font-mono text-[10px] text-[#00D4FF] font-semibold">Target Met Today!</span>
                  </div>
                  <div className="mt-2.5 flex h-20 items-end gap-1.5">
                    {[65, 75, 68, 85, 78, 62, 54, 58, 42, 35].map((val, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-t-sm transition-all duration-300 ${
                          idx >= 8
                            ? 'bg-gradient-to-t from-[#2563EB] to-[#00D4FF] shadow-glow-cyan'
                            : 'bg-slate-800'
                        }`}
                        style={{ height: `${val}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Live Trigger Status */}
                <div className="mt-4 flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-ping" />
                    <span className="text-slate-300 font-medium">Auto-Trigger: SMS Dispatched</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">2 mins ago</span>
                </div>
              </div>

              {/* Floating 3D Satellite: WhatsApp Notification Pill */}
              <div className="absolute -bottom-5 -right-5 hidden sm:flex items-center gap-3 rounded-xl border border-[#00D4FF]/40 bg-[#0B1428]/95 p-3.5 shadow-2xl backdrop-blur-2xl animate-float-fast">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#00D4FF] text-white shadow-glow-cyan">
                  <i className="bi bi-whatsapp text-lg" />
                </div>
                <div>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#00D4FF]">WhatsApp Alert</p>
                  <p className="font-mono text-xs font-bold text-white">Price hit $343.20! Buy now</p>
                </div>
              </div>

              {/* Floating 3D Satellite: AI Predictor Chip (Top Left) */}
              <div className="absolute -top-4 -left-4 hidden sm:flex items-center gap-2 rounded-xl border border-[#8B5CF6]/40 bg-[#0B1428]/95 px-3 py-2 shadow-2xl backdrop-blur-2xl animate-float">
                <Sparkles className="h-4 w-4 text-[#8B5CF6]" />
                <span className="font-mono text-[11px] font-bold text-white">Target Reached</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. Statistics Section */}
        <section className="mt-28">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.label} hoverGlow className="p-6 text-center">
                <h3 className="font-display text-4xl font-extrabold tracking-tight text-white">{s.value}</h3>
                <p className="mt-1 font-mono text-xs font-bold text-[#00D4FF] uppercase tracking-wider">{s.label}</p>
                <p className="mt-1 text-xs text-[#94A3B8]">{s.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. Features Section */}
        <section id="features" className="mt-32">
          <div className="text-center">
            <span className="glass-pill border-[#00D4FF]/30 text-[#00D4FF] font-mono text-[10px]">
              ENGINE CAPABILITIES
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Engineered for absolute accuracy
            </h2>
            <p className="mt-2 text-sm text-[#94A3B8]">
              Next-generation cloud infrastructure built to monitor millions of retail items seamlessly.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Card key={f.title} hoverGlow isometric className="group flex flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${f.gradient} text-white shadow-glow-blue`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-[10px] font-semibold text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">
                        {f.tag}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-white">{f.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">{f.desc}</p>
                  </div>
                  <div className="mt-6 border-t border-white/[0.06] pt-3 text-xs font-semibold text-[#00D4FF] flex items-center gap-1">
                    Explore Details <ChevronRight className="h-3 w-3" />
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 5. How It Works Section (Connected Horizontal Workflow) */}
        <section id="how-it-works" className="mt-32">
          <div className="text-center">
            <span className="glass-pill border-[#8B5CF6]/30 text-[#8B5CF6] font-mono text-[10px]">
              HORIZONTAL WORKFLOW
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Three steps to automated savings
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 relative">
            {steps.map((st, i) => {
              const Icon = st.icon;
              return (
                <Card key={st.step} hoverGlow className="relative p-7">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <span className="font-mono text-2xl font-black text-[#00D4FF]">{st.step}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#00D4FF]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{st.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">{st.desc}</p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 6. Dashboard / Product Preview */}
        <section id="preview" className="mt-32">
          <div className="text-center">
            <span className="glass-pill border-[#00D4FF]/30 text-[#00D4FF] font-mono text-[10px]">
              PLATFORM INTERFACE
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Realistic telemetry dashboard
            </h2>
            <p className="mt-2 text-sm text-[#94A3B8]">
              High-frequency charts, automated dispatch logs, and instant target configuration.
            </p>
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-[#0B1428]/90 p-4 md:p-8 backdrop-blur-2xl shadow-2xl">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
              <div>
                <span className="font-mono text-[10px] text-[#00D4FF] font-bold uppercase tracking-wider">LIVE TELEMETRY VIEW</span>
                <h3 className="text-xl font-bold text-white mt-1">Autonomous Price Drop Overview</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#00D4FF] animate-pulse" />
                <span className="font-mono text-xs text-slate-300">Cluster 100% Operational</span>
              </div>
            </div>

            {/* Dashboard Visual Grid */}
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <span className="font-mono text-[10px] text-slate-400">Total Tracked Products</span>
                <h4 className="font-display text-3xl font-bold text-white mt-1">1,248</h4>
                <p className="mt-1 text-xs text-[#00D4FF] font-mono">+18% this month</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <span className="font-mono text-[10px] text-slate-400">Net Value Saved</span>
                <h4 className="font-display text-3xl font-bold text-[#00D4FF] mt-1">$482,900</h4>
                <p className="mt-1 text-xs text-slate-400 font-mono">Vs. peak MSRP</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <span className="font-mono text-[10px] text-slate-400">Daily Drop Triggers</span>
                <h4 className="font-display text-3xl font-bold text-[#8B5CF6] mt-1">342 Dispatches</h4>
                <p className="mt-1 text-xs text-slate-400 font-mono">Sub-minute webhooks</p>
              </div>
            </div>

            {/* Sample Chart Box */}
            <div className="mt-6 rounded-xl border border-white/[0.06] bg-[#050B18]/70 p-5">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/[0.06] pb-3">
                <span className="font-mono text-[11px] text-slate-300 font-bold">Amazon · Apple MacBook Pro M3 (512GB)</span>
                <span className="font-mono text-[11px] text-[#00D4FF]">$1,499.00 (Target Met)</span>
              </div>
              <div className="mt-4 flex h-32 items-end gap-2">
                {[75, 78, 85, 82, 79, 74, 68, 65, 59, 52, 48, 42].map((v, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 rounded-t-sm ${
                      idx >= 10 ? 'bg-gradient-to-t from-[#2563EB] to-[#00D4FF] shadow-glow-cyan' : 'bg-slate-800'
                    }`}
                    style={{ height: `${v}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Technology Section */}
        <section id="technology" className="mt-32">
          <div className="text-center">
            <span className="glass-pill border-[#00D4FF]/30 text-[#00D4FF] font-mono text-[10px]">
              INFRASTRUCTURE STACK
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Powered by cloud-native technology
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <Card key={tech.name} hoverGlow className="p-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#00D4FF]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{tech.name}</h4>
                    <p className="font-mono text-xs text-[#94A3B8]">{tech.category}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 8. Call to Action */}
        <section className="mt-32">
          <div className="glass-card-iso relative overflow-hidden p-10 text-center md:p-16 border border-[#00D4FF]/30 shadow-glow-cyan">
            <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-[#2563EB]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-[#00D4FF]/25 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <span className="glass-pill border-[#00D4FF]/40 text-[#00D4FF] font-mono text-[10px]">
                GET STARTED IN 60 SECONDS
              </span>
              <h2 className="mt-6 font-display text-3xl font-extrabold text-white md:text-5xl tracking-tight">
                Never miss an e-commerce price drop again.
              </h2>
              <p className="mt-4 text-base text-[#94A3B8]">
                Deploy automated watchers on Amazon, Flipkart, BestBuy, and Zara with real-time SMS & WhatsApp dispatch triggers.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="gap-2 shadow-btn-ai">
                    Deploy Free Cloud Tracker <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 9. Minimal Dark Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050B18] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#00D4FF] text-white">
              <Cloud className="h-4 w-4" />
            </div>
            <span className="font-display text-sm font-bold text-white">Price Drop AI</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs text-[#94A3B8]">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#preview" className="hover:text-white transition-colors">Preview</a>
            <a href="#technology" className="hover:text-white transition-colors">Technology</a>
          </div>

          <p className="font-mono text-xs text-[#94A3B8]">
            © {new Date().getFullYear()} Price Drop AI · All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}