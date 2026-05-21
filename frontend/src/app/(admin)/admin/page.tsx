'use client';

import React, { useState } from 'react';
import { ShieldCheck, Users, Compass, AlertCircle, RefreshCw, Cpu, Server, Activity, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card } from '../../../components/ui/card';
import Button from '../../../components/ui/button';
import { useToast } from '../../../providers/ToastProvider';

export default function AdminPage() {
  const { success } = useToast();
  const [isFlushing, setIsFlushing] = useState(false);
  const [isSweeping, setIsSweeping] = useState(false);

  const handleFlushCache = () => {
    setIsFlushing(true);
    setTimeout(() => {
      setIsFlushing(false);
      success('System cache cleared! Database index refreshed.');
    }, 1500);
  };

  const handleManualSweep = () => {
    setIsSweeping(true);
    setTimeout(() => {
      setIsSweeping(false);
      success('Manual catalog scraping sweep triggered successfully!');
    }, 1500);
  };

  const mockUsers = [
    { name: 'Sumith Kumar', email: 'sumithkumar2626@gmail.com', role: 'Admin', verified: true, date: '2026-05-01' },
    { name: 'Bittu Kumar Singh', email: 'bittu.singh@test.com', role: 'User', verified: true, date: '2026-05-10' },
    { name: 'Alice Smith', email: 'alice.s@test.com', role: 'User', verified: false, date: '2026-05-18' },
  ];

  const mockJobs = [
    { item: 'iPhone 15 Pro (Amazon)', status: 'Success', time: '5 mins ago', duration: '1.2s' },
    { item: 'Sony XM5 Headphones (Amazon)', status: 'Success', time: '12 mins ago', duration: '1.8s' },
    { item: 'Samsung S24 Ultra (Flipkart)', status: 'Failed', time: '24 mins ago', duration: '4.5s', reason: 'Selectors changed' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative grid-bg p-6 md:p-8">
      {/* Visual top glow */}
      <div className="absolute top-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 z-10">
        
        {/* Title area with dashboard link */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-extrabold tracking-tight font-['Outfit'] text-slate-100 flex items-center gap-2">
              Admin Systems Control <ShieldCheck className="h-6.5 w-6.5 text-sky-400" />
            </h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Review live scraping performance metrics and user directories
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />} className="text-xs font-semibold">
              Exit Console
            </Button>
          </Link>
        </div>

        {/* Dynamic Metric counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-panel p-4 flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Overall Users</span>
              <span className="text-xl font-extrabold font-['Outfit']">84</span>
            </div>
            <Users className="h-5.5 w-5.5 text-sky-400 opacity-80" />
          </Card>

          <Card className="glass-panel p-4 flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Catalog Items</span>
              <span className="text-xl font-extrabold font-['Outfit']">312</span>
            </div>
            <Compass className="h-5.5 w-5.5 text-sky-400 opacity-80" />
          </Card>

          <Card className="glass-panel p-4 flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Failed scrapes</span>
              <span className="text-xl font-extrabold font-['Outfit'] text-rose-400">4%</span>
            </div>
            <AlertCircle className="h-5.5 w-5.5 text-rose-400 opacity-80" />
          </Card>

          <Card className="glass-panel p-4 flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Live workers</span>
              <span className="text-xl font-extrabold font-['Outfit'] text-sky-400">3 Active</span>
            </div>
            <Server className="h-5.5 w-5.5 text-sky-400 opacity-80" />
          </Card>
        </div>

        {/* Administration core systems panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Registered Users Table (Left 2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              User Directories
            </h3>

            <Card className="glass-panel p-5 overflow-x-auto border-slate-800">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-900 pb-3 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-2.5">User</th>
                    <th className="py-2.5">Email</th>
                    <th className="py-2.5">Access Role</th>
                    <th className="py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60 font-medium">
                  {mockUsers.map((u, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/10 transition">
                      <td className="py-3 font-bold text-slate-200">{u.name}</td>
                      <td className="py-3 text-slate-400 font-mono">{u.email}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${u.role === 'Admin' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex items-center h-2 w-2 rounded-full ${u.verified ? 'bg-sky-500 shadow-[0_0_8px_rgba(56,189,246,0.4)]' : 'bg-amber-400 animate-ping'}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          {/* Performance & Admin triggers (Right 1 col) */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Control Center
              </h3>

              <Card className="glass-panel border-slate-800 p-5 flex flex-col gap-4">
                <Button
                  variant="primary"
                  isLoading={isSweeping}
                  leftIcon={<RefreshCw className={`h-4 w-4 ${isSweeping ? 'animate-spin' : ''}`} />}
                  onClick={handleManualSweep}
                  className="w-full text-xs font-bold py-3"
                >
                  Force Scraper Sweep
                </Button>
                
                <Button
                  variant="secondary"
                  isLoading={isFlushing}
                  leftIcon={<Activity className="h-4 w-4" />}
                  onClick={handleFlushCache}
                  className="w-full text-xs font-bold py-3"
                >
                  Flush Cached Failures
                </Button>
              </Card>
            </div>

            {/* Scraping worker logs */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Live Scraper Worker Logs
              </h3>

              <Card className="glass-panel border-slate-800 p-4.5 flex flex-col gap-3">
                {mockJobs.map((j, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950/65 border border-slate-900 text-xs flex flex-col gap-1">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-300 truncate max-w-[150px]">{j.item}</span>
                      <span className={`text-[9px] font-extrabold uppercase ${j.status === 'Success' ? 'text-sky-400' : 'text-rose-400 animate-pulse'}`}>
                        {j.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold mt-1">
                      <span>Speed: {j.duration}</span>
                      <span>{j.time}</span>
                    </div>
                    {j.reason && (
                      <span className="block border-t border-rose-500/10 pt-1.5 mt-1.5 text-[9px] font-semibold text-rose-400 font-mono leading-normal">
                        Error: {j.reason}
                      </span>
                    )}
                  </div>
                ))}
              </Card>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
