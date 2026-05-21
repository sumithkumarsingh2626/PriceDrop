/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          violet: '#7C3AED',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          ink: '#0F172A',
          slate: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(124, 58, 237, 0.35)',
        'glow-cyan': '0 0 32px rgba(6, 182, 212, 0.25)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.35), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 20%, rgba(6,182,212,0.18), transparent 50%), radial-gradient(ellipse 40% 30% at 10% 60%, rgba(139,92,246,0.15), transparent 45%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
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
