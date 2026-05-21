'use client';

import Link from 'next/link';
import { ArrowRight, Bell, ChartLine, ScanSearch, Sparkles } from 'lucide-react';
import Button from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="grid-bg min-h-screen overflow-hidden bg-[#04110d] text-emerald-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="flex items-center justify-between rounded-3xl border border-emerald-500/10 bg-emerald-950/25 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-300 p-2 text-emerald-950">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/60">Price Drop</p>
              <h1 className="text-lg font-semibold">Live daily tracker</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-emerald-100/70 hover:text-emerald-50">
              Login
            </Link>
            <Link href="/register">
              <Button>Start tracking</Button>
            </Link>
          </div>
        </header>

        <main className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr]">
          <section>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-emerald-200">
              <Bell className="h-3.5 w-3.5" />
              MongoDB + BullMQ + Recharts
            </div>
            <h2 className="mt-6 max-w-3xl text-5xl font-bold leading-tight md:text-6xl">
              Track product prices every day with live history and instant alerts.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-100/70">
              Add an Amazon, BestBuy, or Zara URL and the system immediately scrapes the product, stores the first price point, and keeps watching every 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/register">
                <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Create account
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  View dashboard
                </Button>
              </Link>
            </div>
          </section>

          <Card className="relative overflow-hidden p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.12),transparent_38%)]" />
            <div className="relative space-y-5 p-8">
              <div className="rounded-3xl border border-emerald-500/10 bg-emerald-950/35 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">Scrape snapshot</p>
                    <h3 className="mt-2 text-xl font-semibold">Sony XM5 Headphones</h3>
                  </div>
                  <span className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-emerald-200">
                    Active
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/35 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/45">Current</p>
                    <p className="mt-2 text-xl font-semibold">$249.99</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/35 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/45">Lowest</p>
                    <p className="mt-2 text-xl font-semibold text-emerald-300">$229.99</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/35 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/45">Drop</p>
                    <p className="mt-2 text-xl font-semibold text-emerald-300">-7.41%</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card hoverGlow className="p-5">
                  <ScanSearch className="h-5 w-5 text-emerald-300" />
                  <h4 className="mt-4 text-lg font-semibold">Immediate scrape</h4>
                  <p className="mt-2 text-sm leading-6 text-emerald-100/65">
                    Title, price, image, stock state, and store name are captured before the product is saved.
                  </p>
                </Card>
                <Card hoverGlow className="p-5">
                  <ChartLine className="h-5 w-5 text-emerald-300" />
                  <h4 className="mt-4 text-lg font-semibold">Live history graph</h4>
                  <p className="mt-2 text-sm leading-6 text-emerald-100/65">
                    Recharts visualizes every stored scrape with 7-day, 1-month, 3-month, and max views.
                  </p>
                </Card>
                <Card hoverGlow className="p-5">
                  <Bell className="h-5 w-5 text-emerald-300" />
                  <h4 className="mt-4 text-lg font-semibold">Target alerts</h4>
                  <p className="mt-2 text-sm leading-6 text-emerald-100/65">
                    Email, WhatsApp, SMS, and push switches can be set differently for every tracked item.
                  </p>
                </Card>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
