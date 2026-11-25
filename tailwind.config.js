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
          ink: '#0B0F19',
          slate: '#0F172A',
          glass: 'rgba(15, 23, 42, 0.65)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(124, 58, 237, 0.35)',
        'glow-cyan': '0 0 32px rgba(6, 182, 212, 0.25)',
        'glow-emerald': '0 0 32px rgba(16, 185, 129, 0.25)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)',
        'glass-iso': '0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 1px 1px 0 rgba(255, 255, 255, 0.25) inset',
        'glass-iso-hover': '0 30px 60px -12px rgba(124, 58, 237, 0.35), 0 0 0 1px rgba(6, 182, 212, 0.3) inset, 0 1px 2px 0 rgba(255, 255, 255, 0.4) inset',
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.35), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 20%, rgba(6,182,212,0.18), transparent 50%), radial-gradient(ellipse 40% 30% at 10% 60%, rgba(139,92,246,0.15), transparent 45%)',
        'iso-grid':
          'linear-gradient(30deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(150deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'glass-gradient':
          'linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
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
