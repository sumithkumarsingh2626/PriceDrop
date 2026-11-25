/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ai: {
          bg: '#050B18',
          card: '#0B1428',
          elevated: '#111E38',
          blue: '#2563EB',
          cyan: '#00D4FF',
          violet: '#8B5CF6',
          text: '#F8FAFC',
          muted: '#94A3B8',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        brand: {
          dark: '#050B18',
          carbon: '#0B1428',
          slate: '#111E38',
          blue: '#2563EB',
          cyan: '#00D4FF',
          violet: '#8B5CF6',
          purple: '#8B5CF6',
          mint: '#00D4FF',
          emerald: '#10B981',
          amber: '#F59E0B',
          ink: '#050B18',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 35px -5px rgba(0, 212, 255, 0.35)',
        'glow-blue': '0 0 35px -5px rgba(37, 99, 235, 0.45)',
        'glow-violet': '0 0 35px -5px rgba(139, 92, 246, 0.35)',
        'glass-ai': '0 12px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'glass-ai-hover': '0 20px 50px -10px rgba(0, 212, 255, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.3), inset 0 0 0 1px rgba(0, 212, 255, 0.3)',
        'btn-ai': '0 1px 0 0 rgba(255, 255, 255, 0.4) inset, 0 10px 25px -5px rgba(37, 99, 235, 0.5), 0 0 20px rgba(0, 212, 255, 0.3)',
      },
      backgroundImage: {
        'ai-mesh':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37, 99, 235, 0.25), transparent 70%), radial-gradient(ellipse 60% 40% at 85% 20%, rgba(0, 212, 255, 0.15), transparent 60%), radial-gradient(ellipse 50% 40% at 15% 60%, rgba(139, 92, 246, 0.15), transparent 60%)',
        'cyber-grid':
          'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'hero-mesh':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37, 99, 235, 0.25), transparent 70%), radial-gradient(ellipse 60% 40% at 85% 20%, rgba(0, 212, 255, 0.15), transparent 60%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};