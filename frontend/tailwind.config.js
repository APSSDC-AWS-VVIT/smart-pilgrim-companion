/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        temple: {
          gold: '#D4AF37',
          deep: '#2D5BFF',
          warm: 'var(--app-card-soft)',
          saffron: '#FF7A00',
          ink: 'var(--app-text)',
          muted: 'var(--app-muted)',
          forest: '#3A7D44',
        },
      },
      boxShadow: {
        glow: '0 20px 45px rgba(45, 91, 255, 0.12)',
      },
      backgroundImage: {
        'temple-radial': 'radial-gradient(circle at top left, rgba(255, 122, 0, 0.18), transparent 36%), radial-gradient(circle at top right, rgba(212, 175, 55, 0.18), transparent 30%)',
      },
    },
  },
  plugins: [],
};