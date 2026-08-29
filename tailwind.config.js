/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#06080B',
          900: '#0A0D12',
          850: '#0D1117',
          800: '#11151C',
          700: '#161B23',
          600: '#1C2230',
          500: '#252B38',
        },
        brand: {
          emerald: '#0B5D4B',
          dark: '#063B32',
          gold: '#D4B56A',
          white: '#FFFFFF',
          text: '#071F1A',
        },
        accent: {
          DEFAULT: '#34D399',
          soft: '#6EE7B7',
          deep: '#10B981',
          teal: '#14B8A6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        editorial: '-0.025em',
      },
      boxShadow: {
        soft: '0 20px 50px rgba(7,31,26,0.10)',
        glow: '0 0 40px -8px rgba(52, 211, 153, 0.35)',
        'glow-lg': '0 0 80px -10px rgba(52, 211, 153, 0.5)',
        'inner-soft': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.04)',
        'panel': '0 30px 80px -20px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04)',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'grid-fade':
          'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 90%)',
        'radial-emerald':
          'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.20), transparent 60%)',
        'noise':
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.07 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
      },
      backgroundSize: {
        'grid': '32px 32px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'pulse-soft': 'pulseSoft 2.6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.06)' },
        },
      },
    },
  },
  plugins: [],
}
