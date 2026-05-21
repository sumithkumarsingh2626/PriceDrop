import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const stores = ['Amazon', 'Best Buy', 'Zara', 'Walmart', 'Target'];
const features = [
  {
    icon: 'bi-graph-up-arrow',
    title: 'Live price history',
    copy: 'Every product gets an instant scrape on add, then daily updates with full charts.',
  },
  {
    icon: 'bi-bell-fill',
    title: 'Smart alerts',
    copy: 'Email OTP onboarding plus target-price and drop notifications you control.',
  },
  {
    icon: 'bi-shield-lock-fill',
    title: 'Secure sessions',
    copy: 'JWT access + refresh tokens, httpOnly cookies, and protected dashboard routes.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-ink bg-hero-mesh text-slate-100">
      <header className="glass-nav sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet to-brand-cyan">
              <i className="bi bi-lightning-charge-fill text-white" />
            </div>
            <span className="font-display text-lg font-bold">Price Drop Alert</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-slate-400 hover:text-white">
              Sign in
            </Link>
            <Link to="/register">
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-16">
        <section className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-violet/30 bg-brand-violet/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-purple">
              <i className="bi bi-stars" /> Premium price intelligence
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.08] md:text-6xl">
              Never miss a <span className="text-gradient">price drop</span> again.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              Track products across major stores, visualize trends with Recharts, and get alerted the moment prices hit your target.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="pulse-glow">
                  Start free <i className="bi bi-arrow-right ms-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  View dashboard
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500">
              <span><i className="bi bi-check-circle-fill text-brand-cyan me-2" />OTP email verify</span>
              <span><i className="bi bi-check-circle-fill text-brand-cyan me-2" />MongoDB backed</span>
              <span><i className="bi bi-check-circle-fill text-brand-cyan me-2" />Deploy on Vercel</span>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-brand-violet/30 to-brand-cyan/20 blur-3xl" />
            <Card className="relative animate-float glass-card border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">Live watch</p>
                  <h3 className="mt-1 text-xl font-bold">Sony WH-1000XM5</h3>
                </div>
                <span className="rounded-full bg-brand-cyan/15 px-3 py-1 text-xs font-semibold text-brand-cyan">
                  −12.4%
                </span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {['$349', '$299', '$279'].map((p, i) => (
                  <div key={p} className="rounded-xl border border-white/5 bg-slate-900/60 p-3 text-center">
                    <p className="text-[10px] uppercase text-slate-500">{['High', 'Now', 'Target'][i]}</p>
                    <p className={`mt-1 font-bold ${i === 1 ? 'text-brand-cyan' : ''}`}>{p}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex h-28 items-end gap-1">
                {[40, 55, 48, 62, 45, 38, 30].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-md ${i === 6 ? 'bg-gradient-to-t from-brand-violet to-brand-cyan' : 'bg-slate-700'}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </Card>
          </motion.div>
        </section>

        <section className="mt-24">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Supported stores</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {stores.map((s) => (
              <span key={s} className="glass-card px-5 py-2 text-sm text-slate-300">
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-24 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="glass-card border-white/5 p-6 transition hover:border-brand-violet/30">
              <i className={`bi ${f.icon} text-2xl text-brand-purple`} />
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.copy}</p>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
