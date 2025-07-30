/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#4A90E2',
          navy: '#0F172A',
          purple: '#7C3AED',
          mint: '#10B981',
          gray: '#64748B',
          light: '#F1F5F9',
        },
      },
      fontFamily: {
        'primary': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'heading': ['Sora', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.157rem',
        '5xl': '4.209rem',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'wide': '0.02em',
      },
      lineHeight: {
        'tight': '1.25',
        'relaxed': '1.75',
      },
      animation: {
        'fadeInUp': 'fadeInUp 1s ease forwards',
        'fadeInLeft': 'fadeInLeft 1s ease forwards',
        'fadeInRight': 'fadeInRight 1s ease forwards',
        'float': 'float 20s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'expand': 'expand 8s ease-in-out infinite',
        'float-around': 'float-around 20s infinite linear',
        'rain': 'rain 15s linear infinite',
        'ripple': 'ripple 0.6s ease-out',
      },
      keyframes: {
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInLeft: {
          'from': { opacity: '0', transform: 'translateX(-30px)' },
          'to': { opacity: '1', transform: 'translateX(0)' }
        },
        fadeInRight: {
          'from': { opacity: '0', transform: 'translateX(30px)' },
          'to': { opacity: '1', transform: 'translateX(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' }
        },
        expand: {
          '0%, 100%': { width: '20px', height: '20px', opacity: '0.8' },
          '50%': { width: '300px', height: '300px', opacity: '0.1' }
        },
        'float-around': {
          '0%': { transform: 'translate(0, 0) scale(0)', opacity: '0' },
          '10%': { transform: 'translate(50px, -50px) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translate(100px, 0) scale(1.2)', opacity: '0.3' },
          '90%': { transform: 'translate(50px, 50px) scale(1)', opacity: '0.6' },
          '100%': { transform: 'translate(0, 0) scale(0)', opacity: '0' }
        },
        rain: {
          'to': { transform: 'translateY(200vh)' }
        },
        ripple: {
          'to': { transform: 'scale(2)', opacity: '0' }
        }
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #4A90E2, #7C3AED)',
        'gradient-hero': 'linear-gradient(135deg, #0F172A 0%, #1a2847 100%)',
        'gradient-contact': 'linear-gradient(135deg, #0F172A, #1E293B)',
      },
    },
  },
  plugins: [],
}