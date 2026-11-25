/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#06070A',
          carbon: '#0B0D13',
          slate: '#111520',
          elevated: '#161B29',
          mint: '#00F5A0',
          emerald: '#10B981',
          cobalt: '#38BDF8',
          blue: '#2563EB',
          amber: '#F59E0B',
          coral: '#F43F5E',
          violet: '#8B5CF6',
          purple: '#6366F1',
          cyan: '#00D9F5',
          ink: '#06070A',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'specular': '0 1px 0 0 rgba(255, 255, 255, 0.15) inset, 0 0 0 1px rgba(255, 255, 255, 0.06) inset, 0 12px 30px -10px rgba(0, 0, 0, 0.8)',
        'specular-hover': '0 1px 0 0 rgba(255, 255, 255, 0.3) inset, 0 0 0 1px rgba(0, 245, 160, 0.25) inset, 0 20px 40px -10px rgba(0, 0, 0, 0.9), 0 0 30px -5px rgba(0, 245, 160, 0.15)',
        'specular-blue': '0 1px 0 0 rgba(255, 255, 255, 0.3) inset, 0 0 0 1px rgba(56, 189, 248, 0.25) inset, 0 20px 40px -10px rgba(0, 0, 0, 0.9), 0 0 30px -5px rgba(56, 189, 248, 0.15)',
        'specular-amber': '0 1px 0 0 rgba(255, 255, 255, 0.3) inset, 0 0 0 1px rgba(245, 158, 11, 0.25) inset, 0 20px 40px -10px rgba(0, 0, 0, 0.9), 0 0 30px -5px rgba(245, 158, 11, 0.15)',
        'specular-btn': '0 1px 0 0 rgba(255, 255, 255, 0.35) inset, 0 8px 20px -4px rgba(0, 245, 160, 0.4), 0 0 0 1px rgba(0, 245, 160, 0.5)',
        'mint-glow': '0 0 30px rgba(0, 245, 160, 0.25)',
        'glow': '0 0 30px rgba(0, 245, 160, 0.25)',
        'glow-cyan': '0 0 30px rgba(56, 189, 248, 0.25)',
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)',
        'glass-iso': '0 20px 45px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08) inset, 0 1px 1px 0 rgba(255, 255, 255, 0.2) inset',
        'glass-iso-hover': '0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(0, 245, 160, 0.3) inset, 0 1px 2px 0 rgba(255, 255, 255, 0.3) inset',
      },
      backgroundImage: {
        'subtle-radial': 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0, 245, 160, 0.06), transparent 70%)',
        'precision-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'hero-mesh': 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(0, 245, 160, 0.08), transparent 60%), radial-gradient(ellipse 40% 30% at 80% 20%, rgba(56, 189, 248, 0.06), transparent 50%)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-fast': 'float 5s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
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